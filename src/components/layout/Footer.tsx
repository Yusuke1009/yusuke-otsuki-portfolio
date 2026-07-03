import styled from 'styled-components';
import { theme } from '../../styles/theme';
import { useLang } from '../../i18n/LangContext';
import { ui } from '../../i18n/ui';

export function Footer() {
  const { lang } = useLang();
  const t = ui[lang];
  return (
    <FooterEl className="no-print">
      <Inner>
        <span>© 2026 {t.footer.name}</span>
        <span>moonoom1009@gmail.com</span>
      </Inner>
    </FooterEl>
  );
}

const FooterEl = styled.footer`
  border-top: 1px solid ${theme.colors.border.default};
  margin-top: ${theme.spacing['20']};
`;

const Inner = styled.div`
  max-width: ${theme.layout.maxWidth};
  margin: 0 auto;
  padding: ${theme.spacing['6']};
  display: flex;
  justify-content: space-between;
  font-family: ${theme.typography.fontSans};
  font-size: ${theme.typography.size.xs};
  color: ${theme.colors.text.muted};
  letter-spacing: ${theme.typography.letterSpacing.wide};
`;
