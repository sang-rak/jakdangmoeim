import React from "react";
import type { AppProps } from "next/app";
import Head from "next/head";
import wrapper from "../store/configureStore";
import { ConfigProvider } from "antd";

const jackdong = ({ Component, pageProps }: AppProps) => {
  return (
    <ConfigProvider>
      <Head>
        <meta charSet="utf-8" />
        <title>작당모임</title>
      </Head>

      <Component {...pageProps} />
    </ConfigProvider>
  );
};

export default wrapper.withRedux(jackdong);
