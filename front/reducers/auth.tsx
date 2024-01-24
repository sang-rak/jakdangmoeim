import { produce } from "immer";

export interface User {
  id?: number;
  nickname?: string | null;
  phone?: string | null;
  password?: string | null;
  certificationNumber?: string | null;
  gender?: string | null;
  birthday?: string | null;
}

export interface Info {
  id: string | number;
  User: User;
}

export interface State {
  signUpInformations: Info[];
  logInLoading: boolean;
  logInDone: boolean;
  logInError: any;
  logOutLoading: boolean;
  logOutDone: boolean;
  logOutError: any;
  signUpLoading: boolean;
  signUpDone: boolean;
  signUpError: any;
  certificationNumberLoading: boolean;
  certificationNumberDone: boolean;
  certificationNumberError: any;
  me: User | null;
  signUpData: User | null;
  loginData: any;
}

export const initialState: State = {
  signUpInformations: [], // 회원가입 정보
  logInLoading: false, // 로그인 시도중
  logInDone: false,
  logInError: null,
  logOutLoading: false, // 로그아웃 시도중
  logOutDone: false,
  logOutError: null,
  signUpLoading: false, // 회원가입 시도중
  signUpDone: false,
  signUpError: null,
  certificationNumberLoading: false, // 인증번호 인증 중
  certificationNumberDone: false,
  certificationNumberError: null,

  me: null,
  signUpData: null,
  loginData: {},
};

export const LOG_IN_REQUEST = "LOG_IN_REQUEST";
export const LOG_IN_SUCCESS = "LOG_IN_SUCCESS";
export const LOG_IN_FAILURE = "LOG_IN_FAILURE";

export const LOG_OUT_REQUEST = "LOG_OUT_REQUEST";
export const LOG_OUT_SUCCESS = "LOG_OUT_SUCCESS";
export const LOG_OUT_FAILURE = "LOG_OUT_FAILURE";

// 회원가입
export const SIGN_UP_REQUEST = "SIGN_UP_REQUEST";
export const SIGN_UP_SUCCESS = "SIGN_UP_SUCCESS";
export const SIGN_UP_FAILURE = "SIGN_UP_FAILURE";

// 인증번호
export const CERTIFICATION_NUMBER_REQUEST = "CERTIFICATION_NUMBER_REQUEST";
export const CERTIFICATION_NUMBER_SUCCESS = "CERTIFICATION_NUMBER_SUCCESS";
export const CERTIFICATION_NUMBER_FAILURE = "CERTIFICATION_NUMBER_FAILURE";

CERTIFICATION_NUMBER_REQUEST;

export const AUTH_SET_PHONE_REQUEST = "AUTH_SET_PHONE_REQUEST";
export const AUTH_SET_PHONE_SUCCESS = "AUTH_SET_PHONE_SUCCESS";
export const AUTH_SET_PHONE_FAILURE = "AUTH_SET_PHONE_FAILURE";

export const AUTH_SET_PASSWORD_REQUEST = "AUTH_SET_PASSWORD_REQUEST";

export const AUTH_SET_MARKETING_REQUEST = "AUTH_SET_MARKETING_REQUEST";
export const AUTH_SET_NICKNAME_REQUEST = "AUTH_SET_NICKNAME_REQUEST";
export const AUTH_SET_GENDER_REQUEST = "AUTH_SET_GENDER_REQUEST";
export const AUTH_SET_BIRTHDAY_REQUEST = "AUTH_SET_BIRTHDAY_REQUEST";

// action creator
export const loginRequestAction = (data: any) => {
  return {
    type: LOG_IN_REQUEST,
    data,
  };
};

export const logoutRequestAction = () => {
  return {
    type: LOG_OUT_REQUEST,
  };
};

const dummyUser = (data: any) => ({
  ...data,
  nickname: "잉락",
  id: 1,
  Posts: [{ id: 1 }],
  Followings: [
    { nickname: "삼락" },
    { nickname: "threera" },
    { nickname: "fdsffal" },
  ],
  Followers: [
    { nickname: "사락" },
    { nickname: "fourrack" },
    { nickname: "fdsff" },
  ],
});

const reducer = (state = initialState, action: any) =>
  produce(state, (draft: any) => {
    switch (action.type) {
      case LOG_IN_REQUEST:
        draft.logInLoading = true;
        draft.logInError = null;
        draft.logInDone = false;
        break;
      case LOG_IN_SUCCESS:
        draft.logInLoading = false;
        draft.me = dummyUser(action.data);
        draft.logInDone = true;
        break;
      case LOG_IN_FAILURE:
        draft.logInLoading = false;
        draft.logInError = action.error;
        break;
      case LOG_OUT_REQUEST:
        draft.logOutLoading = true;
        draft.logOutError = null;
        draft.logOutDone = false;
        break;
      case LOG_OUT_SUCCESS:
        draft.logOutLoading = false;
        draft.logOutDone = true;
        draft.me = null;
        break;
      case LOG_OUT_FAILURE:
        draft.logOutLoading = false;
        draft.logOutError = action.error;
        break;
      case SIGN_UP_REQUEST:
        draft.signUpLoading = true;
        draft.signUpError = null;
        draft.signUpDone = false;
        break;
      case SIGN_UP_SUCCESS:
        draft.signUpLoading = false;
        draft.signUpDone = true;
        break;
      case SIGN_UP_FAILURE:
        draft.signUpLoading = false;
        draft.signUpError = action.error;
        break;
      case CERTIFICATION_NUMBER_REQUEST:
        draft.certificationNumberLoading = true;
        draft.certificationNumberError = null;
        draft.certificationNumberDone = false;
        break;
      case CERTIFICATION_NUMBER_SUCCESS:
        draft.certificationNumberLoading = false;
        draft.certificationNumberDone = true;
        break;
      case CERTIFICATION_NUMBER_FAILURE:
        draft.certificationNumberLoading = false;
        draft.certificationNumberError = action.error;
        break;
      case AUTH_SET_PHONE_REQUEST:
        draft.phoneLoading = true;
        draft.phoneError = null;
        draft.phoneDone = false;
        break;
      case AUTH_SET_PHONE_SUCCESS:
        draft.signUpData = {
          ...draft.signUpData,
          phone: action.data["phone"],
        };
        draft.phoneLoading = false;
        draft.phoneDone = true;
        break;
      case AUTH_SET_PHONE_FAILURE:
        draft.phoneLoading = false;
        draft.phoneError = action.error;
        break;
      case AUTH_SET_PASSWORD_REQUEST:
        draft.signUpData = {
          ...draft.signUpData,
          password: action.data,
        };
        break;
      case AUTH_SET_MARKETING_REQUEST:
        draft.signUpData = {
          ...draft.signUpData,
          marketingAgree: action.data,
        };
        break;
      case AUTH_SET_NICKNAME_REQUEST:
        draft.signUpData = {
          ...draft.signUpData,
          nickname: action.data,
        };
        break;
      case AUTH_SET_GENDER_REQUEST:
        draft.signUpData = {
          ...draft.signUpData,
          gender: action.data,
        };
        break;
      case AUTH_SET_BIRTHDAY_REQUEST:
        draft.signUpData = {
          ...draft.signUpData,
          birthday: action.data,
        };
        break;

      default:
        break;
    }
  });

export default reducer;
