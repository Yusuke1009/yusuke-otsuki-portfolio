import styled from 'styled-components';
import { writing } from '../data/writing';
import { Tag } from '../components/shared/Tag';
import { theme } from '../styles/theme';
import { useLang } from '../i18n/LangContext';
import { ui } from '../i18n/ui';

export function WritingPage() {
  const { lang } = useLang();
  const t = ui[lang];
  const { articles, talks } = writing[lang];
  return (
    <div>
      <PageHeader>
        <Label>Writing & Speaking</Label>
        <Heading>{t.writing.heading}</Heading>
        <SubHeading>{t.writing.sub}</SubHeading>
      </PageHeader>

      <SectionBlock>
        <SectionLabel>{t.writing.secArticles}</SectionLabel>
        <Divider />
        <List>
          {articles.map((article) => (
            <ArticleItem key={article.id} href={article.url} target="_blank" rel="noopener noreferrer">
              <ArticleContent>
                <ArticleTitle>{article.title}</ArticleTitle>
                <ArticleMeta>{article.medium} · {article.date}</ArticleMeta>
                <ArticleDesc>{article.description}</ArticleDesc>
                <Tags>
                  {article.tags.map((tag) => (
                    <Tag key={tag} label={tag} />
                  ))}
                </Tags>
              </ArticleContent>
              <Arrow>↗</Arrow>
            </ArticleItem>
          ))}
        </List>
      </SectionBlock>

      <SectionBlock>
        <SectionLabel>{t.writing.secTalks}</SectionLabel>
        <Divider />
        <List>
          {talks.map((talk) => (
            <ArticleItem key={talk.id} href={talk.url} target="_blank" rel="noopener noreferrer">
              <ArticleContent>
                <ArticleTitle>{talk.title}</ArticleTitle>
                <ArticleMeta>{talk.event} · {talk.date}</ArticleMeta>
                <ArticleDesc>{talk.description}</ArticleDesc>
                <Tags>
                  {talk.tags.map((tag) => (
                    <Tag key={tag} label={tag} />
                  ))}
                </Tags>
              </ArticleContent>
              <Arrow>↗</Arrow>
            </ArticleItem>
          ))}
        </List>
      </SectionBlock>
    </div>
  );
}

const PageHeader = styled.div`
  margin-bottom: ${theme.spacing['8']};
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
  margin-bottom: ${theme.spacing['3']};
`;

const SubHeading = styled.p`
  font-family: ${theme.typography.fontSans};
  font-size: ${theme.typography.size.base};
  color: ${theme.colors.text.secondary};
`;

const SectionBlock = styled.div`
  margin-bottom: ${theme.spacing['10']};
`;

const SectionLabel = styled.div`
  font-family: ${theme.typography.fontSans};
  font-size: ${theme.typography.size.xs};
  font-weight: ${theme.typography.weight.bold};
  color: ${theme.colors.text.muted};
  letter-spacing: ${theme.typography.letterSpacing.widest};
  text-transform: uppercase;
  margin-bottom: ${theme.spacing['4']};
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid ${theme.colors.border.default};
  margin-bottom: ${theme.spacing['2']};
`;

const List = styled.div``;

const ArticleItem = styled.a`
  display: flex;
  align-items: flex-start;
  gap: ${theme.spacing['4']};
  padding: ${theme.spacing['6']} 0;
  border-bottom: 1px solid ${theme.colors.border.default};
  transition: opacity 150ms ease;
  &:hover { opacity: 0.7; }
`;

const ArticleContent = styled.div`
  flex: 1;
`;

const ArticleTitle = styled.div`
  font-family: ${theme.typography.fontSerif};
  font-size: ${theme.typography.size.md};
  color: ${theme.colors.text.primary};
  margin-bottom: ${theme.spacing['1']};
`;

const ArticleMeta = styled.div`
  font-family: ${theme.typography.fontSans};
  font-size: ${theme.typography.size.xs};
  color: ${theme.colors.text.muted};
  letter-spacing: ${theme.typography.letterSpacing.wide};
  margin-bottom: ${theme.spacing['2']};
`;

const ArticleDesc = styled.div`
  font-family: ${theme.typography.fontSans};
  font-size: ${theme.typography.size.sm};
  color: ${theme.colors.text.secondary};
  line-height: ${theme.typography.lineHeight.normal};
  margin-bottom: ${theme.spacing['3']};
`;

const Tags = styled.div`
  display: flex;
  gap: ${theme.spacing['1']};
  flex-wrap: wrap;
`;

const Arrow = styled.div`
  font-size: ${theme.typography.size.md};
  color: ${theme.colors.text.muted};
  flex-shrink: 0;
  padding-top: 2px;
`;
