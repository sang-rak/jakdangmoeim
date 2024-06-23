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
  min-height: 100%;
`;

export const LinkWrapper = styled(Link)`
  float: right;
  color: #000000;
  font-size: 12px;
`;

export const ButtonWrapper = styled(Button)`
  background-color: #848484;
  margin-top: 60%;
  width: 100%;
`;

export const ErrorMessage = styled.div`
  color: red;
`;
