<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>
      Welcome to my vlogging world! For tips and tricks on how to create amazing content,<br />
      check out the
      <a href="https://www.videomaker.com" target="_blank" rel="noopener">Vlog Guide</a>.
    </p>
    <h3>Popular Vlog Topics</h3>
    <ul>
      <li>
        <a href="#travel" target="_blank" rel="noopener">Travel Vlogs</a>
      </li>
      <li>
        <a href="#food" target="_blank" rel="noopener">Food Reviews</a>
      </li>
      <li>
        <a href="#lifestyle" target="_blank" rel="noopener">Lifestyle Tips</a>
      </li>
      <li>
        <a href="#tech" target="_blank" rel="noopener">Tech Reviews</a>
      </li>
    </ul>
    <h3>Essential Links</h3>
    <ul>
      <li>
        <a href="https://www.youtube.com" target="_blank" rel="noopener">YouTube</a>
      </li>
      <li>
        <a href="https://www.instagram.com" target="_blank" rel="noopener">Instagram</a>
      </li>
      <li>
        <a href="https://www.tiktok.com" target="_blank" rel="noopener">TikTok</a>
      </li>
      <li>
        <a href="https://www.twitter.com" target="_blank" rel="noopener">Twitter</a>
      </li>
    </ul>
    <h3>Vlogging Tools</h3>
    <ul>
      <li>
        <a href="https://www.adobe.com/products/premiere.html" target="_blank" rel="noopener">Adobe Premiere Pro</a>
      </li>
      <li>
        <a href="https://obsproject.com/" target="_blank" rel="noopener">OBS Studio</a>
      </li>
      <li>
        <a href="https://www.canva.com" target="_blank" rel="noopener">Canva</a>
      </li>
      <li>
        <a href="https://www.lightspeedhq.com" target="_blank" rel="noopener">Lightspeed</a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
};
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
