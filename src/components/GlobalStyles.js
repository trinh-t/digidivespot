import { createGlobalStyle } from "styled-components";
import BigShouldersDisplay from "../assets/fonts/big-shoulders-display/big-shoulders-display-regular.ttf";
import Lato from "../assets/fonts/lato/Lato-Regular.ttf"

const GlobalStyles = createGlobalStyle`
  @font-face {
    font-family: 'Big Shoulders Display';
    src: url(${BigShouldersDisplay}) format("truetype");
    font-weight: 400;
  }
  
  @font-face {
    font-family: 'Lato';
    src: url(${Lato}) format("truetype");
    font-weight: 400;
  }

  body {
    margin: 0;
    font-family: 'Lato',sans-serif;
    
    #root {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      min-height: 100vh;

      p {
        margin: 5px 0;
      }

      button {
        cursor: pointer;
        outline: 0;
      }

      input {
        outline: 0;
        border: none;
      }

      a {
        text-decoration: none;
        color: #000;
      }

      .loading {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100vw;
        height: 100vh;
      }
    }
`;

export default GlobalStyles;
