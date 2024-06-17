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
  const { signUpDone, signUpError } = useSelector((state: any) => state.auth);

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
      <LinkWrapper href="/auth/login/certificationnumber">
        <ArrowLeftOutlined />
      </LinkWrapper>
      <FlexWrapper vertical>
        {signupSuccess ? (
          <Flex align="left" vertical>
            <Title content="비밀번호 찾기에" customStyle={{ margin: 0 }} />
            <Title content="성공하였습니다!" customStyle={{ margin: 0 }} />
          </Flex>
        ) : signUpError ? (
          <Flex align="left" vertical>
            <Title
              content="다시 비밀번호 찾기를 해주세요."
              customStyle={{ margin: 0 }}
            />
          </Flex>
        ) : (
          <Flex align="left" vertical>
            <Title
              content="비밀번호를 찾는중 입니다"
              customStyle={{ margin: 0 }}
            />
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
