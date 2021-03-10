<template>
  <b-modal id="history-edit-modal" centered title="Изменить">
    <b-form-input v-model="amountToChange" type="number" placeholder="Сумма" />
  </b-modal>
</template>

<script>
export default {
  name: 'HistoryEditModal',
  data() {
    return {
      amountToChange: null,
    }
  },
}
</script>

<style scoped></style>
