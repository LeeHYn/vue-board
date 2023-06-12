<template>
    <div>
        <h2>게시글 등록</h2>
        <hr class="my-4" />
        <form @submit.prevent.stop>
            <div class="mb-3">
                <label for="title" class="form-label">제목</label>
                <input type="text" class="form-control" id="title" v-model="body.title" />
            </div>
            <br>

            <div class="mb-3">
                <input type="file" id="files" multiple @change="handleFileChange" />
            </div>

            <div class="mb-3">
                <label for="content" class="form-label">내용</label>
                <textarea class="form-control" id="content" rows="3" v-model="body.content"></textarea>
            </div>

            <div class="pt-4">
                <button type="button" class="btn btn-outline-dark me-2" @click="goListPage">목록</button>
                <button type="submit" class="btn btn-primary" @click="createdBoard">저장</button>
            </div>
            <br>
        </form>
    </div>
</template>

<script>
import { useRouter } from 'vue-router';
import axios from 'axios';
import { reactive } from 'vue';

export default {
    setup() {
        const router = useRouter();
        const body = reactive({
            title: '',
            content: '',
            files: [],
        });

        function goListPage() {
            router.push({ name: 'PostList' });
        }

        async function createdBoard() {
            const formData = new FormData();
            formData.append('boardTitle', body.title);
            formData.append('boardContent', body.content);
            for (let i = 0; i < body.files.length; i++) {
                formData.append('files', body.files[i]);
            }

            try {
                await axios.post('http://localhost:8081/api/file/upload', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });

                alert('게시물 등록에 성공하셨습니다.');
                await router.push({name: 'PostList'});
            } catch (error) {
                console.error(error);
                alert('에러입니다.');
            }
        }

        function handleFileChange(event) {
            body.files = event.target.files;
        }

        return {
            body,
            goListPage,
            createdBoard,
            handleFileChange,
        };
    },
};
</script>

<style scoped></style>