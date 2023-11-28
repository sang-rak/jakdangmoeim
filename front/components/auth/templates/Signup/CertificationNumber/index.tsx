import React, { memo, useCallback, useState } from "react";
import { Form, Input } from "antd";

import { useDispatch } from "react-redux";

import AppLayout from "../../../../common/organisms/AppLatout";
import Title from "../../../../common/atoms/Title";
import { ErrorMessage, FlexWrapper, LinkWrapper } from "./styles";
import { ButtonWrapper } from "./styles";

const CertificationNumber = () => {
  const dispatch = useDispatch();

  const [certificationnumber, setCertificationNumber] = useState(false);

  const onSubmit = useCallback(() => {}, []);

  return (
    <AppLayout>
      <FlexWrapper gap="large" vertical>
        <div>
          <Title content="작당모임에" customStyle={{ margin: 0 }} />
          <Title content="가입하기" customStyle={{ margin: 0 }} />
        </div>
        <Form onFinish={onSubmit} layout="vertical">
          <Form.Item>
            <Form.Item
              label="회원님의 휴대폰으로 전송된  
            인증번호를 입력해주세요"
            ></Form.Item>
          </Form.Item>
          <Form.Item>
            <br />
            <Input
              name="user-certificationnumber-check"
              type="certificationnumber"
              placeholder="인증번호 6자리"
              required
            />

            <ErrorMessage>인증번호를 다시 확인 해주세요</ErrorMessage>
          </Form.Item>

          <FlexWrapper>
            <LinkWrapper href="/auth/signup/passwordinfo">
              <ButtonWrapper type="primary" htmlType="submit" block>
                다음
              </ButtonWrapper>
            </LinkWrapper>
          </FlexWrapper>
        </Form>
      </FlexWrapper>
    </AppLayout>
  );
};

export default memo(CertificationNumber);
