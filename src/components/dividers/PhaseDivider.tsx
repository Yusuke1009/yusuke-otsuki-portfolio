import styled from 'styled-components';
import { theme } from '../../styles/theme';
import { MoonPhase } from '../moon/MoonPhase';

interface PhaseDividerProps {
  /** Phase 番号 (e.g. '01') */
  number: string;
  /** 0..1 月相 */
  phase: number;
  /** 期間ラベル */
  period?: string;
}

/**
 * 建築的な細線 + 有機的な円（月相） を組み合わせた Phase 区切りグラフィック。
 *
 * 構造：
 *   ┌─ 数字 ─┬─────────────────────────── ○ ──── 期間 ─┐
 *   │       │                                          │
 *   └ vertical drop line at left
 */
export function PhaseDivider({ number, phase, period }: PhaseDividerProps) {
  return (
    <Wrap aria-hidden="true">
      <NumberCol>{number}</NumberCol>
      <LineSlot>
        <svg width="100%" height="40" viewBox="0 0 800 40" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          {/* 細い水平線 (左から伸びる) */}
          <line x1="0" y1="20" x2="380" y2="20" stroke="#0a0a0a" strokeWidth="0.6" />
          {/* 月相位置の前後の隙間 (line cut) */}
          {/* 月相の右側に線が再開 */}
          <line x1="430" y1="20" x2="800" y2="20" stroke="#0a0a0a" strokeWidth="0.6" />
          {/* 数字側 vertical tick */}
          <line x1="0" y1="14" x2="0" y2="26" stroke="#0a0a0a" strokeWidth="0.6" />
          {/* 期間側 vertical tick */}
          <line x1="800" y1="14" x2="800" y2="26" stroke="#0a0a0a" strokeWidth="0.6" />
          {/* もう一本下に細い line (architectural double line) */}
          <line x1="0" y1="32" x2="800" y2="32" stroke="#0a0a0a" strokeWidth="0.3" strokeOpacity="0.4" />
        </svg>
        <MoonSlot>
          <MoonPhase phase={phase} size={24} active={true} bg={theme.colors.bg.base} />
        </MoonSlot>
      </LineSlot>
      {period && <PeriodCol>{period}</PeriodCol>}
    </Wrap>
  );
}

const Wrap = styled.div`
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: ${theme.spacing['4']};
  margin: ${theme.spacing['16']} 0 ${theme.spacing['10']};
  position: relative;
`;

const NumberCol = styled.div`
  font-family: ${theme.typography.fontMono};
  font-size: ${theme.typography.size.lg};
  color: ${theme.colors.text.primary};
  letter-spacing: ${theme.typography.letterSpacing.tight};
  line-height: 1;
`;

const LineSlot = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const MoonSlot = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background: ${theme.colors.bg.base};
  padding: 0 6px;
  display: inline-flex;
`;

const PeriodCol = styled.div`
  font-family: ${theme.typography.fontMono};
  font-size: ${theme.typography.size.xs};
  color: ${theme.colors.text.muted};
  letter-spacing: ${theme.typography.letterSpacing.wide};
  white-space: nowrap;
`;
