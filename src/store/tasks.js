import { defineStore } from 'pinia';

export const useTasksStore = defineStore('tasks', {
    state: () => ({
        tasks: JSON.parse(localStorage.getItem('tasks')) || [],
    }),
    actions: {
        async fetchTasks() {
            await new Promise(resolve => setTimeout(resolve, 1000));
            this.tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        },
        async addTask(task) {
            await new Promise(resolve => setTimeout(resolve, 1000));
            this.tasks.push(task);
            localStorage.setItem('tasks', JSON.stringify(this.tasks));
        },
        async deleteTask(id) {
            await new Promise(resolve => setTimeout(resolve, 1000));
            this.tasks = this.tasks.filter(task => task.id !== id);
            localStorage.setItem('tasks', JSON.stringify(this.tasks));
        },
        async updateTask(updatedTask) {
            await new Promise(resolve => setTimeout(resolve, 1000));
            const index = this.tasks.findIndex(task => task.id === updatedTask.id);
            if (index !== -1) {
                this.tasks[index] = updatedTask;
                localStorage.setItem('tasks', JSON.stringify(this.tasks));
            }
        },
    },
});
