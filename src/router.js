import { createRouter, createWebHistory } from 'vue-router';
import MyProfile from "@/views/MyProfile.vue";
import Favorites from "@/components/Favorites.vue";
import Authorization from "@/components/Authorization.vue";
import Reviews from "@/views/Reviews.vue";
import UpdateInfo from "@/views/UpdateInfo.vue";
import UserProfile from "@/views/UserProfile.vue";
import Login from './components/Login.vue';
import Chat from "@/components/Chat.vue";
import Statistics from "@/components/Statistics.vue";
import Friends from "@/components/Friends.vue" // Импортируем новый компонент

const routes = [
    {
        path: '/user/:id',
        name: 'UserProfile',
        component: UserProfile,
        props: true
    },
    { path: '/my-profile', component: MyProfile },
    { path: '/authorization', component: Authorization },
    { path: '/login', component: Login },
    { path: '/reviews', component: Reviews },
    { path: '/update-info', component: UpdateInfo },
    { path: '/favorites', component: Favorites },
    { 
        path: '/chat/:userName', // Новый маршрут для чата
        name: 'Chat',
        component: Chat,
        props: true // Передаём параметры как пропсы
    },
    { path: '/statistics', component: Statistics },
    { path: '/friends', component: Friends }, // Новый маршрут для страницы друзей
    { path: '/', redirect: '/reviews', component: Reviews },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
