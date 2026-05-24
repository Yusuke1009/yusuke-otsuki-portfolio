import styled from 'styled-components';
import { Link } from 'react-router-dom';
import type { Project } from '../../data/projects';
import { Tag } from './Tag';
import { theme } from '../../styles/theme';

interface ProjectListItemProps {
  project: Project;
}

export function ProjectListItem({ project }: ProjectListItemProps) {
  return (
    <Item to={`/work/${project.id}`}>
      <Thumbnail>
        <img src={project.thumbnail} alt={project.title} onError={(e) => {
          (e.target as HTMLImageElement).style.display = 'none';
        }} />
      </Thumbnail>
      <Content>
        <Title>{project.title}</Title>
        <Subtitle>{project.subtitle}</Subtitle>
        <Meta>{project.team}</Meta>
        <Tags>
          {project.tags.map((tag) => (
            <Tag key={tag} label={tag} />
          ))}
        </Tags>
      </Content>
      <Year>{project.period} →</Year>
    </Item>
  );
}

const Item = styled(Link)`
  display: flex;
  align-items: center;
  gap: ${theme.spacing['5']};
  padding: ${theme.spacing['5']} 0;
  border-bottom: 1px solid ${theme.colors.border.default};
  transition: opacity 150ms ease;

  &:hover {
    opacity: 0.7;
  }
`;

const Thumbnail = styled.div`
  width: 72px;
  height: 48px;
  border-radius: ${theme.radius.sm};
  background: ${theme.colors.bg.subtle};
  flex-shrink: 0;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const Content = styled.div`
  flex: 1;
`;

const Title = styled.div`
  font-family: ${theme.typography.fontSerif};
  font-size: ${theme.typography.size.md};
  color: ${theme.colors.text.primary};
  margin-bottom: ${theme.spacing['1']};
`;

const Subtitle = styled.div`
  font-family: ${theme.typography.fontSans};
  font-size: ${theme.typography.size.sm};
  color: ${theme.colors.text.muted};
  margin-bottom: ${theme.spacing['1']};
`;

const Meta = styled.div`
  font-family: ${theme.typography.fontSans};
  font-size: ${theme.typography.size.xs};
  color: ${theme.colors.text.placeholder};
  margin-bottom: ${theme.spacing['2']};
`;

const Tags = styled.div`
  display: flex;
  gap: ${theme.spacing['1']};
  flex-wrap: wrap;
`;

const Year = styled.div`
  font-family: ${theme.typography.fontSans};
  font-size: ${theme.typography.size.xs};
  color: ${theme.colors.text.placeholder};
  white-space: nowrap;
`;
