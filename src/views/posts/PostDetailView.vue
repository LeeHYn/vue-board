<script setup>
import { useRouter, useRoute } from 'vue-router';
import axios from "axios";
import {ref} from "vue";
// eslint-disable-next-line no-unused-vars
import CommentsItem from "@/components/posts/CommentsItem.vue"
import store from "@/store/store";
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

let commenter = ref([]);
const db_comment_data = async () => {

    const dbMap = await axios.get("http://localhost:8081/api/comment/getComment", {params:{"id":route.params.id}});
    const _comments = dbMap.data && dbMap.data.flatMap((commentArray) => {
        return commentArray.map((comment) => {
            try {
                console.log("comment:", comment);

                return {
                    id: comment.id,
                    name: comment.name,
                    content: comment.content,
                    createdAt: comment.createdAt,
                    updatedAt: comment.updatedAt,
                    parents_comment: comment.parents_comment,
                    child_comment: comment.child_comment,
                    myNum: comment.myNum
                };
            } catch (error) {
                console.log("Mapping error:", error);
                return null; // or handle the error as per your requirements
            }
        });
    });
    const uniqueComments = _comments.filter((comment, index, self) =>
            index === self.findIndex((c) => (
                c.id === comment.id && c.createdAt === comment.createdAt
            ))
    );
    console.log(uniqueComments)
    console.log("_comments:", _comments);
    let db_board =[]
    commenter.value = db_board.concat(uniqueComments)
    console.log(commenter.value)
};

// eslint-disable-next-line no-undef
db_comment_data();
const createdChat = async ()=>{
    body = {
        content:body.comment,
        userId:store.state.userId,
        id: route.params.id,
        parents_comment:0,
    }
    console.log(body)
    await axios.post("http://localhost:8081/api/comment/createComment", body)
        .then(res => {
            console.log('SUCCESS!!');
            console.log(res.data)
            const code = res.data.code;
            if (!code) {
                alert("에러입니다.")
            } else if (code === 200) {
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
        <br>
        <div v-for="comment in commenter.filter(c=>c.parents_comment===0)" :key="comment.id">
            <CommentsItem
                :id="comment.id"
                :name="comment.name"
                :content="comment.content"
                :createdAt="comment.createdAt"
                :commenter="commenter"
            />
        </div> <!-- :commenter="commenter"// CommentsItem에 전체 댓글 목록을 전달합니다.-->

        <br>
        <div>
            <textarea class="comments" v-model="body.comment"></textarea>
            <div class="row g-2">
                <div class="col-auto me-auto"></div>
                <div class="col-auto">
                <button class="btn btn-outline-success" @click="createdChat">작성</button>
                </div>
            </div>
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
.cocomment{
    margin-inline-start: 1.5rem;
    background-color: lightblue;
}
</style>