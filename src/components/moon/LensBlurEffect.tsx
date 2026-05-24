import { forwardRef, useMemo } from 'react';
import { Effect } from 'postprocessing';
import * as THREE from 'three';

const fragment = /* glsl */ `
  uniform vec2 uMouse;          // [-1..1] NDC, lens1 tracking (fast)
  uniform vec2 uMouse2;         // [-1..1] NDC, lens2 tracking (slow trail)
  uniform vec2 uSphereCenter;   // [-1..1] NDC sphere anchor
  uniform float uSphereRadius;  // sphere radius in aspect-corrected NDC
  uniform float uLensRadius;    // lens radius in aspect-corrected NDC
  uniform float uIntensity;     // 0..1 fade
  uniform float uMaxBlur;       // max blur (pixels)
  uniform float uTime;          // for organic motion

  // 円形 Gaussian-weighted blur kernel
  vec4 sampleBlur(sampler2D tex, vec2 uv, vec2 texelSize, float radius) {
    if (radius < 0.001) return texture2D(tex, uv);
    vec4 sum = vec4(0.0);
    float total = 0.0;
    const int TAPS = 18;
    const int RINGS = 5;
    for (int i = 0; i < TAPS; i++) {
      float a = float(i) * 6.2831853 / float(TAPS);
      for (int j = 1; j <= RINGS; j++) {
        float dist = float(j) / float(RINGS);
        vec2 offset = vec2(cos(a), sin(a)) * radius * dist * texelSize;
        float w = exp(-dist * dist * 0.8);
        sum += texture2D(tex, uv + offset) * w;
        total += w;
      }
    }
    sum += texture2D(tex, uv) * 0.5;
    total += 0.5;
    return sum / total;
  }

  void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
    vec2 ndc = uv * 2.0 - 1.0;
    vec2 aspectFix = vec2(resolution.x / resolution.y, 1.0);
    vec2 sphereAsp = uSphereCenter * aspectFix;
    vec2 mouseAsp = uMouse * aspectFix;
    vec2 mouse2Asp = uMouse2 * aspectFix;
    vec2 ndcAsp = ndc * aspectFix;

    // ── 方向ベクトル ──
    vec2 toMouse = mouseAsp - sphereAsp;
    float toMouseLen = length(toMouse);
    vec2 dirN = toMouseLen > 0.001 ? toMouse / toMouseLen : vec2(1.0, 0.0);
    vec2 perpN = vec2(-dirN.y, dirN.x);

    // ── マウス−球距離による intensity falloff ──
    float distFalloff = 1.0 - smoothstep(uSphereRadius * 0.6, uSphereRadius * 2.2, toMouseLen);

    // ── Lens 1 (外側 soft halo): マウス位置 ──
    vec2 lensPos1 = mouseAsp;
    vec2 local1 = ndcAsp - lensPos1;
    float u1 = dot(local1, dirN);
    float v1 = dot(local1, perpN);

    float a1 = uLensRadius * 1.3;
    float b1 = uLensRadius * 1.0;
    float angle1 = atan(v1, u1);
    float organic1 =
      sin(angle1 * 3.0 + uTime * 0.4) * 0.045
    + sin(angle1 * 5.0 - uTime * 0.6) * 0.030
    + sin(angle1 * 9.0 + uTime * 0.2) * 0.015;
    float ed1 = sqrt((u1/a1)*(u1/a1) + (v1/b1)*(v1/b1)) / (1.0 + organic1);
    float lensWeight1 = 1.0 - smoothstep(0.6, 1.0, ed1);

    // ── Lens 2 (内側 focus, 遅れて追従): mouse2 + わずかに前方 ──
    vec2 lensPos2 = mouse2Asp + dirN * uLensRadius * 0.12;
    vec2 local2 = ndcAsp - lensPos2;
    float u2 = dot(local2, dirN);
    float v2 = dot(local2, perpN);

    // サイズ差を小さく: lens1 の 88% 程度
    float r2 = uLensRadius * 0.88;
    float a2 = r2 * 1.28;
    float b2 = r2 * 0.95;
    float angle2 = atan(v2, u2);
    float organic2 =
      sin(angle2 * 4.0 + uTime * 0.55) * 0.04
    + sin(angle2 * 7.0 - uTime * 0.35) * 0.022;
    float ed2 = sqrt((u2/a2)*(u2/a2) + (v2/b2)*(v2/b2)) / (1.0 + organic2);
    float lensWeight2 = 1.0 - smoothstep(0.6, 1.0, ed2);

    // ── 合成: 内側を少しだけ強く ──
    float blur1 = lensWeight1 * uMaxBlur;
    float blur2 = lensWeight2 * uMaxBlur * 1.2;
    float blurAmount = max(blur1, blur2) * uIntensity * distFalloff;

    vec2 texel = 1.0 / resolution;
    vec4 blurred = sampleBlur(inputBuffer, uv, texel, blurAmount);

    outputColor = blurred;
  }
`;

export class LensBlurEffectImpl extends Effect {
  constructor() {
    const uniforms = new Map<string, THREE.Uniform>([
      ['uMouse', new THREE.Uniform(new THREE.Vector2(0, 0))],
      ['uMouse2', new THREE.Uniform(new THREE.Vector2(0, 0))],
      ['uSphereCenter', new THREE.Uniform(new THREE.Vector2(0, 0))],
      ['uSphereRadius', new THREE.Uniform(0.6)],
      ['uLensRadius', new THREE.Uniform(0.7)],
      ['uIntensity', new THREE.Uniform(1)],
      ['uMaxBlur', new THREE.Uniform(180)],
      ['uTime', new THREE.Uniform(0)],
    ]);
    super('LensBlurEffect', fragment, { uniforms });
  }

  setMouse(x: number, y: number) {
    const u = (this.uniforms.get('uMouse') as THREE.Uniform).value as THREE.Vector2;
    u.set(x, y);
  }
  setMouse2(x: number, y: number) {
    const u = (this.uniforms.get('uMouse2') as THREE.Uniform).value as THREE.Vector2;
    u.set(x, y);
  }
  setSphereCenter(x: number, y: number) {
    const u = (this.uniforms.get('uSphereCenter') as THREE.Uniform)
      .value as THREE.Vector2;
    u.set(x, y);
  }
  setSphereRadius(v: number) {
    (this.uniforms.get('uSphereRadius') as THREE.Uniform).value = v;
  }
  setLensRadius(v: number) {
    (this.uniforms.get('uLensRadius') as THREE.Uniform).value = v;
  }
  setIntensity(v: number) {
    (this.uniforms.get('uIntensity') as THREE.Uniform).value = v;
  }
  setMaxBlur(v: number) {
    (this.uniforms.get('uMaxBlur') as THREE.Uniform).value = v;
  }
  setTime(v: number) {
    (this.uniforms.get('uTime') as THREE.Uniform).value = v;
  }
}

export const LensBlurEffect = forwardRef<LensBlurEffectImpl>(function LensBlurEffect(_props, ref) {
  const effect = useMemo(() => new LensBlurEffectImpl(), []);
  if (ref) {
    if (typeof ref === 'function') ref(effect);
    else (ref as React.MutableRefObject<LensBlurEffectImpl | null>).current = effect;
  }
  return <primitive object={effect} />;
});
