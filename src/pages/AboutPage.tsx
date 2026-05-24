import styled from 'styled-components';
import { theme } from '../styles/theme';

const PORTRAIT = '/assets/images/portrait_otsuki.png';

export function AboutPage() {
  return (
    <div>
      <PageHeader>
        <Label>About</Label>
        <Heading>大月 雄介について</Heading>
      </PageHeader>

      <Intro>
        <Portrait src={PORTRAIT} alt="大月 雄介" />
        <IntroBody>
          <Lead>
            医療とデジタルの交差点で、プロダクトとチームを同時に動かしています。
          </Lead>
          <Bio>
            千葉大学大学院デザイン科学修了。メーカーにてUI/UXデザイン、インタラクション設計、ビジョン構想など幅広くデザイン業務に関わったのち、2020年10月にエムスリー入社。プロダクトデザイナーとして電子カルテ「デジカル」、診療支援SaaS「デジスマ診療」を担当し、現在は新規プロダクトチームのマネージャーとして入院患者向けプラットフォーム「cloudIC Platform」の立ち上げを担当しています。
          </Bio>
        </IntroBody>
      </Intro>

      <Body>
        <Section>
          <SectionTitle>仕事のスタイル</SectionTitle>
          <Text>
            デザインをビジネスの道具として使う——そのために、ユーザーの声とデータと事業の文脈を繋ぎ合わせることを大切にしています。PdM/POを兼務することで、「作るだけ」ではなく「なぜ作るか」から問い直せるポジションを意識的に選んできました。
          </Text>
        </Section>

        <Section>
          <SectionTitle>大切にしていること</SectionTitle>
          <Text>
            広義から狭義までの幅広いデザイン力、領域を横断するコミュニケーション力、そして主体的な行動力——この3つを軸に、ユーザー視点とビジネス視点を持ち合わせ、主体的な課題発見・解決を実践していきたいと考えています。
          </Text>
        </Section>

        <Section>
          <SectionTitle>医療を選んだ理由</SectionTitle>
          <Text>
            <Placeholder>（執筆中 — ご自身の言葉で）</Placeholder>
          </Text>
        </Section>

        <Section>
          <SectionTitle>チームについて</SectionTitle>
          <Text>
            <Placeholder>（執筆中 — マネジメント観・採用観・チームに対する考え方を）</Placeholder>
          </Text>
        </Section>

        <Section>
          <SectionTitle>余談</SectionTitle>
          <Text>
            子育て絶賛奮闘中。趣味は3Dプリンターでの子どものおもちゃ制作。
          </Text>
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

const Placeholder = styled.span`
  color: ${theme.colors.text.placeholder};
  font-style: italic;
`;
