<template>
    
    <div class="main">
    
    <header class="header">
      <div>Vlog</div>
      <nav class="nav">
        <ul class="nav__list">
          <li class="nav__item"><a href="#home">Home</a></li>
          <li class="nav__item"><a href="#vlogs">My Vlogs</a></li>
          <li class="nav__item"><a href="#travel">Travel Adventures</a></li>
          <li class="nav__item"><a href="#food">Food Reviews</a></li>
          <li class="nav__item"><a href="#lifestyle">Lifestyle Tips</a></li>
          <li class="nav__item"><a href="#behind-the-scenes">Behind the Scenes</a></li>
        </ul>
        <div class="nav__search">
          <input type="text" placeholder="Search..." />
          <button class="search__button">
            <i class="fa fa-search"></i>
          </button>
        </div>
      </nav>
    </header>
    <div class="container">
      <div class="main__card">
        <div class="card card--small card--top-left">
          <img src="./assets/photo1.jpg" alt="Left Photo 1" />
          <div class="card-content">
            <h3>"Life is either a daring adventure or nothing at all."</h3>
            <p>— Helen Keller</p>
          </div>
        </div>

        <div class="card card--small card--bottom-left">
          <img src="./assets/photo2.jpg" alt="Left Photo 2" />
          <div class="card-content">
            <h3>"Capture the moment, it's fleeting."</h3>
            <p>— Legenda</p>
          </div>
        </div>

        <div class="card card--large">
          <img src="./assets/photo3.jpg" alt=" Large Photo" />
          <div class="card-content">
            <h3>"Your story is what you make it; own it!"</h3>
            <p>— Unknown</p>
          </div>
        </div>

        <div class="card card--small card--top-right">
          <img src="./assets/photo4.jpg" alt="Right Photo 1" />
          <div class="card-content">
            <h3>"Every picture tells a story."</h3>
            <p>— Unknown</p>
          </div>
        </div>

        <div class="card card--small card--bottom-right">
          <img src="./assets/photo5.jpg" alt="Right Photo 2" />
          <div class="card-content">
            <h3>"Live a life worth documenting."</h3>
            <p>— Unknown</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style lang="scss">
.header {
  background-color: #f8f9fa;
  padding: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: flex-end; 
  align-items: center;
}
.nav {
  display: flex;
  align-items: center;
}
.nav__list {
  list-style: none;
  display: flex;
  margin: 0;
  padding: 0;
}
.nav__item {
  margin: 0 1rem;
}
.nav__item a {
  text-decoration: none;
  color: black;
}
.nav__search {
  display: flex;
  align-items: center;
  margin-left: 1rem; 
}
.nav__search input {
  padding: 0.5rem;
  border: 1px solid #ced4da;
  border-radius: 4px;
}
.search__button {
  background-color: transparent;
  border: none;
  cursor: pointer;
  margin-left: 0.5rem;
}
.search__button .fa-search {
  font-size: 1rem;
  color: black;
}

.main__card {
  cursor: pointer;
  margin-top: 100px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto auto;
  gap: 20px;
  padding: 20px;
  position: relative;
}

.card {
  position: relative;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
}

.card img {
  object-fit: cover;
  width: 100%;
  height: 100%;
  display: block;
}
.card::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0) 80%,
    rgba(0, 0, 0, 0.7) 100%
  );
}

.card-content {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  color: white;
  padding: 15px;
  padding-bottom: 5px;
  text-align: left;
}

.card h3 {
  margin-bottom: 10px;
  font-size: 18px;
}

.card p {
  font-size: 14px;
  opacity: 0.8;
}

.card--large {
  grid-column: 2 / 3;
  grid-row: 1 / 3;
}

.card--small {
  height: 100%;
}

.card--top-left {
  grid-column: 1 / 2;
  grid-row: 1 / 2;
}

.card--bottom-left {
  grid-column: 1 / 2;
  grid-row: 2 / 3;
}

.card--top-right {
  grid-row: 1 / 2;
}

.card--bottom-right {
  grid-row: 2 / 3;
}
</style>
