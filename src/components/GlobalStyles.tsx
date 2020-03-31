import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  html,
  body,
  #__next {
    width: 100vw;
    height: 100vh;
    scroll-behavior: smooth;
  }

  body,
  h1, h3, p {
    margin: 0;
  }
  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
      monospace;
  }

  * {
    box-sizing: border-box;
  }

  a {
    outline: none;
    text-decoration: none;
  }
`;
