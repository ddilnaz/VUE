<template>
  <div class="user-profile">
    <div class="profile-header">
      <img
        v-if="user.gender === 'male'"
        src="https://s3-alpha-sig.figma.com/img/d2bd/bd4c/d1592cda471f4ef986c6cb5ca671ef8b?Expires=1733702400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=eOG4sjkZcAJLj-410-KW7gTh7Rvgpv7Jn7gkCrtIHvVjWm6SjRXStG9-Ukw-c35FZ5~8-j2TCEcVusEaboSF8jZXjxMNECynHode-URjic7NP70YRF2xuZYlr-nkZvR-6LAsqaNqfc8B2NVhuxjXr8kb72Mp6~t~O2KAguedNOF8nTJifuCr0p6MuqkEmUXIrfORaE6nFjC5CpidpubR~mhGevC1R5PM014pTYfaUBqyU-OH0rF73MJ2wiEkK1pOGfU5v2PxyZTBr3L5EmwPXHL2lV92g9RbPvzpi0YNe18O6Bp~Ba2XX~vU4T3AqPN4scoYH0rcntpWDkwBupipRQ__"
        alt="user.name"
        class="profile-image"/>
      <img
        v-else
        src="https://s3-alpha-sig.figma.com/img/3a6b/e814/73c95cdf26040c22e1ba016e3ef134ba?Expires=1733702400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=MaOkA-oyuQgcFv3CyxlfbeFmYjlN1fzu4GnOQ40W3E4ZT0fuZbxKXg9Er099zpr2fuxPBYluOV4~RBHr3~b7dAAfMWN~Sozys4pjWHz9MsuifZibcRnsmKUN2YOZgizqZ3Survuz7He2JgjEsfdZIqJqCaa~-KXpnKo0IK~K-j6YBebPE~15D-VB4DlbyPkPhy-M2zsA6g1WYjb3I1ujpR6JYBv0O3~0uPA2MX8dld7j05ej~YGFCsBZ~YGfiIE6Yx4CgMwvcyyYlrU11l7wQT1IvSzOeQSn54lHYx8NPPD9uJGYJaHxmoSmwap9pOk7Jx6YwWYfoQgGoN3ukot0bw__"
        alt="user.name"
        class="profile-image"/>

      <div class="profile-info">
        <h1>{{ user.name }}</h1>
        <p class="user-stats">
          <span>Age: {{ user.age }}</span>
          <span>Country: {{ user.country }}</span>
          <span>Activity: {{ user.lastActivity }}</span>
        </p>
        <div class="rating">
          <span>Current Rating:</span>
          <div class="stars">
            <span v-for="star in 5" :key="star" class="star"
                  :class="{ 'filled': star <= Math.floor(user.rating), 'half-filled': star === Math.ceil(user.rating) }">
              ★
            </span>
          </div>
        </div>
        <button class="follow-btn" @click="toggleFollow">
          {{ user.isFollowing ? 'Unfollow' : 'Follow' }}
        </button>
        <button class="chat" @click="goToChat(user.name)">Chat</button>
        <!-- <button class="friends" @click="showFriends">Friends</button> -->
        <button class="friends" @click="goToFriendsPage">Friends</button>

      </div>
    </div>
    
    <div class="user-posts">
      <h2>Latest Posts</h2>
      <div v-if="posts.length" class="post-list">
        <div v-for="post in posts" :key="post.name" class="post">
          <h3>{{ post.comment }}</h3>
          <p>Rating: {{ post.rating }} ★</p>
          <p>{{ post.date }}</p>
        </div>
      </div>
      <p v-else class="no-posts">No posts yet.</p>
    </div>

    <!-- Only show friends if the user is following -->
    <!-- <div v-if="user.isFollowing && showFriendsList" class="friends-list">
      <h2>Friends</h2>
      <div class="friend">
        <h3>{{ defaultFriend.name }}</h3>
        <p>{{ defaultFriend.comment }}</p>
        <p>Rating: {{ defaultFriend.rating }} ★</p>
        <p>{{ defaultFriend.date }}</p>
        <img :src="defaultFriend.photo" alt="friend photo"/>
      </div>
    </div> -->
  </div>
</template>

<script>
import { reviews } from "@/reviews.js";

export default {
  name: 'UserProfile',
  props: {
    id: { type: [String, Number], required: true },
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    gender: { type: String, required: true },
    isFollowing: Boolean,
  },
  
  data() {
    const userReview = reviews[0].adventure_blog_reviews.find(
      (review) => review.name === this.name
    );

    return {
      user: {
        id: this.id,
        name: this.name,
        gender: userReview ? userReview.gender : 'unknown',
        age: 29,
        country: 'USA',
        lastActivity: 'Active 3 minutes ago',
        isFollowing: this.isFollowing
      },
      posts: [],
      showFriendsList: false, // Control display of friends list
      defaultFriend: {
        name: "Dilnaz Talant",
        rating: 4,
        comment: "Great friend, great support!",
        date: "26.09.2024 16:49",
        photo: "https://s3-alpha-sig.figma.com/img/9490/73fb/0f39c6138406aaab01e478d549b01db5?Expires=1733702400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ClGf8S4nBqzfjhpQ0KlHoih5siZk49GTo1xebad7LMGGHCauZyBlP1~ha4vzjiUNeOJvEsmWDZ68SQyAn4TCFNLzohh8a5q0DNEVePyyZ70bSMi4jwewECwP5mup~rNB4SGCm7iRuK3RTGRWheNjl5rtyjdHBw9sPT6246Ylhp7SZIvDRsj0L9M-QsH6ru0N3qeG1YbG5hvMVuROFnFthDUXcIitXhnCqkQQusolWccUte8LTndIu4R~nxld9v7wK5ltXrKYSw7DwaZaq8qUqK3YkEXA5zsAtyAcFYz5-A6mra-3Cgc0LASF05snFYKCKxyx6FkXiIaUu9AW9aCfrQ__" // Add the friend's photo URL
      },
    };
  },

  methods: {
    toggleFollow() {
      this.user.isFollowing = !this.user.isFollowing;

      const email = localStorage.getItem("email");
      let followedUsers = JSON.parse(localStorage.getItem(`${email}_reviews`)) || [];

      if (this.user.isFollowing) {
        if (!followedUsers.includes(this.user.name)) {
          followedUsers.push(this.user.name);
        }
      } else {
        followedUsers = followedUsers.filter(user => user !== this.user.name);
      }

      localStorage.setItem(`${email}_reviews`, JSON.stringify(followedUsers));
    },
    fetchPosts() {
      const userReviews = [];

      for (const category of reviews) {
        for (const key in category) {
          const blogReviews = category[key];
          const userReview = blogReviews.filter(review => review.name === this.name);
          userReviews.push(...userReview);
        }
      }

      this.posts = userReviews;
    },

    goToChat(userName) {
      this.$router.push({ name: "Chat", params: { userName } });
    },

    showFriends() {
      this.showFriendsList = !this.showFriendsList;
    },
    goToFriendsPage() {
    // Перенаправление на страницу друзей
     this.$router.push({ path: '/friends' });
  },
  },

  mounted() {
    const email = localStorage.getItem("email");
    const followedUsers = JSON.parse(localStorage.getItem(`${email}_reviews`)) || [];

    if (followedUsers.includes(this.user.name)) {
      this.user.isFollowing = true;
      this.showFriendsList = true;  // Show friends if already followed
    }

    this.fetchPosts();
  }
};
</script>

<style scoped>

.friend {
  margin-left: 20px;
  background-color: #e4eae2;
  color: #6dd87b;
  border: none;
  padding: 10px 20px;
  font-size: 1em;
  font-weight: bold;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s, box-shadow 0.3s; /* Добавлена анимация для тени */

}

.friend img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}

.friends {
  margin-left: 20px;
  background-color: #e4eae2;
  color: #6dd87b;
  border: none;
  padding: 10px 20px;
  font-size: 1em;
  font-weight: bold;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s, box-shadow 0.3s; /* Добавлена анимация для тени */

}

.friends:hover {
  background-color: #0056b3;
}




.user-profile {
  width: 74%;
  min-height: 100vh;
  padding: 200px;
  background: linear-gradient(180deg, #76C5E7 0%, #FBF3F3 100%);
 /* Градиент для фона */
}

.profile-header {
  display: flex;
  align-items: center;
  margin-bottom: 40px;
}

.profile-image {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid #fff;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3); /* Увеличенная тень для глубины */
}

.profile-info {
  margin-left: 30px;
}

h1 {
  font-size: 2.5em;
  color: #0f0c0c;
  margin-bottom: 10px;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5); /* Тень для заголовка */
}

.user-stats {
  display: flex;
  gap: 20px;
  color: #fff0bd;
  font-size: 1.1em;
  margin-bottom: 15px;
}

.rating {
  color: #fff;
  font-size: 1.2em;
  margin-bottom: 15px;
}

.stars {
  display: inline-block;
  margin-left: 10px;
}

.star {
  color: #ccc;
  font-size: 24px;
}

.star.filled {
  color: gold;
}

.star.half-filled {
  position: relative;
}

.star.half-filled::before {
  content: '★';
  position: absolute;
  margin-bottom: 10px;
  left: 0;
  top: 0;
  width: 50%;
  overflow: hidden;
  color: gold;
}

.follow-btn {
  background-color: #e4eae2;
  color: #6dd87b;
  border: none;
  padding: 10px 20px;
  font-size: 1em;
  font-weight: bold;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s, box-shadow 0.3s; /* Добавлена анимация для тени */
}
.chat{
  margin-left: 20px;
  background-color: #e4eae2;
  color: #6dd87b;
  border: none;
  padding: 10px 20px;
  font-size: 1em;
  font-weight: bold;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s, box-shadow 0.3s; /* Добавлена анимация для тени */

}
.chat:hover{
  background-color: #daa412;
  transform: translateY(-2px);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}
.follow-btn:hover {
  background-color: #daa412;
  transform: translateY(-2px);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2); /* Тень при наведении */
}

.user-posts {
  background-color: rgba(14, 64, 72, 0.1);
  border-radius: 10px;
  padding: 20px;
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

</style>