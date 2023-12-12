import React, { memo, useCallback, useState } from "react";
import { Form, Input, Checkbox, Button, Flex } from "antd";
import { CheckboxChangeEvent } from "antd/es/checkbox";

import { useDispatch, useSelector } from "react-redux";

import useInput from "../../../../../hooks/useInput";
import { SIGN_UP_REQUEST } from "../../../../../reducers/user";
import AppLayout from "../../../../common/organisms/AppLatout";
import Title from "../../../../common/atoms/Title";
import { ErrorMessage, FlexWrapper, FormWrapper, LinkWrapper } from "./styles";
import { ButtonWrapper } from "./styles";
import { useRouter } from "next/navigation";
import { ExclamationCircleFilled } from "@ant-design/icons";
const PasswordInfoForm = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { signUpLoading } = useSelector((state: any) => state.user);

  const [phone, onChangePhone] = useInput("");
  const [nickname, onChangeNickname] = useInput("");
  const [password, onChangePassword] = useInput("");

  const [passwordCheck, setPasswordCheck] = useState("");
  const [passwordError, setPasswordError] = useState(false);

  const onChangePasswordCheck = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setPasswordCheck(e.target.value);
      setPasswordError(e.target.value !== password);
    },
    [password]
  );
  // 개인정보 동의 체크
  const [term, setTerm] = useState(false);
  const [termError, setTermError] = useState(false);

  const onChangeTerm = useCallback((e: CheckboxChangeEvent) => {
    setTerm(e.target.checked);
    setTermError(false);
  }, []);
  const onSubmit = useCallback(() => {
    if (password !== passwordCheck && password < 11) {
      return setPasswordError(true);
    }
    if (!term) {
      return setTermError(true);
    }
    console.log(phone, nickname, password);
    dispatch({
      type: SIGN_UP_REQUEST,
      data: { phone, password, nickname },
    });
    router.push("/auth/signup/personalinfo");
  }, [phone, password, passwordCheck, term]);

  return (
    <AppLayout>
      <FlexWrapper gap={30} justify="center" vertical>
        <Flex align="left" vertical>
          <Title content="작당모임에" customStyle={{ margin: 0 }} />
          <Title content="가입하기" customStyle={{ margin: 0 }} />
        </Flex>
        <FormWrapper onFinish={onSubmit} layout="vertical">
          <Form.Item>
            <label htmlFor="user-phone">비밀번호를 입력해주세요</label>
          </Form.Item>
          <Form.Item>
            <Input
              name="user-phone"
              type="phone"
              value={phone}
              required
              onChange={onChangePhone}
              placeholder="전화번호"
            />
          </Form.Item>
          <Form.Item>
            <Input
              name="user-password"
              type="password"
              value={password}
              required
              onChange={onChangePassword}
              placeholder="비밀번호"
            />
          </Form.Item>
          <Form.Item>
            <Input
              name="user-password-check"
              type="password"
              value={passwordCheck}
              placeholder="비밀번호 확인"
              required
              onChange={onChangePasswordCheck}
            />
            {passwordError && (
              <ErrorMessage>
                <ExclamationCircleFilled />
                &ensp;비밀번호가 일치하지 않습니다.
              </ErrorMessage>
            )}
          </Form.Item>

          <ButtonWrapper type="primary" htmlType="submit" block>
            다음
          </ButtonWrapper>
        </FormWrapper>
      </FlexWrapper>
    </AppLayout>
  );
};

export default memo(PasswordInfoForm);
