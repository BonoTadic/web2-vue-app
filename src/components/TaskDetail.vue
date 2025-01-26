<template>
  <div>
    <h2>Edit Task: {{ task.title }}</h2>
    <label for="status">Status:</label>
    <select v-model="taskStatus" id="status">
      <option value="In Progress">In Progress</option>
      <option value="Completed">Completed</option>
      <option value="Not Started">Not Started</option>
    </select>
    <button @click="saveTask">Save Task</button>
  </div>
</template>

<script>
export default {
  props: ['task'],
  data() {
    return {
      taskStatus: this.task.status,
    };
  },
  methods: {
    saveTask() {
      this.$emit('update-task', { ...this.task, status: this.taskStatus });
    },
  },
};
</script>

<style scoped>
button {
  background-color: #4CAF50;
  color: white;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}
</style>
