<template>
  <Header></Header>
  <div class="friends-page">
    <h1 class="title">Friends</h1>
    <div class="item" v-for="user in friends" :key="user.name">
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
       
        <button class="chat" @click="goToChat(user.name)">Chat</button>
    <!-- Выводим только друзей из списка фильтра -->
    <!-- <div v-for="friend in filteredFriends" :key="friend.name" class="friend-item">
      <h3>{{ friend.name }}</h3>
    </div> -->
  </div>
  </div>
</div>
</template>

<script>
import Header from "@/components/Header.vue";
export default {
  components: { Header },
  name: "Friends",
  data() {
    return {
      // Полный список друзей
      friends: [
        {
          name: "Dilnaz Talant",
          rating: 4,
          comment: "Great friend, great support!",
          photo: "https://example.com/dilnaz_photo.jpg",
          date: "22.09.2024",
          gender: "female",
        },
        {
          name: "William Brown",
          comment: "Challenging but worth it!",
          rating: 5,
          photo: "william_brown.png",
          date: "21.09.2024 15:45",
          gender: "male",
        },
        {
          name: "Sophia Harris",
          comment: "A perfect adventure getaway.",
          rating: 5,
          photo: "sophia_harris.png",
          date: "20.09.2024 17:20",
          gender: "female",
        },
        // Другие друзья, которые не попадут в список
        
      ],
      // Список имен, которые нужно отобразить
      friendsToShow: ["Dilnaz Talant", "William Brown", "Sophia Harris"],
    };
  },
  computed: {
    // Фильтруем список друзей на основе имен из friendsToShow
    filteredFriends() {
      return this.friends.filter((friend) =>
        this.friendsToShow.includes(friend.name)
      );
    },
  },
  methods: {
    goToChat(userName) {
      this.$router.push({ name: "Chat", params: { userName } });
    },
  }
};
</script>

<style scoped>
.friends-page {
  margin-top: 100px;
  width: 100%;
  padding: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: linear-gradient(180deg, #76C5E7 0%, #FBF3F3 100%);
  color: #333;
  padding: 10px 0;
  border-bottom: 1px solid #ddd;
}

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
