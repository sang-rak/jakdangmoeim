import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck as faCircleCheckSolid } from "@fortawesome/free-solid-svg-icons";
import { faCircleCheck as faCircleCheckRegular } from "@fortawesome/free-regular-svg-icons";

import Tos from "../Tos";
import {
  ButtonWrapper,
  FlexWrapper,
  ModalpageWrapper,
  ReactModalWrapper,
} from "./styles";
import { Divider, Flex, Typography } from "antd";

// ModalPropsType 생성

const Modal = ({
  isOpen,
  onSubmit,
  marketingAgree,
  setMarketingAgree,
}: any) => {
  //동의
  const handleClickSubmit = () => {
    onSubmit();
  };

  const [disabled, setDisabled] = useState(true); // 다음 버튼 활성화 유무
  const [agree, setAgree] = useState(false); // 전체동의 버튼 활성화 유무
  const [serviceAgree, setServiceAgree] = useState(false); // 서비스 버튼 활성화 유무
  const [privacyAgree, setPrivacyAgree] = useState(false); // 개인정보 버튼 활성화 유무
  const [pagestatus, setPagestatus] = useState("약관화면"); // 화면 상태 저장

  useEffect(() => {
    // 필수동의(서비스 및 개인정보) 모두 체크될 시 다음버튼 활성화
    if (serviceAgree === true && privacyAgree === true) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [serviceAgree, privacyAgree]);

  // 취소
  // const handleClickCancel = () => {
  //   onCancel();
  // };

  // 전체 동의 클릭
  const handleAllChange = () => {
    // 상태변화
    if (agree === true) {
      setAgree(false);
      setServiceAgree(false);
      setPrivacyAgree(false);
      setMarketingAgree(false);
    } else {
      setAgree(true);
      setServiceAgree(true);
      setPrivacyAgree(true);
      setMarketingAgree(true);
    }
  };

  // 서비스 이용약관 동의 클릭
  const serviceBtnEvent = () => {
    // 상태변화
    if (serviceAgree === true) {
      setServiceAgree(false);
    } else {
      setServiceAgree(true);
    }
  };

  // 개인정보 처리방침 동의 클릭
  const privacyBtnEvent = () => {
    // 상태변화
    if (privacyAgree === true) {
      setPrivacyAgree(false);
    } else {
      setPrivacyAgree(true);
    }
  };

  // 마케팅 정보 수신(선택) 동의 클릭
  const marketingBtnEvent = () => {
    // 상태변화
    if (marketingAgree === true) {
      setMarketingAgree(false);
    } else {
      setMarketingAgree(true);
    }
  };

  // 내용보기 클릭시  약관상세화면 전환
  const tosServiceClick = () => {
    // 비지니스 로직
    setPagestatus("서비스이용 약관화면");
  };
  const tosPrivacyClick = () => {
    // 비지니스 로직
    setPagestatus("개인정보이용 약관화면");
  };
  const tosMarketingClick = () => {
    // 비지니스 로직
    setPagestatus("마케팅정보수신 약관화면");
  };

  const Modalpage = () => {
    switch (pagestatus) {
      case "약관화면":
        return (
          <ModalpageWrapper>
            <FlexWrapper gap={30} justify="center" vertical>
              <Flex vertical>
                <Flex>
                  <FontAwesomeIcon
                    icon={agree ? faCircleCheckSolid : faCircleCheckRegular}
                    onClick={handleAllChange}
                  />
                  <Flex>&nbsp;&nbsp;&nbsp;&nbsp;약관 전체 동의하기</Flex>
                </Flex>
                <Divider
                  style={{
                    borderWidth: "2px",
                    marginTop: "10px",
                    marginBottom: "5px",
                  }}
                />
              </Flex>
              <Flex justify="space-between">
                <Flex>
                  <FontAwesomeIcon
                    icon={
                      serviceAgree ? faCircleCheckSolid : faCircleCheckRegular
                    }
                    onClick={serviceBtnEvent}
                  ></FontAwesomeIcon>
                  <Flex>&nbsp;&nbsp;&nbsp;&nbsp;서비스 이용약관 </Flex>
                </Flex>
                <Flex onClick={tosServiceClick}>
                  {" "}
                  <Typography.Link>내용보기</Typography.Link>
                </Flex>
              </Flex>

              <Flex justify="space-between">
                <Flex>
                  <FontAwesomeIcon
                    icon={
                      privacyAgree ? faCircleCheckSolid : faCircleCheckRegular
                    }
                    onClick={privacyBtnEvent}
                  />
                  <Flex>&nbsp;&nbsp;&nbsp;&nbsp;개인정보 처리방침</Flex>
                </Flex>
                <Flex onClick={tosPrivacyClick}>
                  <Typography.Link>내용보기</Typography.Link>
                </Flex>
              </Flex>
              <Flex justify="space-between">
                <Flex>
                  <FontAwesomeIcon
                    icon={
                      marketingAgree ? faCircleCheckSolid : faCircleCheckRegular
                    }
                    onClick={marketingBtnEvent}
                  />
                  <Flex>&nbsp;&nbsp;&nbsp;&nbsp;마케팅 정보 수신(선택)</Flex>
                </Flex>
                <Flex onClick={tosMarketingClick}>
                  {" "}
                  <Typography.Link>내용보기</Typography.Link>
                </Flex>
              </Flex>
              <ButtonWrapper
                // type="primary" htmlType="submit" block
                type="primary"
                disabled={disabled}
                onClick={handleClickSubmit}
                block
              >
                다음
              </ButtonWrapper>
            </FlexWrapper>
          </ModalpageWrapper>
        );
      case "서비스이용 약관화면":
        return <Tos pagestatus={pagestatus} setPagestatus={setPagestatus} />;
      case "개인정보이용 약관화면":
        return <Tos pagestatus={pagestatus} setPagestatus={setPagestatus} />;
      case "마케팅정보수신 약관화면":
        return <Tos pagestatus={pagestatus} setPagestatus={setPagestatus} />;
      default:
        break;
    }
  };
  return (
    <ReactModalWrapper
      style={{
        overlay: {
          backgroundColor: "rgba(115, 115, 115, 0.75)",
          backdropFilter: "blur(2px)",
        },
      }}
      isOpen={isOpen}
    >
      {Modalpage()}
    </ReactModalWrapper>
  );
};

export default Modal;
