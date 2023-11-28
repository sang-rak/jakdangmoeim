import React, { memo, useCallback, useState } from "react";
import { Form, Input, Checkbox, Button } from "antd";
import { CheckboxChangeEvent } from "antd/es/checkbox";

import { useDispatch, useSelector } from "react-redux";

import useInput from "../../../../../hooks/useInput";
import { SIGN_UP_REQUEST } from "../../../../../reducers/user";
import AppLayout from "../../../../common/organisms/AppLatout";
import Title from "../../../../common/atoms/Title";
import { ErrorMessage, FlexWrapper, LinkWrapper } from "./styles";
import { ButtonWrapper } from "./styles";

const PasswordInfoForm = () => {
  const dispatch = useDispatch();
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

  const [term, setTerm] = useState(false);
  const [termError, setTermError] = useState(false);

  const onChangeTerm = useCallback((e: CheckboxChangeEvent) => {
    setTerm(e.target.checked);
    setTermError(false);
  }, []);
  const onSubmit = useCallback(() => {
    if (password !== passwordCheck) {
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
  }, [phone, password, passwordCheck, term]);

  return (
    <AppLayout>
      <FlexWrapper gap="large" vertical>
        <div>
          <Title content="작당모임에" customStyle={{ margin: 0 }} />
          <Title content="가입하기" customStyle={{ margin: 0 }} />
        </div>
        <Form onFinish={onSubmit}>
          <Form.Item>
            <label htmlFor="user-phone">비밀번호를 입력해주세요</label>
            <br />
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
            <br />
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
            <br />
            <Input
              name="user-password-check"
              type="password"
              value={passwordCheck}
              placeholder="비밀번호 확인"
              required
              onChange={onChangePasswordCheck}
            />
            {passwordError && (
              <ErrorMessage>비밀번호가 일치하지 않습니다.</ErrorMessage>
            )}
          </Form.Item>

          <FlexWrapper>
            <LinkWrapper href="/auth/signup/personalinfo">
              <ButtonWrapper type="primary" htmlType="submit" block>
                다음
              </ButtonWrapper>
            </LinkWrapper>
          </FlexWrapper>
        </Form>
      </FlexWrapper>
    </AppLayout>
  );
};

export default memo(PasswordInfoForm);
