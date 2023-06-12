<script setup>
import { useRouter } from 'vue-router';
import axios from "axios";
import {reactive} from "vue";
const router = useRouter();
let body = reactive({});

function goListPage() {
    router.push({ name: 'PostList' });
}
const createdBoard = async ()=>{
    body = {
        boardTitle:body.title,
        boardContent:body.content,
    }
    console.log(body)
    await axios.post("http://localhost:8081/api/board/addBoard", body)
        .then(res => {
            console.log('SUCCESS!!');
            console.log(res.data)
            const code = res.data.code;
            if (!code) {
                alert("에러입니다.")
            } else if (code === 200) {
                // eslint-disable-next-line no-restricted-globals
                alert("게시물 등록에 성공하셧습니다.")
                router.push({ name: 'PostList' });
            }
        }).catch(function () {
            console.log('FAILURE!!');
        });
}


</script>

<template>
    <div>
        <h2>게시글 등록</h2>
        <hr class="my-4" />
        <form @submit.prevent.stop >
            <div class="mb-3">
                <label for="title" class="form-label">제목</label>
                <input type="text" class="form-control" id="title" v-model="body.title"/>
            </div>
            <div class="mb-3">
                <label for="content" class="form-label">내용</label>
                <textarea class="form-control" id="content" rows="3" v-model="body.content"></textarea>
            </div>
            <br>

            <div class="pt-4">
                <button type="button" class="btn btn-outline-dark me-2" @click="goListPage">목록</button>
                <button type="submit" class="btn btn-primary" @click="createdBoard">저장</button>
            </div>
            <br>
        </form>
    </div>
</template>

<style scoped></style>