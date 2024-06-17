import { Button, Flex, Form } from "antd";
import Link from "next/link";
import styled from "styled-components";

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

export const ButtonWrapper = styled(Button)`
  float: right;
  background-color: #848484;
`;

export const ButtonOpenWrapper = styled(Button)`
  float: right;
  background-color: #000000;
`;

export const ErrorMessage = styled(Flex)`
  color: red;
`;
