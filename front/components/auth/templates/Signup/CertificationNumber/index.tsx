import React, { memo, useCallback, useState } from "react";
import { Flex, Form, Input } from "antd";

import AppLayout from "../../../../common/organisms/AppLatout";
import Title from "../../../../common/atoms/Title";
import {
  ButtonOpenWrapper,
  ErrorMessage,
  FlexWrapper,
  FormWrapper,
  LinkWrapper,
} from "./styles";
import { ButtonWrapper } from "./styles";
import { ArrowLeftOutlined, ExclamationCircleFilled } from "@ant-design/icons";

import { useRouter } from "next/navigation";
import useInput from "../../../../../hooks/useInput";

const CertificationNumber = () => {
  const [certificationnumber, onCertificationnumber] = useInput("");
  const [certificationnumberError, setCertificationnumberError] =
    useState(false);
  const router = useRouter();
  const onSubmit = useCallback(() => {
    if (certificationnumber == "123456") {
      setCertificationnumberError(false);
      router.push("/auth/signup/passwordinfo");
    } else {
      return setCertificationnumberError(true);
    }
  }, [certificationnumber]);

  return (
    <AppLayout>
      <LinkWrapper href="/auth/signup/phonenumberverification">
        <ArrowLeftOutlined />
      </LinkWrapper>
      <FlexWrapper gap={30} justify="center" vertical>
        <Flex align="left" vertical>
          <Title content="작당모임에" customStyle={{ margin: 0 }} />
          <Title content="가입하기" customStyle={{ margin: 0 }} />
        </Flex>
        <FormWrapper onFinish={onSubmit} layout="vertical">
          <Form.Item>
            <label>회원님의 휴대폰으로 전송된 </label>
            <br />
            <label>인증번호를 입력해주세요 </label>
          </Form.Item>
          <Form.Item>
            <br />
            <Input
              name="user-certificationnumber-check"
              type="certificationnumber"
              placeholder="인증번호 6자리"
              onChange={onCertificationnumber}
              suffix={"02:57"}
              required
            />
          </Form.Item>
          <Form.Item>
            {certificationnumberError && (
              <>
                <ErrorMessage justify="space-between" align="center">
                  <Flex>
                    <ExclamationCircleFilled />
                    &ensp;인증번호를 다시 확인 해주세요
                  </Flex>

                  <ButtonOpenWrapper type="primary" htmlType="submit">
                    인증번호 다시받기
                  </ButtonOpenWrapper>
                </ErrorMessage>
              </>
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

export default memo(CertificationNumber);
