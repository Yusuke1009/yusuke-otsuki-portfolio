import { useMemo } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Moon3D } from '../components/moon/Moon3D';
import { HeroGrid } from '../components/hero/HeroGrid';
import { WorksWithSidebar } from '../components/work/WorksWithSidebar';
import { writing } from '../data/writing';
import { useScrollProgress } from '../lib/useScrollProgress';
import { theme } from '../styles/theme';
import { useLang } from '../i18n/LangContext';
import { ui } from '../i18n/ui';

const PORTRAIT = '/assets/images/portrait_otsuki.webp';

const EN_MONTHS: Record<string, number> = {
  jan: 1, feb: 2, mar: 3, apr: 4, may: 5, jun: 6,
  jul: 7, aug: 8, sep: 9, oct: 10, nov: 11, dec: 12,
};

// '2024年7月' or 'Jul 2024' → 202407 のような数値化（新しい方が大きい）
function parseDate(s: string): number {
  const jp = s.match(/(\d{4})年(\d{1,2})月/);
  if (jp) return parseInt(jp[1], 10) * 100 + parseInt(jp[2], 10);
  const en = s.match(/([A-Za-z]{3,})\s+(\d{4})/);
  if (en) {
    const month = EN_MONTHS[en[1].slice(0, 3).toLowerCase()];
    if (month) return parseInt(en[2], 10) * 100 + month;
  }
  return 0;
}

export function HomePage() {
  const progress = useScrollProgress();
  const inverted = progress > 0.92;
  const { lang } = useLang();
  const t = ui[lang];
  const { articles, talks } = writing[lang];

  const sortedArticles = useMemo(
    () => [...articles].sort((a, b) => parseDate(b.date) - parseDate(a.date)),
    [articles]
  );
  const sortedTalks = useMemo(
    () => [...talks].sort((a, b) => parseDate(b.date) - parseDate(a.date)),
    [talks]
  );

  return (
    <Page>
      <ScreenInvert $active={inverted} />
      <Moon3D sizeFactor={0.62} anchor={[0.5, 0.05]} />

      {/* ─────────── 01 HERO ─────────── */}
      <Hero>
        <HeroGrid />
        <HeroInner>
          <HeroTop>
            <HeroCopy>
              <HeroLine>
                Practice <CopyItalic>carves</CopyItalic>
              </HeroLine>
              <HeroLine>
                <CopyItalic>the</CopyItalic> path.
              </HeroLine>
            </HeroCopy>
            <HeroJP>{t.home.hero}</HeroJP>
          </HeroTop>

          <HeroBottom>
            <HeroIdentityBlock>
              <RoleRow>
                Designer ・Product Manager · General Manager @M3, Inc. / 2020 —
              </RoleRow>
              <Tagline>{t.home.tagline}</Tagline>
            </HeroIdentityBlock>
          </HeroBottom>
        </HeroInner>
      </Hero>

      {/* ─────────── 02 ABOUT ─────────── */}
      <About id="about">
        <SectionHead>
          <SectionMeta>
            <SecNum>02</SecNum>
            <SecLabel>About</SecLabel>
          </SectionMeta>
          <SecCount>Profile</SecCount>
        </SectionHead>

        <AboutGrid>
          <Portrait src={PORTRAIT} alt="Yusuke Otsuki" />
          <AboutBody>
            <AboutLead>
              {t.home.leadHtml[0]}
              <br />
              <Em>{t.home.leadHtml[1]}</Em>
              {t.home.leadHtml[2]}
            </AboutLead>
            <AboutText>{t.home.bio}</AboutText>
            <AboutGridBottom>
              <AboutMicro>
                <MicroKey>{t.home.microAreasKey}</MicroKey>
                <MicroValue>{t.home.microAreasVal}</MicroValue>
              </AboutMicro>
              <AboutMicro>
                <MicroKey>{t.home.microStyleKey}</MicroKey>
                <MicroValue>{t.home.microStyleVal}</MicroValue>
              </AboutMicro>
              <AboutMicro>
                <MicroKey>{t.home.microHobbyKey}</MicroKey>
                <MicroValue>{t.home.microHobbyVal}</MicroValue>
              </AboutMicro>
            </AboutGridBottom>
          </AboutBody>
        </AboutGrid>
      </About>

      {/* ─────────── 03 WORKS ─────────── */}
      <WorksWithSidebar sectionNumber="03" sectionLabel="Works" />

      {/* ─────────── 04 ARTICLE ─────────── */}
      <ArticleSection id="article">
        <SectionHead>
          <SectionMeta>
            <SecNum>04</SecNum>
            <SecLabel>Article & Talks</SecLabel>
          </SectionMeta>
          <SecCount>{articles.length + talks.length} entries</SecCount>
        </SectionHead>

        <ArticleGroup>
          <GroupLabel>Articles</GroupLabel>
          {sortedArticles.map((a) => (
            <ArticleRow key={a.id} href={a.url} target="_blank" rel="noopener noreferrer">
              <ArticleDate>{a.date}</ArticleDate>
              <ArticleTitle>{a.title}</ArticleTitle>
              <ArticleMedium>
                {a.medium} <ArticleArrow>↗</ArticleArrow>
              </ArticleMedium>
            </ArticleRow>
          ))}
        </ArticleGroup>

        <ArticleGroup>
          <GroupLabel>Talks</GroupLabel>
          {sortedTalks.map((t) => (
            <ArticleRow key={t.id} href={t.url} target="_blank" rel="noopener noreferrer">
              <ArticleDate>{t.date}</ArticleDate>
              <ArticleTitle>{t.title}</ArticleTitle>
              <ArticleMedium>
                {t.event} <ArticleArrow>↗</ArticleArrow>
              </ArticleMedium>
            </ArticleRow>
          ))}
        </ArticleGroup>
      </ArticleSection>

      {/* ─────────── CONTACT FOOT ─────────── */}
      <ContactFoot $dark={inverted}>
        <ContactCopy>
          {t.home.closingPre}
          {t.home.closingItalic && <ContactItalic>{t.home.closingItalic}</ContactItalic>}
          {t.home.closingPost}
        </ContactCopy>
        <ContactLinks>
          <ContactBtn to="/resume" $dark={inverted}>Resume ↗</ContactBtn>
          <ContactBtnAnchor
            href="mailto:moonoom1009@gmail.com"
            $dark={inverted}
          >
            moonoom1009@gmail.com ↗
          </ContactBtnAnchor>
        </ContactLinks>
      </ContactFoot>
    </Page>
  );
}

const Page = styled.div`
  position: relative;
`;

/* ─────────── HERO ─────────── */
const Hero = styled.section`
  position: relative;
  min-height: 720px;
  height: 100vh;
  max-height: 920px;
  padding: ${theme.spacing['16']} 0 160px;
  z-index: 2;
  margin: 0 calc(50% - 50vw);
  display: flex;

  @media (max-width: ${theme.breakpoints.md}) {
    height: auto;
    min-height: 600px;
    padding: ${theme.spacing['16']} 0 140px;
  }
`;

const HeroInner = styled.div`
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: ${theme.layout.maxWidth};
  margin: 0 auto;
  padding: 0 ${theme.spacing['10']};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: ${theme.spacing['12']};

  @media (max-width: ${theme.breakpoints.md}) {
    padding: 0 ${theme.spacing['6']};
  }
`;

const HeroTop = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing['4']};
`;

const HeroCopy = styled.h1`
  font-family: ${theme.typography.fontSerif};
  font-size: clamp(36px, 6vw, 80px);
  font-weight: 400;
  color: ${theme.colors.text.primary};
  letter-spacing: -0.02em;
  line-height: 1.0;
  margin-bottom: ${theme.spacing['4']};
  max-width: 820px;
`;

const HeroLine = styled.span`
  display: block;
`;

const CopyItalic = styled.em`
  font-style: italic;
  font-weight: 400;
  font-family: ${theme.typography.fontSerif};
`;

const HeroJP = styled.p`
  font-family: ${theme.typography.fontJP};
  font-size: ${theme.typography.size.sm};
  color: ${theme.colors.text.primary};
  font-weight: 400;
  letter-spacing: 0.06em;
`;

const HeroBottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: ${theme.spacing['6']};
`;

const HeroIdentityBlock = styled.div`
  max-width: 520px;
`;

const RoleRow = styled.div`
  font-family: ${theme.typography.fontMono};
  font-size: ${theme.typography.size.xs};
  color: ${theme.colors.text.secondary};
  letter-spacing: ${theme.typography.letterSpacing.wide};
  margin-bottom: ${theme.spacing['2']};
`;

const Tagline = styled.div`
  font-family: ${theme.typography.fontJP};
  font-size: ${theme.typography.size.xs};
  color: ${theme.colors.text.muted};
`;

/* ─────────── ABOUT ─────────── */
const About = styled.section`
  padding: ${theme.spacing['16']} 0;
  position: relative;
  z-index: 3;
  background: ${theme.colors.bg.base};
`;

const SectionHead = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  border-bottom: 1px solid ${theme.colors.border.default};
  padding-bottom: ${theme.spacing['4']};
  margin-bottom: ${theme.spacing['10']};
`;

const SectionMeta = styled.div`
  display: flex;
  align-items: baseline;
  gap: ${theme.spacing['4']};
`;

const SecNum = styled.div`
  font-family: ${theme.typography.fontMono};
  font-size: ${theme.typography.size.xs};
  color: ${theme.colors.text.muted};
  letter-spacing: ${theme.typography.letterSpacing.wide};
`;

const SecLabel = styled.h2`
  font-family: ${theme.typography.fontDisplay};
  font-size: ${theme.typography.size.lg};
  font-weight: 500;
  color: ${theme.colors.text.primary};
  letter-spacing: -0.01em;
`;

const SecCount = styled.div`
  font-family: ${theme.typography.fontMono};
  font-size: ${theme.typography.size.xs};
  color: ${theme.colors.text.muted};
  letter-spacing: ${theme.typography.letterSpacing.wide};
  padding-right: ${theme.spacing['6']};
`;

const AboutGrid = styled.div`
  display: grid;
  grid-template-columns: 200px 1fr;
  gap: ${theme.spacing['10']};
  align-items: start;

  @media (max-width: ${theme.breakpoints.md}) {
    grid-template-columns: 1fr;
    gap: ${theme.spacing['6']};
  }
`;

const Portrait = styled.img`
  width: 100%;
  height: auto;
  display: block;
  background: ${theme.colors.bg.subtle};
  filter: grayscale(1) contrast(1.05);
`;

const AboutBody = styled.div``;

const AboutLead = styled.p`
  font-family: ${theme.typography.fontJP};
  font-size: ${theme.typography.size.xl};
  font-weight: 500;
  color: ${theme.colors.text.primary};
  line-height: 1.55;
  letter-spacing: -0.005em;
  margin-bottom: ${theme.spacing['6']};
  max-width: 680px;

  @media (max-width: ${theme.breakpoints.sm}) {
    font-size: ${theme.typography.size.lg};
  }
`;

const Em = styled.em`
  font-style: normal;
  font-weight: 700;
  background: linear-gradient(180deg, transparent 64%, ${theme.colors.accent.moon}cc 64%, ${theme.colors.accent.moon}cc 94%, transparent 94%);
  padding: 0 2px;
`;

const AboutText = styled.p`
  font-family: ${theme.typography.fontJP};
  font-size: ${theme.typography.size.sm};
  color: ${theme.colors.text.secondary};
  line-height: 1.9;
  margin-bottom: ${theme.spacing['10']};
  max-width: 620px;
`;

const AboutGridBottom = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${theme.spacing['6']};

  @media (max-width: ${theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
    gap: ${theme.spacing['4']};
  }
`;

const AboutMicro = styled.div`
  border-top: 1px solid ${theme.colors.border.default};
  padding-top: ${theme.spacing['3']};
`;

const MicroKey = styled.div`
  font-family: ${theme.typography.fontMono};
  font-size: ${theme.typography.size.xs};
  color: ${theme.colors.text.muted};
  letter-spacing: ${theme.typography.letterSpacing.wide};
  text-transform: uppercase;
  margin-bottom: ${theme.spacing['2']};
`;

const MicroValue = styled.div`
  font-family: ${theme.typography.fontJP};
  font-size: ${theme.typography.size.sm};
  color: ${theme.colors.text.primary};
  line-height: 1.5;
`;

/* ─────────── ARTICLE ─────────── */
const ArticleSection = styled.section`
  padding: ${theme.spacing['16']} 0;
  position: relative;
  z-index: 2;
`;

const ArticleGroup = styled.div`
  margin-bottom: ${theme.spacing['10']};
  &:last-child { margin-bottom: 0; }
`;

const GroupLabel = styled.div`
  font-family: ${theme.typography.fontMono};
  font-size: ${theme.typography.size.xs};
  color: ${theme.colors.text.muted};
  letter-spacing: ${theme.typography.letterSpacing.widest};
  text-transform: uppercase;
  margin-bottom: ${theme.spacing['4']};
`;

const ArticleRow = styled.a`
  display: grid;
  grid-template-columns: 110px 1fr 220px;
  gap: ${theme.spacing['4']};
  padding: ${theme.spacing['4']} 0;
  border-top: 1px solid ${theme.colors.border.default};
  align-items: baseline;
  transition: padding ${theme.motion.fast} ${theme.motion.ease};

  &:last-child { border-bottom: 1px solid ${theme.colors.border.default}; }
  &:hover { padding-left: ${theme.spacing['3']}; }

  @media (max-width: ${theme.breakpoints.md}) {
    grid-template-columns: 1fr;
    gap: ${theme.spacing['1']};
  }
`;

const ArticleDate = styled.div`
  font-family: ${theme.typography.fontMono};
  font-size: ${theme.typography.size.xs};
  color: ${theme.colors.text.muted};
  letter-spacing: ${theme.typography.letterSpacing.wide};
`;

const ArticleTitle = styled.div`
  font-family: ${theme.typography.fontJP};
  font-size: ${theme.typography.size.sm};
  color: ${theme.colors.text.primary};
  font-weight: 500;
  line-height: 1.6;
`;

const ArticleMedium = styled.div`
  font-family: ${theme.typography.fontMono};
  font-size: ${theme.typography.size.xs};
  color: ${theme.colors.text.muted};
  letter-spacing: ${theme.typography.letterSpacing.wide};
  text-align: right;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: ${theme.spacing['2']};

  @media (max-width: ${theme.breakpoints.md}) {
    text-align: left;
    justify-content: flex-start;
  }
`;

const ArticleArrow = styled.span`
  transition: transform ${theme.motion.fast} ${theme.motion.ease};
  ${ArticleRow}:hover & {
    transform: translate(2px, -2px);
  }
`;

/* ─────────── SCREEN INVERT (黒オーバーレイ) ─────────── */
const ScreenInvert = styled.div<{ $active: boolean }>`
  position: fixed;
  inset: 0;
  background: #000;
  opacity: ${(p) => (p.$active ? 1 : 0)};
  pointer-events: none;
  z-index: 50;
  transition: opacity 0.5s ease;
`;

/* ─────────── CONTACT FOOT ─────────── */
const ContactFoot = styled.section<{ $dark: boolean }>`
  padding: ${theme.spacing['20']} 0 ${theme.spacing['16']};
  border-top: 1px solid
    ${(p) => (p.$dark ? 'rgba(255,255,255,0.18)' : theme.colors.border.default)};
  margin-top: ${theme.spacing['10']};
  position: relative;
  z-index: 60;
  color: ${(p) =>
    p.$dark ? theme.colors.text.onDark : theme.colors.text.primary};
  transition: color 0.5s ease, border-color 0.5s ease;
`;

const ContactCopy = styled.h2`
  font-family: ${theme.typography.fontJP};
  font-size: clamp(28px, 4vw, 52px);
  font-weight: 500;
  color: inherit;
  letter-spacing: -0.02em;
  line-height: 1.2;
  margin-bottom: ${theme.spacing['10']};
  transition: color 0.5s ease;
`;

const ContactItalic = styled.em`
  font-family: ${theme.typography.fontSerif};
  font-style: italic;
  font-weight: 400;
`;

const ContactLinks = styled.div`
  display: flex;
  gap: ${theme.spacing['3']};
  flex-wrap: wrap;
`;

const contactBtnStyles = `
  font-family: ${theme.typography.fontMono};
  font-size: ${theme.typography.size.xs};
  padding: ${theme.spacing['3']} ${theme.spacing['6']};
  letter-spacing: ${theme.typography.letterSpacing.wide};
  transition: background 0.5s ease, color 0.5s ease, border-color 0.5s ease;
`;

const ContactBtn = styled(Link)<{ $dark: boolean }>`
  ${contactBtnStyles}
  color: ${(p) => (p.$dark ? theme.colors.text.onDark : theme.colors.text.primary)};
  border: 1px solid
    ${(p) => (p.$dark ? theme.colors.text.onDark : theme.colors.text.primary)};

  &:hover {
    background: ${(p) =>
      p.$dark ? theme.colors.text.onDark : theme.colors.text.primary};
    color: ${(p) => (p.$dark ? '#000' : theme.colors.bg.base)};
  }
`;

const ContactBtnAnchor = styled.a<{ $dark: boolean }>`
  ${contactBtnStyles}
  color: ${(p) => (p.$dark ? theme.colors.text.onDark : theme.colors.text.primary)};
  border: 1px solid
    ${(p) => (p.$dark ? theme.colors.text.onDark : theme.colors.text.primary)};

  &:hover {
    background: ${(p) =>
      p.$dark ? theme.colors.text.onDark : theme.colors.text.primary};
    color: ${(p) => (p.$dark ? '#000' : theme.colors.bg.base)};
  }
`;
