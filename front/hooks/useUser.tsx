import { CHANGE_PASSWORD_REQUEST } from "../reducers/user";

export const ChangePasswordRequest = (data: {}) => {
  return {
    type: CHANGE_PASSWORD_REQUEST,
    data,
  };
};
