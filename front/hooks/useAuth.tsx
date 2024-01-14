import {
  AUTH_SET_PASSWORD_REQUEST,
  AUTH_SET_PHONE_REQUEST,
} from "../reducers/auth";

export const setPhone = (phone: string) => ({
  type: AUTH_SET_PHONE_REQUEST,
  data: phone,
});

export const setPassword = (password: string) => ({
  type: AUTH_SET_PASSWORD_REQUEST,
  data: password,
});
