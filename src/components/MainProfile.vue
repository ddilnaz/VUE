<template>
  <div class="profile">
    <div class="profile-container">
      
      <img :src="profileImage" :alt="`${name}'s Profile Image`" class="profile-image" />
      <div class="info">
        <h1 class="name">{{ name }}</h1>
        <h3 class="info-item">Age: {{ age }}</h3>
        <h3 class="info-item">Country: {{ country }}</h3>
        <h3 class="info-itemactivity">Activity: {{ lastActivity }}</h3>
        <!-- <h3 class="info-item">
           Rating:
          <span class="rating-stars">
            <span v-for="star in 5" :key="star" class="star" :class="{ 'filled': star <= Math.floor(ratings) }">★</span>
          </span>
        </h3> -->
        <h3 class="info-item">
          Rating:
          <span class="rating-stars">
            <span 
              v-for="star in 5" 
              :key="star" 
              class="star" 
              :class="{ filled: star <= 4 }">
              ★
            </span>
          </span>
        </h3>

        <router-link to="/update-info" class="edit-button">Edit Profile</router-link>
      
      </div>
      
    </div>
    
    <div class="user-posts">
      <h2>Latest Posts</h2>
      <div v-if="posts.length" class="post-list">
        <div v-for="post in posts" :key="post.name" class="post">
          <h3>{{ post.comment }}</h3>
          <p>Rating: {{ post.rating }} ★</p>
          <p>{{ post.date }}</p>
          <button class="delete-button" @click="deletePost(post)">Delete</button>
        </div>
      </div>
      
      <p v-else class="no-posts">No posts yet.</p>
    </div>  
    <router-link to="/statistics">
      <button class="statistic-button">Statistic</button>
    </router-link>
    <router-link to="/favorites"> <button class="friends-button">Friends</button></router-link>
    <router-link to="/update-info">
    <button class="save-button">Save</button>
  </router-link>

    <h1 class="title">My Profile</h1>
  </div>
</template>

<script>
import { reviews } from '@/reviews.js';

export default {
  name: 'MainProfile', 
  props: {
    name: { type: String, required: true },
    age: { type: Number, required: true },
    country: { type: String, required: true },
    lastActivity: { type: String, required: true },
    profileImage: { type: String, required: true },
    ratings: { type: Number, required: true },
  },
  data(){
    return{
      posts: [],
    }
  },
  methods: {
    fetchPosts() {
      // Получаем данные из localStorage
      const storedPosts = JSON.parse(localStorage.getItem('userPosts')) || [];

      // Если данные для текущего пользователя есть в localStorage
      if (storedPosts.length) {
        this.posts = storedPosts.filter((post) => post.name === this.name);
      } else {
        // Загружаем из reviews.js только если в localStorage ничего нет
        const userReviews = [];
        for (const category of reviews) {
          for (const key in category) {
            const blogReviews = category[key];
            const userReview = blogReviews.filter((review) => review.name === this.name);
            userReviews.push(...userReview);
          }
        }
        this.posts = userReviews;

        // Сохраняем загруженные данные в localStorage
        this.saveToLocalStorage();
      }
    },

    deletePost(post) {
      // Удаляем пост из списка
      this.posts = this.posts.filter((p) => p !== post);

      // Обновляем данные в localStorage
      const allPosts = JSON.parse(localStorage.getItem('userPosts')) || [];
      const updatedPosts = allPosts.filter(
        (p) => !(p.name === this.name && p.date === post.date && p.comment === post.comment)
      );
      localStorage.setItem('userPosts', JSON.stringify(updatedPosts));
    },

    saveToLocalStorage() {
      // Сохраняем посты пользователя в localStorage
      const allPosts = JSON.parse(localStorage.getItem('userPosts')) || [];
      const userPosts = [...allPosts, ...this.posts];
      localStorage.setItem('userPosts', JSON.stringify(userPosts));
    }
  },
  mounted() {
    console.log("MainProfile component mounted.");
    this.fetchPosts();
  },
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Inknut+Antiqua:wght@400;700&display=swap');

/* Main container styles */
.profile {
  display: flex;
  flex-direction: column;
  justify-content: space-between; /* Пространство между элементами */
  min-height: 100vh; /* Высота страницы равна высоте окна */
  background: linear-gradient(180deg, #76C5E7 0%, #FBF3F3 100%);
  font-family: 'Inter', sans-serif;
  padding: 20px;
  box-sizing: border-box;
}

/* Spacer for pushing the Latest Posts section to the bottom */
.spacer {
  flex-grow: 1; /* Заполняет всё доступное пространство */
}

/* Profile section styles */
.profile-container {
  display: flex;
  align-items: center;
  justify-content: space-between; 
  background: linear-gradient(180deg, #76C5E7 0%, #FBF3F3 100%);
  border-radius: 16px;
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.1);
  padding: 40px;
  width: 1002px;
  max-width: 1100px;
  margin-bottom: 30px;
  
}

/* Statistic button inside profile-container */
.statistic-button {
  
  background: #45D2FF;
  margin-top: 30px;
  font-family: 'Inknut Antiqua';
  font-style: normal;
  font-size: 16px;
  line-height: 41px;
  text-align: center;
  margin-bottom: 10px;
  position: absolute;
  bottom: 322px; /* Расположение кнопки внизу */
  left: 70%;
/* Центрирование кнопки по горизонтали */
  width: 220px; /* Ширина кнопки */
  height: 50px; /* Высота кнопки */
  color: white; /* Цвет текста */
  border-radius: 0px; /* Округлые углы */
   /* Размер шрифта */
  font-weight: 600; /* Жирное начертание текста */
  display: flex;
  justify-content: center;
  align-items: center;
}
.title {
  position: absolute; /* или position: fixed; если хотите, чтобы элемент был фиксированным при прокрутке */
  top: 60px; /* Верхний край */
  left: 10; /* Левый край */
  margin-left: 700px;
  font-family: 'Inknut Antiqua';
  font-size: 2.5rem;
  color:#ffffff;
  margin-bottom: 1px;
  text-transform: uppercase;
  letter-spacing: 1.5px;
}
.statistic-button:hover {
  background: #8bddf9; /* Темный оттенок при наведении */
  transform: translateY(-3px); /* Легкое движение вверх */
  
}

/* Тень для кнопки */
.statistic-button:active {
  transform: translateY(1px); /* Легкое движение вниз при нажатии */
  box-shadow: none; /* Убираем тень при нажатии */
}

.friends-button {
  background: #45D2FF;
  margin-top: 30px;
  font-family: 'Inknut Antiqua';
  font-style: normal;
  font-size: 16px;
  line-height: 41px;
  text-align: center;
  margin-bottom: 10px;
  position: absolute;
  bottom: 240px; /* Расположение кнопки внизу */
  left: 70%;
/* Центрирование кнопки по горизонтали */
  width: 220px; /* Ширина кнопки */
  height: 50px; /* Высота кнопки */
  color: white; /* Цвет текста */
  border-radius: 0px; /* Округлые углы */
   /* Размер шрифта */
  font-weight: 600; /* Жирное начертание текста */
  display: flex;
  justify-content: center;
  align-items: center;
}

.friends-button:hover {
  background: #8bddf9; /* Темный оттенок при наведении */
  transform: translateY(-3px); /* Легкое движение вверх */
  
}

/* Тень для кнопки */
.friends-button:active {
  transform: translateY(1px); /* Легкое движение вниз при нажатии */
  box-shadow: none; /* Убираем тень при нажатии */
}


.save-button {
  background: #45D2FF;
  margin-top: 30px;
  font-family: 'Inknut Antiqua';
  font-style: normal;
  font-size: 16px;
  line-height: 41px;
  text-align: center;
  margin-bottom: 10px;
  position: absolute;
  bottom: 160px; /* Расположение кнопки внизу */
  left: 70%;
/* Центрирование кнопки по горизонтали */
  width: 220px; /* Ширина кнопки */
  height: 50px; /* Высота кнопки */
  color: white; /* Цвет текста */
  border-radius: 0px; /* Округлые углы */
   /* Размер шрифта */
  font-weight: 600; /* Жирное начертание текста */
  display: flex;
  justify-content: center;
  align-items: center;
}

.save-button:hover {
  background: #8bddf9; /* Темный оттенок при наведении */
  transform: translateY(-3px); /* Легкое движение вверх */
  
}

/* Тень для кнопки */
.save-button:active {
  transform: translateY(1px); /* Легкое движение вниз при нажатии */
  box-shadow: none; /* Убираем тень при нажатии */
}
.edit-button {
  bottom: 340px; /* Расположение кнопки внизу */
  left: 70%;
  font-weight: 600; 
  padding: 3px 10px;
  background-color: #45D2FF;
  color: white;
  border-radius: 0px;
  width: 220px; /* Ширина кнопки */
  height: 40px; /* Высота кнопки */
  text-align: center;
  text-decoration: none;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;
  margin-top: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  bottom: 340px; /* Расположение кнопки внизу */
  left: 70%;
  }

.edit-button:hover {
  background-color: #8bddf9;
  transform: translateY(-2px); /* Slight upward movement on hover */
  }

/* Profile image styles */
.profile-image {
  width: 180px;
  height: 180px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid #8bddf9;
  margin-right: 30px;
  transition: all 0.3s ease;
}

.profile-image:hover {
  transform: rotate(5deg); /* Slight rotate effect on hover */
}

/* Info section */
.info {
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 100%;
}

.name {
  width: 263px;
  height: 83px;
  font-family: 'Inknut Antiqua';
  font-style: normal;
  font-weight: 400;
  font-size: 32px;
  line-height: 83px;
  color: #DE13FF;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}

.info-itemactivity {
  font-size: 1.1rem;
  font-family: 'Inknut Antiqua';
  margin-bottom: 8px;
  font-weight: 400;
  color: rgba(0, 255, 163, 1);
}

.info-item {
  display: flex;
  align-items: center; 
  width: 218px;
  height: 41px;
  font-family: 'Inknut Antiqua';
  font-style: normal;
  font-weight: 800;
  font-size: 16px;
  line-height: 41px;
  background: #45D2FF;
  text-align: center;
  font-size: 1.1rem;
  color: #FFFFFF;
  margin-bottom: 8px;
  font-weight: 400;
}

.rating-stars {
  display: inline-flex;
  text-align: center;
  margin-left: 10px;
  gap: 8px;
  margin-top: 10px;
}

.star {
  font-size: 18px; /* Размер звезд */
  color: #ccc;
  color: rgba(255, 255, 255, 1);

  font-size: 1.6rem;
  /* color: #ccc; */
  transition: color 0.3s ease;
}

.star.filled {
  color: rgba(249, 253, 35, 1);
  /* Vibrant green for filled stars */
}


.style-button {
  padding: 12px 25px;
  background-color: #FF6F61;
  color: white;
  border-radius: 12px;
  font-size: 1rem;
  text-align: center;
  text-decoration: none;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;
  margin-top: 15px;
  width: fit-content;
}

.style-button:hover {
  background-color: #e14f42;
  transform: translateY(-2px); /* Slight upward movement on hover */
}

/* Latest Posts section *//* Latest Posts section */

.user-posts {
  bottom: 500px;
  display:block;
  align-items: center;
  border-radius: 16px;
  box-shadow: 0px 8px 16px rgba(234, 231, 231, 0.1);
  padding: 40px;
  width: 100%;
  max-width: 900px;
  margin-bottom: 30px;
  background-color:#FBF3F3;
  backdrop-filter: blur(5px); /* Эффект размытия фона */
}

h2 {
  color: #5e5757;
  font-size: 1.8em;
  margin-bottom: 20px;
}

.post-list {
  display: grid;
  gap: 20px;
}

.post {
  background-color: rgba(255, 255, 255, 0.2);
  padding: 15px;
  border-radius: 8px;
  transition: transform 0.3s; /* Анимация для постов */
}

.post:hover {
  transform: scale(1.02); /* Увеличение при наведении */
}

.post h3 {
  color: #514c4c;
  font-size: 1.2em;
  margin-bottom: 10px;
}

.post p {
  color: #6b777d;
}

.no-posts {
  color: #fff;
  font-style: italic;
}

</style scoped>
