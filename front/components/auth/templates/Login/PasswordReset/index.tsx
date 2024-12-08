import React, { memo, useCallback, useEffect, useState } from "react";
import { Form, Input, Flex } from "antd";
import { useDispatch, useSelector } from "react-redux";

import AppLayout from "../../../../common/organisms/AppLatout";
import {
  ErrorMessage,
  ButtonWrapper,
  FlexWrapper,
  FormWrapper,
  LinkWrapper,
} from "./styles";
import { ArrowLeftOutlined, ExclamationCircleFilled } from "@ant-design/icons";
import Title from "../../../../common/atoms/Title";
import { useRouter } from "next/router";
import useInput from "../../../../../hooks/useInput";
import { ChangePasswordRequest } from "../../../../../hooks/useUser";

const PasswordReset = () => {
  const dispatch = useDispatch();
  const [password, onChangePassword] = useInput("");
  const { changePasswordDone } = useSelector((state: any) => state.user);
  const { phone } = useSelector((state: any) => state.auth.signUpData);
  const [passwordCheck, onChangePasswordCheck] = useInput("");
  const [passwordError, setPasswordError] = useState(false); // 패스워드가 같지않습니다
  const [passwordCountError, setPasswordCountError] = useState(false);
  const router = useRouter();
  const onSubmit = useCallback(() => {
    if (password !== passwordCheck) {
      return setPasswordError(true);
    }
    if (password.length < 11) {
      return setPasswordCountError(true);
    }
    dispatch(
      ChangePasswordRequest({
        phone: phone,
        newPassword: password,
      })
    );
  }, [password, passwordCheck]);

  // 패스워드 성공 시 페이지 변경
  useEffect(() => {
    if (changePasswordDone) {
      router.push("/auth/login/passwordresetcomplete");
    }
  }, [changePasswordDone]);

  return (
    <AppLayout>
      <LinkWrapper href="/auth/login/passwordactionselection">
        <ArrowLeftOutlined />
      </LinkWrapper>
      <FlexWrapper vertical>
        <Flex align="left" vertical>
          <Title
            content="비밀번호를"
            customStyle={{ fontSize: 25, margin: 0 }}
          />
          <Title
            content="다시 설정해주세요"
            customStyle={{ fontSize: 25, margin: 0 }}
          />
        </Flex>
        <FormWrapper onFinish={onSubmit} layout="vertical">
          <Form.Item>
            <label htmlFor="user-password">비밀번호를 입력해주세요</label>
          </Form.Item>
          <Form.Item>
            <Input
              name="user-password"
              type="password"
              value={password}
              required
              onChange={onChangePassword}
              placeholder="새 비밀번호"
            />
          </Form.Item>
          <Form.Item>
            <Input
              name="user-password-check"
              type="password"
              value={passwordCheck}
              placeholder="새 비밀번호 재확인"
              required
              onChange={onChangePasswordCheck}
            />
          </Form.Item>
          <Form.Item>
            {passwordError ? (
              <ErrorMessage>
                <ExclamationCircleFilled />
                &ensp;비밀번호가 일치하지 않습니다.
              </ErrorMessage>
            ) : passwordCountError ? (
              <ErrorMessage>
                <ExclamationCircleFilled />
                &ensp;비밀번호는 11자 이상 입력하여야 합니다.
              </ErrorMessage>
            ) : (
              <></>
            )}
          </Form.Item>
          <ButtonWrapper type="primary" htmlType="submit" block>
            설정하기
          </ButtonWrapper>
        </FormWrapper>
      </FlexWrapper>
    </AppLayout>
  );
};

export default memo(PasswordReset);
