import React, { memo } from "react";
import AppLayout from "../../../../common/organisms/AppLatout";
import { ButtonWrapper, FlexWrapper, LinkWrapper } from "./styles";
import Title from "../../../../common/atoms/Title";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { Flex } from "antd";
const Complete = () => {
  return (
    <AppLayout>
      <LinkWrapper href="/auth/signup/personalinfo">
        <ArrowLeftOutlined />
      </LinkWrapper>
      <FlexWrapper vertical>
        <Flex align="left" vertical>
          <Title content="가입이" customStyle={{ margin: 0 }} />
          <Title content="완료되었습니다!" customStyle={{ margin: 0 }} />
        </Flex>
        <ButtonWrapper
          type="primary"
          href="/auth/login"
          htmlType="submit"
          block
        >
          다음
        </ButtonWrapper>
      </FlexWrapper>
    </AppLayout>
  );
};

export default memo(Complete);
