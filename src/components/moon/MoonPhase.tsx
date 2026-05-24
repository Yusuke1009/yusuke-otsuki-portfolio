import styled from 'styled-components';
import { theme } from '../../styles/theme';

interface MoonPhaseProps {
  /** 0 = 新月, 1 = 満月。0..1 で連続 */
  phase: number;
  size?: number;
  color?: string;
  bg?: string;
  /** active=trueで黄色満ち、falseでアウトラインのみ */
  active?: boolean;
}

/**
 * 月相のミニ表現。
 * waxing側のみ。phase 0 → 1 で右から徐々に満ちていく。
 */
export function MoonPhase({
  phase,
  size = 14,
  color = theme.colors.accent.moon,
  bg = 'transparent',
  active = true,
}: MoonPhaseProps) {
  const r = 8;
  const clamped = Math.max(0, Math.min(1, phase));
  const litFraction = clamped;
  const terminatorRx = r * (1 - 2 * litFraction);
  const absRx = Math.abs(terminatorRx);
  const terminatorSweep = terminatorRx > 0 ? 0 : 1;
  const d = litFraction < 0.005
    ? ''
    : `M 0 ${-r} A ${r} ${r} 0 0 1 0 ${r} A ${absRx} ${r} 0 0 ${terminatorSweep} 0 ${-r} Z`;

  return (
    <Wrap $size={size}>
      <svg
        width={size}
        height={size}
        viewBox="-10 -10 20 20"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Outer rim: 満月時はほぼ消える / それ以外は薄く参照線 */}
        <circle
          cx="0"
          cy="0"
          r={r}
          fill={bg}
          stroke={active ? color : theme.colors.text.muted}
          strokeOpacity={active ? Math.max(0.1, 0.35 - clamped * 0.3) : 0.3}
          strokeWidth="0.6"
        />
        {/* Lit portion (満ち) */}
        {d && (
          <path d={d} fill={active ? color : theme.colors.text.muted} />
        )}
      </svg>
    </Wrap>
  );
}

const Wrap = styled.span<{ $size: number }>`
  display: inline-flex;
  width: ${(p) => p.$size}px;
  height: ${(p) => p.$size}px;
  line-height: 0;
  flex-shrink: 0;
`;
