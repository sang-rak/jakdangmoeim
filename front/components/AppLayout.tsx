import React, { ReactNode } from "react";
import Link from "next/link";
import { Input, Menu, Row, Col } from "antd";
import styled from "styled-components";
import LoginForm from "../components/LoginForm";
import { useSelector } from "react-redux";
import { createGlobalStyle } from "styled-components";
import UserProfile from "./UserProfile";
type AppLayoutProps = {
  children: ReactNode;
};

const Global = createGlobalStyle`
  .ant-row {
    margin-right:0 !important;
    margin-left: 0 !important; 
  }
  .ant-col:first-child {
    padding-left: 0 !important;
  }

  .ant-col:last-child {
    padding-right: 0 !important;
  }
`;

const SearchInput = styled(Input.Search)`
  vertical-align: middle;
`;

const AppLayout = ({ children }: AppLayoutProps) => {
  const me = useSelector((state: any) => state.user.me);

  return (
    <div>
      <Global />
      {/* <Menu mode="horizontal">
        <Menu.Item key="home">
          <Link href="/">작당모임</Link>
        </Menu.Item>
        <Menu.Item key="profile">
          <Link href="/profile">프로필</Link>
        </Menu.Item>
        <Menu.Item key="search">
          <SearchInput enterButton />
        </Menu.Item>
        <Menu.Item key="signup">
          <Link href="/signup">회원가입</Link>
        </Menu.Item>
      </Menu>*/}
      <Row gutter={8}>
        <Col xs={24} md={6}>
          {me ? <UserProfile /> : <LoginForm />}
        </Col>
        <Col xs={24} md={12}>
          {children}
        </Col>
        <Col xs={24} md={6}></Col>
      </Row>
    </div>
  );
};

export default AppLayout;
