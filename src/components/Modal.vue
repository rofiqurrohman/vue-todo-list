<template>
  <section data-cy="modal-delete" class="w-full sm:max-w-lg bg-white rounded-lg p-8 flex flex-col justify-center items-center">
    <img data-cy="modal-delete-icon" src="../assets/warning.png" alt="warning icon" class="w-[150px]">
    <h1 data-cy="modal-delete-title" class="text-center text-xl mt-5">
      Apakah anda yakin ingin menghapus {{ (modalType && modalType.type === 'activity') ? 'activity' : 'List Item' }}
      <span class="font-bold">
        "{{ (modalType && modalType.title ? modalType.title : '') }}"
      </span>
    </h1>
    <div class="w-full flex items-center justify-center mt-5 font-bold text-lg">
      <button data-cy="modal-delete-cancel-button" @click="() => $emit('close-modal', false)" class="bg-gray-300 rounded-full px-12 py-3 text-gray-700">
        Batal
      </button>
      <button data-cy="modal-delete-confirm-button" @click="() => $emit('delete', modalType)" class="bg-red-500 rounded-full px-12 py-3 text-white ml-4">
        Hapus
      </button>
    </div>
  </section>
</template>

<script>
export default {
  name: "Modal",
  props: {
    modalType: {
      type: Object,
      default: {}
    }
  }
}
</script>
