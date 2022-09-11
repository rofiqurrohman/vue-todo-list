<template>
  <section
    data-cy="modal-add"
    class="w-full sm:max-w-xl bg-white rounded-lg flex flex-col justify-center items-center"
  >
    <div
      class="modal-header flex items-center justify-between w-full p-5 border-b"
    >
      <h1 data-cy="modal-add-title" class="text-xl font-bold">
        {{ mode === 'add' ? 'Tambah' : 'Edit' }} List Item
      </h1>
      <font-awesome-icon
        @click="() => $emit('close-modal')"
        data-cy="modal-add-close-button"
        icon="fa-solid fa-xmark"
        class="fa-lg cursor-pointer p-1"
      />
    </div>
    <div class="modal-body w-full flex flex-col justify-start p-5">
      <div class="input-wrapper flex flex-col justify-start">
        <label
          data-cy="modal-add-name-title"
          for="title"
          class="font-semibold text-sm"
          >NAMA LIST ITEM</label
        >
        <input
          data-cy="modal-add-name-input"
          v-model="todoData.title"
          type="text"
          name="title"
          id="title"
          class="w-full px-4 py-3 rounded-md mt-2 border border-gray-300"
          placeholder="Tambahkan nama list item"
          required
        />
      </div>
      <div class="input-wrapper flex flex-col justify-start mt-4">
        <label
          data-cy="modal-add-priority-title"
          for="priority"
          class="font-semibold text-sm"
          >PRIORITY</label
        >
        <div class="relative mt-4 min-w-[150px]">
          <a
            data-cy="modal-add-priority-dropdown"
            @click="toggleDropdown"
            class="px-4 py-3 mt-2 border border-gray-300 rounded-md flex items-center max-w-fit cursor-pointer"
          >
            <div class="flex items-center">
              <div
                v-if="todoData.priority === 'very-high'"
                class="w-[15px] h-[15px] rounded-full bg-red-500 mr-3"
              ></div>
              <div
                v-else-if="todoData.priority === 'high'"
                class="w-[15px] h-[15px] rounded-full bg-amber-500 mr-3"
              ></div>
              <div
                v-else-if="todoData.priority === 'normal'"
                class="w-[15px] h-[15px] rounded-full bg-green-500 mr-3"
              ></div>
              <div
                v-else-if="todoData.priority === 'low'"
                class="w-[15px] h-[15px] rounded-full bg-blue-500 mr-3"
              ></div>
              <div
                v-else-if="todoData.priority === 'very-low'"
                class="w-[15px] h-[15px] rounded-full bg-purple-500 mr-3"
              ></div>
              {{ renderPriority }}
            </div>
            <font-awesome-icon icon="fa-solid fa-chevron-down" class="ml-4" />
          </a>
          <div
            v-show="isDropdownOpen"
            class="absolute min-w-[200px] z-1 border shadow-md bg-white rounded-lg mt-3"
          >
            <a
              @click="setPriority('very-high')"
              data-cy="modal-add-priority-item"
              class="w-full flex items-center px-4 py-3 hover:bg-gray-200 cursor-pointer"
            >
              <div class="w-[15px] h-[15px] rounded-full bg-red-500 mr-3"></div>
              Very High
            </a>
            <a
              @click="setPriority('high')"
              data-cy="modal-add-priority-item"
              class="w-full flex items-center px-4 py-3 hover:bg-gray-200 cursor-pointer"
            >
              <div
                class="w-[15px] h-[15px] rounded-full bg-amber-500 mr-3"
              ></div>
              High
            </a>
            <a
              @click="setPriority('normal')"
              data-cy="modal-add-priority-item"
              class="w-full flex items-center px-4 py-3 hover:bg-gray-200 cursor-pointer"
            >
              <div
                class="w-[15px] h-[15px] rounded-full bg-green-500 mr-3"
              ></div>
              Medium
            </a>
            <a
              @click="setPriority('low')"
              data-cy="modal-add-priority-item"
              class="w-full flex items-center px-4 py-3 hover:bg-gray-200 cursor-pointer"
            >
              <div
                class="w-[15px] h-[15px] rounded-full bg-blue-500 mr-3"
              ></div>
              Low
            </a>
            <a
              @click="setPriority('very-low')"
              data-cy="modal-add-priority-item"
              class="w-full flex items-center px-4 py-3 hover:bg-gray-200 cursor-pointer"
            >
              <div
                class="w-[15px] h-[15px] rounded-full bg-purple-500 mr-3"
              ></div>
              Very Low
            </a>
          </div>
        </div>
      </div>
    </div>
    <div
      class="modal-footer w-full border-t p-5 flex justify-end text-lg font-bold"
    >
      <button
        data-cy="modal-add-save-button"
        @click="saveTodo"
        class="px-12 py-3 bg-blue-500 text-white rounded-full ml-3"
        :disabled="isNameInputError"
      >
        Simpan
      </button>
    </div>
  </section>
</template>

<script>
import axios from 'axios';
export default {
  name: 'TodoModal',
  props: {
    activityId: Number,
    todo: {
      type: Object,
      default: {},
    },
    mode: String,
  },
  data() {
    return {
      todoData: {
        title: '',
        priority: 'very-high',
      },
      isDropdownOpen: false,
    };
  },
  computed: {
    isNameInputError() {
      return this.todoData.title === '';
    },
    renderPriority() {
      switch (this.todoData.priority) {
        case 'very-high':
          return 'Very High';
        case 'high':
          return 'High';
        case 'normal':
          return 'Medium';
        case 'low':
          return 'Low';
        case 'very-low':
          return 'Very Low';
      }
    },
  },
  methods: {
    async saveTodo() {
      if (this.mode === 'edit') {
        if (this.todoData.title === '' || this.todoData.priority === '') {
          alert('Silahkan lengkapi field yang kosong');
        } else {
          await axios
            .patch(
              `https://todo.api.devcode.gethired.id/todo-items/${this.todoData.id}`,
              {
                title: this.todoData.title,
                priority: this.todoData.priority,
              }
            )
            .then(() => {
              this.$emit('close-modal');
              this.$emit('update-todos');
            });
        }
      } else {
        if (this.todoData.title === '' || this.todoData.priority === '') {
          console.log('field empty');
        } else {
          await axios
            .post(
              `https://todo.api.devcode.gethired.id/todo-items`,
              {
                activity_group_id: this.activityId,
                title: this.todoData.title,
                priority: this.todoData.priority,
                is_active: false,
              },
              {
                params: {
                  email: 'rofiq@gmail.com',
                },
              }
            )
            .then(() => {
              this.$emit('close-modal');
              this.$emit('update-todos');
            });
        }
      }
    },
    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen;
    },
    setPriority(priority) {
      this.todoData.priority = priority;
      this.toggleDropdown();
    },
  },
  mounted() {
    if (this.mode === 'edit') {
      this.todoData = this.todo;
    }
  },
};
</script>

<style scoped></style>
