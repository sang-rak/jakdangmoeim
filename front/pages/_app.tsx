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
      {/* 공통 레이아웃 */}
      <Head>
        <meta charSet="utf-8" />
        <title>작당모임</title>
      </Head>

      {/* 페이지 컴포넌트 */}
      <Component {...pageProps} />
    </ConfigProvider>
  );
};

export default wrapper.withRedux(jackdong);
