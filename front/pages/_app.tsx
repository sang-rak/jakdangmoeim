import React from "react";
import type { AppProps } from "next/app";
import Head from "next/head";

import wrapper from "../store/configureStore";

const jackdong = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      {/* 공통 레이아웃 */}
      <Head>
        <meta charSet="utf-8" />
        <title>작당모임</title>
      </Head>

      {/* 페이지 컴포넌트 */}
      <Component {...pageProps} />

      {/* 푸터 */}
      <footer>{/* 푸터 내용 */}</footer>
    </>
  );
};

export default wrapper.withRedux(jackdong);
