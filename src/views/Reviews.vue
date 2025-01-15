<!-- C:\Users\Lenovo\Desktop\lab3\src\views\Reviews.vue -->
<template>
  <div class="container">
    <Header @blog-selected="handleBlogSelection" />
    <BlogList :blogName="selectedBlog" />
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import BlogList from "@/components/BlogList.vue";

export default {
  components: { Header, BlogList },
  mounted() {
    const log = localStorage.getItem("account");
    if(log === "gabajohn"){
      this.$router.push("/reviews");
    }
  },
  data() {
    return {
      selectedBlog: 'Adventure',
    };
  },
  methods: {
    handleBlogSelection(blogName) {
      this.selectedBlog = blogName;
    },
  },
};
</script>

<style scoped>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
</style>
