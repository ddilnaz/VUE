<!-- C:\Users\Lenovo\Desktop\lab3\src\views\UserProfile.vue -->
<script>
import Header from "@/components/Header.vue";
import MainProfile from "@/components/MainProfile.vue";
import Profile from "@/components/Profile.vue";
import { reviews } from "@/reviews.js";

export default {
  components: {Header, Profile},
  mounted() {
    const log = localStorage.getItem("account");
    if(log === "gabajohn"){
      this.$router.push("/reviews");
    }
    
  },
  data(){
    return {
      userId: this.$route.query.id,
      userName: this.$route.query.name,
      userRating: this.$route.query.rating,
    };
  },

}



</script>


<template>
  <div class="container">
    <Header>
    </Header>
    <Profile :id="userId" :name="userName" :rating="userRating">
    </Profile>
  </div>
</template>

<style>

</style>