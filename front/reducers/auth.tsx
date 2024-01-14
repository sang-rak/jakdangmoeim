import { produce } from "immer";

export interface User {
  id?: number;
  nickname?: string | null;
  phone?: string | null;
  password?: string | null;
  certificationNumber?: string | null;
}

export interface Info {
  id: string | number;
  User: User;
}

export interface State {
  signUpInformations: Info[];
  logInLoading: boolean; // 로그인 시도중
  logInDone: boolean;
  logInError: any;
  logOutLoading: boolean; // 로그아웃 시도중
  logOutDone: boolean;
  logOutError: any;
  signUpLoading: boolean; // 회원가입 시도중
  signUpDone: boolean;
  signUpError: any;
  me: User | null;
  signUpData: User | null;
  loginData: any;
  phone: string | null;
  certificationNumberCheck: string | null;
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
  me: null,
  signUpData: null,
  loginData: {},
  phone: null,
  certificationNumberCheck: null,
};

export const LOG_IN_REQUEST = "LOG_IN_REQUEST";
export const LOG_IN_SUCCESS = "LOG_IN_SUCCESS";
export const LOG_IN_FAILURE = "LOG_IN_FAILURE";

export const LOG_OUT_REQUEST = "LOG_OUT_REQUEST";
export const LOG_OUT_SUCCESS = "LOG_OUT_SUCCESS";
export const LOG_OUT_FAILURE = "LOG_OUT_FAILURE";

export const SIGN_UP_REQUEST = "SIGN_UP_REQUEST";
export const SIGN_UP_SUCCESS = "SIGN_UP_SUCCESS";
export const SIGN_UP_FAILURE = "SIGN_UP_FAILURE";

export const AUTH_SET_PHONE_REQUEST = "AUTH_SET_PHONE_REQUEST";
export const AUTH_SET_PHONE_SUCCESS = "AUTH_SET_PHONE_SUCCESS";
export const AUTH_SET_PHONE_FAILURE = "AUTH_SET_PHONE_FAILURE";

export const AUTH_SET_PASSWORD_REQUEST = "AUTH_SET_PASSWORD_REQUEST";
export const AUTH_SET_PASSWORD_SUCCESS = "AUTH_SET_PASSWORD_SUCCESS";
export const AUTH_SET_PASSWORD_FAILURE = "AUTH_SET_PASSWORD_FAILURE";

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
      case AUTH_SET_PHONE_REQUEST:
        draft.phoneLoading = true;
        draft.phoneError = null;
        draft.phoneDone = false;
        break;
      case AUTH_SET_PHONE_SUCCESS:
        draft.signUpData = {
          ...draft.signUpData,
          certificationNumberCheck: action.certificationNumberCheck,
        };
        draft.signUpData = {
          ...draft.signUpData,
          phone: action.data,
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

      default:
        break;
    }
  });

export default reducer;
