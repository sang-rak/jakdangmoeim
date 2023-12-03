import React, { memo, useCallback, useState } from "react";
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

import { ArrowLeftOutlined } from "@ant-design/icons";

const PhoneNumberVerificationForm = () => {
  const [phone, onChangePhone] = useInput("");
  const [phoneError, setPhoneError] = useState(false);
  const router = useRouter();
  const onSubmit = useCallback(() => {
    // validation 체크
    if (phone.length === 11) {
      setPhoneError(false);
      router.push("/auth/signup/certificationnumber");
    } else {
      return setPhoneError(true);
    }
  }, [phone]);

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
          <Form.Item label="핸드폰 번호를 입력해주세요."></Form.Item>
          <Form.Item>
            <Input
              name="user-phone"
              type="phone"
              value={phone}
              required
              placeholder="전화번호"
              onChange={onChangePhone}
            />
            {phoneError && (
              <ErrorMessage>전화번호를 다시 확인해주세요.</ErrorMessage>
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
