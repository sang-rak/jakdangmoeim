import React, { memo } from "react";
import { Form, Input } from "antd";

import useInput from "../../../../../hooks/useInput";

import AppLayout from "../../../../common/organisms/AppLatout";
import Title from "../../../../common/atoms/Title";
import { FlexWrapper, LinkWrapper, ButtonWrapper } from "./styles";

const PersonalInfoForm = () => {
  const [nickname, onChangeNickname] = useInput("");

  return (
    <AppLayout>
      <FlexWrapper gap="large" vertical>
        <div>
          <Title content="회원님을" customStyle={{ margin: 0 }} />
          <Title content="알려주세요" customStyle={{ margin: 0 }} />
        </div>
        <Form>
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
            <Input name="user-gender" type="gender" placeholder="성별" />
          </Form.Item>
          <Form.Item>
            <Input name="user-age" type="age" placeholder="나이" />
          </Form.Item>

          <FlexWrapper>
            <LinkWrapper href="/auth/signup/complete">
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

export default memo(PersonalInfoForm);
