import React, { memo, useCallback } from "react";
import { Button, Form, Input, Flex, FlexProps, Row } from "antd";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import useInput from "../../../../hooks/useInput";
import { loginRequestAction } from "../../../../reducers/user";
import { FormWrapper, Title, alignOptions, justifyOptions } from "./styles";

const Login = () => {
  const dispatch = useDispatch();
  const { logInLoading } = useSelector((state: any) => state.user);
  const [email, onChangeEmail] = useInput("");
  const [password, onChangePassword] = useInput("");

  const [justify, setJustify] = React.useState<FlexProps["justify"]>(
    justifyOptions[1]
  );

  const [alignItems, setAlignItems] = React.useState<FlexProps["align"]>(
    alignOptions[1]
  );

  const onSubmitForm = useCallback(() => {
    console.log(email, password);
    dispatch(loginRequestAction({ email, password }));
  }, [email, password]);

  return (
    <Flex gap="middle" align="center" vertical>
      <FormWrapper onFinish={onSubmitForm}>
        <Title>작당</Title>
        <Title>모임</Title>
        <Row>
          <label htmlFor="user-email">전화번호</label>
          <br />
          <Input
            name="user-email"
            type="email"
            value={email}
            onChange={onChangeEmail}
            required
          />
        </Row>
        <div>
          <label htmlFor="user-password">비밀번호</label>
          <br />
          <Input
            name="user-password"
            type="password"
            value={password}
            onChange={onChangePassword}
            required
          />
        </div>
        <Flex justify={justify} align={alignItems} vertical>
          <Flex>
            <Button type="primary" htmlType="submit" loading={logInLoading}>
              로그인
            </Button>
          </Flex>
          <Flex>
            <Link href="/signup">
              <Button>회원가입</Button>
            </Link>
          </Flex>
        </Flex>
      </FormWrapper>
    </Flex>
  );
};

export default memo(Login);
