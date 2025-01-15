<!-- C:\Users\Lenovo\Desktop\lab3\src\components\Header.vue -->
\<template>
  <div class="container">
    <div class="nav-bar" :class="{ open: menuOpen }">
      <h1>
        <router-link style="text-decoration: none !important;color: black" to="/reviews">Menu</router-link>
      </h1>
      <div class="nav-items">
        <div class="nav-list">
          <router-link to="/reviews"><h2 @click="selectBlog('Adventure')" :class="{ active: selectedBlogName === 'Adventure' }">Adventure Blog</h2></router-link>
          <router-link to="/reviews"><h2 @click="selectBlog('Nature')" :class="{ active: selectedBlogName === 'Nature' }">Nature Blog</h2></router-link>
          <router-link to="/reviews"><h2 @click="selectBlog('Fashion')" :class="{ active: selectedBlogName === 'Fashion' }">Fashion Blog</h2></router-link>
          <router-link to="/reviews"><h2 @click="selectBlog('Modern')" :class="{ active: selectedBlogName === 'Modern' }">Modern Blog</h2></router-link>
        </div>
        <div class="contacts">
          <h1>Contacts</h1>
          <h3>PHONE: +1(234)-23-45-22</h3>
          <h3>ADDRESS: Green st., Yalow park</h3>
          <h3>EMAIL: Yallow@park.info</h3>
        </div>
      </div>
    </div>

    <div class="userIcon-menu" v-show="userMenu" v-if="isLoggedIn() === true">
      <router-link to="/my-profile">My Profile</router-link>
      <router-link to="/favorites">Favorites</router-link>
      <router-link to="/authorization" @click="logOut()">Log out</router-link>
    </div>

    <div class="userIcon-menu" v-show="userMenu" v-else-if="isLoggedIn() === false">
      <router-link to="/authorization" @click="logOut()">REGISTER</router-link>
      <router-link to="/login" @click="logOut()">LOGIN</router-link>
    </div>

    <div class="overlay" v-show="menuOpen" @click="closeMenu"></div>

    <header>
      <button class="menu" @click="toggleMenu">
        <img src="https://s3-alpha-sig.figma.com/img/dd0f/1672/fa9663f77bafad4470f6626a94d61bf3?Expires=1731888000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=lpElOViZrOI5PiIZEn0Zw6ZyMRGD-pxbc1cclxXXTknSKu9M5eOO1~lL3d~auThozjlxOxDpLflbFVpyveEjM6k41dX9b9HV~9p0N-~gecc2Q5pFbROJuhW57kDNls4HOJAvN-zTUjWAs8cgeBJcXB14-BU9sHsIb6Ch299NA4nh69~Xwzg14evyKnsjkrMzaI1MzggFLMxRo2nbfvFYYbjlD1HwQkHBp-xpmWrAaJW1sfOfqKnvTdS9fn0flJ2SmB7O8kOmZJJgXO~-1OPY47BeIElXhYl0LiNVWSrJBwV04KfnXpWzZOTSilHX9OGMWVJsnK0l2Rp4EFyhsi~gSw__"
        class = "menu_button">
      </button>
      <div>
        <h1>New trips on Fall season! Full details on our Instagram accounts.</h1>
      </div>
      <button @click="toggleUserIcon">
        <img src="https://s3-alpha-sig.figma.com/img/0676/07e4/7373b5b064418edf9d9672c4e407d9b5?Expires=1731888000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=bU60086XPcm~rpCC395KNs~cuF1MPHbYcoxNso6vC~N7-U1Tx9OZFE0Djk9vkCengdvjU~TdbscOcAO-7GgdDmZCIRHpMJ-CxVwQMcU0xRA~ZM-e7tXo~hTjHt0qMJ1ouJY8emaLHXZnjTsnyDNBFeyHYQhQMgFPSiHqdWDBEPmd3JcC4-lhZmg6G6W9f9VFL4RVWli9GEt1uwHChxxGhwWRdz7Z3SH-iGzgvYe79JEwJYoZD0xeBdIrjWLArTJh-ALop1K-84j1wijz5HGNSPDHTBW2Sj~BtXoBRl1RJ6iK12U0Yd2a7aJNbHELwyQW~OiYQiL9F5FinCnmR0aHWQ__"
        class = "profile">
      </button>
    </header>

  </div>
  <BlogList v-show="false" :blogName="selectedBlogName" />
</template>

<script>
import Profile from "@/components/Profile.vue";
import BlogList from "@/components/BlogList.vue";
import router from "@/router.js";

export default {
  components: { Profile, BlogList },
  data() {
    return {
      menuOpen: false,
      selectedBlogName: 'Adventure',
      userMenu: false,
    };
  },
  methods: {
    selectBlog(blogName) {
      this.selectedBlogName = blogName;
      this.closeMenu();
      // Navigate to the /reviews page with the selected blog name as a parameter
      // this.$router.push({ path: '/reviews', query: { blogName: blogName } });
      this.$router.push('/')
      console.log('12312312')
  },

    toggleUserIcon() {
      this.userMenu = !this.userMenu;
    },
    toggleMenu() {
      this.menuOpen = !this.menuOpen;
    },
    closeMenu() {
      this.menuOpen = false;
    },
    selectBlog(blogName) {
      this.$emit('blog-selected', blogName);
      this.selectedBlogName = blogName;
      this.closeMenu();
    },
    async logOut() {
      localStorage.setItem("account", "gabajohn")
      localStorage.setItem("email", "")
      console.log(localStorage.getItem("account"))

    },
    isLoggedIn(){
      return localStorage.getItem("email") != "";
    }
    },
}
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@200;400;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&display=swap');
.userIcon-menu {
  font-family: "Nunito", sans-serif;
  position: absolute;
  top: 90px;
  right: 10px;
  background: rgba(255, 255, 255, 0.95);
  border: 1px solid #e1e1e1; 
  border-radius: 12px; 
  padding: 15px;
  width: 180px;
  text-align: center;
  z-index: 1001;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1); 
  transition: all 0.3s ease;
  color: #333; 
}

.userIcon-menu a {
  display: block;
  padding: 10px;
  color: #5a5a5a; 
  text-decoration: none;
  border-radius: 8px;
  transition: background-color 0.3s, color 0.3s;
  font-weight: 600;
  font-size: 16px;
}

.userIcon-menu a:hover {
  background: rgba(193, 235, 241, 1); 
  color: #fff; 
}

.overlay {
  position: fixed;
  background-color: rgba(0, 0, 0, 0.4); 
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 999;
}

.hidden {
  display: none;
}

.block {
  display: block;
}


.container {
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
}

header {
  position: absolute;
  background-color: rgba(255, 255, 255, 0.45);
  padding: 10px 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1455px;
  button {
    border-radius: 50%;
    height: 50px;
    width: 50px;
    background: rgba(126, 239, 255, 1);
    border: 1px solid rgb(18, 16, 16);
    .profile {
      width: 43px;
    }
    .menu_button{
      border-radius: 50%;
      height: 50px;
      width: 50px;
      background-color: rgba(198, 205, 211, 0.724);
    }
  }
  div {
  width: 100%;
  margin: 0 40px;
  padding: 10px 20px;
  align-items: center;
  display: flex;
  border-radius: 12px; 
  justify-content: center;
  background: linear-gradient(
    90deg,
    #e5f67c 0%,
    #ecef64 33%,
    #d2e037 66%,
    #eaee3a 100%
  );
}

h1 {
  text-align: center;
  padding: 0 10px;
  font-family: Inknut Antiqua;
  font-size: 17px;
  font-weight: 400;
  background: linear-gradient(90deg, #FFADAD 0%, #FF774C 100%);
  -webkit-background-clip: text; 
  background-clip: text;
  -webkit-text-fill-color: transparent;

  }
}

.nav-bar {
  text-align: center;
  font-family: "Nunito", sans-serif;
  font-weight: 200;
  position: fixed;
  z-index: 1000;
  left: -100%;
  transition: left 0.5s ease-in-out;
  background: rgba(193, 235, 241, 1);
  width: 25%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-evenly;
  .contacts {
  padding: 20px;
  background-color: rgba(255, 255, 255, 0.7); 
  line-height: 1.5;
  border-radius: 12px;
  font-size: 18px;
  font-family: "Playfair Display", serif;
  color: #333;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  transition: transform 0.3s, box-shadow 0.3s; 
}

.contacts:hover {
  transform: scale(1.02); 
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2); 
}

.contacts h1 {
  font-size: 22px;
  font-weight: bold;
  color: #5a7a68; 
  margin-bottom: 10px;
  border-bottom: 2px solid #5a7a68; 
  padding-bottom: 5px;
}

.contacts h3 {
  margin: 5px 0;
  font-size: 16px;
  color: #444; 
  font-weight: 500;
}

.contacts h3::before {
  content: "•"; 
  color: #5a7a68;
  margin-right: 8px;
  font-size: 18px;
  vertical-align: middle;
}
  .nav-items {
    padding: 12px;
    display: flex;
    flex-direction: column;
    gap: 40px;
    margin-bottom: 50px;
  }

  .nav-list {
    display: flex;
    flex-direction: column;
    gap: 10px;
    h2 {
    
      width: 280px;
      height: 30px;
      font-size: 18px;
      padding: 9px;
      background-color: rgba(255, 255, 255, 0.7);
      color:  #444; 
      transition: background-color 0.3s;
      font-family: "Playfair Display", serif;
      font-weight: 10;
      font-size: 30px;
        }
        h2:hover {
          background-color: rgba(104, 124, 110, 0.3);
        }
      }
    }

.open {
  left: 0;
}

</style>
