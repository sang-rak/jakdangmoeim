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
  AUTH_SET_PHONE_REQUEST,
  AUTH_SET_PHONE_FAILURE,
  AUTH_SET_PHONE_SUCCESS,
  CERTIFICATION_NUMBER_REQUEST,
  CERTIFICATION_NUMBER_SUCCESS,
  CERTIFICATION_NUMBER_FAILURE,
} from "../reducers/auth";
import axiosInstance from "../api/utils/instance";

function logInAPI(data: any): any {
  return axiosInstance.post("/api/v1/auth/login", data);
}

function* logIn(action: any): any {
  try {
    const result = yield call(logInAPI, action.data);
    yield put({
      type: LOG_IN_SUCCESS,
      data: action.data,
    });
  } catch (err: any) {
    yield put({
      type: LOG_IN_FAILURE,
      error: err.response.data,
    });
  }
}

function logOutAPI() {
  return axiosInstance.post("/api/logout");
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

function signUpAPI(data: any): any {
  return axiosInstance.post("/api/v1/auth/signup", data);
}

function* signUp(action: any): any {
  try {
    const result = yield call(signUpAPI, action.data);
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
  return axiosInstance.post("/api/v1/auth/certificationNumber", data);
}

function* phoneCertificationnumber(action: any): any {
  try {
    const result = yield call(phoneCertificationnumberAPI, action.data);
    yield put({
      type: AUTH_SET_PHONE_SUCCESS,
      data: action.data,
    });
  } catch (err: any) {
    yield put({
      type: AUTH_SET_PHONE_FAILURE,
      error: err.response.data,
    });
  }
}

function certificationNumberCheckAPI(data: any): any {
  return axiosInstance.post("/api/v1/auth/certificationNumberCheck", data);
}

function* certificationNumberCheck(action: any): any {
  try {
    const result = yield call(certificationNumberCheckAPI, action.data);
    yield put({
      type: CERTIFICATION_NUMBER_SUCCESS,
    });
  } catch (err: any) {
    yield put({
      type: CERTIFICATION_NUMBER_FAILURE,
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

// 인증번호 요청
function* watchPhoneCertificationnumber() {
  yield takeLatest(AUTH_SET_PHONE_REQUEST, phoneCertificationnumber);
}

// 인증번호 확인 요청
function* watchCertificationNumberCheck() {
  yield takeLatest(CERTIFICATION_NUMBER_REQUEST, certificationNumberCheck);
}

export default function* userSaga() {
  yield all([
    fork(watchLogIn), // 로그인
    fork(watchLogOut), // 로그아웃
    fork(watchSignUp), // 회원가입
    fork(watchPhoneCertificationnumber), // 인증번호 요청
    fork(watchCertificationNumberCheck), // 인증번호 확인 요청
  ]);
}
