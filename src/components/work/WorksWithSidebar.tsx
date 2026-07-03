import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { getProjects, ROLE_FILTERS, type RoleFilter } from '../../data/projects';
import { theme } from '../../styles/theme';
import { pickPreviewSet, useHoverImagePreview } from '../shared/HoverImagePreview';
import { useLang } from '../../i18n/LangContext';
import { ui } from '../../i18n/ui';

interface WorksWithSidebarProps {
  sectionNumber?: string;
  sectionLabel?: string;
}

type FilterValue = 'ALL' | RoleFilter;

export function WorksWithSidebar({
  sectionNumber = '03',
  sectionLabel = 'Works',
}: WorksWithSidebarProps) {
  const [filter, setFilter] = useState<FilterValue>('ALL');
  const { containerProps, getRowProps, previewLayer } = useHoverImagePreview();
  const { lang } = useLang();
  const t = ui[lang];
  const projects = useMemo(() => getProjects(lang), [lang]);

  const filtered = useMemo(() => {
    if (filter === 'ALL') return projects;
    return projects.filter((p) => p.roles.includes(filter));
  }, [filter, projects]);

  const counts = useMemo(() => {
    const map: Record<string, number> = { ALL: projects.length };
    ROLE_FILTERS.forEach((r) => {
      map[r] = projects.filter((p) => p.roles.includes(r)).length;
    });
    return map;
  }, [projects]);

  return (
    <Section id="work">
      <SectionHead>
        <SectionMeta>
          <SecNum>{sectionNumber}</SecNum>
          <SecLabel>{sectionLabel}</SecLabel>
        </SectionMeta>
        <SecCount>
          {filter === 'ALL'
            ? `${projects.length.toString().padStart(2, '0')} projects`
            : `${filtered.length.toString().padStart(2, '0')} / ${projects.length}`}
        </SecCount>
      </SectionHead>

      <Grid>
        <Sidebar>
          <SideHead>Filter by Role</SideHead>
          <FilterList>
            <FilterRow
              $active={filter === 'ALL'}
              onClick={() => setFilter('ALL')}
              type="button"
            >
              <FilterDot $active={filter === 'ALL'} />
              <FilterLabel>All</FilterLabel>
              <FilterCount>{counts.ALL}</FilterCount>
            </FilterRow>
            {ROLE_FILTERS.map((role) => {
              const active = filter === role;
              const count = counts[role] || 0;
              const disabled = count === 0;
              return (
                <FilterRow
                  key={role}
                  $active={active}
                  onClick={() => !disabled && setFilter(role)}
                  type="button"
                  disabled={disabled}
                >
                  <FilterDot $active={active} />
                  <FilterLabel>{role}</FilterLabel>
                  <FilterCount>{count}</FilterCount>
                </FilterRow>
              );
            })}
          </FilterList>

          <SideFoot>
            {filter !== 'ALL' && (
              <ResetBtn type="button" onClick={() => setFilter('ALL')}>
                × Clear filter
              </ResetBtn>
            )}
          </SideFoot>
        </Sidebar>

        <List {...containerProps}>
          {filtered.length === 0 ? (
            <EmptyMsg>{t.common.emptyProjects}</EmptyMsg>
          ) : (
            filtered.map((p) => (
              <Row
                key={p.id}
                to={`/work/${p.id}`}
                {...getRowProps(p.id)}
              >
                <RowNumber>{p.number}</RowNumber>
                <RowMain>
                  <RowTitle>{p.title}</RowTitle>
                  <RowSubtitle>{p.subtitle}</RowSubtitle>
                  <RowMeta>
                    <RowRoles>
                      {p.roles.map((r) => (
                        <RoleChip key={r}>{r}</RoleChip>
                      ))}
                    </RowRoles>
                  </RowMeta>
                </RowMain>
                <RowSide>
                  <RowArc>{p.arc}</RowArc>
                  <RowPeriod>{p.period}</RowPeriod>
                  <RowArrow>↗</RowArrow>
                </RowSide>
              </Row>
            ))
          )}
          {previewLayer(filtered.map((p) => ({ id: p.id, images: pickPreviewSet(p) })))}
        </List>
      </Grid>
    </Section>
  );
}

const Section = styled.section`
  padding: ${theme.spacing['16']} ${theme.spacing['8']};
  position: relative;
  z-index: 5;
  background: rgba(250, 250, 248, 0.55);
  backdrop-filter: blur(18px) saturate(1.1);
  -webkit-backdrop-filter: blur(18px) saturate(1.1);

  @media (max-width: ${theme.breakpoints.md}) {
    padding: ${theme.spacing['12']} ${theme.spacing['4']};
  }
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
  font-family: ${theme.typography.fontJP};
  font-size: ${theme.typography.size.lg};
  font-weight: 700;
  color: ${theme.colors.text.primary};
  letter-spacing: ${theme.typography.letterSpacing.tight};
`;

const SecCount = styled.div`
  font-family: ${theme.typography.fontMono};
  font-size: ${theme.typography.size.xs};
  color: ${theme.colors.text.muted};
  letter-spacing: ${theme.typography.letterSpacing.wide};
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 220px 1fr;
  gap: ${theme.spacing['10']};
  align-items: start;

  @media (max-width: ${theme.breakpoints.md}) {
    grid-template-columns: 1fr;
    gap: ${theme.spacing['8']};
  }
`;

const Sidebar = styled.aside`
  position: sticky;
  top: ${theme.spacing['8']};
  align-self: start;

  @media (max-width: ${theme.breakpoints.md}) {
    position: relative;
    top: 0;
  }
`;

const SideHead = styled.div`
  font-family: ${theme.typography.fontMono};
  font-size: ${theme.typography.size.xs};
  color: ${theme.colors.text.muted};
  letter-spacing: ${theme.typography.letterSpacing.widest};
  text-transform: uppercase;
  margin-bottom: ${theme.spacing['3']};
  padding-bottom: ${theme.spacing['3']};
  border-bottom: 1px solid ${theme.colors.border.default};
`;

const FilterList = styled.div`
  display: flex;
  flex-direction: column;
`;

const FilterRow = styled.button<{ $active: boolean }>`
  display: grid;
  grid-template-columns: 14px 1fr auto;
  align-items: center;
  gap: ${theme.spacing['3']};
  padding: ${theme.spacing['3']} 0;
  text-align: left;
  background: none;
  border: none;
  border-bottom: 1px solid ${theme.colors.border.default};
  font-family: ${theme.typography.fontSans};
  font-size: ${theme.typography.size.sm};
  color: ${(p) => (p.$active ? theme.colors.text.primary : theme.colors.text.secondary)};
  cursor: pointer;
  transition: padding-left ${theme.motion.fast} ${theme.motion.ease}, color ${theme.motion.fast} ${theme.motion.ease};

  &:hover:not(:disabled) {
    padding-left: ${theme.spacing['2']};
    color: ${theme.colors.text.primary};
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`;

const FilterDot = styled.span<{ $active: boolean }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${(p) => (p.$active ? theme.colors.accent.moon : 'transparent')};
  border: 1px solid ${(p) => (p.$active ? theme.colors.accent.moon : theme.colors.border.default)};
  transition: all ${theme.motion.fast} ${theme.motion.ease};
`;

const FilterLabel = styled.span`
  font-weight: 500;
`;

const FilterCount = styled.span`
  font-family: ${theme.typography.fontMono};
  font-size: ${theme.typography.size.xs};
  color: ${theme.colors.text.muted};
  letter-spacing: ${theme.typography.letterSpacing.wide};
`;

const SideFoot = styled.div`
  margin-top: ${theme.spacing['4']};
  min-height: 30px;
`;

const ResetBtn = styled.button`
  font-family: ${theme.typography.fontMono};
  font-size: ${theme.typography.size.xs};
  color: ${theme.colors.text.muted};
  background: none;
  border: none;
  letter-spacing: ${theme.typography.letterSpacing.wide};
  cursor: pointer;
  padding: 0;
  &:hover { color: ${theme.colors.text.primary}; }
`;

const List = styled.div`
  position: relative;
`;

const EmptyMsg = styled.div`
  font-family: ${theme.typography.fontSans};
  font-size: ${theme.typography.size.sm};
  color: ${theme.colors.text.muted};
  padding: ${theme.spacing['10']} 0;
  text-align: center;
`;

const Row = styled(Link)`
  display: grid;
  grid-template-columns: 48px 1fr 200px;
  align-items: baseline;
  gap: ${theme.spacing['6']};
  padding: ${theme.spacing['6']} 0;
  border-top: 1px solid ${theme.colors.border.default};
  transition: padding ${theme.motion.fast} ${theme.motion.ease};

  &:last-child {
    border-bottom: 1px solid ${theme.colors.border.default};
  }

  &:hover {
    padding-left: ${theme.spacing['3']};
    padding-right: ${theme.spacing['3']};
  }

  @media (max-width: ${theme.breakpoints.md}) {
    grid-template-columns: 32px 1fr;
    gap: ${theme.spacing['3']};
  }
`;

const RowNumber = styled.div`
  font-family: ${theme.typography.fontMono};
  font-size: ${theme.typography.size.xs};
  color: ${theme.colors.text.muted};
  letter-spacing: ${theme.typography.letterSpacing.wide};
`;

const RowMain = styled.div``;

const RowTitle = styled.div`
  font-family: ${theme.typography.fontJP};
  font-size: ${theme.typography.size.xl};
  font-weight: 700;
  color: ${theme.colors.text.primary};
  letter-spacing: ${theme.typography.letterSpacing.tight};
  margin-bottom: ${theme.spacing['2']};
`;

const RowSubtitle = styled.div`
  font-family: ${theme.typography.fontSans};
  font-size: ${theme.typography.size.sm};
  color: ${theme.colors.text.secondary};
  margin-bottom: ${theme.spacing['3']};
`;

const RowMeta = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing['2']};
`;

const RowRoles = styled.div`
  display: flex;
  gap: ${theme.spacing['1']};
  flex-wrap: wrap;
`;

const RoleChip = styled.span`
  font-family: ${theme.typography.fontMono};
  font-size: ${theme.typography.size.xs};
  color: ${theme.colors.text.muted};
  letter-spacing: ${theme.typography.letterSpacing.wide};
  border: 1px solid ${theme.colors.border.default};
  padding: 2px 8px;
`;

const RowSide = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: ${theme.spacing['1']};
  font-family: ${theme.typography.fontMono};
  font-size: ${theme.typography.size.xs};
  color: ${theme.colors.text.muted};
  letter-spacing: ${theme.typography.letterSpacing.wide};

  @media (max-width: ${theme.breakpoints.md}) {
    display: none;
  }
`;

const RowArc = styled.span`
  color: ${theme.colors.text.primary};
`;

const RowPeriod = styled.span``;

const RowArrow = styled.span`
  font-size: ${theme.typography.size.md};
  transition: transform ${theme.motion.fast} ${theme.motion.ease};

  ${Row}:hover & {
    transform: translate(4px, -4px);
  }
`;
