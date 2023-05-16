<template>
    <header>
        <nav class="navbar navbar-expand-lg bg-body-tertiary navbar-dark bg-primary">
            <div class="container-fluid">
                <a class="navbar-brand" href="#">Vue3 Coding</a>
                <button
                        class="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                >
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav me-auto">
                        <li class="nav-item">
                            <RouterLink class="nav-link" active-class="active" to="/">Home</RouterLink>
                        </li>
                        <li class="nav-item">
                            <RouterLink class="nav-link" active-class="active" to="/about">About</RouterLink>
                        </li>
                        <li class="nav-item">
                            <RouterLink class="nav-link" active-class="active" to="/posts">게시글</RouterLink>
                        </li>
                    </ul>
                    <div class="d-flex">
                        <button v-if="isStatusOn" class="btn btn-outline-light" type="button" @click="goPage" >로그인</button>
                        <button v-if="isStatusOff" class="btn btn-outline-light" type="button" @click="goPage" >로그아웃</button>
                    </div>
                </div>
            </div>
        </nav>
    </header>
</template>

<script setup>
import {useRouter} from 'vue-router';
const isStatusOn = true;
const isStatusOff = false;

const router = useRouter();

const goPage = () => {
    router.push({
        name: 'SignIn'
    });
};


</script>

<style scoped></style>