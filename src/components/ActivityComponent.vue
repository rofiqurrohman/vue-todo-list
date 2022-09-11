<template>
  <section v-if="!isLoading" class="w-full sm:max-w-5xl px-5 py-10 mx-auto">
    <div class="w-full flex justify-between">
      <h1 class="text-4xl font-bold" data-cy="activity-title">Activity</h1>
      <button
        data-cy="activity-add-button"
        @click="createActivity"
        class="px-6 py-3 bg-blue-500 text-white rounded-full text-lg font-bold"
      >
        <font-awesome-icon icon="fa-solid fa-plus fa-lg" class="mr-2" />
        Tambah
      </button>
    </div>
    <article
      v-if="activityLists"
      class="w-full sm:max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8"
    >
      <ActivityItem
        data-cy="activity-item"
        v-for="activity in activityLists"
        :key="activity.id"
        :activity="activity"
        @delete-activity="(act) => deleteActivity(act)"
      />
    </article>
    <article v-else class="w-full p-5 flex justify-center mt-8">
      <img
        data-cy="activity-empty-state"
        src="../assets/activity-empty-state.png"
        alt="empty state"
        class="w-[300px] sm:w-[600px] mx-auto"
      />
    </article>
  </section>
  <section v-else class="w-full flex justify-center items-center h-[800px]">
    <img src="../assets/load.svg" alt="loader" class="animate-spin w-[50px]" />
  </section>
  <section
    @click.self="toggleModal"
    v-show="isModalOpen"
    class="transition-all delay-150 ease-in-out w-full h-screen top-0 left-0 fixed flex justify-center items-center bg-black/50 p-5"
  >
    <Modal
      :modal-type="selectedActivity"
      @close-modal="toggleModal"
      @delete="deleteActivity"
    />
  </section>
  <section
    v-show="isConfirmModalOpen"
    @click.self="toggleConfirmModal"
    class="transition-all delay-150 ease-in-out w-full h-screen top-0 left-0 fixed flex justify-center items-center bg-black/50 p-5"
  >
    <ModalConfirmation :modal-type="selectedActivity" />
  </section>
</template>

<script>
import axios from 'axios';
import ActivityItem from './ActivityItem.vue';
import Modal from './Modal.vue';
import ModalConfirmation from './ModalConfirmation.vue';

export default {
  name: 'ActivityComponent',
  components: {
    ModalConfirmation,
    ActivityItem,
    Modal,
  },
  data() {
    return {
      activityLists: null,
      isLoading: false,
      isModalOpen: false,
      isConfirmModalOpen: false,
      selectedActivity: null,
    };
  },
  created() {
    this.fetchActivities();
  },
  methods: {
    async fetchActivities() {
      this.isLoading = true;
      await axios
        .get('https://todo.api.devcode.gethired.id/activity-groups', {
          params: {
            email: 'rofiq@gmail.com',
          },
        })
        .then((res) => {
          if (res.data.data.length === 0) {
            this.isLoading = false;
            this.activityLists = null;
          } else {
            this.activityLists = res.data.data;
            this.isLoading = false;
          }
        });
    },
    async deleteActivity(activity) {
      if (this.isModalOpen) {
        await axios
          .delete(
            `https://todo.api.devcode.gethired.id/activity-groups/${this.selectedActivity.id}`
          )
          .then(() => (this.isModalOpen = false))
          .then(() => (this.isConfirmModalOpen = true))
          .then(async () => {
            this.selectedActivity = null;
            await this.fetchActivities();
          });
      } else {
        this.selectedActivity = {
          id: activity.id,
          type: 'activity',
          title: activity.title,
        };
        this.isModalOpen = true;
      }
    },
    createActivity() {
      axios
        .post('https://todo.api.devcode.gethired.id/activity-groups', {
          title: 'New Activity',
          email: 'rofiq@gmail.com',
        })
        .then(() => {
          this.fetchActivities();
        });
    },
    toggleModal() {
      this.isModalOpen = !this.isModalOpen;
    },
    toggleConfirmModal() {
      this.isConfirmModalOpen = !this.isConfirmModalOpen;
    },
  },
};
</script>

<style scoped></style>
