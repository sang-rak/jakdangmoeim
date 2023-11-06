import React, { memo, useCallback, useState } from "react";
import { Button, Form, Input, Flex, FlexProps, Checkbox } from "antd";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import useInput from "../../../../hooks/useInput";
import { loginRequestAction } from "../../../../reducers/user";
import {
  AWrapper,
  FlexWrapper,
  FormWrapper,
  Title,
  alignOptions,
  justifyOptions,
} from "./styles";
import { CheckCircleFilled, CheckCircleOutlined } from "@ant-design/icons";

const Login = () => {
  const dispatch = useDispatch();
  const { logInLoading } = useSelector((state: any) => state.user);
  const [cellPhone, onChangeCellPhone] = useInput("");
  const [password, onChangePassword] = useInput("");
  const [autoLoginIcon, setAutoLoginIcon] = useState(false);
  const [justify, setJustify] = React.useState<FlexProps["justify"]>(
    justifyOptions[1]
  );

  const [alignItems, setAlignItems] = React.useState<FlexProps["align"]>(
    alignOptions[1]
  );

  const onChangeAutoLoginIcon = () => {
    if (autoLoginIcon) {
      setAutoLoginIcon(false);
    } else {
      setAutoLoginIcon(true);
    }
  };

  const onSubmitForm = useCallback(() => {
    console.log(cellPhone, password);
    dispatch(loginRequestAction({ cellPhone, password }));
  }, [cellPhone, password]);

  return (
    <FlexWrapper gap="large" align="center" vertical>
      <FlexWrapper vertical>
        <Title>
          작당<br></br>모임
        </Title>
      </FlexWrapper>
      <FormWrapper
        name="normal_login"
        className="login-form"
        onFinish={onSubmitForm}
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: "전화번호를 적어주세요" }]}
        >
          <Form.Item noStyle>전화번호</Form.Item>
          <Input
            name="user-phone"
            type="phone"
            value={cellPhone}
            onChange={onChangeCellPhone}
            placeholder="cell phone"
            required
          />
        </Form.Item>
        <Form.Item>
          <Form.Item noStyle>비밀번호</Form.Item>
          <Input
            name="user-password"
            type="password"
            value={password}
            onChange={onChangePassword}
            placeholder="password"
            required
          />
        </Form.Item>
        <Form.Item>
          <Form.Item noStyle>
            {autoLoginIcon ? (
              <CheckCircleFilled onClick={onChangeAutoLoginIcon} />
            ) : (
              <CheckCircleOutlined onClick={onChangeAutoLoginIcon} />
            )}
            <span onClick={onChangeAutoLoginIcon}>자동 로그인</span>
          </Form.Item>

          <AWrapper className="login-form-forgot" href="">
            비밀번호 찾기
          </AWrapper>
        </Form.Item>
        <FlexWrapper justify={justify} align={alignItems} vertical>
          <FlexWrapper>
            <Button
              type="primary"
              htmlType="submit"
              loading={logInLoading}
              block
            >
              로그인하기
            </Button>
          </FlexWrapper>
          <FlexWrapper>
            <Link href="/auth/signup" style={{ width: "100%" }}>
              <Button type="text" block>
                작당모임 회원이 아닌가요?
              </Button>
            </Link>
          </FlexWrapper>
        </FlexWrapper>
      </FormWrapper>
    </FlexWrapper>
  );
};

export default memo(Login);
