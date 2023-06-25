import React, { useCallback, useState } from "react";
import Head from "next/head";
import { Form, Input, Checkbox, Button } from "antd";
import styled from "styled-components";

import useInput from "../hooks/useInput";
import AppLayout from "../components/AppLayout";
import { CheckboxChangeEvent } from "antd/es/checkbox";

const ErrorMessage = styled.div`
  color: red;
`;

const Signup = () => {
  const [id, onChangeId] = useInput("");
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
    console.log(id, nickname, password);
  }, [id, password, passwordCheck, term]);

  return (
    <div>
      <AppLayout>
        <div>
          <Head>
            <title>회원가입 | 작당모임</title>
          </Head>
          <Form onFinish={onSubmit}>
            <div>
              <label htmlFor="user-id">아이디</label>
              <br />
              <Input name="user-id" value={id} required onChange={onChangeId} />
            </div>
            <div>
              <label htmlFor="user-nick">닉네임</label>
              <br />
              <Input
                name="user-nick"
                value={nickname}
                required
                onChange={onChangeNickname}
              />
            </div>
            <div>
              <label htmlFor="user-password">비밀번호</label>
              <br />
              <Input
                name="user-password"
                type="password"
                value={password}
                required
                onChange={onChangePassword}
              />
            </div>
            <div>
              <label htmlFor="user-password-check">비밀번호체크</label>
              <br />
              <Input
                name="user-password-check"
                type="password"
                value={passwordCheck}
                required
                onChange={onChangePasswordCheck}
              />
              {passwordError && (
                <ErrorMessage>비밀번호가 일치하지 않습니다.</ErrorMessage>
              )}
            </div>
            <div>
              <Checkbox name="user-term" checked={term} onChange={onChangeTerm}>
                개인정보 사용을 동의합니다.
                {termError && (
                  <ErrorMessage>약관에 동의하셔야 합니다.</ErrorMessage>
                )}
              </Checkbox>
            </div>
            <div style={{ marginTop: 10 }}>
              <Button type="primary" htmlType="submit">
                가입하기
              </Button>
            </div>
          </Form>
        </div>
      </AppLayout>
    </div>
  );
};

export default Signup;
