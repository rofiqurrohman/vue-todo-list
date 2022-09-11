<template>
  <section
    class="w-full bg-white rounded-lg p-5 flex items-center justify-between shadow-lg"
  >
    <div class="flex items-center">
      <input
        data-cy="todo-item-checkbox"
        v-model="todoItem.is_active"
        @change="updateActiveTodo"
        type="checkbox"
        name="isActive"
        id="isActive"
        class="w-[20px] h-[20px] mx-3"
      />
      <div
        data-cy="todo-item-priority-indicator"
        v-if="todoItem.priority === 'very-high'"
        class="w-[15px] h-[15px] rounded-full bg-red-500 mx-3"
      ></div>
      <div
        data-cy="todo-item-priority-indicator"
        v-else-if="todoItem.priority === 'high'"
        class="w-[15px] h-[15px] rounded-full bg-amber-500 mx-3"
      ></div>
      <div
        data-cy="todo-item-priority-indicator"
        v-else-if="todoItem.priority === 'normal'"
        class="w-[15px] h-[15px] rounded-full bg-green-500 mx-3"
      ></div>
      <div
        data-cy="todo-item-priority-indicator"
        v-else-if="todoItem.priority === 'low'"
        class="w-[15px] h-[15px] rounded-full bg-blue-500 mx-3"
      ></div>
      <div
        data-cy="todo-item-priority-indicator"
        v-else-if="todoItem.priority === 'very-low'"
        class="w-[15px] h-[15px] rounded-full bg-purple-500 mx-3"
      ></div>
      <h1
        data-cy="todo-item-title"
        :class="`text-xl ml-4 ${
          todoItem.is_active ? 'line-through text-gray-400' : ''
        }`"
      >
        {{ todoItem.title }}
      </h1>
      <a
        data-cy="todo-item-edit-button"
        class="p-2 mx-3 cursor-pointer"
        @click="$emit('edit-todo', todoItem.id)"
      >
        <font-awesome-icon
          icon="fa-solid fa-pencil"
          class="fa-lg text-gray-500 hover:text-amber-500"
        />
      </a>
    </div>
    <a
      data-cy="todo-item-delete-button"
      class="p-2 mx-3 cursor-pointer"
      @click="$emit('delete-todo', todoItem.id)"
    >
      <font-awesome-icon
        icon="fa-solid fa-trash-can"
        class="fa-lg text-gray-500 hover:text-red-500"
      />
    </a>
  </section>
</template>

<script>
import axios from 'axios';
export default {
  name: 'TodoItem',
  props: {
    todoItem: {
      type: Object,
      default: {},
    },
  },
  methods: {
    async updateActiveTodo() {
      await axios
        .patch(
          `https://todo.api.devcode.gethired.id/todo-items/${this.todoItem.id}`,
          {
            is_active: this.todoItem.is_active,
          }
        )
        .then(() => {
          this.$emit('update-activity');
        });
    },
  },
  mounted() {
    this.todoItem.is_active = this.todoItem.is_active === 1;
  },
};
</script>

<style scoped></style>
