<script setup>
import axios from "axios";
import {reactive} from "vue";
import router from "@/router";
import store from "@/store/store";
import VueCookies from "vue-cookies";

let body = reactive({});
const LogInEvent = async () => {
    body = {
        userId: body.userId,
        password: body.password
    }
    await axios.post("http://localhost:8081/api/user/SignInUser", body).then(
        (res) => {
            const code = res.data.code;
            const accessToken = res.data.accessToken;
            const userId = res.data.userId

            const userInfo = {accessToken,userId}
            VueCookies.set('accessToken', accessToken, '60 * 60 * 1000');
            VueCookies.set('refresh_token', res.data.refresh_token, '1d');

            console.log(VueCookies.get('accessToken'))
            axios.defaults.headers['accessToken'] = VueCookies.get('accessToken');
            console.log(userId)
            console.log(store.state)

            store.commit('setLogIn', userInfo);
            console.log(store.state)
            if (!code) {
                alert("에러입니다.")
            } else if (code === 200) {
                alert("로그인에 성공하셧습니다.")
                router.push(
                    {name: 'home'}
                );
            }
        }
    )

}

const signUpPage = () => {
    router.push({
        name: 'SignUp'
    });
}
</script>

<template>
    <section class="vh-100 gradient-custom">
        <div class="container py-5 h-100">
            <div class="row d-flex justify-content-center align-items-center h-100">
                <div class="col-12 col-md-8 col-lg-6 col-xl-5">
                    <div class="card bg-dark text-white" style="border-radius: 1rem;">
                        <div class="card-body p-5 text-center">

                            <div class="mb-md-5 mt-md-4 pb-5">

                                <h2 class="fw-bold mb-2 text-uppercase">Login</h2>
                                <p class="text-white-50 mb-5">Please enter your login and password!</p>

                                <div class="form-outline form-white mb-4">
                                    <input type="email" id="typeEmailX" class="form-control form-control-lg"
                                           v-model="body.userId"/>
                                    <label class="form-label" for="typeEmailX">Email</label>
                                </div>

                                <div class="form-outline form-white mb-4">
                                    <input type="password" id="typePasswordX" class="form-control form-control-lg"
                                           v-model="body.password"/>
                                    <label class="form-label" for="typePasswordX">Password</label>
                                </div>

                                <p class="small mb-5 pb-lg-2"><a class="text-white-50" href="#!">Forgot password?</a>
                                </p>

                                <button type="submit" class="btn btn-outline-light btn-lg px-5" @click="LogInEvent">
                                    Login
                                </button>

                                <div class="d-flex justify-content-center text-center mt-4 pt-1">
                                    <a href="#!" class="text-white"><i class="fab fa-facebook-f fa-lg"></i></a>
                                    <a href="#!" class="text-white"><i class="fab fa-twitter fa-lg mx-4 px-2"></i></a>
                                    <a href="#!" class="text-white"><i class="fab fa-google fa-lg"></i></a>
                                </div>
                            </div>

                            <div>
                                <p class="mb-0">Don't have an account? <a @click="signUpPage"
                                                                          class="text-white-50 fw-bold">Sign Up</a>
                                </p>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>


<style lang="scss" scoped>

</style>