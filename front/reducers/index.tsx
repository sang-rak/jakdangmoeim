import { HYDRATE } from "next-redux-wrapper";
import { AnyAction } from "redux";

export interface UserState {
  isLoggedIn: boolean;
  user: any | null;
  signUpData: any;
  loginData: any;
}

export interface PostState {
  mainPosts: any[];
}

export interface RootState {
  user: UserState;
  post: PostState;
}

export const initialState: RootState = {
  user: {
    isLoggedIn: false,
    user: null,
    signUpData: {},
    loginData: {},
  },
  post: {
    mainPosts: [],
  },
};

// action creator
export const loginAction = (data: any): AnyAction => {
  return {
    type: "LOG_IN",
    data,
  };
};

export const logoutAction = (): AnyAction => {
  return {
    type: "LOG_OUT",
  };
};

// (이전 상태, 액션) => 다음상태
const rootReducer = (state: RootState = initialState, action: AnyAction) => {
  switch (action.type) {
    case HYDRATE:
      console.log("HYDRATE", action);
      return { ...state, ...action.payload };

    case "LOG_IN":
      return {
        ...state,
        user: {
          ...state.user,
          isLoggedIn: true,
          user: action.data,
        },
      };
    case "LOG_OUT":
      return {
        ...state,
        user: {
          ...state.user,
          isLoggedIn: false,
          user: null,
        },
      };
    default:
      return state;
  }
};

export default rootReducer;
