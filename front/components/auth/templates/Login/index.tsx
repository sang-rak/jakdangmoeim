import React, { memo, useCallback, useState } from "react";
import { Button, Form, Input } from "antd";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import useInput from "../../../../hooks/useInput";
import { loginRequestAction } from "../../../../reducers/user";
import {
  ButtonWrapper,
  FlexWrapper,
  FormWrapper,
  LinkWrapper,
  SpanWrapper,
} from "./styles";
import { CheckCircleFilled, CheckCircleOutlined } from "@ant-design/icons";
import Title from "../../../common/atoms/Title";
import AppLayout from "../../../common/organisms/AppLatout";

const Login = () => {
  const dispatch = useDispatch();
  const { logInLoading } = useSelector((state: any) => state.user);
  const [cellPhone, onChangeCellPhone] = useInput("");
  const [password, onChangePassword] = useInput("");
  const [autoLoginIcon, setAutoLoginIcon] = useState(false);

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
    <AppLayout>
      <FlexWrapper gap="large" align="center" vertical>
        <div>
          <Title content="작당" customStyle={{ margin: 0 }} />
          <Title content="모임" customStyle={{ margin: 0 }} />
        </div>

        <FormWrapper
          name="normal_login"
          className="login-form"
          onFinish={onSubmitForm}
        >
          <Form.Item
            name="phone"
            rules={[{ required: true, message: "전화번호를 적어주세요" }]}
          >
            <Input
              name="user-phone"
              type="phone"
              value={cellPhone}
              onChange={onChangeCellPhone}
              placeholder="전화번호"
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
                href="/auth/signup/phonenumberverification"
              >
                비밀번호 찾기
              </LinkWrapper>
            </Form.Item>
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
              <LinkWrapper href="/auth/signup/phonenumberverification">
                <Button type="text" block>
                  작당모임 회원이 아닌가요?
                </Button>
              </LinkWrapper>
            </FlexWrapper>
          </FlexWrapper>
        </FormWrapper>
      </FlexWrapper>
    </AppLayout>
  );
};

export default memo(Login);
