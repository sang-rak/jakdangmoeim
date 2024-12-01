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
  const [signupSuccess, setSignupSuccess] = useState(false);
  const [signupRequest, setSignupRequest] = useState(true);
  const { nickname, phone, password, gender, birthday } = useSelector(
    (state: any) => state.auth.signUpData
  );
  const { signUpDone, signUpError } = useSelector((state: any) => state.auth);

  useEffect(() => {
    // 1회 요청 제한
    if (signupRequest) {
      setSignupRequest(false);
      // 회원가입 요청
      dispatch(
        SignupRequestAction({
          username: nickname,
          nickname: nickname,
          phone: phone,
          password: password,
          gender: gender,
          birthday: birthday,
        })
      );
    }
  }, [nickname, phone, password, gender, birthday]);

  useEffect(() => {
    // 회원가입 성공시 화면 변경
    if (signUpDone && signUpError == undefined) {
      setSignupSuccess(true);
    } else {
      setSignupSuccess(false);
    }
  }, [signUpDone, signUpError]);

  return (
    <AppLayout>
      <LinkWrapper href="/auth/signup/personalinfo">
        <ArrowLeftOutlined />
      </LinkWrapper>
      <FlexWrapper vertical>
        {signupSuccess ? (
          <Flex align="left" vertical>
            <Title content="회원가입이" customStyle={{ margin: 0 }} />
            <Title content="완료되었습니다!" customStyle={{ margin: 0 }} />
          </Flex>
        ) : signUpError ? (
          <Flex align="left" vertical>
            <Title content={signUpError} customStyle={{ margin: 0 }} />
            <Title
              content="다시 회원가입을 해주세요."
              customStyle={{ margin: 0 }}
            />
          </Flex>
        ) : (
          <Flex align="left" vertical>
            <Title content="회원가입 중 입니다" customStyle={{ margin: 0 }} />
            <Title content="잠시만 기다려주세요." customStyle={{ margin: 0 }} />
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
