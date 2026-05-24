import type { ReactNode } from 'react';
import styled from 'styled-components';
import { Nav } from './Nav';
import { Footer } from './Footer';
import { theme } from '../../styles/theme';

interface PageLayoutProps {
  children: ReactNode;
  hideNav?: boolean;
}

export function PageLayout({ children, hideNav = false }: PageLayoutProps) {
  return (
    <Wrapper>
      {!hideNav && <Nav />}
      <Main>
        <Inner>{children}</Inner>
      </Main>
      <Footer />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Main = styled.main`
  flex: 1;
`;

const Inner = styled.div`
  max-width: ${theme.layout.maxWidth};
  margin: 0 auto;
  padding: ${theme.spacing['12']} ${theme.spacing['10']};

  @media (max-width: ${theme.breakpoints.md}) {
    padding: ${theme.spacing['12']} ${theme.spacing['6']};
  }

  @media print {
    padding: 0;
    max-width: none;
  }
`;
