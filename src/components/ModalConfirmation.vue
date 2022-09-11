<template>
  <section data-cy="modal-information" class="w-full sm:max-w-lg bg-white rounded-lg p-5 flex justify-center items-center">
    <h1 data-cy="modal-information-title" class="text-xl">
      <font-awesome-icon data-cy="modal-information-icon" icon="fa-solid fa-circle-exclamation" class="fa-lg text-green-400 mr-4" />
      {{ (modalType && modalType.type === 'activity') ? 'Activity' : 'List Item' }} berhasil dihapus
    </h1>
  </section>
</template>

<script>
export default {
  name: "ModalConfirmation",
  props: {
    modalType: {
      type: Object,
      default: {}
    },
  }
}
</script>

<style scoped>

</style>
