<template>
  <div class="container">
    <Header />
    <MainProfile
        :name="name"
        :age="age"
        :country="country"
        :lastActivity="lastActivity"
        :profileImage="profileImage"
        :ratings="ratings"
    />
    <!-- Back Button -->
    <button @click="goBack" class="back-button">← Back to Main Page</button>
  </div>
</template>

<script>
import MainProfile from "@/components/MainProfile.vue";
import Header from "@/components/Header.vue";

export default {
  components: { Header, MainProfile },
  
  mounted() {
    const log = localStorage.getItem("account");
    if(log === "gabajohn"){
      this.$router.push("/reviews");
    }
  },
  data() {
    return {
      name: '',
      age: 0,
      country: '',
      lastActivity: '',
      profileImage: 'https://t4.ftcdn.net/jpg/00/65/77/27/360_F_65772719_A1UV5kLi5nCEWI0BNLLiFaBPEkUbv5Fv.jpg',
      ratings: 0,
    };
  },
  created() {
    const email = localStorage.getItem('email');
    const savedProfile = JSON.parse(localStorage.getItem(email));
    console.log(email, savedProfile);
    if (savedProfile) {
      Object.assign(this, savedProfile);
    }
  },
  watch: {
    $route(to, from) {
      if (from.name === 'UpdateInfo') {
        const savedProfile = JSON.parse(localStorage.getItem('userProfile'));
        if (savedProfile) {
          Object.assign(this, savedProfile);
        }
      }
    }
  },
  methods: {
    goBack() {
      // Возвращение на главную страницу
      this.$router.push("/reviews");
    }
  }
}
</script>

<style scoped>
.container {
  background: linear-gradient(180deg, #76C5E7 0%, #FBF3F3 100%);
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.back-button {
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #f0f0f0;
  color: #333;
  border: 1px solid #ccc;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.back-button:hover {
  background-color: #76C5E7;
  color: #fff;
}
</style>
