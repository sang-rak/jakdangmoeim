import React, { memo, useCallback, useState } from "react";

import { DatePicker, Flex, Form, Input, Select } from "antd";

import useInput from "../../../../../hooks/useInput";

import AppLayout from "../../../../common/organisms/AppLatout";
import Title from "../../../../common/atoms/Title";

import {
  FlexWrapper,
  LinkWrapper,
  ButtonWrapper,
  FormWrapper,
  ErrorMessage,
} from "./styles";
import { ArrowLeftOutlined, ExclamationCircleFilled } from "@ant-design/icons";

import { useRouter } from "next/navigation";

const PersonalInfoForm = () => {
  const [nickname, onChangeNickname] = useInput("");
  const router = useRouter();
  const [nicknameError, setNicknameError] = useState(false);
  const [gender, onChangeGender] = useState("");
  const [birthday, onChangeBirthday] = useState("");

  const onSubmit = useCallback(() => {
    // 중복아이디 체크
    if (nickname == "중복아이디") {
      return setNicknameError(true);
    }
    // 성별, 생일 체크
    if (gender == "" || birthday == "") {
      return;
    }
    router.push("/auth/signup/complete");
  }, [nickname, gender, birthday]);

  // 성별 변경
  const handleChange = (value: string) => {
    onChangeGender(value);
  };

  const handleBirthdayChange = (value: any, dateString: any) => {
    onChangeBirthday(dateString);
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
            {nicknameError ? (
              <ErrorMessage>
                <ExclamationCircleFilled />
                &ensp;이미 존재하는 닉네임입니다.
              </ErrorMessage>
            ) : (
              <></>
            )}
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
              onChange={handleBirthdayChange}
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
