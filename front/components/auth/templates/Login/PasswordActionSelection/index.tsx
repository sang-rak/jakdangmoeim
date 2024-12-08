import React, { memo, useCallback, useEffect } from "react";
import AppLayout from "../../../../common/organisms/AppLatout";
import { ButtonWrapper, FlexWrapper, FormWrapper, LinkWrapper } from "./styles";
import Title from "../../../../common/atoms/Title";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { Flex } from "antd";
import { useRouter } from "next/router";

const PasswordActionSelection = () => {
  const router = useRouter();

  const onSubmit = useCallback(() => {
    router.push("/auth/login/passwordreset");
  }, []);

  return (
    <AppLayout>
      <LinkWrapper href="/auth/login/certificationnumber">
        <ArrowLeftOutlined />
      </LinkWrapper>
      <FlexWrapper vertical>
        <Flex align="left" vertical>
          <Title
            content="인증이 성공했습니다."
            customStyle={{ fontSize: 30, margin: 0 }}
          />
        </Flex>
        <FormWrapper onFinish={onSubmit} layout="vertical">
          <ButtonWrapper type="primary" htmlType="submit" block>
            새로운 비밀번호 재설정하기
          </ButtonWrapper>
        </FormWrapper>
      </FlexWrapper>
    </AppLayout>
  );
};

export default memo(PasswordActionSelection);
