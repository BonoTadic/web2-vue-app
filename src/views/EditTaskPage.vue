<template>
  <div class="task-manager">
    <div class="app-bar">
      <router-link to="/" class="app-bar-title">Task Manager</router-link>
      <div class="app-bar-links">
        <router-link to="/about" class="app-bar-item">About</router-link>
      </div>
    </div>

    <div class="main-content">
      <h2>Edit Task</h2>
      <form @submit.prevent="saveTask">
        <input v-model="task.name" placeholder="Task Name" required />
        <select v-model="task.status">
          <option>Not started</option>
          <option>In progress</option>
          <option>Completed</option>
        </select>
        <button type="submit" :disabled="isSaving">
          Save Task
        </button>
        <div v-if="!isSaving" class="invisible-box"></div>
        <div v-if="isSaving" class="spinner-container">
          <div class="spinner"></div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { useTasksStore } from '../store/tasks';

export default {
  props: {
    id: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      task: { name: '', status: '' },
      isSaving: false,
    };
  },
  mounted() {
    const tasksStore = useTasksStore();
    this.task = tasksStore.tasks.find((task) => task.id === parseInt(this.id));
  },
  methods: {
    async saveTask() {
      this.isSaving = true;
      const tasksStore = useTasksStore();
      await tasksStore.updateTask(this.task);
      this.isSaving = false;
      this.$router.push('/');
    },
  },
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

.app-bar-item.exact {
  background-color: #0056b3;
}

.task-manager {
  max-width: 900px;
  margin: 80px auto 0;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.main-content {
  padding-top: 80px;
}

form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

input, select {
  width: 100%;
  max-width: 300px;
  margin: 5px 0;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 10px 15px;
  cursor: pointer;
  border-radius: 4px;
  font-size: 16px;
}

button:hover {
  background-color: #45a049;
}

button:disabled {
  background-color: #A9A9A9;
  cursor: not-allowed;
}

.spinner-container {
  position: relative;
  width: 100%;
  text-align: center;
  margin-top: 8px;
}

.spinner {
  border: 3px solid #f3f3f3;
  border-top: 3px solid #3498db;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  animation: spin 1s linear infinite;
  margin: 0 auto;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.invisible-box {
  width: 100%;
  height: 40px;
  visibility: hidden;
}
</style>
