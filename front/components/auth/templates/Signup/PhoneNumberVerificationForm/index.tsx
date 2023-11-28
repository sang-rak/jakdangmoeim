import React, { memo, useCallback, useState } from "react";
import { Form, Input } from "antd";
import { CheckboxChangeEvent } from "antd/es/checkbox";

import { useDispatch, useSelector } from "react-redux";

import useInput from "../../../../../hooks/useInput";
import { SIGN_UP_REQUEST } from "../../../../../reducers/user";
import AppLayout from "../../../../common/organisms/AppLatout";
import Title from "../../../../common/atoms/Title";
import { ButtonWrapper, FormWrapper, FlexWrapper } from "./styles";
import { LinkWrapper } from "./styles";

const PhoneNumberVerificationForm = () => {
  const dispatch = useDispatch();
  const { signUpLoading } = useSelector((state: any) => state.user);

  const [email, onChangeEmail] = useInput("");
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
    console.log(email, nickname, password);
    dispatch({
      type: SIGN_UP_REQUEST,
      data: { email, password, nickname },
    });
  }, [email, password, passwordCheck, term]);

  return (
    <AppLayout>
      <FlexWrapper justify="center" gap="large" vertical>
        <div>
          <Title content="작당모임에" customStyle={{ margin: 0 }} />
          <Title content="가입하기" customStyle={{ margin: 0 }} />
        </div>
        <FormWrapper onFinish={onSubmit}>
          <Form.Item>
            <label htmlFor="user-email">핸드폰 번호를 입력해주세요.</label>
            <br />
            <Input
              name="user-email"
              type="email"
              value={email}
              required
              placeholder="전화번호"
              onChange={onChangeEmail}
            />
          </Form.Item>
          <Form.Item>
            <LinkWrapper href="/auth/signup/certificationnumber">
              <ButtonWrapper type="primary" htmlType="submit" block>
                다음
              </ButtonWrapper>
            </LinkWrapper>
          </Form.Item>
        </FormWrapper>
      </FlexWrapper>
    </AppLayout>
  );
};

export default memo(PhoneNumberVerificationForm);
