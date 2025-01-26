import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../views/HomePage.vue';
import EditTaskPage from '../views/EditTaskPage.vue';
import AboutPage from '../views/AboutPage.vue';
import NotFoundPage from '../views/NotFoundPage.vue';

const routes = [
    { path: '/', component: HomePage },
    { path: '/about', component: AboutPage },
    { path: '/edit/:id', component: EditTaskPage, props: true },
    { path: '/:pathMatch(.*)*', component: NotFoundPage },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
