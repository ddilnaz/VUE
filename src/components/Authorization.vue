<template>
  <div class="container">
    <div class="back-btn-container">
        <button class="back-btn" @click="goBack">← Back</button>
      </div>
    <div class="right-side">
      <h1 class="heading">Explore Our Reviews on Various Topics!</h1>

      <div class="authorization">
        <div class="sign-in">
          <h3><a class="stroke_sign">Sign up if you're not registered yet</a></h3>
          <div class="btn">
            <button @click.prevent="selectType('Sign up')" :class="{ active: selectedType === 'Sign up' }">
              Sign up
            </button>
          </div>
          <div class="log-in"> 
            <h3><a class="stroke">Log in</a> if you're already registered</h3>
            <div class="btn">
              <button @click.prevent="redirectToLogin" :class="{ active: selectedType === 'Log in' }">
                Log in
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="left-side">
      <transition name="fade">
        <div v-if="selectedType === 'Sign up'" class="signin-form">
          <h2 class="signin-heading">Sign up</h2>
          <div class="inputs">
            <input type="text" placeholder="Create email" v-model="email">
            <input type="password" placeholder="Create password" v-model="password">
            <input type="password" placeholder="Confirm password" v-model="confirmPassword">
            <p class="confirm" v-show="this.confirm === false">Passwords do not match</p>
          </div>
          <button class="signin-btn" @click="signUp()">Sign up</button>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

export default {
  data() {
    return {
      selectedType: '', // Holds the current selected type (Sign up)
      email: ref(''), // The email entered by the user
      password: ref(''), // The password entered by the user
      confirmPassword: '', // Confirm password for validation
      confirm: true // Track password confirmation validity
    };
  },
  methods: {
    selectType(type) {
      this.selectedType = type; // Change selected type (Sign up)
    },
    signUp() {
      if (this.confirmPassword === this.password) {
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, this.email, this.password)
          .then((data) => {
            console.log("Successfully registered", data);
          })
          .catch((err) => {
            console.error(err.message);
          });
        localStorage.setItem('email', this.email);
        console.log(localStorage.getItem("email"));
      } else {
        this.confirm = false; // Show error if passwords do not match
      }
    },
    redirectToLogin() {
      this.$router.push('/login'); // Redirect to the login page
    },
    goBack() {
    this.$router.back(); // Go back to the previous page
  }
  }
  
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@200;400;600&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Lora:wght@400;700&display=swap');

/* Main container styles */
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f7f9fa; /* Softer background color */
  font-family: 'Poppins', sans-serif;
  position: relative;
  overflow: hidden;
}
.back-btn-container {
    position: absolute;
    top: 20px;
    left: 20px;
    z-index: 10;
  }
  
  .back-btn {
    background-color: transparent;
    border: 2px solid #00897b; /* Teal border */
    color: #00897b; /* Teal text */
    padding: 12px 25px;
    border-radius: 30px;
    font-size: 16px;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  
  .back-btn:hover {
    background-color: #00897b;
    color: #fff;
    border-color: #fff;
  }
/* Heading */
.heading {
  font-size: 2.8rem;
  font-weight: 700;
  color: #004d40; /* Dark teal color */
  text-align: center;
  margin-bottom: 40px;
  font-family: 'Lora', serif;
}

/* Left side container */
.left-side {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.stroke {
  color: #30ab9c;
  font-weight: 600;
}

.stroke_sign {
  display: block;
  font-size: 1.17em;
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  font-weight: bold;
  unicode-bidi: isolate;
  color: #30ab9c;
  margin-left: 90px;
  font-weight: 600;
  font-size: 1.2rem;
}

.signin-form {
  width: 100%;
  max-width: 420px;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0px 8px 18px rgba(0, 0, 0, 0.1);
  padding: 50px;
  display: flex;
  flex-direction: column;
  gap: 30px;
  animation: fadeIn 0.5s ease-in-out;
}

.signin-heading {
  font-size: 2.5rem;
  color: #00796b;
  font-weight: 600;
  text-align: center;
  margin-bottom: 30px;
}

/* Input Fields */
.inputs {
  display: flex;
  flex-direction: column;
  gap: 18px;
  width: 100%;
}

.inputs input {
  width: 100%;
  padding: 16px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: #f7f7f7;
  color: #333;
  box-sizing: border-box;
  transition: background-color 0.3s, border-color 0.3s;
}

.inputs input:focus {
  outline: none;
  background-color: #e0f7fa;
  border-color: #00897b;
}

/* Button styles */
.signin-btn {

  padding: 16px 32px;
  background-color: #00897b;
  border: none;
  color: white;
  font-size: 16px;
  font-weight: 600;
  border-radius: 10px;
  width: 100%;
  cursor: pointer;
  transition: background-color 0.3s;
}

.signin-btn:hover {
  background-color: #004d40;
}

.log-in {
  text-align: center;
  margin-top: 40px;
  width: 100%;
}

.log-in h3 {
  font-size: 18px;
  color: #30ab9c;
  margin-bottom: 15px;
}

.btn {
  display: flex;
  justify-content: center;
  align-items: center;
}

.btn button {
  padding: 14px 32px;
  background-color: #00897b;
  color: white;
  border-radius: 12px;
  font-size: 16px;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s;
}

.btn button:hover {
  background-color: #004d40;
}

button.active {
  background-color: #004d40 !important;
  border: 2px solid #00897b !important;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease-in-out;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style scoped>
