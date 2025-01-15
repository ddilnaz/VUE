<template>
    <div class="burger-menu">
      <!-- Overlay (visible when menu is open) -->
      <div
        v-if="menuVisible"
        class="overlay"
        @click="toggleMenu"
      ></div>
  
      <!-- Menu Icon -->
      <button class="menu-icon" @click="toggleMenu">
        <span></span>
        <span></span>
        <span></span>
      </button>
  
      <!-- Navigation Links -->
      <nav v-if="menuVisible" class="menu">
        <router-link
          to="/my-profile"
          @click.native="closeMenu"
        >
          Profile
        </router-link>
        <router-link
          to="/reviews"
          @click.native="closeMenu"
        >
          Posts
        </router-link>
        <router-link
          to="/statistics"
          @click.native="closeMenu"
        >
          Statistics
        </router-link>
        <router-link
          to="/favorites"
          @click.native="closeMenu"
        >
          Friends
        </router-link>
        <router-link
          to="/authorization"
          @click.native="closeMenu"
        >
          Authorization
        </router-link>
      </nav>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        menuVisible: false, // Toggle state for the menu
      };
    },
    methods: {
      toggleMenu() {
        this.menuVisible = !this.menuVisible; // Toggle visibility
      },
      closeMenu() {
        this.menuVisible = false; // Close menu
      },
    },
  };
  </script>
  
  <style scoped>
  @media (max-width: 480px) {
  .burger-menu {
    width: 100%; /* Растягиваем контейнер */
  }

  .menu {
    top: 40px; /* Уменьшаем расстояние от верхней границы */
    width: 100%; /* Растягиваем меню по ширине экрана */
    left: 0;
  }

  .menu-icon {
    position: fixed; /* Иконка всегда видна */
    top: 10px;
    left: 10px;
    z-index: 11;
  }

  .menu-icon span {
    width: 25px; /* Уменьшаем размер иконки */
    height: 3px;
  }

  .menu a {
    padding: 8px 10px; /* Уменьшаем отступы */
    font-size: 14px; /* Уменьшаем размер шрифта */
  }

  .menu a:hover {
    background-color: #eaeaea; /* Немного светлее для маленьких экранов */
  }
}
  @media (min-width: 769px) {
    .menu {
      display: flex;
      flex-direction: row;
      gap: 20px;
      position: static;
      box-shadow: none;
      background: transparent;
    }
    .menu-icon {
      display: none; /* Hide burger icon on larger screens */
    }
  }
  </style>
  