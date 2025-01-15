import { createApp } from 'vue';
import App from '@/App.vue';
import router from './router';
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
    apiKey: "AIzaSyCbSUS_pV-UWOYAs0fmp4x7UDC71XL0_mg",
    authDomain: "reviews-4cdef.firebaseapp.com",
    projectId: "reviews-4cdef",
    storageBucket: "reviews-4cdef.appspot.com",
    messagingSenderId: "244943566829",
    appId: "1:244943566829:web:190417e7469f1dbbb2d9e4",
    measurementId: "G-E0VC6ED29V"
};

const firebaseApp = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebaseApp);

const app = createApp(App);
app.use(router);
app.mount('#app');
