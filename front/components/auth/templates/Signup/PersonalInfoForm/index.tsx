import React, { memo, useCallback, useState } from "react";
import { Form, Input } from "antd";
import { CheckboxChangeEvent } from "antd/es/checkbox";

import { useDispatch, useSelector } from "react-redux";

import useInput from "../../../../../hooks/useInput";
import { SIGN_UP_REQUEST } from "../../../../../reducers/user";
import AppLayout from "../../../../common/organisms/AppLatout";
import Title from "../../../../common/atoms/Title";
import { FlexWrapper, LinkWrapper, ButtonWrapper } from "./styles";

const PersonalInfoForm = () => {
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
      <FlexWrapper gap="large" vertical>
        <div>
          <Title content="회원님을" customStyle={{ margin: 0 }} />
          <Title content="알려주세요" customStyle={{ margin: 0 }} />
        </div>
        <Form onFinish={onSubmit}>
          <div>
            <label htmlFor="user-email">
              알맞을 매칭을 위해서 필수적으로 필요해요.
            </label>

            <br />
            <Input
              name="user-nick"
              value={nickname}
              required
              onChange={onChangeNickname}
            />
          </div>
          <div>
            <br />
            <Input
              name="user-gender"
              type="gender"
              // value={password}
              // required
              // onChange={onChangePassword}
            />
          </div>
          <div>
            <br />
            <Input
              name="user-age"
              type="age"
              // value={password}
              // required
              // onChange={onChangePassword}
            />
          </div>

          <FlexWrapper>
            <LinkWrapper href="/auth/signup/complete">
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

export default memo(PersonalInfoForm);
