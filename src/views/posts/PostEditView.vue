<script setup>
import { useRoute, useRouter } from 'vue-router';
import {reactive} from "vue";
import axios from "axios";

const router = useRouter();
const route = useRoute();

const goDetailPage = () => {
    router.push({
        name: 'PostDetail',
        params: {
            id: route.params.id
        }
    });
};
let body = reactive({});
const updateBoard = async ()=>{
    body = {
        id: route.params.id,
        boardTitle:body.title,
        boardContent:body.content,
    }
    console.log(body)
    await axios.post("http://localhost:8081/api/api/board/updateBoard", body)
        .then(res => {
            const code = res.data.code;
            if (!code) {
                alert("에러입니다.")
            } else if (code === 200) {
                // eslint-disable-next-line no-restricted-globals
                alert("게시물 변경에 성공하셧습니다.")
                router.push({ name: 'PostList' });
            }
        })
}
</script>

<template>
    <div>
        <h2>게시글 수정</h2>
        <hr class="my-4" />
        <form @submit.prevent.stop>
            <div class="mb-3">
                <label for="title" class="form-label">제목</label>
                <input type="text" class="form-control" id="title" v-model="body.title"/>
            </div>
            <div class="mb-3">
                <label for="content" class="form-label">내용</label>
                <textarea class="form-control" id="content" rows="3"   v-model="body.content"></textarea>
            </div>
            <div class="pt-4">
                <button type="button" class="btn btn-outline-danger me-2" @click="goDetailPage">취소</button>
                <button type="submit" class="btn btn-primary" @click="updateBoard">수정</button>
            </div>
        </form>
    </div>
</template>

<style scoped></style>