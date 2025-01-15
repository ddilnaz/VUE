<template>
  <div class="screen">
    <div class="container">
      <h1>Update Profile Information</h1>
      <form @submit.prevent="updateProfile">
        <div class="form-group">
          <label for="name">Name:</label>
          <input v-model="updatedName" id="name" type="text" required />
        </div>
        <div class="form-group">
          <label for="age">Age:</label>
          <input v-model.number="updatedAge" id="age" type="number" min="1" required />
        </div>
        <div class="form-group">
          <label for="country">Country:</label>
          <input v-model="updatedCountry" id="country" type="text" required />
        </div>
        <div class="form-group">
          <label for="activity">Last Activity:</label>
          <input v-model="updatedActivity" id="activity" type="text" />
        </div>
        <div class="form-group">
          <label for="profileImage">Profile Image URL:</label>
          <input v-model="updatedProfileImage" id="profileImage" type="url" />
        </div>
        <button type="submit" class="update-btn">Update Info</button>
      </form>
      <router-link to="/my-profile" class="back-link">Back to Profile</router-link>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    const log = localStorage.getItem("account");
    if(log === "gabajohn"){
      this.$router.push("/reviews");
    }
  },
  data() {
    return {
      updatedName: '',
      updatedAge: null,
      updatedCountry: '',
      updatedActivity: '',
      updatedProfileImage: '',
    };
  },
  created() {
    const email = localStorage.getItem('email');
    const currentProfile = JSON.parse(localStorage.getItem(email)) || {};
    console.log(email, currentProfile, localStorage.getItem(email));
    this.updatedName = currentProfile.name || '';
    this.updatedAge = currentProfile.age || null;
    this.updatedCountry = currentProfile.country || '';
    this.updatedActivity = currentProfile.lastActivity || '';
    this.updatedProfileImage = currentProfile.profileImage || '';
  },
  methods: {
    updateProfile() {
      const updatedInfo = {
        name: this.updatedName,
        age: this.updatedAge,
        country: this.updatedCountry,
        lastActivity: this.updatedActivity,
        profileImage: this.updatedProfileImage,
      };
      console.log("Updating Profile with: ", updatedInfo);
      const email = localStorage.getItem('email');
      localStorage.setItem(email, JSON.stringify(updatedInfo));
      console.log(email, localStorage.getItem("account"), localStorage.getItem('email'), localStorage.getItem(email));
      this.$router.push('/my-profile');
    }
  }
};
</script>

<style scoped>
/* Main container styles */
.screen {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: #f7f9fa;
  padding: 20px;
  font-family: 'Inter', sans-serif;
}

.container {
  background-color: white;
  padding: 40px;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 600px;
  text-align: center;
}

h1 {
  color: #00796b;
  font-size: 2rem;
  margin-bottom: 30px;
  font-weight: 600;
}

.form-group {
  margin-bottom: 20px;
  text-align: left;
}

label {
  font-size: 1.1rem;
  color: #333;
  margin-bottom: 5px;
  display: block;
}

input {
  width: 100%;
  padding: 12px;
  font-size: 1rem;
  border-radius: 8px;
  border: 1px solid #ddd;
  background-color: #fafafa;
  transition: all 0.3s ease;
}

input:focus {
  border-color: #00796b;
  background-color: #ffffff;
  outline: none;
}

.update-btn {
  padding: 14px 30px;
  background-color: #00796b;
  color: white;
  font-size: 1.1rem;
  border-radius: 8px;
  width: 100%;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;
  margin-top: 20px;
}

.update-btn:hover {
  background-color: #004d40;
  transform: translateY(-2px);
}

.update-btn:active {
  transform: translateY(1px);
}

.back-link {
  display: inline-block;
  margin-top: 20px;
  color: #00796b;
  font-weight: 500;
  text-decoration: none;
  font-size: 1rem;
}

.back-link:hover {
  text-decoration: underline;
}

/* Responsive Design */
@media (max-width: 768px) {
  .container {
    padding: 30px;
  }

  h1 {
    font-size: 1.8rem;
  }

  .form-group {
    margin-bottom: 15px;
  }

  .update-btn {
    padding: 12px 25px;
  }
}
</style>