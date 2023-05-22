
import { createStore } from "vuex";
import axios from "axios";
import router from "@/router";



export default createStore({
    state: {
        token: '',
    },
    getters: {
        isLogin(state){
            return state.token == '' ? true : false ;
        }
    },
    mutations: {  // commit 으로 부를 수 있다.
        setToken(state, _token){
            state.token = _token;
            axios.defaults.headers.common['Authorization'] = `Bearer ${state.token}`
        },
        logout: function (state) {
            state.token = '';
            alert("로그아웃 되셧습니다")
            axios.get("http://localhost:8081/api/user/logout")
            axios.defaults.headers.common['Authorization'] = null;
            router.push({
                name : "home"
            })
        },
        loginCheck: async function (state){
           await axios.get(`http://localhost:8081/api/tokenCheck`,{headers:{Authenticate:'user'}}).then(
                res => {
                    const code = res.data.code;
                    console.log(code)
                    if(code === 419 ){
                        return alert(res.data.msg)
                    }else if(code === 401){
                        return alert(res.data.msg)
                    }else {
                        return state.token
                    }
                }).catch(e=>{
                    router.push(
                        {
                            name : 'SignIn'
                        }
                        )
                    console.log(e,"로그인에 실패하셧습니다");
            })
        }
    },
    actions: { // dispatch 로 부를 수 있다.
        setToken:({commit} , _token) => {
            commit('setToken' , _token);
        }
    }
})