import React, { memo, useCallback, useEffect, useState } from "react";
import AppLayout from "../../../../common/organisms/AppLatout";
import { LinkWrapper, FlexWrapper, FormWrapper, ErrorMessage } from "./styles";
import { ArrowLeftOutlined, ExclamationCircleFilled } from "@ant-design/icons";
import { Flex, Form, Input } from "antd";
import Title from "../../../../common/atoms/Title";
import { ButtonWrapper } from "../styles";
import useInput from "../../../../../hooks/useInput";
import { useDispatch, useSelector } from "react-redux";
import { AuthsetPhone } from "../../../../../hooks/useAuth";
import { useRouter } from "next/navigation";

const FindPassword = () => {
  const [phone, onChangePhone] = useInput("");
  const [phoneRequestError, setPhoneRequestError] = useState(false);
  const { phoneDone, phoneError } = useSelector((state: any) => state.auth);
  const router = useRouter();
  const dispatch = useDispatch();
  const onSubmit = useCallback(() => {
    // validation 체크
    if (phone.length === 11) {
      setPhoneRequestError(false);
      dispatch(AuthsetPhone({ phone: phone, type: "active" })); // phone 정보 설정
    } else {
      return setPhoneRequestError(true);
    }
  }, [phone]);

  // 인증 번호 요청 성공 시 페이지 변경
  useEffect(() => {
    // 제출시
    if (phoneDone && phoneError == null) {
      router.push("/auth/login/certificationnumber");
    }
  }, [phoneDone]);

  return (
    <AppLayout>
      <LinkWrapper href="/auth/login">
        <ArrowLeftOutlined />
      </LinkWrapper>
      <FlexWrapper gap={100} justify="center" vertical>
        <Flex align="left" vertical>
          <Title content="비밀번호를" customStyle={{ margin: 0 }} />
          <Title content="잊으셨나요?" customStyle={{ margin: 0 }} />
        </Flex>
        <FormWrapper onFinish={onSubmit} layout="vertical">
          <Form.Item>
            <label htmlFor="user-phone">전화번호를 입력해주세요</label>
          </Form.Item>
          <Form.Item>
            <Input
              name="user-phone"
              type="phone"
              value={phone}
              onChange={onChangePhone}
              required
              placeholder="전화번호"
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
            인증번호 받기
          </ButtonWrapper>
        </FormWrapper>
      </FlexWrapper>
    </AppLayout>
  );
};

export default memo(FindPassword);
