<script setup>
import PostItem from '@/components/posts/PostItem.vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from "axios";
let posts = ref([]);
const router = useRouter();


// eslint-disable-next-line no-unused-vars
const dbdata = async ()=>{
    try {
        const dbmap = await axios.get("http://localhost:8081/api/board/getBoards");
        const _posts = await dbmap.data.map((posts) => ({
            id: posts.id,
            boardTitle: posts.boardTitle,
            boardContent: posts.boardContent,
            createdAt: posts.createdAt
        }))
        let dbboard=[];
        posts.value = dbboard.concat(_posts);
        console.log(_posts)
        console.log(dbboard)
        console.log(posts)
    }catch (e){
        console.log(e)
    }
}
// eslint-disable-next-line no-undef
dbdata();


const goPage = id => {
    router.push({
        name: 'PostDetail',
        params: {
            // eslint-disable-next-line no-undef
            id
        }
    }
    );
};
const gocreatePage = () => {
    router.push({
        name: 'PostCreate'
    });
};
</script>

<template>
    <div>
        <h2>게시글 리스트</h2>
        <hr class="my-4" />
        <div class="row g-3">
            <div class="col-4" v-for="post in posts" :key="post.id">
                <PostItem :title="post.boardTitle" :content="post.boardContent" :created-at="post.createdAt" @click="goPage(post.id)" />
            </div>
        </div>
        <hr class="my-4" />
        <div class="row g-2">
            <div class="col-auto me-auto"></div>
            <div class="col-auto">
                <button class="btn btn-outline-dark" @click="gocreatePage">글쓰기</button>
            </div>

        </div>
    </div>
</template>

<style scoped></style>