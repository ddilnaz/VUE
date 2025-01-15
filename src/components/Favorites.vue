<template>
  <Header></Header>
  <div class="favorites">
    <h1 class="title">My Friends</h1>
    <div class="item" v-for="user in favoriteUsers" :key="user.name">
      <img
        v-if="user.gender === 'male'"
        src="https://s3-alpha-sig.figma.com/img/d2bd/bd4c/d1592cda471f4ef986c6cb5ca671ef8b?Expires=1731888000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=pJTApbNmvwASJhcW7-l3xQwYEbwIkhENTRlmR0RrYV9aFCWpsNNiXImYw2UdBoGjf-d1KmgOuC8W7xarU~0b0Oa6uNC35aLVQ~Kt4M9bRxmfyvC1tWvjFuR0H7Zh7y~mqCPm7n2em94vgskKz-v6ZzMOkq~oLqnbrQwsR97s63cK391HxL9BZziarZp29oHcHG5bGpz15QLoAcqn9McLjPp3fYHH1HIvPu5gFUH4HzAkpXL9iwOQAVQ~24v0nFj4i~j35ojSd9ioM-KZ7z3eb~30jdr14Tb-LP8CdXXMf1B8xYioGyMSRx62Csb9uZcwke9LY658fHZ2XbYCtnfrQw__"
        alt="Male"
      />
      <img
        v-else-if="user.gender === 'female'"
        src="https://s3-alpha-sig.figma.com/img/3a6b/e814/73c95cdf26040c22e1ba016e3ef134ba?Expires=1731888000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=GtzD9iAZhDdB0WQ03sebR9ze3qvMTxJ3JJet5XG5js6Z1Fev9ElZwRt2U0MwLAVA-titHYqO2CKY8KlR0fLkyxJwO91Fvjs2N1bbF6G4cY9ah5cEMyhf79H2~tDryYcH~Bp455LSDyGmm7yR2pHei19t5J8ojTvhTl--x4stcwI27EpGUoUO72yoh1EuDCwc6pN7Dg7Ig7aewhISOsodqL7t3T3p9t5DsiEmdbb09rwDrYkk4TWnzhc5-D2ilj9xv21FxSY8CBL2aTrWQi-~imv~urYg28qxV0Sk6Emec66H9WsEgU8H-5GTAIR2AaeqrnK89pI6yXwyZtHcE9EzuQ__"
        alt="Female"
      />
      <div class="user-info">
        <h2 v-if="!user.isEditing">{{ user.name }}</h2>
        <input
          v-if="user.isEditing"
          v-model="user.newName"
          type="text"
          class="rename-input"
        />
        <p class="green_line" v-if="user.gender === 'male'">Activity: for now</p>
        <p class="red_line" v-else-if="user.gender === 'female'">Activity: 1 hour ago</p>
      </div>
      <button class="Unfollow" @click="removeFromFavorites(user.name)">Unfollow</button>
      <button class="rename" @click="toggleRename(user)">Rename</button>
      <button class="chat" @click="goToChat(user.name)">Chat</button>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import { reviews } from "@/reviews.js";

export default {
  components: { Header },
  data() {
    return {
      favoriteUsers: [],
    };
  },
  methods: {
    removeFromFavorites(userName) {
      const email = localStorage.getItem("email");
      let followedUsers = JSON.parse(localStorage.getItem(`${email}_reviews`)) || [];

      // Удаляем пользователя из localStorage
      followedUsers = followedUsers.filter((name) => name !== userName);
      localStorage.setItem(`${email}_reviews`, JSON.stringify(followedUsers));

      // Удаляем пользователя из массива favoriteUsers
      this.favoriteUsers = this.favoriteUsers.filter((user) => user.name !== userName);

      console.log(`User ${userName} has been unfollowed.`);
    },
    goToChat(userName) {
      this.$router.push({ name: "Chat", params: { userName } });
    },
    toggleRename(user) {
      if (user.isEditing) {
        // Сохраняем новое имя в localStorage, если редактирование завершено
        const email = localStorage.getItem("email");
        let followedUsers = JSON.parse(localStorage.getItem(`${email}_reviews`)) || [];

        // Обновляем имя в followedUsers
        followedUsers = followedUsers.map(followedUser => {
          if (followedUser.name === user.name) {
            followedUser.name = user.newName;  // Изменяем имя
          }
          return followedUser;
        });

        // Сохраняем обновленные данные в localStorage
        localStorage.setItem(`${email}_reviews`, JSON.stringify(followedUsers));

        // Обновляем имя в самом объекте user
        user.name = user.newName;
      }
      // Переключаем флаг редактирования
      user.isEditing = !user.isEditing;
    },
  },
  mounted() {
    const email = localStorage.getItem("email");
    const followedUsers = JSON.parse(localStorage.getItem(`${email}_reviews`)) || [];

    // Фильтруем данные для избранных пользователей
    const userReviews = [];
    for (const category of reviews) {
      for (const key in category) {
        const blogReviews = category[key];
        const favorites = blogReviews.filter((review) => followedUsers.includes(review.name));
        userReviews.push(...favorites);
      }
    }

    // Удаляем дублирующиеся записи по имени пользователя
    const uniqueUsers = [];
    const seenNames = new Set();
    for (const user of userReviews) {
      if (!seenNames.has(user.name)) {
        uniqueUsers.push(user);
        seenNames.add(user.name);
      }
    }

    // Сохраняем в `favoriteUsers` только уникальные записи
    this.favoriteUsers = uniqueUsers.map(user => ({
      ...user,
      isEditing: false, // Изначально редактирование выключено
      newName: user.name, // Для ввода нового имени
    }));
    console.log("Favorite Users:", this.favoriteUsers);
  },
};
</script>

<style scoped>

@import url('https://fonts.googleapis.com/css2?family=Inknut+Antiqua:wght@400;700&display=swap');

.favorites {
  margin-top: 100px;
  width: 100%;
  padding: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: linear-gradient(180deg, #76C5E7 0%, #FBF3F3 100%);
  color: #333;
}
.green_line{
  font-family: 'Inknut Antiqua';
  color: rgba(0, 255, 163, 1);
}
.red_line{
  font-family: 'Inknut Antiqua';
  color: rgba(255, 0, 4, 1);

}
.rename{
  font-family: 'Inknut Antiqua';
  width: 123px;
  height: 33px;
  top: 2984px;
  left: 86px;
  gap: 0px;
  border-radius: 10px;
  opacity: 0px;
  margin-left: 5px;
  background: rgba(58, 209, 217, 1);
  color: #ffffff;
}
.chat{
  font-family: 'Inknut Antiqua';
  width: 123px;
  height: 33px;
  top: 2984px;
  left: 86px;
  gap: 0px;
  border-radius: 10px;
  opacity: 0px;
  margin-left: 5px;
  background: rgba(146, 242, 194, 1);
  color: #ffffff;
}
.title {
  margin-left: 800px;
  font-family: 'Inknut Antiqua';
  font-size: 2.5rem;
  color:#ffffff;
  margin-bottom: 40px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1.5px;
}
.Unfollow{
  font-family: Inknut Antiqua;
  background-color: red;
  color: #ffffff;
  width: 123px;
  height: 33px;
  top: 2984px;
  left: -59px;
  gap: 0px;
  border-radius: 10px;
  opacity: 0px;
  margin-left: 20px;
}

.item {
  display: flex;
  align-items: center;
  padding: 20px;
  font-family: 'Inknut Antiqua';
  color: rgba(41, 75, 255, 1);

  background-color: #ffffff;
  border-radius: 12px;
  width: 70%;
  max-width: 600px;
  margin: 15px 0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.item:hover {
  transform: scale(1.03);
  box-shadow: 0 6px 16px rgba(0, 137, 123, 0.25);
}

.item img {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  margin-right: 20px;
  border: 3px solid #00897b;
  object-fit: cover;
}

.user-info h2 {
  font-size: 1.4rem;
  font-family: 'Inknut Antiqua';
  color: rgba(41, 75, 255, 1);
  margin: 0;
  font-weight: 500;
}

@media (max-width: 768px) {
  .favorites {
    padding: 20px;
  }

  .item {
    width: 90%;
  }
}
</style>
