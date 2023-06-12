<script setup>
import PostItem from '@/components/posts/PostItem.vue';
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import axios from "axios";
let posts = ref([]);
const router = useRouter();
const pageSize = 6; // Define the number of posts per page
const pageCount = computed(() => Math.ceil(posts.value.length / pageSize)); // Calculate total pages
const currentPage = ref(1); // Current page

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

        console.log(dbmap)
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
    });
};
const gocreatePage = () => {
    router.push({
        name: 'FileCreate'
    });
};

const paginatedData = computed(() => {
    const start = (currentPage.value - 1) * pageSize; // Calculate the start index
    const end = start + pageSize; // Calculate the end index
    return posts.value.slice(start, end); // Return the current page of posts
});

const nextPage = () => {
    if(currentPage.value < pageCount.value) currentPage.value++;
};

const prevPage = () => {
    if(currentPage.value > 1) currentPage.value--;
};
</script>

<template>
    <div>
        <h2>게시글 리스트</h2>
        <hr class="my-4" />
        <div class="row g-3">
            <div class="col-4" v-for="post in paginatedData" :key="post.id">
                <PostItem :title="post.boardTitle" :content="post.boardContent" :created-at="post.createdAt" @click="goPage(post.id)" />
            </div>
        </div>
        <hr class="my-4" />
        <div class="row g-2">
            <div class="col-auto me-auto">
                <nav>
                    <ul class="pagination">
                        <li class="page-item">
                            <button class="page-link" @click="prevPage" :disabled="currentPage.value === 1">Previous</button>
                        </li>
                        <li v-for="number in pageCount" :key="number" class="page-item" :class="{'active': number === currentPage.value}" @click="() => (currentPage.value = number)">
                            <button class="page-link">{{ number }}</button>
                        </li>
                        <li class="page-item">
                            <button class="page-link" @click="nextPage" :disabled="currentPage.value === pageCount.value">Next</button>
                        </li>
                    </ul>
                </nav>
            </div>
            <div class="col-auto">
                <button class="btn btn-outline-dark" @click="gocreatePage">글쓰기</button>
            </div>
        </div>
    </div>
</template>

<style scoped></style>