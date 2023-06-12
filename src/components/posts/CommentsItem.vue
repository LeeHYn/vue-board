<script setup>
import { defineProps,ref  } from 'vue'
import CommentersItem from "@/components/posts/CommentersItem.vue";
// props 정의
defineProps({
    id: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    createdAt: {
        type: [String, Date, Number]
    },
    commenter: Array
});

// 답글 토글 로직
let showReplyBox = ref(false);

const toggleReplyBox = () => {
    showReplyBox.value = !showReplyBox.value;
}
</script>

<template>
    <div class="commentItem">
        <div class="col-auto me-auto">
            <div class="col-12 commentUser">{{ name }} {{ createdAt }} </div>
            <div class="commentContent">{{ content }}</div>
        </div>
        <div class="commentButtons">
            <button class="btn btn-outline-primary" >수정</button>
            <button class="btn btn-outline-danger">삭제</button>
            <button class="btn btn-outline-success" @click="toggleReplyBox">답글</button>
        </div>
        <div class="components" v-if="showReplyBox">
            <CommentersItem :id="id" />
        </div>
        <div v-for="subComment in commenter.filter(c=>c.parents_comment===id)" :key="subComment.id" class="cocomment">
            <CommentsItem
                :id="subComment.id"
                :name="subComment.name"
                :content="subComment.content"
                :createdAt="subComment.createdAt"
                :commenter="commenter"
            />
        </div>
    </div>
</template>

<style scoped>
.commentItem {
    border: 1px solid #000;
    margin-bottom: 10px;
    width: 100%;
    padding: 10px;
}
.commentUser {
    font-weight: bold;
}
.commentContent {
    margin-top: 10px;
    margin-bottom: 10px;
}
.commentButtons {
    margin-bottom: 10px;
}
.components{
    margin-top: 10px;
    padding: 10px;
    border: 1px solid #ddd;
    background-color: #fff;
    border-radius: 5px;
}
.cocomment{
    margin-left: 30px;  /* 여기에 들여쓰기 값을 설정합니다 */
    border-left: 2px solid #ddd;  /* 이 부분을 추가하여 댓글과 대댓글을 구분합니다 */
    padding-left: 10px;  /* 왼쪽 테두리와 텍스트 사이의 간격을 설정합니다 */
}
</style>