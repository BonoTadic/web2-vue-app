<template>
  <li>
    <span>
      {{ task.name }} -
      <span :class="statusClass" class="status-box">{{ task.status }}</span>
      (Created: {{ new Date(task.createdAt).toLocaleString() }})
    </span>
    <div class="buttons">
      <button class="edit-btn" @click="$emit('edit', task.id)">Edit</button>
      <button @click="$emit('delete', task.id)">Delete</button>
    </div>
  </li>
</template>

<script>
export default {
  props: {
    task: Object,
  },
  computed: {
    statusClass() {
      switch (this.task.status) {
        case 'Not started':
          return 'status-not-started';
        case 'In progress':
          return 'status-in-progress';
        case 'Completed':
          return 'status-completed';
        default:
          return '';
      }
    },
  },
};
</script>

<style scoped>
li {
  background-color: #f9f9f9;
  padding: 15px;
  margin-bottom: 10px;
  border-radius: 6px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

li span {
  flex-grow: 1;
}

.buttons {
  display: flex;
  justify-content: space-between;
  width: 200px;
}

li button {
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 4px;
  font-size: 14px;
}

li .edit-btn {
  background-color: #007bff;
  color: white;
}

li .edit-btn:hover {
  background-color: #0056b3;
}

li button:not(.edit-btn) {
  background-color: #f44336;
  color: white;
}

li button:not(.edit-btn):hover {
  background-color: #e53935;
}

.status-box {
  padding: 5px 10px;
  border-radius: 12px;
  font-weight: bold;
  color: white;
}

.status-not-started {
  background-color: #d3d3d3;
}

.status-in-progress {
  background-color: #87cefa;
}

.status-completed {
  background-color: #98fb98;
}
</style>
