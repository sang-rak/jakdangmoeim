import React, { memo, useCallback, useState } from "react";
import { Form, Input } from "antd";

import { useDispatch } from "react-redux";

import AppLayout from "../../../../common/organisms/AppLatout";
import Title from "../../../../common/atoms/Title";
import { ErrorMessage, FlexWrapper, LinkWrapper } from "./styles";
import { ButtonWrapper } from "./styles";
import { ExclamationCircleFilled } from "@ant-design/icons";
import Lavel from "../../../../common/atoms/Lavel";

const CertificationNumber = () => {
  const dispatch = useDispatch();

  const [certificationnumber, setCertificationNumber] = useState(false);
  const [certificationnumberError, setCertificationnumberError] =
    useState(false);
  const onSubmit = useCallback(() => {}, []);
  // "/auth/signup/passwordinfo"
  return (
    <AppLayout>
      <FlexWrapper gap="large" vertical>
        <div>
          <Title content="작당모임에" customStyle={{ margin: 0 }} />
          <Title content="가입하기" customStyle={{ margin: 0 }} />
        </div>
        <Form onFinish={onSubmit} layout="vertical">
          <Form>
            <Lavel
              content="회원님의 휴대폰으로 전송된 "
              customStyle={{ margin: 0 }}
            ></Lavel>
            <Lavel
              content="인증번호를 입력해주세요"
              customStyle={{ margin: 0 }}
            ></Lavel>
          </Form>

          <Form.Item>
            <br />
            <Input
              name="user-certificationnumber-check"
              type="certificationnumber"
              placeholder="인증번호 6자리"
              suffix={"02:57"}
              required
            />
            <Form.Item>
              {certificationnumber && (
                <ErrorMessage>
                  <ExclamationCircleFilled />
                  &ensp;인증번호를 다시 확인 해주세요
                </ErrorMessage>
              )}
            </Form.Item>
          </Form.Item>

          <FlexWrapper>
            <ButtonWrapper type="primary" htmlType="submit" block>
              다음
            </ButtonWrapper>
          </FlexWrapper>
        </Form>
      </FlexWrapper>
    </AppLayout>
  );
};

export default memo(CertificationNumber);
