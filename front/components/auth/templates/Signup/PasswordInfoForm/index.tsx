import React, { memo, useCallback, useState } from "react";
import { Form, Input, Flex } from "antd";
import { CheckboxChangeEvent } from "antd/es/checkbox";

import { useDispatch } from "react-redux";

import useInput from "../../../../../hooks/useInput";
import AppLayout from "../../../../common/organisms/AppLatout";
import Title from "../../../../common/atoms/Title";
import {
  ErrorMessage,
  FlexWrapper,
  FormWrapper,
  LinkWrapper,
  ButtonWrapper,
} from "./styles";
import { useRouter } from "next/navigation";
import { ArrowLeftOutlined, ExclamationCircleFilled } from "@ant-design/icons";
import Modal from "../../../molecules/Modal";
const PasswordInfoForm = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [isOpen, setOpen] = useState(false); // 약관동의 모달 핸들링
  const [marketingAgree, setMarketingAgree] = useState(false); // 마케팅동의 여부
  const [phone, onChangePhone] = useInput("");
  const [password, onChangePassword] = useInput("");
  const [passwordCheck, onChangePasswordCheck] = useInput("");

  // const [passwordCheck, setPasswordCheck] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [passwordCountError, setPasswordCountError] = useState(false);
  // 필수 약관 동의시 필수정보화면 전환
  const handleModalSubmit = () => {
    // 비지니스 로직
    setOpen(false);
    router.push("/auth/signup/personalinfo");
  };

  const handleModalCancel = () => {
    setOpen(false);
  };

  // 약관동의 Modal 생성
  const handleModalMake = () => {
    setOpen(true);
  };

  // 개인정보 동의 체크
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
    if (password.length < 11) {
      return setPasswordCountError(true);
    }
    handleModalMake();

    //개인정보 동의 여부 확인
    if (!term) {
      console.log("2번입니다.");
      return setTermError(true);
    }

    router.push("/auth/signup/personalinfo");
  }, [phone, password, passwordCheck, term, isOpen]);

  return (
    <AppLayout>
      <LinkWrapper href="/auth/signup/certificationnumber">
        <ArrowLeftOutlined />
      </LinkWrapper>
      <FlexWrapper gap={100} justify="center" vertical>
        <Flex align="left" vertical>
          <Title content="작당모임에" customStyle={{ margin: 0 }} />
          <Title content="가입하기" customStyle={{ margin: 0 }} />
        </Flex>
        <FormWrapper onFinish={onSubmit} layout="vertical">
          <Form.Item>
            <label htmlFor="user-phone">비밀번호를 입력해주세요</label>
          </Form.Item>
          <Form.Item>
            <Input
              name="user-phone"
              type="phone"
              value={phone}
              required
              onChange={onChangePhone}
              placeholder="전화번호"
            />
          </Form.Item>
          <Form.Item>
            <Input
              name="user-password"
              type="password"
              value={password}
              required
              onChange={onChangePassword}
              placeholder="비밀번호"
            />
          </Form.Item>
          <Form.Item>
            <Input
              name="user-password-check"
              type="password"
              value={passwordCheck}
              placeholder="비밀번호 확인"
              required
              onChange={onChangePasswordCheck}
            />
          </Form.Item>
          <Form.Item>
            {passwordError ? (
              <ErrorMessage>
                <ExclamationCircleFilled />
                &ensp;비밀번호가 일치하지 않습니다.
              </ErrorMessage>
            ) : passwordCountError ? (
              <ErrorMessage>
                <ExclamationCircleFilled />
                &ensp;비밀번호는 11자 이상 입력하여야 합니다.
              </ErrorMessage>
            ) : (
              <></>
            )}
          </Form.Item>
          <ButtonWrapper type="primary" htmlType="submit" block>
            다음
          </ButtonWrapper>
          <Modal
            isOpen={isOpen}
            marketingAgree={marketingAgree}
            setMarketingAgree={setMarketingAgree}
            onSubmit={handleModalSubmit}
            onCancel={handleModalCancel}
          />
        </FormWrapper>
      </FlexWrapper>
    </AppLayout>
  );
};

export default memo(PasswordInfoForm);
