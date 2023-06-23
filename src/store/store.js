import { createStore } from "vuex";
import axios from "axios";
import router from "@/router";
import VueCookies from "vue-cookies";

export default createStore({
    state: {
        token: "",
        userId: ""
    },
    getters: {
        isLogin(state) {
            return state.token !== "";
        }
    },
    mutations: {
        setLogIn(state, userInfo) {
            state.token = userInfo.accessToken;
            state.userId = userInfo.userId;
        },
        logout(state) {
            if (state.token) {
                state.token = "";
                state.userId = "";
                VueCookies.remove("accessToken");
                VueCookies.remove("refresh_token");
                alert("로그아웃 되셨습니다.");
                router.push({ name: "home" });
            }
        },
        updateToken(state, newToken) {
            state.token = newToken;
            VueCookies.set("accessToken", newToken, "1h");
        }
    },
    actions: {
        async refreshToken({ commit }) {
            const refreshToken = VueCookies.get("refresh_token");
            if (!refreshToken) {
                return; // 리프레시 토큰이 없으면 종료
            }

            try {
                const response = await axios.post(
                    "http://localhost:8081/api/token/refresh",
                    { refresh_token: refreshToken }
                );
                const newAccessToken = response.data.access_token;

                // 토큰 정보 업데이트
                commit("updateToken", newAccessToken);
            } catch (error) {
                console.error(error);
            }
        }
    }
});