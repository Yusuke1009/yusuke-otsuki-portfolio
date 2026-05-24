import styled from 'styled-components';
import { jobs, skills, education, publications, contact } from '../data/resume';
import { theme } from '../styles/theme';

export function ResumePage() {
  return (
    <Page>
      <Top>
        <BlackTag>職務経歴書</BlackTag>
        <TopMeta>
          <div>2026年5月 現在</div>
          <NameLine>大月 雄介</NameLine>
        </TopMeta>
      </Top>

      <Section>
        <SectionHead>
          <Marker>■</Marker>
          <SectionTitle>経歴要約</SectionTitle>
        </SectionHead>
        <Summary>
          千葉大学大学院デザイン科学修了後、株式会社JVCケンウッド・デザインに入社。展示用アプリケーションのデザイン・開発、大手カーメーカーへ向けたビジョン構想やTouchdesignerの研究開発などを担当。その後、株式会社ピックノートにてUI/UXデザイナー兼フロントエンドエンジニアとしてゼロからのサービス開発に携わる。
          <br />
          <br />
          2020年10月、エムスリー株式会社に入社。プロダクトデザイナーとしてシェアNo.1クラウド電子カルテ「M3 DigiKar」に参画し、デザイン・PdM・採用を一気通貫で担当。2,000 → 10,000施設の事業成長をリードし、現在は新規プロダクトチームのゼネラルマネージャーとしてAIエージェント開発・Next DigiKar・cloudIC Platform の同時並走を担う。
        </Summary>
      </Section>

      <Section>
        <SectionHead>
          <Marker>◇</Marker>
          <SectionTitle>活かせる経験・能力</SectionTitle>
        </SectionHead>
        <Strengths>
          <Strength>
            <StrengthIcon>↔</StrengthIcon>
            <StrengthLabel>事業成長そのものをリード</StrengthLabel>
            <StrengthBody>
              デザイナーという役割にとらわれず、PdM・採用・組織立ち上げ・AI 実装まで、事業成長に必要なことを手段を問わず実行する。
            </StrengthBody>
          </Strength>
          <Strength>
            <StrengthIcon>✦</StrengthIcon>
            <StrengthLabel>領域を横断する巻き込み</StrengthLabel>
            <StrengthBody>
              デザイン・エンジニアリング・PdM・CS・営業・経営、各領域の現場に入り込み、視点を翻訳して同じテーブルに乗せられる。
            </StrengthBody>
          </Strength>
          <Strength>
            <StrengthIcon>↗</StrengthIcon>
            <StrengthLabel>不確実を切り拓く主体性</StrengthLabel>
            <StrengthBody>
              0 → 1 → 10 → 100、どのフェーズでも未知のなかに最初に踏み出す。実践からの学習に勝るものはないと考えている。
            </StrengthBody>
          </Strength>
        </Strengths>
      </Section>

      <Section>
        <SectionHead>
          <Marker>◉</Marker>
          <SectionTitle>今後のビジョン</SectionTitle>
        </SectionHead>
        <QuoteBlock>
          <QuoteOpen>(</QuoteOpen>
          <QuoteBody>
            <QuoteLead>
              プロダクトデザインの役割を、事業の意思決定の最前線へ。
            </QuoteLead>
            <QuoteText>
              ユーザー視点とビジネス視点を同じ言語で結び、デザイナーが「事業を動かす職能」として活きる現場をつくりたい。AI を使い倒し、組織と個人の生産性を再設計する側で、医療と社会の次の形を描いていきたい。
            </QuoteText>
          </QuoteBody>
          <QuoteClose>)</QuoteClose>
        </QuoteBlock>
      </Section>

      <Section>
        <SectionHead>
          <Marker>✎</Marker>
          <SectionTitle>職務経歴 概要</SectionTitle>
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
          <SectionTitle>職務経歴 詳細</SectionTitle>
        </SectionHead>

        {jobs.map((job) => (
          <JobCard key={job.id}>
            <JobMain>
              <JobBar />
              <JobBody>
                <JobCompany>{job.company}</JobCompany>
                <JobRole>{job.role}</JobRole>
                <JobPeriod>在籍期間：{job.period}</JobPeriod>
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
            <SectionTitle>スキル</SectionTitle>
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
            <SectionTitle>学歴・言語</SectionTitle>
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
            <SkillCategory>言語</SkillCategory>
            <SkillList>日本語（母国語） / 英語（読み書き）</SkillList>
          </SkillGroup>
          <SkillGroup>
            <SkillCategory>連絡先</SkillCategory>
            <SkillList>
              {contact.email}
              <br />
              {contact.location}
            </SkillList>
          </SkillGroup>
        </Section>
      </SideGrid>

      {publications.length > 0 && (
        <Section>
          <SectionHead>
            <Marker>✦</Marker>
            <SectionTitle>発信・執筆・登壇</SectionTitle>
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

      <PrintNote className="no-print">
        Cmd+P（Mac） / Ctrl+P（Windows）で PDF として保存できます。
      </PrintNote>
    </Page>
  );
}

const Page = styled.div`
  max-width: 920px;
  margin: 0 auto;
  padding: ${theme.spacing['8']} 0 ${theme.spacing['16']};

  @media print {
    padding: 0;
  }
`;

const Top = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: ${theme.spacing['16']};
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
`;

const SectionHead = styled.div`
  display: flex;
  align-items: baseline;
  gap: ${theme.spacing['3']};
  margin-bottom: ${theme.spacing['8']};
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
