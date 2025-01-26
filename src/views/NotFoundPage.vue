<template>
  <div class="not-found-page">
    <div class="app-bar">
      <router-link to="/" class="app-bar-title">Task Manager</router-link>
      <div class="app-bar-links">
        <router-link to="/about" class="app-bar-item">About</router-link>
      </div>
    </div>

    <div class="main-content">
      <h2>404 - Page Not Found</h2>
      <p>The page you are looking for does not exist.</p>
      <button class="home-link" @click="$router.push('/')">Go Back to Home</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "NotFoundPage",
};
</script>

<style scoped>
.app-bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #007bff;
  padding: 10px 20px;
  border-radius: 0 0 8px 8px;
  z-index: 100;
}

.app-bar-title {
  color: white;
  font-size: 1.5rem;
  font-weight: bold;
  text-decoration: none;
}

.app-bar-links {
  display: flex;
}

.app-bar-item {
  color: white;
  text-decoration: none;
  padding: 10px 20px;
  font-size: 1.1rem;
  border-radius: 4px;
  margin: 0 10px;
}

.app-bar-item:hover {
  background-color: #0056b3;
}

.home-link {
  display: inline-block;
  margin-top: 20px;
  color: white;
  background-color: #4CAF50;
  padding: 10px 15px;
  text-decoration: none;
  border-radius: 4px;
  font-size: 16px;
  border: none;
  cursor: pointer;
}

.home-link:hover {
  background-color: #45a049;
}
</style>
