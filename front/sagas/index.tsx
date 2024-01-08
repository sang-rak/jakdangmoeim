import { all, fork } from "redux-saga/effects";

import postSaga from "./post";
import userSaga from "./user";
import authSaga from "./auth";

export default function* rootSaga() {
  yield all([fork(postSaga), fork(userSaga), fork(authSaga)]);
}
