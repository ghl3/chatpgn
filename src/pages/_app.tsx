import "semantic-ui-css/semantic.min.css";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import React from "react";
import { Analytics } from "@vercel/analytics/react";
export default function App({ Component, pageProps }: AppProps) {
  return (
    <React.StrictMode>
      <Component {...pageProps} />
      <Analytics />
    </React.StrictMode>
  );
}
