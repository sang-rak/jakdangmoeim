import React, { ReactNode } from "react";
import { Input, Row, Col } from "antd";
import styled from "styled-components";
import { useSelector } from "react-redux";

type AppLayoutProps = {
  children: ReactNode;
};

const AppLayout = ({ children }: AppLayoutProps) => {
  const me = useSelector((state: any) => state.user.me);

  return (
    <div>
      <Row gutter={8}>
        <Col xs={24} md={6}>
          {/* {me ? <UserProfile /> : <LoginForm />} */}
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
