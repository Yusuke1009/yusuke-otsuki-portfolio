import { createGlobalStyle } from 'styled-components';
import { theme } from './theme';

export const GlobalStyles = createGlobalStyle`
  *, *::before, *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    font-size: 16px;
    scroll-behavior: auto;
  }

  html.lenis, html.lenis body {
    height: auto;
  }

  .lenis.lenis-smooth {
    scroll-behavior: auto !important;
  }

  .lenis.lenis-smooth [data-lenis-prevent] {
    overscroll-behavior: contain;
  }

  body {
    font-family: ${theme.typography.fontSans};
    font-size: ${theme.typography.size.base};
    line-height: ${theme.typography.lineHeight.normal};
    color: ${theme.colors.text.primary};
    background-color: ${theme.colors.bg.base};
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
  }

  h1, h2, h3, h4 {
    font-family: ${theme.typography.fontDisplay};
    font-weight: 500;
    line-height: ${theme.typography.lineHeight.tight};
    letter-spacing: ${theme.typography.letterSpacing.tight};
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  button {
    cursor: pointer;
    border: none;
    background: none;
    font-family: inherit;
  }

  img {
    display: block;
    max-width: 100%;
  }

  ::selection {
    background: ${theme.colors.accent.moon};
    color: ${theme.colors.text.primary};
  }

  :focus-visible {
    outline: 2px solid ${theme.colors.accent.moon};
    outline-offset: 2px;
    border-radius: ${theme.radius.sm};
  }

  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }

  @media print {
    body {
      background: ${theme.colors.bg.elevated};
      font-size: 11pt;
    }

    nav, footer, .no-print {
      display: none !important;
    }

    a {
      color: inherit;
    }

    @page {
      margin: 15mm 20mm;
      size: A4 portrait;
    }
  }
`;
