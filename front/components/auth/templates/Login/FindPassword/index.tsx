import React, { memo, useCallback, useEffect, useState } from "react";
import AppLayout from "../../../../common/organisms/AppLatout";
import { LinkWrapper, FlexWrapper, FormWrapper } from "./styles";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { Flex, Form, Input } from "antd";
import Title from "../../../../common/atoms/Title";
import { ButtonWrapper } from "../styles";
import useInput from "../../../../../hooks/useInput";

const FindPassword = () => {
  const [phone, onChangePhone] = useInput("");

  const onSubmit = useCallback(() => {
    console.log("test");
  }, [phone]);

  return (
    <AppLayout>
      <LinkWrapper href="/auth/login">
        <ArrowLeftOutlined />
      </LinkWrapper>
      <FlexWrapper gap={100} justify="center" vertical>
        <Flex align="left" vertical>
          <Title content="비밀번호를" customStyle={{ margin: 0 }} />
          <Title content="잊으셨나요?" customStyle={{ margin: 0 }} />
        </Flex>
        <FormWrapper onFinish={onSubmit} layout="vertical">
          <Form.Item>
            <label htmlFor="user-phone">전화번호를 입력해주세요</label>
          </Form.Item>
          <Form.Item>
            <Input
              name="user-phone"
              type="phone"
              value={phone}
              onChange={onChangePhone}
              required
              placeholder="전화번호"
            />
          </Form.Item>

          <ButtonWrapper type="primary" htmlType="submit" block>
            인증번호 받기
          </ButtonWrapper>
        </FormWrapper>
      </FlexWrapper>
    </AppLayout>
  );
};

export default memo(FindPassword);
