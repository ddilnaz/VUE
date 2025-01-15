<template>
    <div class="container">
      <div class="back-btn-container">
        <button class="back-btn" @click="goBack">← Back</button>
      </div>
      <div class="left-side">
        <transition name="fade">
          <div v-if="selectedType === 'Log in'" class="login-form">
            <h2 class="login-heading">Welcome Back</h2>
            <div class="inputs">
              <input type="email" placeholder="Enter your email" v-model="email" />
              <input type="password" placeholder="Enter your password" v-model="password" />
            </div>
            <div class="login-btn">
              <a href="#">Forgot password?</a>
              <button @click="logIn">Log in</button>
            </div>
          </div>
        </transition>
      </div>
      <div class="log-in">
        <h3><a class="stroke">Log in if you're already registered</a> </h3>
        <div class="btn">
          <button @click.prevent="selectType('Log in')" :class="{ active: selectedType === 'Log in' }">
            Log in
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
  import router from "@/router.js";
  
  export default {
    data() {
      return {
        selectedType: '', // Holds the current selected type (Log in)
        email: '', // The email entered by the user
        password: '', // The password entered by the user
      };
    },
    methods: {
      selectType(type) {
        this.selectedType = type;
      },
      logIn() {
        if (this.email === '' || this.password === '') {
          alert('Please fill in both email and password.');
          return;
        }
  
        const auth = getAuth();
        signInWithEmailAndPassword(auth, this.email, this.password)
          .then((data) => {
            console.log("Successfully logged in", data);
            router.push("/reviews"); // Redirect to reviews page after login
          })
          .catch((err) => {
            console.error(err.message);
            alert('Invalid email or password.');
          });
  
        // Optionally store credentials in localStorage if needed
        localStorage.setItem("account", this.email);
        localStorage.setItem("email", this.email);
        console.log(localStorage.getItem("account"), localStorage.getItem("email"));
      },
      goBack() {
        router.back(); // Go back to the previous page
      }
    }
  };
  </script>
  
  <style scoped>
  /* Main container styles */
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f0f4f8; /* Soft light background */
    font-family: 'Poppins', sans-serif;
    position: relative;
    overflow: hidden;
  }
  
  /* Back button container */
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
  
  .left-side {
    
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    width: 100%;
  }
  
  .login-form {
    width: 100%;
    max-width: 400px;
    background-color: #fff; /* White background for form */
    border-radius: 15px;
    box-shadow: 0px 6px 15px rgba(0, 0, 0, 0.1);
    padding: 40px;
    display: flex;
    flex-direction: column;
    gap: 30px;
    animation: fadeIn 0.5s ease-in-out;
  }
  
  .login-heading {
    font-size: 28px;
    color: #00796b; /* Dark teal */
    font-weight: 600;
    text-align: center;
    margin-bottom: 20px;
  }
  
  /* Input Fields */
  .inputs {
    display: flex;
    flex-direction: column;
    gap: 16px;
    width: 100%;
  }
  
  .inputs input {
    width: 100%;
    padding: 14px;
    font-size: 15px;
    border: 1px solid #ccc;
    border-radius: 12px;
    background-color: #f7f7f7; /* Light gray background */
    color: #333;
    box-sizing: border-box;
    transition: background-color 0.3s, border-color 0.3s;
  }
  
  .inputs input:focus {
    outline: none;
    background-color: #e0f7fa; /* Light teal background on focus */
    border-color: #00897b; /* Teal border on focus */
  }
  
  .login-btn {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    width: 100%;
  }
  
  .login-btn a {
    font-size: 13px;
    color: #00897b;
    text-decoration: none;
    cursor: pointer;
  }
  
  .login-btn a:hover {
    text-decoration: underline;
  }
  
  .login-btn button {
    padding: 14px 28px;
    background-color: #00897b;
    border: none;
    color: white;
    font-size: 16px;
    font-weight: bold;
    border-radius: 12px;
    width: 100%;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .login-btn button:hover {
    background-color: #004d40; /* Darker teal on hover */
  }
  
  .log-in {
    text-align: center;
    margin-top: 40px;
    width: 100%;
  }
  
  .log-in h3 {
    font-size: 18px;
    color: #00796b;
    margin-bottom: 15px;
  }
  
  .log-in .btn {
    margin-top: 15px;
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
  </style>
  