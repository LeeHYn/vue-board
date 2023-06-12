<script setup>
// eslint-disable-next-line no-undef
import store from "@/store/store";
import axios from "axios";
import {useRoute, useRouter} from "vue-router";
const route = useRoute();
const router = useRouter();
import { defineProps } from 'vue'
const props = defineProps({
    id: {
        type: Number,
        required: true
    }
});
let body = {
    id:route.params.id
}
const createdChat2 = async ()=>{
    body = {
        content:body.comment,
        userId:store.state.userId,
        id: route.params.id,
        parents_comment:props.id,
    }
    console.log(body)
    await axios.post("http://localhost:8081/api/comment/createComment", body)
        .then(res => {
            console.log('SUCCESS!!');
            console.log(res.status)
            const status = res.status
            // eslint-disable-next-line no-cond-assign
            if (status === 500) {
                alert("에러입니다.")
            } else if (status === 200) {
                // eslint-disable-next-line no-restricted-globals
                alert("댓글 등록에 성공하셧습니다.")
                router.push({ name: 'PostList' });
            }
        }).catch(function () {
            console.log('FAILURE!!');
        });
}

</script>

<template>
    <textarea class="comments" v-model="body.comment"></textarea>
    <div class="row g-2">
        <div class="col-auto me-auto"></div>
        <div class="col-auto">
            <button class="btn btn-outline-success" @click="createdChat2">작성</button>
        </div>
    </div>
</template>

<style scoped>
.comments{
    border:1px solid #000;
    margin-bottom:10px;
    width: 100%;
    height: 10%;
}
</style>