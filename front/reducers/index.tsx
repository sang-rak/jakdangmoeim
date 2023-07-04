import { HYDRATE } from "next-redux-wrapper";
import { combineReducers } from "redux";
import user from "./user";
import post from "./post";

// (이전 상태, 액션) => 다음상태
const rootReducer = combineReducers({
  index: (state: any = {}, action) => {
    switch (action.type) {
      case HYDRATE:
        console.log("HYDRATE", action);
        return { ...state, ...action.payload };

      default:
        return state;
    }
  },
  user,
  post,
});

export default rootReducer;

// 루트 리듀서의 반환값를 유추
// 이 타입을 컨테이너 컴포넌트에서 불러와서 사용
export type RootState = ReturnType<typeof rootReducer>;
