import { useState } from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import { theme } from '../../styles/theme';
import { useLang } from '../../i18n/LangContext';
import { ui } from '../../i18n/ui';

export function Nav() {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const { lang, toggle } = useLang();
  const t = ui[lang];

  const NavLinks = [
    { label: t.nav.work, path: '/work' },
    { label: t.nav.resume, path: '/resume' },
  ];

  return (
    <>
      <NavBar className="no-print">
        <Inner>
          <Logo to="/" onClick={() => setOpen(false)}>
            {'{ YUSUKE_OTSUKI Portfolio }'}
          </Logo>
          <Links>
            {NavLinks.map(({ label, path }) => {
              const isWork = path === '/work';
              const active = isWork
                ? pathname.startsWith('/work')
                : pathname === path;
              return (
                <NavLink key={path} to={path} $active={active}>
                  {label}
                </NavLink>
              );
            })}
            <LangToggle type="button" onClick={toggle}>
              {t.nav.toLang}
            </LangToggle>
          </Links>
          <Hamburger
            type="button"
            $open={open}
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? t.nav.menuClose : t.nav.menuOpen}
          >
            <span />
            <span />
          </Hamburger>
        </Inner>
      </NavBar>

      <Drawer $open={open}>
        <DrawerInner>
          {NavLinks.map(({ label, path }) => (
            <DrawerLink
              key={path}
              to={path}
              onClick={() => setOpen(false)}
            >
              {label}
            </DrawerLink>
          ))}
          <DrawerLangToggle type="button" onClick={toggle}>
            {t.nav.toLang}
          </DrawerLangToggle>
        </DrawerInner>
      </Drawer>
    </>
  );
}

const NavBar = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background: transparent;
  height: ${theme.layout.navHeight};
  pointer-events: none;

  a, button {
    pointer-events: auto;
  }
`;

const Inner = styled.div`
  max-width: ${theme.layout.maxWidth};
  margin: 0 auto;
  padding: 0 ${theme.spacing['10']};
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${theme.spacing['4']};

  @media (max-width: ${theme.breakpoints.md}) {
    padding: 0 ${theme.spacing['6']};
  }
`;

const Logo = styled(Link)`
  font-family: ${theme.typography.fontMono};
  font-size: ${theme.typography.size.xs};
  font-weight: 400;
  color: ${theme.colors.text.primary};
  letter-spacing: ${theme.typography.letterSpacing.wide};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  min-width: 0;

  @media (max-width: 380px) {
    font-size: 10px;
  }
`;

const Links = styled.nav`
  display: flex;
  gap: ${theme.spacing['6']};

  @media (max-width: ${theme.breakpoints.sm}) {
    display: none;
  }
`;

const NavLink = styled(Link)<{ $active: boolean }>`
  font-family: ${theme.typography.fontMono};
  font-size: ${theme.typography.size.xs};
  letter-spacing: ${theme.typography.letterSpacing.wide};
  color: ${({ $active }) =>
    $active ? theme.colors.text.primary : theme.colors.text.muted};
  border-bottom: ${({ $active }) =>
    $active ? `1px solid ${theme.colors.text.primary}` : '1px solid transparent'};
  padding-bottom: 2px;
  transition: color 150ms ease;

  &:hover {
    color: ${theme.colors.text.primary};
  }

  &::before { content: '{ '; }
  &::after { content: ' }'; }
`;

const LangToggle = styled.button`
  font-family: ${theme.typography.fontMono};
  font-size: ${theme.typography.size.xs};
  letter-spacing: ${theme.typography.letterSpacing.wide};
  color: ${theme.colors.text.muted};
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  transition: color 150ms ease;

  &:hover {
    color: ${theme.colors.text.primary};
  }
`;

/* ───────── Hamburger (2本線) ───────── */
const Hamburger = styled.button<{ $open: boolean }>`
  display: none;
  background: none;
  border: none;
  padding: 10px 8px;
  cursor: pointer;
  flex-direction: column;
  align-items: stretch;
  gap: 7px;
  width: 44px;
  z-index: 101;
  position: relative;

  span {
    display: block;
    width: 28px;
    height: 1px;
    background: ${theme.colors.text.primary};
    transition: transform 250ms ease, opacity 250ms ease;
    transform-origin: center;
  }

  ${(p) =>
    p.$open &&
    `
    span:nth-child(1) {
      transform: translateY(4px) rotate(45deg);
    }
    span:nth-child(2) {
      transform: translateY(-4px) rotate(-45deg);
    }
  `}

  @media (max-width: ${theme.breakpoints.sm}) {
    display: flex;
  }
`;

/* ───────── Drawer (full-screen menu) ───────── */
const Drawer = styled.div<{ $open: boolean }>`
  position: fixed;
  inset: 0;
  background: rgba(250, 250, 248, 0.97);
  backdrop-filter: blur(24px) saturate(1.1);
  -webkit-backdrop-filter: blur(24px) saturate(1.1);
  z-index: 99;
  display: none;
  align-items: center;
  justify-content: center;
  opacity: ${(p) => (p.$open ? 1 : 0)};
  visibility: ${(p) => (p.$open ? 'visible' : 'hidden')};
  pointer-events: ${(p) => (p.$open ? 'auto' : 'none')};
  transition: opacity 250ms ease, visibility 250ms ease;

  @media (max-width: ${theme.breakpoints.sm}) {
    display: flex;
  }
`;

const DrawerInner = styled.nav`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing['8']};
  align-items: flex-start;
  padding: 0 ${theme.spacing['8']};
`;

const DrawerLink = styled(Link)`
  font-family: ${theme.typography.fontJP};
  font-size: ${theme.typography.size['3xl']};
  font-weight: 500;
  color: ${theme.colors.text.primary};
  letter-spacing: -0.02em;
  text-decoration: none;
  transition: opacity 150ms ease;

  &:hover {
    opacity: 0.6;
  }
`;

const DrawerLangToggle = styled.button`
  font-family: ${theme.typography.fontMono};
  font-size: ${theme.typography.size.lg};
  font-weight: 500;
  color: ${theme.colors.text.muted};
  letter-spacing: ${theme.typography.letterSpacing.wide};
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  transition: color 150ms ease;

  &:hover {
    color: ${theme.colors.text.primary};
  }
`;
