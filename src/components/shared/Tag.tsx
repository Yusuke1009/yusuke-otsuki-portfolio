import styled from 'styled-components';
import { theme } from '../../styles/theme';

interface TagProps {
  label: string;
}

export function Tag({ label }: TagProps) {
  return <TagEl>{label}</TagEl>;
}

const TagEl = styled.span`
  display: inline-block;
  font-family: ${theme.typography.fontSans};
  font-size: ${theme.typography.size.xs};
  color: ${theme.colors.text.muted};
  border: 1px solid ${theme.colors.border.default};
  border-radius: ${theme.radius.sm};
  padding: 2px 8px;
  letter-spacing: ${theme.typography.letterSpacing.normal};
`;
