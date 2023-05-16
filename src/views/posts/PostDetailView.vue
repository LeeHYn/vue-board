<script setup>
import { useRouter, useRoute } from 'vue-router';
import axios from "axios";
import {ref} from "vue";

const route = useRoute();
const router = useRouter();
const id = route.params.id;

let body = {
    id:route.params.id
}

let board=ref({
    boardTitle: "",
    boardContent: "",
    updatedAt:""
});
const goListPage = () => {
    router.push({
        name: 'PostList'
    });
};

const goEditPage = () => {
    router.push({
        name: 'PostEdit',
        params: {
            id
        }
    });
};
const editboard = async ()=>{
    try {
        await axios.post("http://localhost:8081/api/board/getBoard",body).then((res)=>{
            // eslint-disable-next-line no-unused-vars
             board.value = res.data;
        }
        )
        console.log(board);
        return board
    }catch (e){
        console.log(e)
    }
}
// eslint-disable-next-line no-undef
editboard();

const boardDelete = async ()=>{

    try {
        await axios.delete("http://localhost:8081/api/board/boardDelete",{data:{
            id:route.params.id
            }}).then(res => {
            const code = res.data.code;
            if (!code) {
                alert("에러입니다.")
            } else if (code === 200) {
                alert("게시물 삭제에 성공하셧습니다.")
                router.push({ name: 'PostList' });
            }
        })

    }catch (e){
        console.log(e)
    }
}
</script>

<template>
    <div>
        <h2>{{board.boardTitle}}</h2>
        <p class="text-muted">{{board.updatedAt}}</p>
        <p>{{board.boardContent}}</p>

        <hr class="my-4" />
        <div class="row g-2">
            <div class="col-auto me-auto"></div>
            <div class="col-auto">
                <button class="btn btn-outline-dark" @click="goListPage">목록</button>
            </div>
            <div class="col-auto">
                <button class="btn btn-outline-primary" @click="goEditPage">수정</button>
            </div>
            <div class="col-auto">
                <button class="btn btn-outline-danger" @click="boardDelete">삭제</button>
            </div>
        </div>
    </div>
</template>

<style scoped></style>