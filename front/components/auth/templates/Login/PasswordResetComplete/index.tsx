import React, { memo, useEffect, useState } from "react";
import AppLayout from "../../../../common/organisms/AppLatout";
import { ButtonWrapper, FlexWrapper, LinkWrapper } from "./styles";
import Title from "../../../../common/atoms/Title";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { Flex } from "antd";
const PasswordResetComplete = () => {
  return (
    <AppLayout>
      <LinkWrapper href="/auth/login/passwordreset">
        <ArrowLeftOutlined />
      </LinkWrapper>
      <FlexWrapper vertical>
        <Flex align="left" vertical>
          <Title content="비밀번호를" customStyle={{ margin: 0 }} />
          <Title content="변경하였습니다!" customStyle={{ margin: 0 }} />
        </Flex>

        <ButtonWrapper
          type="primary"
          href="/auth/login"
          htmlType="submit"
          block
        >
          로그인 페이지로 이동하기
        </ButtonWrapper>
      </FlexWrapper>
    </AppLayout>
  );
};

export default memo(PasswordResetComplete);
