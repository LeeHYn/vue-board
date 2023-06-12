import {createStore} from "vuex";
import axios from "axios";
import router from "@/router";
import VueCookies from "vue-cookies";

export default createStore({
    state: {
        token: '',
        userId: ''
    },
    getters: {
        isLogin(state) {
            return state.token == '' ? true : false;
        }
    },
    mutations: {  // commit 으로 부를 수 있다.
        setLogIn(state, userInfo) {
            state.token = userInfo.accessToken;
            state.userId = userInfo.userId;
        },
        logout: function (state) {
            if (state.token) {
                state.token = '';
                state.userId = '';
                alert("로그아웃 되셧습니다")
                //axios.get("http://localhost:8081/api/user/logout")
                axios.defaults.headers.common['Authorization'] = null;
                router.push({
                    name: "home"
                })
            }
        },
        loginCheck: async function (state) {
            console.log(VueCookies.get('accessToken'))
            await axios.get(`http://localhost:8081/api/tokenCheck`, {headers: {"accessToken": VueCookies.get('accessToken')}}).then(
                res => {
                    const code = res.status;
                    console.log(code)
                    if (code === 400) {
                        return alert(res.data.msg), router.push({name: 'SignIn'})

                    } else if (code === 200) {
                        console.log(res.data.msg)
                        state.token = res.data.token
                        return state.token
                    }
                }).catch(e => {
                console.log(e);
                router.push(
                    {
                        name: 'SignIn'
                    }
                )

            })
        }
    },
    actions: { // dispatch 로 부를 수 있다.
        setToken: ({commit}, _token) => {
            commit('setToken', _token);
        }
    }
})