export interface State {
  isLoggedIn: boolean;
  me: any;
  signUpData: any;
  loginData: any;
}

export interface LoginAction {
  type: "LOG_IN";
  data: any;
}

export interface LogoutAction {
  type: "LOG_OUT";
}

type Action = LoginAction | LogoutAction;

export const initialState = {
  isLoggedIn: false,
  me: null,
  signUpData: {},
  loginData: {},
};

// action creator
export const loginAction = (data: any) => {
  return {
    type: "LOG_IN",
    data,
  };
};

export const logoutAction = () => {
  return {
    type: "LOG_OUT",
  };
};

const reducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case "LOG_IN":
      return {
        ...state,
        isLoggedIn: true,
        me: action.data,
      };
    case "LOG_OUT":
      return {
        ...state,
        isLoggedIn: false,
        me: null,
      };
    default:
      return state;
  }
};

export default reducer;
