import { createWrapper } from "next-redux-wrapper";
import { applyMiddleware, createStore, compose } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";
import reducer from "../reducers";
import rootSaga from "../sagas";

const configureStore = (context: any) => {
  console.log(context);
  const sagaMiddleware = createSagaMiddleware();
  const middlewares: any = [sagaMiddleware];
  const enhancer =
    process.env.NODE_ENV === "production"
      ? compose(applyMiddleware(...middlewares)) // 운영
      : composeWithDevTools(applyMiddleware(...middlewares)); // 개발
  const store: any = createStore(reducer, enhancer);
  store.sagaTask = sagaMiddleware.run(rootSaga);
  return store;
};

const wrapper = createWrapper(configureStore, {
  debug: process.env.NODE_ENV === "development",
});

export default wrapper;
