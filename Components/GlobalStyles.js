import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  @font-face {
		font-family: YujiSyuku-Regular;
		src: url('/fonts/Yuji_Syuku/YujiSyuku-Regular.ttf') format('opentype');
	}

    html,
    body {
        padding: 0;
        margin: 0;
        font-family:  YujiSyuku-Regular, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    }
    * {
        box-sizing: border-box;
    }
`;

export default GlobalStyles;
