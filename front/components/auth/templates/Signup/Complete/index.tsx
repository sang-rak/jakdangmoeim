import React, { memo, useEffect, useState } from "react";
import AppLayout from "../../../../common/organisms/AppLatout";
import { ButtonWrapper, FlexWrapper, LinkWrapper } from "./styles";
import Title from "../../../../common/atoms/Title";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { Flex } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { SignupRequestAction } from "../../../../../hooks/useAuth";
const Complete = () => {
  const dispatch = useDispatch();
  const [signupError, setSignupError] = useState(false);
  const { nickname, phone, password, gender, birthday } = useSelector(
    (state: any) => state.auth.signUpData
  );
  const signUpDone = useSelector((state: any) => state.auth.signUpDone);

  useEffect(() => {
    console.log(nickname, phone, password, gender, birthday);
    // 회원가입
    dispatch(
      SignupRequestAction([nickname, phone, password, gender, birthday])
    );
  }, [nickname, phone, password, gender, birthday]);

  useEffect(() => {
    // 회원가입 실패시 화면 변경
    if (!signUpDone) {
      setSignupError(true);
    } else {
      setSignupError(false);
    }
  }, [signUpDone]);

  return (
    <AppLayout>
      <LinkWrapper href="/auth/signup/personalinfo">
        <ArrowLeftOutlined />
      </LinkWrapper>
      <FlexWrapper vertical>
        {signupError ? (
          <Flex align="left" vertical>
            <Title content="가입이" customStyle={{ margin: 0 }} />
            <Title content="실패했습니다." customStyle={{ margin: 0 }} />
          </Flex>
        ) : (
          <Flex align="left" vertical>
            <Title content="가입이" customStyle={{ margin: 0 }} />
            <Title content="완료되었습니다!" customStyle={{ margin: 0 }} />
          </Flex>
        )}

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
