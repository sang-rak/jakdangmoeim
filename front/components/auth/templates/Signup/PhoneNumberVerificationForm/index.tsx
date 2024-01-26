import React, { memo, useCallback, useEffect, useState } from "react";
import { Flex, Form, Input } from "antd";
import { useRouter } from "next/navigation";
import useInput from "../../../../../hooks/useInput";
import AppLayout from "../../../../common/organisms/AppLatout";
import Title from "../../../../common/atoms/Title";
import {
  ButtonWrapper,
  FormWrapper,
  FlexWrapper,
  ErrorMessage,
  LinkWrapper,
} from "./styles";

import { ArrowLeftOutlined, ExclamationCircleFilled } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { AuthsetPhone } from "../../../../../hooks/useAuth";

const PhoneNumberVerificationForm = () => {
  const [phone, onChangePhone] = useInput("");
  const [phoneRequestError, setPhoneRequestError] = useState(false);
  const [checkSubmit, setCheckSubmit] = useState(false);
  const router = useRouter();

  const dispatch = useDispatch();

  const { phoneDone } = useSelector((state: any) => state.auth);

  const onSubmit = useCallback(() => {
    setCheckSubmit(true);
    // validation 체크
    if (phone.length === 11) {
      setPhoneRequestError(false);
      dispatch(AuthsetPhone({ phone: phone })); // phone 정보 설정
    } else {
      return setPhoneRequestError(true);
    }
  }, [phone]);

  // 인증 번호 요청 성공 시 페이지 변경
  useEffect(() => {
    // 제출시
    if (checkSubmit) {
      if (phoneDone) {
        router.push("/auth/signup/certificationnumber");
      } else {
        setCheckSubmit(false);
        return;
      }
    }
  }, [phoneDone, checkSubmit]);

  return (
    <AppLayout>
      <LinkWrapper href="/auth/login">
        <ArrowLeftOutlined />
      </LinkWrapper>
      <FlexWrapper gap={30} justify="center" vertical>
        <Flex align="left" vertical>
          <Title content="작당모임에" customStyle={{ margin: 0 }} />
          <Title content="가입하기" customStyle={{ margin: 0 }} />
        </Flex>
        <FormWrapper onFinish={onSubmit} layout="vertical">
          <Form.Item label="휴대전화번호를 입력해주세요."></Form.Item>
          <Form.Item>
            <Input
              name="user-phone"
              type="phone"
              value={phone}
              required
              placeholder="휴대전화번호"
              onChange={onChangePhone}
            />
          </Form.Item>
          <Form.Item>
            {phoneRequestError && (
              <ErrorMessage>
                <ExclamationCircleFilled />
                &ensp;휴대전화번호를 다시 확인 해주세요.
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

export default memo(PhoneNumberVerificationForm);
