import styled from 'styled-components';
import { resume, contact } from '../data/resume';
import { theme } from '../styles/theme';
import { useLang } from '../i18n/LangContext';
import { ui } from '../i18n/ui';

export function ResumePage() {
  const { lang } = useLang();
  const t = ui[lang];
  const { jobs, skills, education, publications } = resume[lang];
  return (
    <Page>
      <Top>
        <BlackTag>{t.resume.docTitle}</BlackTag>
        <TopMeta>
          <div>{t.resume.asOf}</div>
          <NameLine>{t.resume.name}</NameLine>
        </TopMeta>
      </Top>

      <Section>
        <SectionHead>
          <Marker>■</Marker>
          <SectionTitle>{t.resume.secSummary}</SectionTitle>
        </SectionHead>
        <Summary>
          {t.resume.summaryP1}
          <br />
          <br />
          {t.resume.summaryP2}
        </Summary>
      </Section>

      <Section>
        <SectionHead>
          <Marker>◇</Marker>
          <SectionTitle>{t.resume.secStrengths}</SectionTitle>
        </SectionHead>
        <Strengths>
          <Strength>
            <StrengthIcon>↔</StrengthIcon>
            <StrengthLabel>{t.resume.str1Label}</StrengthLabel>
            <StrengthBody>{t.resume.str1Body}</StrengthBody>
          </Strength>
          <Strength>
            <StrengthIcon>✦</StrengthIcon>
            <StrengthLabel>{t.resume.str2Label}</StrengthLabel>
            <StrengthBody>{t.resume.str2Body}</StrengthBody>
          </Strength>
          <Strength>
            <StrengthIcon>↗</StrengthIcon>
            <StrengthLabel>{t.resume.str3Label}</StrengthLabel>
            <StrengthBody>{t.resume.str3Body}</StrengthBody>
          </Strength>
        </Strengths>
      </Section>

      <Section>
        <SectionHead>
          <Marker>◉</Marker>
          <SectionTitle>{t.resume.secVision}</SectionTitle>
        </SectionHead>
        <QuoteBlock>
          <QuoteOpen>(</QuoteOpen>
          <QuoteBody>
            <QuoteLead>{t.resume.visionLead}</QuoteLead>
            <QuoteText>{t.resume.visionText}</QuoteText>
          </QuoteBody>
          <QuoteClose>)</QuoteClose>
        </QuoteBlock>
      </Section>

      <Section>
        <SectionHead>
          <Marker>✎</Marker>
          <SectionTitle>{t.resume.secCareerOverview}</SectionTitle>
        </SectionHead>
        <OverviewTable>
          {jobs.map((j) => (
            <OverviewRow key={j.id}>
              <Period>{j.period}</Period>
              <Dash />
              <Company>{j.company}</Company>
              <Role>{j.role}</Role>
            </OverviewRow>
          ))}
        </OverviewTable>
      </Section>

      <Section>
        <SectionHead>
          <Marker>✪</Marker>
          <SectionTitle>{t.resume.secCareerDetail}</SectionTitle>
        </SectionHead>

        {jobs.map((job) => (
          <JobCard key={job.id}>
            <JobMain>
              <JobBar />
              <JobBody>
                <JobCompany>{job.company}</JobCompany>
                <JobRole>{job.role}</JobRole>
                <JobPeriod>{t.resume.periodLabel}{job.period}</JobPeriod>
                <JobDescription>{job.description}</JobDescription>
                {job.achievements.length > 0 && (
                  <BulletList>
                    {job.achievements.map((a, i) => (
                      <Bullet key={i}>
                        <BulletMark>—</BulletMark>
                        <span>{a}</span>
                      </Bullet>
                    ))}
                  </BulletList>
                )}
              </JobBody>
            </JobMain>
          </JobCard>
        ))}
      </Section>

      <SideGrid>
        <Section>
          <SectionHead>
            <Marker>◧</Marker>
            <SectionTitle>{t.resume.secSkills}</SectionTitle>
          </SectionHead>
          {skills.map((g) => (
            <SkillGroup key={g.category}>
              <SkillCategory>{g.category}</SkillCategory>
              <SkillList>{g.items.join('  ·  ')}</SkillList>
            </SkillGroup>
          ))}
        </Section>

        <Section>
          <SectionHead>
            <Marker>◍</Marker>
            <SectionTitle>{t.resume.secEdu}</SectionTitle>
          </SectionHead>
          {education.map((e) => (
            <SkillGroup key={e.school}>
              <SkillCategory>{e.school}</SkillCategory>
              <SkillList>
                {e.faculty} / {e.period}
              </SkillList>
            </SkillGroup>
          ))}
          <SkillGroup>
            <SkillCategory>{t.resume.langLabel}</SkillCategory>
            <SkillList>{t.resume.langValue}</SkillList>
          </SkillGroup>
          <SkillGroup>
            <SkillCategory>{t.resume.contactLabel}</SkillCategory>
            <SkillList>
              {contact.email}
              <br />
              {t.contact.location}
            </SkillList>
          </SkillGroup>
        </Section>
      </SideGrid>

      {publications.length > 0 && (
        <Section>
          <SectionHead>
            <Marker>✦</Marker>
            <SectionTitle>{t.resume.secPub}</SectionTitle>
          </SectionHead>
          <PubList>
            {publications.map((p) => (
              <Pub key={p.title}>
                <PubDate>{p.date}</PubDate>
                <PubTitle>
                  <a href={p.url} target="_blank" rel="noopener noreferrer">
                    {p.title} ↗
                  </a>
                </PubTitle>
                <PubMedium>{p.medium}</PubMedium>
              </Pub>
            ))}
          </PubList>
        </Section>
      )}

      <PrintNote className="no-print">{t.resume.printNote}</PrintNote>
    </Page>
  );
}

const Page = styled.div`
  max-width: 920px;
  margin: 0 auto;
  padding: ${theme.spacing['8']} 0 ${theme.spacing['16']};

  @media print {
    max-width: none;
    margin: 0;
    padding: 0;
    font-size: 8.5pt;
    line-height: 1.4;
    color: ${theme.colors.text.primary};
  }
`;

const Top = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: ${theme.spacing['16']};

  @media print {
    margin-bottom: ${theme.spacing['4']};
  }
`;

const BlackTag = styled.div`
  background: ${theme.colors.text.primary};
  color: ${theme.colors.bg.base};
  font-family: ${theme.typography.fontSans};
  font-size: ${theme.typography.size.sm};
  font-weight: ${theme.typography.weight.bold};
  letter-spacing: ${theme.typography.letterSpacing.widest};
  padding: ${theme.spacing['3']} ${theme.spacing['8']};
`;

const TopMeta = styled.div`
  text-align: right;
  font-family: ${theme.typography.fontMono};
  font-size: ${theme.typography.size.xs};
  color: ${theme.colors.text.muted};
  letter-spacing: ${theme.typography.letterSpacing.wide};
`;

const NameLine = styled.div`
  font-family: ${theme.typography.fontSerif};
  font-size: ${theme.typography.size.lg};
  font-weight: ${theme.typography.weight.bold};
  color: ${theme.colors.text.primary};
  margin-top: ${theme.spacing['2']};
  letter-spacing: ${theme.typography.letterSpacing.wide};
`;

const Section = styled.section`
  margin-bottom: ${theme.spacing['16']};

  @media print {
    margin-bottom: ${theme.spacing['4']};
    break-inside: auto;
    page-break-inside: auto;
  }
`;

const SectionHead = styled.div`
  display: flex;
  align-items: baseline;
  gap: ${theme.spacing['3']};
  margin-bottom: ${theme.spacing['8']};

  @media print {
    margin-bottom: ${theme.spacing['3']};
  }
`;

const Marker = styled.span`
  color: ${theme.colors.text.primary};
  font-size: ${theme.typography.size.md};
  line-height: 1;
`;

const SectionTitle = styled.h2`
  font-family: ${theme.typography.fontSans};
  font-size: ${theme.typography.size.md};
  font-weight: ${theme.typography.weight.bold};
  color: ${theme.colors.text.primary};
  letter-spacing: ${theme.typography.letterSpacing.widest};
`;

const Summary = styled.p`
  font-family: ${theme.typography.fontSans};
  font-size: ${theme.typography.size.sm};
  color: ${theme.colors.text.primary};
  line-height: ${theme.typography.lineHeight.loose};
  max-width: 760px;
`;

const Strengths = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${theme.spacing['8']};

  @media (max-width: ${theme.breakpoints.md}) {
    grid-template-columns: 1fr;
  }

  @media print {
    grid-template-columns: repeat(3, 1fr) !important;
    gap: ${theme.spacing['4']};
  }
`;

const Strength = styled.div`
  text-align: left;
`;

const StrengthIcon = styled.div`
  font-family: ${theme.typography.fontMono};
  font-size: ${theme.typography.size.xl};
  color: ${theme.colors.text.primary};
  background: ${theme.colors.bg.subtle};
  width: 56px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${theme.radius.full};
  margin-bottom: ${theme.spacing['4']};
`;

const StrengthLabel = styled.div`
  font-family: ${theme.typography.fontSans};
  font-size: ${theme.typography.size.md};
  font-weight: ${theme.typography.weight.bold};
  color: ${theme.colors.text.primary};
  letter-spacing: ${theme.typography.letterSpacing.wide};
  margin-bottom: ${theme.spacing['3']};
`;

const StrengthBody = styled.p`
  font-family: ${theme.typography.fontSans};
  font-size: ${theme.typography.size.xs};
  color: ${theme.colors.text.secondary};
  line-height: ${theme.typography.lineHeight.loose};
`;

const QuoteBlock = styled.div`
  display: grid;
  grid-template-columns: 60px 1fr 60px;
  align-items: center;
  background: ${theme.colors.bg.subtle};
  padding: ${theme.spacing['10']} ${theme.spacing['8']};

  @media (max-width: ${theme.breakpoints.sm}) {
    grid-template-columns: 30px 1fr 30px;
    padding: ${theme.spacing['6']} ${theme.spacing['4']};
  }
`;

const QuoteOpen = styled.div`
  font-family: ${theme.typography.fontSerif};
  font-size: 88px;
  line-height: 1;
  color: ${theme.colors.text.muted};
  text-align: center;
`;

const QuoteClose = styled(QuoteOpen)``;

const QuoteBody = styled.div`
  text-align: center;
`;

const QuoteLead = styled.div`
  font-family: ${theme.typography.fontSerif};
  font-size: ${theme.typography.size.lg};
  font-weight: ${theme.typography.weight.bold};
  color: ${theme.colors.text.primary};
  letter-spacing: ${theme.typography.letterSpacing.tight};
  margin-bottom: ${theme.spacing['4']};
`;

const QuoteText = styled.p`
  font-family: ${theme.typography.fontSans};
  font-size: ${theme.typography.size.sm};
  color: ${theme.colors.text.secondary};
  line-height: ${theme.typography.lineHeight.loose};
  max-width: 540px;
  margin: 0 auto;
`;

const OverviewTable = styled.div``;

const OverviewRow = styled.div`
  display: grid;
  grid-template-columns: 220px 60px 1fr;
  gap: ${theme.spacing['4']};
  padding: ${theme.spacing['4']} 0;
  border-bottom: 1px solid ${theme.colors.border.default};
  align-items: baseline;

  &:first-child { border-top: 1px solid ${theme.colors.border.default}; }

  @media (max-width: ${theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
    gap: ${theme.spacing['1']};
  }
`;

const Period = styled.div`
  font-family: ${theme.typography.fontMono};
  font-size: ${theme.typography.size.xs};
  color: ${theme.colors.text.secondary};
  letter-spacing: ${theme.typography.letterSpacing.wide};
`;

const Dash = styled.div`
  border-top: 1px solid ${theme.colors.text.muted};
  height: 0;

  @media (max-width: ${theme.breakpoints.sm}) {
    display: none;
  }
`;

const Company = styled.div`
  font-family: ${theme.typography.fontSans};
  font-size: ${theme.typography.size.sm};
  font-weight: ${theme.typography.weight.bold};
  color: ${theme.colors.text.primary};
  grid-row: 1;
  grid-column: 3;

  @media (max-width: ${theme.breakpoints.sm}) {
    grid-row: auto;
    grid-column: auto;
  }
`;

const Role = styled.div`
  font-family: ${theme.typography.fontSans};
  font-size: ${theme.typography.size.xs};
  color: ${theme.colors.text.muted};
  grid-row: 1;
  grid-column: 3;
  text-align: right;

  @media (max-width: ${theme.breakpoints.sm}) {
    grid-row: auto;
    grid-column: auto;
    text-align: left;
  }
`;

const JobCard = styled.div`
  margin-bottom: ${theme.spacing['10']};
  break-inside: avoid;

  @media print {
    margin-bottom: ${theme.spacing['4']};
    break-inside: avoid;
    page-break-inside: avoid;
  }
`;

const JobMain = styled.div`
  display: grid;
  grid-template-columns: 4px 1fr;
  gap: ${theme.spacing['6']};
`;

const JobBar = styled.div`
  background: ${theme.colors.text.primary};
`;

const JobBody = styled.div``;

const JobCompany = styled.div`
  font-family: ${theme.typography.fontSans};
  font-size: ${theme.typography.size.md};
  font-weight: ${theme.typography.weight.bold};
  color: ${theme.colors.text.primary};
  margin-bottom: ${theme.spacing['1']};
`;

const JobRole = styled.div`
  font-family: ${theme.typography.fontSans};
  font-size: ${theme.typography.size.sm};
  color: ${theme.colors.text.secondary};
  margin-bottom: ${theme.spacing['2']};
`;

const JobPeriod = styled.div`
  font-family: ${theme.typography.fontMono};
  font-size: ${theme.typography.size.xs};
  color: ${theme.colors.text.muted};
  letter-spacing: ${theme.typography.letterSpacing.wide};
  margin-bottom: ${theme.spacing['4']};
`;

const JobDescription = styled.p`
  font-family: ${theme.typography.fontSans};
  font-size: ${theme.typography.size.sm};
  color: ${theme.colors.text.primary};
  line-height: ${theme.typography.lineHeight.loose};
  margin-bottom: ${theme.spacing['4']};

  @media print {
    margin-bottom: ${theme.spacing['2']};
    line-height: 1.5;
  }
`;

const BulletList = styled.ul`
  list-style: none;
`;

const Bullet = styled.li`
  display: grid;
  grid-template-columns: 24px 1fr;
  font-family: ${theme.typography.fontSans};
  font-size: ${theme.typography.size.sm};
  color: ${theme.colors.text.secondary};
  line-height: ${theme.typography.lineHeight.loose};

  @media print {
    line-height: 1.4;
  }
`;

const BulletMark = styled.span`
  font-family: ${theme.typography.fontMono};
  color: ${theme.colors.text.muted};
`;

const SideGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${theme.spacing['10']};

  @media (max-width: ${theme.breakpoints.md}) {
    grid-template-columns: 1fr;
  }

  @media print {
    grid-template-columns: 1fr 1fr !important;
    gap: ${theme.spacing['6']};
  }
`;

const SkillGroup = styled.div`
  margin-bottom: ${theme.spacing['5']};
`;

const SkillCategory = styled.div`
  font-family: ${theme.typography.fontMono};
  font-size: ${theme.typography.size.xs};
  color: ${theme.colors.text.muted};
  letter-spacing: ${theme.typography.letterSpacing.wide};
  text-transform: uppercase;
  margin-bottom: ${theme.spacing['2']};
`;

const SkillList = styled.div`
  font-family: ${theme.typography.fontSans};
  font-size: ${theme.typography.size.sm};
  color: ${theme.colors.text.primary};
  line-height: ${theme.typography.lineHeight.loose};
`;

const PubList = styled.div``;

const Pub = styled.div`
  display: grid;
  grid-template-columns: 120px 1fr 220px;
  gap: ${theme.spacing['4']};
  padding: ${theme.spacing['4']} 0;
  border-bottom: 1px solid ${theme.colors.border.default};
  align-items: baseline;

  &:first-child { border-top: 1px solid ${theme.colors.border.default}; }

  @media (max-width: ${theme.breakpoints.md}) {
    grid-template-columns: 1fr;
    gap: ${theme.spacing['1']};
  }
`;

const PubDate = styled.div`
  font-family: ${theme.typography.fontMono};
  font-size: ${theme.typography.size.xs};
  color: ${theme.colors.text.muted};
  letter-spacing: ${theme.typography.letterSpacing.wide};
`;

const PubTitle = styled.div`
  font-family: ${theme.typography.fontSerif};
  font-size: ${theme.typography.size.md};
  color: ${theme.colors.text.primary};

  a {
    transition: opacity ${theme.motion.fast} ${theme.motion.ease};
    &:hover { opacity: 0.6; }
  }
`;

const PubMedium = styled.div`
  font-family: ${theme.typography.fontSans};
  font-size: ${theme.typography.size.xs};
  color: ${theme.colors.text.muted};
  text-align: right;

  @media (max-width: ${theme.breakpoints.md}) {
    text-align: left;
  }
`;

const PrintNote = styled.div`
  text-align: center;
  padding-top: ${theme.spacing['10']};
  margin-top: ${theme.spacing['10']};
  border-top: 1px solid ${theme.colors.border.default};
  font-family: ${theme.typography.fontMono};
  font-size: ${theme.typography.size.xs};
  color: ${theme.colors.text.muted};
  letter-spacing: ${theme.typography.letterSpacing.wide};
`;
