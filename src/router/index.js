import {createRouter, createWebHistory} from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from "../views/AboutView.vue"
import PostCreateView from '@/views/posts/PostCreateView.vue';
import PostDetailView from '@/views/posts/PostDetailView.vue';
import PostEditView from '@/views/posts/PostEditView.vue';
import PostListView from '@/views/posts/PostListView.vue';
import SignInView from "@/views/sign/SignInView.vue";
import SignUpView from "@/views/sign/SignUpView.vue";

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomeView
    },
    {
        path: '/about',
        name: 'about',
        component: AboutView
    },
    {
        path: '/posts',
        name: 'PostList',
        component: PostListView
    },
    {
        path: '/posts/create',
        name: 'PostCreate',
        component: PostCreateView
    },
    {
        path: '/posts/:id',
        name: 'PostDetail',
        component: PostDetailView
    },
    {
        path: '/posts/:id/edit',
        name: 'PostEdit',
        component: PostEditView
    }, {
        path: '/login',
        name: 'SignIn',
        component: SignInView
    }, {
        path: '/login/signup',
        name: 'SignUp',
        component: SignUpView
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
