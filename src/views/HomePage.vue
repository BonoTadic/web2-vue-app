<template>
  <div class="task-manager">
    <div class="app-bar">
      <router-link to="/" class="app-bar-title">Task Manager</router-link>
      <div class="app-bar-links">
        <router-link to="/about" class="app-bar-item">About</router-link>
      </div>
    </div>

    <div class="main-content">
      <h2 class="manage-tasks-label">Manage Tasks</h2>
      <form @submit.prevent="addTask">
        <input v-model="newTask.name" placeholder="Task Name" required />
        <select v-model="newTask.status">
          <option>Not started</option>
          <option>In progress</option>
          <option>Completed</option>
        </select>
        <div class="button-container">
          <button type="submit" :disabled="isLoading">
            Add Task
          </button>
          <div v-if="isLoading" class="spinner-container">
            <div class="spinner"></div>
          </div>
        </div>
      </form>

      <ul>
        <TaskItem
            v-for="task in sortedTasks"
            :key="task.id"
            :task="task"
            @edit="editTask"
            @delete="deleteTask"
        />
      </ul>
    </div>
  </div>
</template>

<script>
import { useTasksStore } from '../store/tasks';
import TaskItem from '../components/TaskItem.vue';

export default {
  components: {
    TaskItem,
  },
  data() {
    return {
      newTask: { name: '', status: 'Not started' },
      isLoading: false,
    };
  },
  computed: {
    tasks() {
      const tasksStore = useTasksStore();
      return tasksStore.tasks;
    },
    sortedTasks() {
      return this.tasks.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    },
  },
  methods: {
    async addTask() {
      this.isLoading = true;
      const task = { id: Date.now(), ...this.newTask, createdAt: new Date(), updatedAt: new Date() };
      const tasksStore = useTasksStore();
      await tasksStore.addTask(task);
      this.newTask.name = '';
      this.newTask.status = 'Not started';
      this.isLoading = false;
    },
    async deleteTask(id) {
      this.isLoading = true;
      const tasksStore = useTasksStore();
      await tasksStore.deleteTask(id);
      this.isLoading = false;
    },
    editTask(id) {
      this.$router.push(`/edit/${id}`);
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

.manage-tasks-label {
  text-align: center;
  font-size: 1.5rem;
  margin-bottom: 20px;
  font-weight: bold;
  color: #333;
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

.button-container {
  position: relative;
  display: flex;
  align-items: center;
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
  position: absolute;
  right: -35px;
  width: 24px;
  height: 24px;
  text-align: center;
}

.spinner {
  border: 3px solid #f3f3f3;
  border-top: 3px solid #3498db;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
