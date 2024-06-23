import React, { memo } from "react";
import AppLayout from "../../../../common/organisms/AppLatout";
import { ButtonWrapper, FlexWrapper, LinkWrapper } from "./styles";
import Title from "../../../../common/atoms/Title";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { Flex } from "antd";

const PasswordActionSelection = () => {
  return (
    <AppLayout>
      <LinkWrapper href="/auth/login/certificationnumber">
        <ArrowLeftOutlined />
      </LinkWrapper>
      <FlexWrapper vertical>
        <Flex align="left" vertical>
          <Title content="인증이 성공했습니다." customStyle={{ margin: 0 }} />
        </Flex>

        <ButtonWrapper
          type="primary"
          href="/auth/login/passwordreset"
          htmlType="submit"
          block
        >
          새로운 비밀번호 재설정하기
        </ButtonWrapper>
      </FlexWrapper>
    </AppLayout>
  );
};

export default memo(PasswordActionSelection);
