import React from "react";
import type { AppProps } from "next/app";
import Head from "next/head";
import wrapper from "../store/configureStore";
import { GlobalStyle } from "../styles/GlobalStyle";
import { ConfigProvider } from "antd";

const jackdong = ({ Component, pageProps }: AppProps) => {
  return (
    <ConfigProvider>
      <GlobalStyle />
      <Component {...pageProps} />
    </ConfigProvider>
  );
};

export default wrapper.withRedux(jackdong);
