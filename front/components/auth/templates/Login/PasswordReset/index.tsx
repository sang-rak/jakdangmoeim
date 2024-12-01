import React, { memo } from "react";
import AppLayout from "../../../../common/organisms/AppLatout";
import { ButtonWrapper, FlexWrapper, LinkWrapper } from "./styles";
import Title from "../../../../common/atoms/Title";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { Flex } from "antd";

const PasswordReset = () => {
  return (
    <AppLayout>
      <LinkWrapper href="/auth/login/passwordactionselection">
        <ArrowLeftOutlined />
      </LinkWrapper>
      <FlexWrapper vertical>
        <Flex align="left" vertical>
          <Title
            content="비밀번호를 다시 설정해주세요"
            customStyle={{ fontSize: 25, margin: 0 }}
          />
        </Flex>

        <ButtonWrapper
          type="primary"
          href="/auth/login/passwordresecheck"
          htmlType="submit"
          block
        >
          설정하기
        </ButtonWrapper>
      </FlexWrapper>
    </AppLayout>
  );
};

export default memo(PasswordReset);
