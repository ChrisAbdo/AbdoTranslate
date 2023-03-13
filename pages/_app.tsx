import "../styles/globals.css";
import type { AppProps } from "next/app";

import Navbar from "../components/navbar";
import { Toaster } from "../components/ui/toaster";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Navbar />
      <Component {...pageProps} />
      <Toaster />
    </>
  );
}

export default MyApp;
