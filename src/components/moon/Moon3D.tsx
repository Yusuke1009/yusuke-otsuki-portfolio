import { useEffect, useMemo, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { EffectComposer } from '@react-three/postprocessing';
import * as THREE from 'three';
import styled from 'styled-components';
import { useScrollProgress } from '../../lib/useScrollProgress';
import { LensBlurEffect, LensBlurEffectImpl } from './LensBlurEffect';

interface Moon3DProps {
  /** 画面短辺に対する月の半径比 (0.0 - 1.0) */
  sizeFactor?: number;
  /** position [-1..1, -1..1] of viewport (x: 1=right, y: 1=top) */
  anchor?: [number, number];
}

/**
 * Three.js 月。canvas は viewport 全面、月は 3D 空間内で配置。
 *
 * - 月相: scroll で 0.9 (ほぼ満月) → 0 (新月 = 全 mesh) へ
 * - 自転: 連続 + 軸が scroll で動く
 * - 明側: physical lighting に沿った aurora gradient + 細ノイズ
 * - 暗側: lat/long wire (depth test で球の裏側非表示、edge fresnel フェード)
 */
export function Moon3D({ sizeFactor = 0.34, anchor = [0.52, 0.28] }: Moon3DProps) {
  return (
    <CanvasWrap aria-hidden="true">
      <Canvas
        orthographic
        camera={{ position: [0, 0, 2000], zoom: 1, near: 0.1, far: 4000 }}
        gl={{ alpha: true, antialias: true }}
        style={{ background: 'transparent' }}
      >
        <MoonScene sizeFactor={sizeFactor} anchor={anchor} />
        <LensBlurLayer anchor={anchor} sizeFactor={sizeFactor} />
      </Canvas>
    </CanvasWrap>
  );
}

/* ───────── Lens Blur Post-Process ───────── */

function LensBlurLayer({ anchor, sizeFactor }: LensProps) {
  const effectRef = useRef<LensBlurEffectImpl>(null);
  const progress = useScrollProgress();
  const smoothProgressRef = useRef(0);
  const targetRef = useRef({ x: 0, y: 0 });
  const current1Ref = useRef({ x: 0, y: 0 }); // lens1: 中速
  const current2Ref = useRef({ x: 0, y: 0 }); // lens2: より遅い (trail)

  useEffect(() => {
    function onMove(e: MouseEvent) {
      targetRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      targetRef.current.y = -((e.clientY / window.innerHeight) * 2 - 1);
    }
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  const startTimeRef = useRef(performance.now());

  useFrame((_, dt) => {
    if (!effectRef.current) return;
    // ぬるっと: lens1 lerp 0.05, lens2 lerp 0.025 (より遅い trail)
    current1Ref.current.x += (targetRef.current.x - current1Ref.current.x) * 0.05;
    current1Ref.current.y += (targetRef.current.y - current1Ref.current.y) * 0.05;
    current2Ref.current.x += (current1Ref.current.x - current2Ref.current.x) * 0.05;
    current2Ref.current.y += (current1Ref.current.y - current2Ref.current.y) * 0.05;

    effectRef.current.setSphereCenter(anchor[0], anchor[1]);
    effectRef.current.setMouse(current1Ref.current.x, current1Ref.current.y);
    effectRef.current.setMouse2(current2Ref.current.x, current2Ref.current.y);

    const sphereRadiusNDC =
      (Math.min(window.innerWidth, window.innerHeight) * sizeFactor) /
      window.innerHeight;
    effectRef.current.setSphereRadius(sphereRadiusNDC);
    effectRef.current.setLensRadius(sphereRadiusNDC * 0.85);

    // MoonScene と同じ慣性 (lerp rate) で smoothProgress を作って intensity を駆動
    const lerpRate = 1 - Math.exp(-dt * 6.0);
    smoothProgressRef.current += (progress - smoothProgressRef.current) * lerpRate;
    const intensity = Math.max(0, 1 - smoothProgressRef.current / 0.2);
    effectRef.current.setIntensity(intensity);

    effectRef.current.setTime((performance.now() - startTimeRef.current) / 1000);
  });

  return (
    <EffectComposer multisampling={0}>
      <LensBlurEffect ref={effectRef} />
    </EffectComposer>
  );
}

/* ───────────────────── Shaders ───────────────────── */

const auroraVertex = /* glsl */ `
  varying vec3 vNormal;
  varying vec2 vUv;
  varying vec3 vLocal;
  void main() {
    vNormal = normalize(normalMatrix * normal);
    vUv = uv;
    vLocal = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const auroraFragment = /* glsl */ `
  precision highp float;

  varying vec3 vNormal;
  varying vec2 vUv;
  varying vec3 vLocal;
  uniform vec3 uLightDir;
  uniform float uTime;
  uniform float uHover;
  uniform float uPhase;

  // Smooth value noise
  float hash(vec3 p) {
    p = fract(p * 0.3183099 + vec3(0.1, 0.2, 0.3));
    p *= 17.0;
    return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
  }
  float noise(vec3 p) {
    vec3 i = floor(p);
    vec3 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(
        mix(hash(i + vec3(0,0,0)), hash(i + vec3(1,0,0)), f.x),
        mix(hash(i + vec3(0,1,0)), hash(i + vec3(1,1,0)), f.x),
        f.y),
      mix(
        mix(hash(i + vec3(0,0,1)), hash(i + vec3(1,0,1)), f.x),
        mix(hash(i + vec3(0,1,1)), hash(i + vec3(1,1,1)), f.x),
        f.y),
      f.z);
  }
  float fbm(vec3 p) {
    float v = 0.0;
    float a = 0.5;
    for (int i = 0; i < 4; i++) {
      v += a * noise(p);
      p *= 2.0;
      a *= 0.5;
    }
    return v;
  }

  void main() {
    vec3 N = normalize(vNormal);
    vec3 L = normalize(uLightDir);
    float NdotL = dot(N, L);
    float lit = clamp(NdotL, 0.0, 1.0);

    // ── Physical lighting gradient ──
    vec3 highlight  = vec3(1.000, 0.965, 0.720);
    vec3 mid        = vec3(0.965, 0.812, 0.305);
    vec3 amber      = vec3(0.875, 0.520, 0.135);
    vec3 termZone   = vec3(0.620, 0.265, 0.040);

    vec3 color = mix(termZone, amber, smoothstep(0.00, 0.32, lit));
    color = mix(color, mid, smoothstep(0.28, 0.62, lit));
    color = mix(color, highlight, smoothstep(0.55, 0.95, lit) * 0.9);

    // ── 横方向 mesh の微妙な変化 ──
    float meshShift = vUv.x;
    color += vec3(0.04, 0.02, 0.0) * (meshShift - 0.5);

    // ── 副ハイライト 1: 上左に明るいクリーム ──
    vec3 hot1Dir = normalize(vec3(-0.28, 0.55, 0.78));
    float hot1Mask = pow(max(0.0, dot(N, hot1Dir)), 3.5);
    vec3 hot1Col = vec3(1.000, 0.985, 0.770);
    color = mix(color, hot1Col, hot1Mask * lit * 0.55);

    // ── 副ハイライト 2: 右下に深いアンバー ──
    vec3 hot2Dir = normalize(vec3(0.45, -0.35, 0.65));
    float hot2Mask = pow(max(0.0, dot(N, hot2Dir)), 4.5);
    vec3 hot2Col = vec3(0.880, 0.420, 0.085);
    color = mix(color, hot2Col, hot2Mask * lit * 0.4);

    // ── 細ノイズ (high freq, 低 amplitude) ──
    float n_med = fbm(vLocal * 18.0 + uTime * 0.02);
    float n_fine = noise(vLocal * 110.0);
    float n_ultra = noise(vLocal * 280.0);
    color += vec3((n_med - 0.5) * 0.04);
    color += vec3((n_fine - 0.5) * 0.025);
    color += vec3((n_ultra - 0.5) * 0.018);

    // ── Soft warm halo bias ──
    color += vec3(0.05, 0.035, 0.005) * pow(lit, 2.0);

    // ── alpha: terminator + soft silhouette ──
    float terminatorSoft = mix(0.22, 0.08, uHover);
    float terminatorAlpha = smoothstep(-terminatorSoft, terminatorSoft, NdotL);

    // edge fade: シルエットに向かって柔らかくフェード
    // smoothstep 範囲を広めに (0→0.6) で広くしつつ、本体は不透明
    float NdotV = abs(N.z);
    float edgeFade = smoothstep(0.0, 0.6, NdotV);

    float alpha = terminatorAlpha * edgeFade;

    gl_FragColor = vec4(color, alpha);
  }
`;

const wireVertex = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vWorldPos;
  void main() {
    // 球面上の点なので、normalize(position) が法線方向
    vNormal = normalize(normalMatrix * normalize(position));
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    vWorldPos = mv.xyz;
    gl_Position = projectionMatrix * mv;
  }
`;

const wireFragment = /* glsl */ `
  precision highp float;
  varying vec3 vNormal;
  varying vec3 vWorldPos;
  uniform vec3 uLightDir;
  uniform vec3 uColor;
  uniform float uOpacity;

  void main() {
    vec3 N = normalize(vNormal);
    vec3 L = normalize(uLightDir);
    float NdotL = dot(N, L);

    // 暗側のみ可視
    float darkMask = 1.0 - smoothstep(-0.12, 0.22, NdotL);

    // edge fresnel: シルエット (端) で完全フェード
    vec3 V = normalize(-vWorldPos);
    float fresnel = 1.0 - abs(dot(N, V));
    float edge = 1.0 - smoothstep(0.35, 0.85, fresnel);

    float a = darkMask * uOpacity * edge;
    if (a < 0.005) discard;
    gl_FragColor = vec4(uColor, a);
  }
`;

/* ───────────────────── Scene ───────────────────── */

interface SceneProps {
  sizeFactor: number;
  anchor: [number, number];
}

interface LensProps {
  anchor: [number, number];
  sizeFactor: number;
}

function MoonScene({ sizeFactor, anchor }: SceneProps) {
  const groupRef = useRef<THREE.Group>(null);
  const progress = useScrollProgress();
  const hoverRef = useRef(0);
  // ── スクロール慣性 ──
  // smoothProgress: 実 progress を lerp で追従 (ふわっと)
  // velocity: smoothProgress の derivative (オーバーシュート用)
  const smoothProgressRef = useRef(0);
  const lastSmoothRef = useRef(0);
  const velocityRef = useRef(0);
  const { viewport, scene } = useThree();

  // シーン背景を null に（完全透明）
  useMemo(() => {
    scene.background = null;
  }, [scene]);

  const uniforms = useMemo(
    () => ({
      light: { value: new THREE.Vector3(0, 0, 1) },
      time: { value: 0 },
      hover: { value: 0 },
      phase: { value: 0.9 },
      wireColor: { value: new THREE.Color('#0a0a0a') },
      wireOpacity: { value: 0.55 },
    }),
    []
  );

  const auroraMat = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: auroraVertex,
        fragmentShader: auroraFragment,
        uniforms: {
          uLightDir: uniforms.light,
          uTime: uniforms.time,
          uHover: uniforms.hover,
          uPhase: uniforms.phase,
        },
        transparent: true,
        side: THREE.FrontSide,
        depthWrite: true,
      }),
    [uniforms]
  );

  const wireMat = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: wireVertex,
        fragmentShader: wireFragment,
        uniforms: {
          uLightDir: uniforms.light,
          uColor: uniforms.wireColor,
          uOpacity: uniforms.wireOpacity,
        },
        transparent: true,
        side: THREE.DoubleSide,
        depthWrite: false,
      }),
    [uniforms]
  );

  const wireGeometry = useMemo(() => {
    const positions: number[] = [];
    const R = 1.0;
    const lonSegments = 64;
    const latCount = 7;
    const lonCount = 12;
    for (let i = 1; i <= latCount; i++) {
      const phi = (i / (latCount + 1)) * Math.PI;
      const y = -R * Math.cos(phi);
      const r = R * Math.sin(phi);
      for (let j = 0; j < lonSegments; j++) {
        const t1 = (j / lonSegments) * Math.PI * 2;
        const t2 = ((j + 1) / lonSegments) * Math.PI * 2;
        positions.push(r * Math.cos(t1), y, r * Math.sin(t1));
        positions.push(r * Math.cos(t2), y, r * Math.sin(t2));
      }
    }
    for (let i = 0; i < lonCount; i++) {
      const lon = (i / lonCount) * Math.PI * 2;
      for (let j = 0; j < lonSegments; j++) {
        const t1 = (j / lonSegments) * Math.PI - Math.PI / 2;
        const t2 = ((j + 1) / lonSegments) * Math.PI - Math.PI / 2;
        positions.push(
          R * Math.cos(t1) * Math.cos(lon),
          R * Math.sin(t1),
          R * Math.cos(t1) * Math.sin(lon)
        );
        positions.push(
          R * Math.cos(t2) * Math.cos(lon),
          R * Math.sin(t2),
          R * Math.cos(t2) * Math.sin(lon)
        );
      }
    }
    const geom = new THREE.BufferGeometry();
    geom.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    geom.computeBoundingSphere();
    return geom;
  }, []);

  useFrame((state, dt) => {
    // ── スクロール慣性 ──
    // 実 progress (target) を smoothProgress が lerp で追従。やや遅めにして
    // 慣性 (velocity) が長く残るように
    const lerpRate = 1 - Math.exp(-dt * 5.25);
    const prev = smoothProgressRef.current;
    smoothProgressRef.current += (progress - prev) * lerpRate;
    const sp = smoothProgressRef.current;

    // velocity: 1秒あたりの smoothProgress 変化量 → さらに rate-lerp で滑らかに
    // 減衰係数を低くして「勢いが残る」感を強める
    const instantVel = dt > 0 ? (sp - lastSmoothRef.current) / dt : 0;
    velocityRef.current += (instantVel - velocityRef.current) * (1 - Math.exp(-dt * 4.25));
    lastSmoothRef.current = sp;
    const vel = velocityRef.current;

    // ── 月相: smoothProgress で 0.92 (slight dark) → 0 (new moon = 全 mesh) ──
    const eased = sp < 0.5 ? 4 * sp * sp * sp : 1 - Math.pow(-2 * sp + 2, 3) / 2;
    const phase = 0.92 - eased * 0.92;
    const angle = phase * Math.PI;
    uniforms.light.value.set(Math.sin(angle), 0, -Math.cos(angle));
    uniforms.time.value += dt;
    uniforms.phase.value = phase;

    // ── Cursor hover ──
    const proximity = Math.max(
      0,
      1 - Math.hypot(state.pointer.x - anchor[0], state.pointer.y + anchor[1]) / 1.4
    );
    hoverRef.current += (proximity - hoverRef.current) * 0.07;
    uniforms.hover.value = hoverRef.current;

    if (!groupRef.current) return;
    const g = groupRef.current;

    // viewport は orthographic zoom=1 で screen pixel と等価
    // ── Position: スクロールで右へドリフト + 速度オーバーシュート (慣性) ──
    const overshootX = vel * 0.1;
    const overshootY = -vel * 0.027;
    const scrollDriftX = sp * 0.5 + overshootX;
    const scrollDriftY = sp * 0.05 + overshootY;
    g.position.x = (viewport.width / 2) * (anchor[0] + scrollDriftX);
    g.position.y = (viewport.height / 2) * (anchor[1] + scrollDriftY);

    // ── Scale: 短辺基準 (半径 = sizeFactor * 短辺 / 2) ──
    const radius = (Math.min(viewport.width, viewport.height) * sizeFactor) / 2;
    const t = Math.min(1, sp / 0.45);
    const e = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    // 慣性で膨張: 中 (最大 +9%)
    const velPulse = 1 + Math.min(0.09, Math.abs(vel) * 0.05);
    const sFactor = (1.0 - 0.2 * e) * velPulse;
    g.scale.setScalar(radius * sFactor);

    // ── Rotation (連続自転 + smoothProgress + 速度ブースト) ──
    g.rotation.y = uniforms.time.value * 0.12 + sp * 0.5 + vel * 0.3;
    g.rotation.x = -0.18 + Math.sin(sp * Math.PI * 1.5) * 0.45 + vel * 0.03;
    g.rotation.z = -0.05 + sp * 0.4 + vel * 0.07;
  });

  return (
    <group ref={groupRef}>
      {/* Aurora sphere */}
      <mesh>
        <sphereGeometry args={[1, 128, 128]} />
        <primitive object={auroraMat} attach="material" />
      </mesh>

      {/* Wireframe lines */}
      <lineSegments geometry={wireGeometry}>
        <primitive object={wireMat} attach="material" />
      </lineSegments>
    </group>
  );
}

const CanvasWrap = styled.div`
  position: fixed;
  inset: 0;
  pointer-events: none !important;
  z-index: 1;
  background: transparent;

  &, & * {
    pointer-events: none !important;
  }

  > canvas {
    background: transparent !important;
    width: 100% !important;
    height: 100% !important;
  }
`;
