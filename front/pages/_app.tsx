import React, { useEffect } from "react";
import type { AppProps } from "next/app";
import Head from "next/head";

import wrapper from "../store/configureStore";
import { useRouter } from "next/router";

const jackdong = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();

  useEffect(() => {
    router.push("/login"); // / 페이지로 오면 /login 페이지로 리다이렉션
  }, []);
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
