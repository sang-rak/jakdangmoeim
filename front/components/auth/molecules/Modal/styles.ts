import { Button, Flex } from "antd";
import ReactModal from "react-modal";
import styled from "styled-components";

export const ModalpageWrapper = styled.div`
  position: absolute;
  padding: 10%;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(255, 255, 255, 0.75);
  border: 1px solid #ccc;
`;

export const ButtonWrapper = styled(Button)`
  background-color: #848484;
`;

export const FlexWrapper = styled(Flex)``;

export const ReactModalWrapper = styled(ReactModal)`
  /* background-color: rgba(255, 255, 255, 0.75); */
  /* position: absolute; */

  left: 0;
  right: 0;
  bottom: 0;
`;
