import axios from "axios";
import { all, call, delay, fork, put, takeLatest } from "redux-saga/effects";
import {
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_IN_FAILURE,
  LOG_OUT_REQUEST,
  LOG_OUT_SUCCESS,
  LOG_OUT_FAILURE,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
} from "../reducers/user";
import {
  AUTH_SET_PHONE_REQUEST,
  AUTH_SET_PHONE_FAILURE,
  AUTH_SET_PHONE_SUCCESS,
} from "../reducers/auth";

function logInAPI(data: any) {
  return axios.post("/api/login", data);
}

function* logIn(action: any) {
  try {
    yield delay(1000);
    // const result = yield call(logInAPI, action.data);
    yield put({
      type: LOG_IN_SUCCESS,
      data: action.data,
    });
  } catch (err: any) {
    console.error(err);
    yield put({
      type: LOG_IN_FAILURE,
      error: err.response.data,
    });
  }
}

function logOutAPI() {
  return axios.post("/api/logout");
}

function* logOut() {
  try {
    yield delay(1000);
    // const result = yield call(logOutAPI);
    yield put({
      type: LOG_OUT_SUCCESS,
    });
  } catch (err: any) {
    yield put({
      type: LOG_OUT_FAILURE,
      error: err.response.data,
    });
  }
}

function signUpAPI() {
  return axios.post("/api/signUp");
}

function* signUp() {
  try {
    // const result = yield call(signUpAPI);
    yield put({
      type: SIGN_UP_SUCCESS,
    });
  } catch (err: any) {
    yield put({
      type: SIGN_UP_FAILURE,
      error: err.response.data,
    });
  }
}

function phoneCertificationnumberAPI(data: any): any {
  console.log(data);
  // return axios.post("/api/signUp")
  return data.substr(-4);
}

function* phoneCertificationnumber(action: any): any {
  try {
    const result = yield call(phoneCertificationnumberAPI, action.data);
    const crtificationNumber = result;
    yield put({
      type: AUTH_SET_PHONE_SUCCESS,
      data: action.data,
      crtificationNumber: crtificationNumber,
    });
  } catch (err: any) {
    yield put({
      type: AUTH_SET_PHONE_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchLogIn() {
  yield takeLatest(LOG_IN_REQUEST, logIn);
}

function* watchLogOut() {
  yield takeLatest(LOG_OUT_REQUEST, logOut);
}

function* watchSignUp() {
  yield takeLatest(SIGN_UP_REQUEST, signUp);
}

function* watchPhoneCertificationnumber() {
  yield takeLatest(AUTH_SET_PHONE_REQUEST, phoneCertificationnumber);
}

export default function* userSaga() {
  yield all([
    fork(watchLogIn), // call
    fork(watchLogOut),
    fork(watchSignUp),
    fork(watchPhoneCertificationnumber),
  ]);
}