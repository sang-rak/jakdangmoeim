import React, { memo, useCallback, useEffect, useState } from "react";
import { Flex, Form, Input } from "antd";

import AppLayout from "../../../../common/organisms/AppLatout";
import Title from "../../../../common/atoms/Title";
import {
  ButtonOpenWrapper,
  ErrorMessage,
  FlexWrapper,
  FormWrapper,
  LinkWrapper,
} from "./styles";
import { ButtonWrapper } from "./styles";
import { ArrowLeftOutlined, ExclamationCircleFilled } from "@ant-design/icons";

import { useRouter } from "next/navigation";
import useInput from "../../../../../hooks/useInput";
import { useDispatch, useSelector } from "react-redux";
import {
  AuthsetPhone,
  CertificationNumberRequestAction,
} from "../../../../../hooks/useAuth";

const CertificationNumber = () => {
  const { signUpData } = useSelector((state: any) => state.auth);
  const { certificationNumberDone, certificationNumberError } = useSelector(
    (state: any) => state.auth
  );
  const [certificationnumber, onCertificationnumber] = useInput("");
  const [certificationnumberError, setCertificationnumberError] =
    useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  const onSubmit = useCallback(() => {
    dispatch(
      CertificationNumberRequestAction({
        certificationNumberCheck: certificationnumber,
      })
    );
  }, [certificationnumber]);

  // 인증 성공 시 페이지 변경
  useEffect(() => {
    // 제출시
    if (certificationNumberDone) {
      setCertificationnumberError(false);

      router.push("/auth/login/passwordactionselection");
    }
  }, [certificationNumberDone, router]);

  // 인증 실패 시 에러 메시지 표시
  useEffect(() => {
    if (certificationNumberError) {
      setCertificationnumberError(true);
    }
  }, [certificationNumberError]);


  // 인증번호 다시 받기
  const handleCrtificationNumberRequest = useCallback(() => {
    dispatch(AuthsetPhone({ phone: signUpData.phone }));
  }, [signUpData]);

  const MINUTES_IN_MS = 3 * 60 * 1000;
  const INTERVAL = 1000;
  const [timeLeft, setTimeLeft] = useState<number>(MINUTES_IN_MS);

  const minutes = String(Math.floor((timeLeft / (1000 * 60)) % 60)).padStart(
    2,
    "0"
  );
  const second = String(Math.floor((timeLeft / 1000) % 60)).padStart(2, "0");

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - INTERVAL);
    }, INTERVAL);

    if (timeLeft <= 0) {
      clearInterval(timer);
    }

    return () => {
      clearInterval(timer);
    };
  }, [timeLeft]);

  return (
    <AppLayout>
      <LinkWrapper href="/auth/login/findpassword">
        <ArrowLeftOutlined />
      </LinkWrapper>
      <FlexWrapper gap={100} justify="center" vertical>
        <Flex align="left" vertical>
          <Title content="비밀번호를" customStyle={{ margin: 0 }} />
          <Title content="잊으셨나요?" customStyle={{ margin: 0 }} />
        </Flex>
        <FormWrapper onFinish={onSubmit} layout="vertical">
          <Form.Item>
            <label>회원님의 휴대폰으로 전송된 </label>
            <br />
            <label>인증번호를 입력해주세요 </label>
          </Form.Item>
          <Form.Item>
            <br />
            <Input
              name="user-certificationnumber-check"
              type="certificationnumber"
              placeholder="인증번호 6자리"
              onChange={onCertificationnumber}
              suffix={minutes + ":" + second}
              required
            />
          </Form.Item>
          <Form.Item>
            {certificationnumberError && (
              <>
                <ErrorMessage justify="space-between" align="center">
                  <Flex>
                    <ExclamationCircleFilled />
                    &ensp;인증번호를 다시 확인 해주세요
                  </Flex>

                  <ButtonOpenWrapper
                    type="primary"
                    onClick={handleCrtificationNumberRequest}
                  >
                    인증번호 다시받기
                  </ButtonOpenWrapper>
                </ErrorMessage>
              </>
            )}
          </Form.Item>
          <ButtonWrapper type="primary" htmlType="submit" block>
            다음
          </ButtonWrapper>
        </FormWrapper>
      </FlexWrapper>
    </AppLayout>
  );
};

export default memo(CertificationNumber);
