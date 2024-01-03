import React, { memo, useCallback } from "react";
import { DatePicker, Flex, Form, Input, Select } from "antd";

import useInput from "../../../../../hooks/useInput";

import AppLayout from "../../../../common/organisms/AppLatout";
import Title from "../../../../common/atoms/Title";
import { FlexWrapper, LinkWrapper, ButtonWrapper, FormWrapper } from "./styles";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";

const PersonalInfoForm = () => {
  const [nickname, onChangeNickname] = useInput("");
  const router = useRouter();
  const onSubmit = useCallback(() => {
    router.push("/auth/signup/complete");
  }, []);
  {
    /* <LinkWrapper href="/auth/signup/complete"></LinkWrapper> */
  }
  // 성별 변경
  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  return (
    <AppLayout>
      <LinkWrapper href="/auth/signup/passwordinfo">
        <ArrowLeftOutlined />
      </LinkWrapper>
      <FlexWrapper gap={100} justify="center" vertical>
        <Flex align="left" vertical>
          <Title content="회원님을" customStyle={{ margin: 0 }} />
          <Title content="알려주세요" customStyle={{ margin: 0 }} />
        </Flex>
        <FormWrapper onFinish={onSubmit} layout="vertical">
          <Form.Item>
            <Form.Item label="알맞을 매칭을 위해서 필수적으로 필요해요."></Form.Item>
            <Input
              name="user-nick"
              value={nickname}
              required
              onChange={onChangeNickname}
              placeholder="닉네임"
            />
          </Form.Item>

          <Form.Item>
            <Select
              defaultValue="성별"
              style={{ width: "100%" }}
              onChange={handleChange}
              options={[
                { value: "male", label: "남성" },
                { value: "female", label: "여성" },
              ]}
            />
          </Form.Item>
          <Form.Item>
            <DatePicker
              placeholder="생일"
              style={{ width: "100%" }}
              format="YYYY/MM/DD"
            />
          </Form.Item>

          <ButtonWrapper type="primary" htmlType="submit" block>
            다음
          </ButtonWrapper>
        </FormWrapper>
      </FlexWrapper>
    </AppLayout>
  );
};

export default memo(PersonalInfoForm);
