import {
  AUTH_SET_PASSWORD_REQUEST,
  AUTH_SET_PHONE_REQUEST,
  AUTH_SET_MARKETING_REQUEST,
  AUTH_SET_NICKNAME_REQUEST,
  AUTH_SET_GENDER_REQUEST,
  AUTH_SET_BIRTHDAY_REQUEST,
  SIGN_UP_REQUEST,
  CERTIFICATION_NUMBER_REQUEST,
} from "../reducers/auth";

export const AuthsetPhone = (data: {}) => ({
  type: AUTH_SET_PHONE_REQUEST,
  data,
});

export const AuthsetPassword = (password: string) => ({
  type: AUTH_SET_PASSWORD_REQUEST,
  data: password,
});

export const AuthsetMarketingAgree = (marketingAgree: boolean) => ({
  type: AUTH_SET_MARKETING_REQUEST,
  data: marketingAgree,
});

export const AuthsetNickname = (nickname: string) => ({
  type: AUTH_SET_NICKNAME_REQUEST,
  data: nickname,
});

export const AuthsetGender = (gender: string) => ({
  type: AUTH_SET_GENDER_REQUEST,
  data: gender,
});

export const AuthsetBirthday = (birthday: string) => ({
  type: AUTH_SET_BIRTHDAY_REQUEST,
  data: birthday,
});

export const SignupRequestAction = (data: {}) => {
  return {
    type: SIGN_UP_REQUEST,
    data,
  };
};

export const CertificationNumberRequestAction = (data: {}) => {
  return {
    type: CERTIFICATION_NUMBER_REQUEST,
    data,
  };
};
