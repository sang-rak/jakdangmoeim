import { Button, Flex, Form } from "antd";
import Link from "next/link";
import styled from "styled-components";

export const StyledTitle = styled.div`
  font-size: xx-large;
`;

export const FormWrapper = styled(Form)`
  padding: 10px;
`;

export const FormItemWrapper = styled(Form.Item)`
  margin-bottom: 10px;
`;

export const FlexWrapper = styled(Flex)`
  width: 100%;
`;

export const divWrapper = styled.div`
  padding: 10px;
`;

export const LinkWrapper = styled(Link)`
  float: right;
  color: #000000;
  font-size: 12px;
`;

export const LinkWhiteWrapper = styled(Link)`
  float: right;
  color: #000000;
  font-size: 12px;
  width: 100%;
`;

export const SpanWrapper = styled.span`
  font-size: 12px;
`;

export const ButtonWrapper = styled(Button)`
  background-color: #848484;
`;
