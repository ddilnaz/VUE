<template>
  <div id="app">
    <BurgerMenu />
    <router-view />
  </div>
  
</template>

<script>

import BurgerMenu from '@/components/BurgerMenu.vue';

export default {
  components: {
    BurgerMenu,
  },
};
</script>


<style>
/* Show the burger menu icon only on smaller screens */
@media (max-width: 768px) {
  .menu-icon {
    display: flex;
  }
  .menu {
    display: none; /* Initially hide the menu */
  }
}

/* On larger screens, show a horizontal menu instead */
@media (min-width: 769px) {
  .menu {
    display: flex;
    flex-direction: row;
    gap: 20px;
    position: static;
    box-shadow: none;
    background: transparent;
  }
}

* {
  margin: 0;
  padding: 0;
}
</style>
