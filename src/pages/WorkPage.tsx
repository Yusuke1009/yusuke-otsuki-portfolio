import styled from 'styled-components';
import { WorksWithSidebar } from '../components/work/WorksWithSidebar';
import { theme } from '../styles/theme';
import { useLang } from '../i18n/LangContext';
import { ui } from '../i18n/ui';

export function WorkPage() {
  const { lang } = useLang();
  const t = ui[lang];
  return (
    <Page>
      <Header>
        <Label>Work</Label>
        <Heading>{t.work.heading}</Heading>
        <Sub>{t.work.sub}</Sub>
      </Header>
      <WorksWithSidebar sectionNumber="01" sectionLabel="All Works" />
    </Page>
  );
}

const Page = styled.div``;

const Header = styled.header`
  padding: ${theme.spacing['16']} 0 ${theme.spacing['8']};
`;

const Label = styled.div`
  font-family: ${theme.typography.fontMono};
  font-size: ${theme.typography.size.xs};
  color: ${theme.colors.text.muted};
  letter-spacing: ${theme.typography.letterSpacing.widest};
  text-transform: uppercase;
  margin-bottom: ${theme.spacing['4']};
`;

const Heading = styled.h1`
  font-family: ${theme.typography.fontJP};
  font-size: clamp(36px, 5vw, 64px);
  font-weight: 800;
  color: ${theme.colors.text.primary};
  letter-spacing: -1px;
  line-height: 1.05;
  margin-bottom: ${theme.spacing['4']};
`;

const Sub = styled.p`
  font-family: ${theme.typography.fontSans};
  font-size: ${theme.typography.size.md};
  color: ${theme.colors.text.secondary};
  line-height: ${theme.typography.lineHeight.normal};
  max-width: 560px;
`;
