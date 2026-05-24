import { useEffect, useId, useRef } from 'react';
import styled from 'styled-components';
import { theme } from '../../styles/theme';
import { useScrollProgress } from '../../lib/useScrollProgress';

interface MoonProps {
  size?: number;
  fixed?: boolean;
}

/**
 * Soft Aurora Sphere + Wireframe Phase Moon.
 *
 * - 明側: 黄〜オレンジ mesh gradient + 細ノイズ + soft blur
 * - 暗側: tilt の入った lat/long ワイヤーフレーム (subdued / 後ろに引いた感じ)
 * - 境界: feTurbulence + feDisplacementMap で organic / 曖昧に
 * - 月相: scroll 進行に応じて waxing
 */
export function Moon({ size = 460, fixed = true }: MoonProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const turbRef = useRef<SVGFETurbulenceElement>(null);
  const grainRef = useRef<SVGFETurbulenceElement>(null);
  const blurRef = useRef<SVGFEGaussianBlurElement>(null);
  const litPathRef = useRef<SVGPathElement>(null);
  const litCutoutRef = useRef<SVGPathElement>(null);
  const haloRef = useRef<SVGCircleElement>(null);
  const progress = useScrollProgress();

  const uid = useId().replace(/:/g, '');

  // Idle breathing
  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    function tick(now: number) {
      const t = (now - start) / 1000;
      if (turbRef.current) {
        turbRef.current.setAttribute(
          'baseFrequency',
          `${(0.55 + Math.sin(t / 9) * 0.12).toFixed(3)}`
        );
      }
      if (grainRef.current) {
        grainRef.current.setAttribute(
          'baseFrequency',
          `${(3.6 + Math.sin(t / 4) * 0.5).toFixed(3)}`
        );
      }
      raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  // Cursor proximity: default blur 5 / boundary disp 12 → 接近で blur 1, disp 4
  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    let raf = 0;
    let targetBlur = 5;
    let currentBlur = 5;

    function onMove(e: MouseEvent) {
      const rect = wrap!.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dist = Math.hypot(e.clientX - cx, e.clientY - cy);
      const proximity = Math.max(0, 1 - dist / 480);
      targetBlur = 5 - proximity * 4;
    }

    function tick() {
      currentBlur += (targetBlur - currentBlur) * 0.08;
      if (blurRef.current) {
        blurRef.current.setAttribute('stdDeviation', `${currentBlur.toFixed(2)}`);
      }
      raf = requestAnimationFrame(tick);
    }

    window.addEventListener('mousemove', onMove);
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  // Phase mask paths from scroll
  useEffect(() => {
    if (!litPathRef.current || !litCutoutRef.current || !haloRef.current) return;
    const eased =
      progress < 0.5
        ? 4 * progress * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 3) / 2;
    const litFraction = 0.06 + eased * 0.94;
    const r = 80;
    const terminatorRx = r * (1 - 2 * litFraction);
    const absRx = Math.abs(terminatorRx);
    // Lit area path: 右側半円 + 経線 (terminator)
    const terminatorSweep = terminatorRx > 0 ? 1 : 0;
    const litD =
      litFraction < 0.005
        ? ''
        : `M 0 ${-r} A ${r} ${r} 0 0 1 0 ${r} A ${absRx} ${r} 0 0 ${terminatorSweep} 0 ${-r} Z`;
    litPathRef.current.setAttribute('d', litD);
    // Dark mask は「sphere - lit」で実装するので、同じ litD を black として subtract
    litCutoutRef.current.setAttribute('d', litD);
    haloRef.current.setAttribute('opacity', `${(eased * 0.65).toFixed(3)}`);
  }, [progress]);

  const r = 80;

  /* ─────── Wireframe geometry with axial tilt ─────── */
  // Tilt: 軸を Z 方向に α°（手前に倒す）+ 自転で β°（Y軸回転）
  // 簡易計算: 緯線は ellipse(rx, ry) + 中心位置 cy が tilt で上下シフト
  const tiltDeg = -18; // 軸を手前 18° 倒す
  const yaw = 14;     // Y軸まわり 14° 回転（経線が左右にシフト）
  const tiltRad = (tiltDeg * Math.PI) / 180;

  // 緯線（5本）: tilt するとy方向にオフセット、ryが大きくなる
  const latitudes = [-0.66, -0.33, 0, 0.33, 0.66].map((yFrac) => {
    const yPole = r * yFrac; // 軸沿いの位置
    const ringR = Math.sqrt(r * r - yPole * yPole); // その輪の実半径
    // tilt 適用後: 中心は yPole*cos(α), 楕円の ry は ringR*sin(α)
    const cy = yPole * Math.cos(tiltRad);
    const rx = ringR;
    const ry = Math.max(1.5, ringR * Math.abs(Math.sin(tiltRad)));
    return { cy, rx, ry };
  });

  // 経線（5本）：tilt + yaw を加味
  // 簡略化のためここでは rx = r * |cos(longitude - yaw)|, ry = r
  // tilt は経線全体を回転（後で transform で）
  const meridianAngles = [-72, -36, 0, 36, 72];
  const longitudes = meridianAngles.map((deg) => {
    const lng = ((deg - yaw) * Math.PI) / 180;
    const rx = Math.max(2, r * Math.abs(Math.cos(lng)));
    return { rx, ry: r };
  });

  return (
    <Wrap ref={wrapRef} $size={size} $fixed={fixed} aria-hidden="true">
      <svg
        width={size}
        height={size}
        viewBox="-115 -115 230 230"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Aurora gradient */}
          <radialGradient id={`aurora-${uid}`} cx="35%" cy="35%" r="80%">
            <stop offset="0%" stopColor="#fff7c4" />
            <stop offset="20%" stopColor="#fde47a" />
            <stop offset="48%" stopColor="#f1c542" />
            <stop offset="74%" stopColor="#e08a2a" />
            <stop offset="100%" stopColor="#b04d0c" />
          </radialGradient>

          <radialGradient id={`aurora2-${uid}`} cx="70%" cy="65%" r="70%">
            <stop offset="0%" stopColor="#ff8c42" stopOpacity="0.5" />
            <stop offset="60%" stopColor="#e08a2a" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#b04d0c" stopOpacity="0" />
          </radialGradient>

          <radialGradient id={`halo-${uid}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fde47a" stopOpacity="0.45" />
            <stop offset="55%" stopColor="#f1c542" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#f1c542" stopOpacity="0" />
          </radialGradient>

          {/* Soft blur for aurora */}
          <filter id={`soft-${uid}`} x="-25%" y="-25%" width="150%" height="150%">
            <feGaussianBlur ref={blurRef} stdDeviation="5" />
          </filter>

          {/* Halo blur */}
          <filter id={`halo-blur-${uid}`} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="16" />
          </filter>

          {/* Hidden turbulence for breathing (used by aurora only) */}
          <filter id={`hidden-turb-${uid}`}>
            <feTurbulence
              ref={turbRef}
              type="fractalNoise"
              baseFrequency="0.55"
              numOctaves="3"
              seed="7"
            />
          </filter>

          {/* Fine grain noise */}
          <filter id={`grain-${uid}`} x="0%" y="0%" width="100%" height="100%">
            <feTurbulence
              ref={grainRef}
              type="fractalNoise"
              baseFrequency="3.6"
              numOctaves="2"
              seed="13"
            />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 1
                      0 0 0 0 0.75
                      0 0 0 0 0.2
                      0 0 0 0.16 0"
            />
            <feComposite in2="SourceGraphic" operator="in" />
          </filter>

          {/* Masks: dark は sphere - lit で実装（同じ litD を黒で subtract） */}
          <mask id={`lit-mask-${uid}`}>
            <rect x="-115" y="-115" width="230" height="230" fill="black" />
            <path ref={litPathRef} d="" fill="white" />
          </mask>

          <mask id={`dark-mask-${uid}`}>
            <circle cx="0" cy="0" r={r} fill="white" />
            <path ref={litCutoutRef} d="" fill="black" />
          </mask>

          <clipPath id={`circle-clip-${uid}`}>
            <circle cx="0" cy="0" r={r} />
          </clipPath>
        </defs>

        {/* Layer 4: Outer halo */}
        <circle
          ref={haloRef}
          cx="0"
          cy="0"
          r="110"
          fill={`url(#halo-${uid})`}
          opacity="0"
          filter={`url(#halo-blur-${uid})`}
        />

        {/* Layer 3: Aurora (lit side) */}
        <g mask={`url(#lit-mask-${uid})`}>
          <g filter={`url(#soft-${uid})`}>
            <circle cx="0" cy="0" r={r} fill={`url(#aurora-${uid})`} />
            <circle cx="0" cy="0" r={r} fill={`url(#aurora2-${uid})`} />
          </g>
          <g clipPath={`url(#circle-clip-${uid})`}>
            <rect
              x="-100"
              y="-100"
              width="200"
              height="200"
              filter={`url(#grain-${uid})`}
              fill="white"
              opacity="0.8"
            />
          </g>
        </g>

        {/* Layer 2: Wireframe (dark side) — filter なし、tilted */}
        <g mask={`url(#dark-mask-${uid})`}>
          <g
            fill="none"
            stroke="#0a0a0a"
            strokeOpacity="0.45"
            strokeWidth="0.5"
            vectorEffect="non-scaling-stroke"
          >
            {/* Latitudes (tilt 後) */}
            {latitudes.map((l, i) => (
              <ellipse key={`lat-${i}`} cx="0" cy={l.cy} rx={l.rx} ry={l.ry} />
            ))}
            {/* Longitudes (tilt 反映) */}
            <g transform={`rotate(${tiltDeg})`}>
              {longitudes.map((g, i) => (
                <ellipse key={`lng-${i}`} cx="0" cy="0" rx={g.rx} ry={g.ry} />
              ))}
            </g>
          </g>
        </g>

        {/* Layer 1: Outer rim (clean) */}
        <circle
          cx="0"
          cy="0"
          r={r}
          fill="none"
          stroke="#0a0a0a"
          strokeOpacity="0.25"
          strokeWidth="0.5"
        />
      </svg>
    </Wrap>
  );
}

const Wrap = styled.div<{ $size: number; $fixed: boolean }>`
  width: ${(p) => p.$size}px;
  height: ${(p) => p.$size}px;
  position: ${(p) => (p.$fixed ? 'fixed' : 'absolute')};
  top: ${(p) => (p.$fixed ? '-8vh' : '0')};
  right: ${(p) => (p.$fixed ? 'calc((100vw - 1180px) / 2 - 120px)' : '0')};
  pointer-events: none;
  z-index: 1;

  @media (max-width: 1320px) {
    right: ${(p) => (p.$fixed ? '-100px' : '0')};
  }

  @media (max-width: ${theme.breakpoints.md}) {
    width: ${(p) => Math.round(p.$size * 0.6)}px;
    height: ${(p) => Math.round(p.$size * 0.6)}px;
    right: -120px;
    top: -40px;
    opacity: 0.85;
  }

  svg {
    width: 100%;
    height: 100%;
    overflow: visible;
  }
`;
