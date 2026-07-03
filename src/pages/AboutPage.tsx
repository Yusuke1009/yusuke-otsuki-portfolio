import styled from 'styled-components';
import { theme } from '../styles/theme';
import { useLang } from '../i18n/LangContext';
import { ui } from '../i18n/ui';

const PORTRAIT = '/assets/images/portrait_otsuki.webp';

export function AboutPage() {
  const { lang } = useLang();
  const t = ui[lang];
  return (
    <div>
      <PageHeader>
        <Label>About</Label>
        <Heading>{t.about.heading}</Heading>
      </PageHeader>

      <Intro>
        <Portrait src={PORTRAIT} alt={t.about.heading} />
        <IntroBody>
          <Lead>{t.about.lead}</Lead>
          <Bio>{t.about.bio}</Bio>
        </IntroBody>
      </Intro>

      <Body>
        <Section>
          <SectionTitle>{t.about.secAreas}</SectionTitle>
          <Text>{t.about.valAreas}</Text>
        </Section>

        <Section>
          <SectionTitle>{t.about.secStyle}</SectionTitle>
          <Text>{t.about.valStyle}</Text>
        </Section>

        <Section>
          <SectionTitle>{t.about.secHobby}</SectionTitle>
          <Text>{t.about.valHobby}</Text>
        </Section>
      </Body>
    </div>
  );
}

const PageHeader = styled.div`
  margin-bottom: ${theme.spacing['10']};
`;

const Label = styled.div`
  font-family: ${theme.typography.fontSans};
  font-size: ${theme.typography.size.xs};
  color: ${theme.colors.text.muted};
  letter-spacing: ${theme.typography.letterSpacing.widest};
  text-transform: uppercase;
  margin-bottom: ${theme.spacing['3']};
`;

const Heading = styled.h1`
  font-family: ${theme.typography.fontSerif};
  font-size: ${theme.typography.size['2xl']};
  color: ${theme.colors.text.primary};
`;

const Intro = styled.section`
  display: grid;
  grid-template-columns: 180px 1fr;
  gap: ${theme.spacing['8']};
  align-items: start;
  margin-bottom: ${theme.spacing['12']};
  padding-bottom: ${theme.spacing['10']};
  border-bottom: 1px solid ${theme.colors.border.default};

  @media (max-width: ${theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
    gap: ${theme.spacing['6']};
  }
`;

const Portrait = styled.img`
  width: 100%;
  aspect-ratio: 1 / 1;
  object-fit: cover;
  border-radius: ${theme.radius.md};
  background: ${theme.colors.bg.subtle};
`;

const IntroBody = styled.div``;

const Lead = styled.p`
  font-family: ${theme.typography.fontSerif};
  font-size: ${theme.typography.size.lg};
  color: ${theme.colors.text.primary};
  line-height: ${theme.typography.lineHeight.normal};
  margin-bottom: ${theme.spacing['5']};
`;

const Bio = styled.p`
  font-family: ${theme.typography.fontSans};
  font-size: ${theme.typography.size.sm};
  color: ${theme.colors.text.secondary};
  line-height: ${theme.typography.lineHeight.loose};
`;

const Body = styled.div`
  max-width: 680px;
`;

const Section = styled.section`
  margin-bottom: ${theme.spacing['8']};
`;

const SectionTitle = styled.h2`
  font-family: ${theme.typography.fontSans};
  font-size: ${theme.typography.size.xs};
  font-weight: ${theme.typography.weight.bold};
  color: ${theme.colors.text.muted};
  letter-spacing: ${theme.typography.letterSpacing.widest};
  text-transform: uppercase;
  margin-bottom: ${theme.spacing['4']};
`;

const Text = styled.p`
  font-family: ${theme.typography.fontSans};
  font-size: ${theme.typography.size.base};
  color: ${theme.colors.text.secondary};
  line-height: ${theme.typography.lineHeight.loose};
`;

