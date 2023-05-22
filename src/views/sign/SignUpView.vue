<script setup>
import axios from "axios";
import {reactive} from "vue";
import router from "@/router";
import store from "@/store/store";

let body = reactive({});
const LogInEvent = async ()=>{
    body = {
        userId: body.userId,
        password: body.password
    }
    await axios.post("http://localhost:8081/api/user/SignInUser",body).then(
        (res)=>{
            const code = res.data.code;
            const token = res.data.token;
            store.dispatch('setToken', token)
            if (!code) {
                alert("에러입니다.")
            } else if (code === 200) {
                alert("로그인에 성공하셧습니다.")
                router.push(
                    { name: 'home'}
                );
            }
        }
    )

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

                                <h2 class="fw-bold mb-2 text-uppercase">SignUp</h2>
                                <p class="text-white-50 mb-5">Please enter your login and password and Name!</p>

                                <div class="form-outline form-white mb-4">
                                    <input type="email" id="typeNameX" class="form-control form-control-lg"  v-model="body.name"/>
                                    <label class="form-label" for="typeNameX">Name</label>
                                </div>
                                <div class="form-outline form-white mb-4">
                                    <input type="email" id="typeEmailX" class="form-control form-control-lg"  v-model="body.userId"/>
                                    <label class="form-label" for="typeEmailX">Email</label>
                                </div>

                                <div class="form-outline form-white mb-4">
                                    <input type="password" id="typePasswordX" class="form-control form-control-lg"  v-model="body.password" />
                                    <label class="form-label" for="typePasswordX">Password</label>
                                </div>
                                <div class="form-outline form-white mb-4">
                                    <input type="password" id="typePasswordX_1" class="form-control form-control-lg" />
                                    <label class="form-label" for="typePasswordX_1">Password reconfirm</label>
                                </div>

                                <button type="submit" class="btn btn-outline-light btn-lg px-5" @click="LogInEvent">SignUp</button>

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