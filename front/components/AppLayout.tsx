import React, { ReactNode } from "react";
import Link from "next/link";
import { Menu } from "antd";

type AppLayoutProps = {
  children: ReactNode;
};

const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <div>
      <Menu mode="horizontal">
        <Menu.Item key="home">
          <Link href="/">작당모임</Link>
        </Menu.Item>
        <Menu.Item key="profile">
          <Link href="/profile">프로필</Link>
        </Menu.Item>
        <Menu.Item key="signup">
          <Link href="/signup">회원가입</Link>
        </Menu.Item>
      </Menu>
      {children}
    </div>
  );
};

export default AppLayout;
