import React, { memo, useCallback, useEffect, useState } from "react";
import { Button, Flex, Form, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import useInput from "../../../../hooks/useInput";
import { loginRequestAction } from "../../../../reducers/auth";
import {
  ButtonWrapper,
  ErrorMessage,
  FlexWrapper,
  FormWrapper,
  LinkWhiteWrapper,
  LinkWrapper,
  SpanWrapper,
} from "./styles";
import { CheckCircleFilled, CheckCircleOutlined } from "@ant-design/icons";
import Title from "../../../common/atoms/Title";
import AppLayout from "../../../common/organisms/AppLatout";
import { useRouter } from "next/router";

const Login = () => {
  const dispatch = useDispatch();
  const { logInLoading } = useSelector((state: any) => state.user);
  const [username, onChangeUsername] = useInput("");
  const [password, onChangePassword] = useInput("");
  const [loginError, setLoginError] = useState(false);
  const [autoLoginIcon, setAutoLoginIcon] = useState(false);
  const router = useRouter();
  const { logInDone, logInError } = useSelector((state: any) => state.auth);
  const onChangeAutoLoginIcon = () => {
    if (autoLoginIcon) {
      setAutoLoginIcon(false);
    } else {
      setAutoLoginIcon(true);
    }
  };

  const onSubmit = useCallback(() => {
    dispatch(loginRequestAction({ username: username, password: password }));
  }, [username, password]);

  // 로그인 성공 시 페이지 변경
  useEffect(() => {
    // 제출시
    if (logInDone && logInError == null) {
      router.push("/home");
    }
  }, [logInDone, logInError]);

  return (
    <AppLayout>
      <FlexWrapper gap="large" vertical>
        <div>
          <Title
            content="작당"
            customStyle={{ margin: 0, textAlign: "center" }}
          />
          <Title
            content="모임"
            customStyle={{ margin: 0, textAlign: "center" }}
          />
        </div>

        <FormWrapper
          name="normal_login"
          className="login-form"
          onFinish={onSubmit}
        >
          <Form.Item
            name="phone"
            rules={[{ required: true, message: "전화번호를 적어주세요" }]}
          >
            <Input
              name="user-phone"
              type="phone"
              value={username}
              onChange={onChangeUsername}
              placeholder="아이디"
              required
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "비밀번호를 적어주세요" }]}
          >
            <Input
              name="user-password"
              type="password"
              value={password}
              onChange={onChangePassword}
              placeholder="비밀번호"
              required
            />
          </Form.Item>
          <Form.Item>
            <Form.Item>
              {autoLoginIcon ? (
                <CheckCircleFilled onClick={onChangeAutoLoginIcon} />
              ) : (
                <CheckCircleOutlined onClick={onChangeAutoLoginIcon} />
              )}
              <SpanWrapper onClick={onChangeAutoLoginIcon}>
                {" "}
                자동 로그인
              </SpanWrapper>
              <LinkWrapper
                className="login-form-forgot"
                href="/auth/login/findpassword"
              >
                비밀번호 찾기
              </LinkWrapper>
            </Form.Item>
            {logInError && (
              <ErrorMessage>가입하신 정보와 일치하지 않습니다</ErrorMessage>
            )}
          </Form.Item>
          <FlexWrapper justify="center" align="center" vertical>
            <FlexWrapper>
              <ButtonWrapper
                type="primary"
                htmlType="submit"
                loading={logInLoading}
                block
              >
                로그인하기
              </ButtonWrapper>
            </FlexWrapper>
            <FlexWrapper>
              <LinkWhiteWrapper href="/auth/signup/phonenumberverification">
                <Button type="text" block>
                  작당모임 회원이 아닌가요?
                </Button>
              </LinkWhiteWrapper>
            </FlexWrapper>
          </FlexWrapper>
        </FormWrapper>
      </FlexWrapper>
    </AppLayout>
  );
};

export default memo(Login);
