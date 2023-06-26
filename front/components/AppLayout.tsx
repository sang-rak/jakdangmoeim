import React, { ReactNode } from "react";
import Link from "next/link";
import { Input, Menu, Row, Col } from "antd";
import styled from "styled-components";
import UserProfile from "../components/UserProfile";
import LoginForm from "../components/LoginForm";
import { useSelector } from "react-redux";
import { RootState } from "../reducers";

type AppLayoutProps = {
  children: ReactNode;
};

const SearchInput = styled(Input.Search)`
  vertical-align: middle;
`;

const AppLayout = ({ children }: AppLayoutProps) => {
  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);

  return (
    <div>
      <Menu mode="horizontal">
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
      </Menu>
      <Row gutter={8}>
        <Col xs={24} md={6}>
          {isLoggedIn ? <UserProfile /> : <LoginForm />}
        </Col>
        <Col xs={24} md={12}>
          {children}
        </Col>
        <Col xs={24} md={6}>
          <Link
            href="https://github.com/sang-rak"
            target="_blank"
            rel="noreferrer noopener"
          >
            Made by Jackdang
          </Link>
        </Col>
      </Row>
    </div>
  );
};

export default AppLayout;
