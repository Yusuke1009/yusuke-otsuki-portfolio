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
            プロダクト、グラフィック、フロントエンド、PdM——
            手段を問わず動いて、不確実を真っ先に行動で切り拓く。
          </Lead>
          <Bio>
            千葉大学大学院デザイン科学修了。JVC ケンウッド・デザインでインダストリアルデザイン、UX/UI・インタラクション・ビジョン構想に従事したのち、株式会社ピックノートでスタートアップのゼロから開発に携わる。2020 年エムスリー入社。電子カルテ DigiKar、診療 DX デジスマ、海外医療メディアの立ち上げ等、新規プロダクトをリード。デザイナー採用 9 名——プロダクトと組織を同時に貢献しながら、事業成長をリード。
          </Bio>
        </IntroBody>
      </Intro>

      <Body>
        <Section>
          <SectionTitle>主な領域</SectionTitle>
          <Text>デザイン全般 / 0→1 / マネジメント</Text>
        </Section>

        <Section>
          <SectionTitle>仕事のスタイル</SectionTitle>
          <Text>率先してまずやってみる、ユーザー理解 · AI 推進</Text>
        </Section>

        <Section>
          <SectionTitle>趣味</SectionTitle>
          <Text>3D プリンター、植物栽培</Text>
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

