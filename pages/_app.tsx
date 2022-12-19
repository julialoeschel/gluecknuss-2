import type { AppProps } from "next/app";
import GlobalStyles from "../Components/GlobalStyles";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyles />
      <Component {...pageProps} />;
    </>
  );
}
