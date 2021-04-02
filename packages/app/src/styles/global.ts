import { createGlobalStyle } from 'styled-components'
 
const GlobalStyle = createGlobalStyle`
  body {
    min-height: 100%;
    margin: 0;
    font-family: 'Poppins', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-size: 16px;
    background: #fff;
  }
`;
 
export default GlobalStyle