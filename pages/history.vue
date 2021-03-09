<template>
  <div class="container">
    <div class="row mt-4">
      <div v-if="history.length" class="col-12">
        <b-table hover :items="history" :fields="fields"></b-table>
      </div>
      <div v-else class="empty-history">Вы еще не делали никаких операций!</div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  data() {
    return {
      fields: [
        { key: 'date', label: 'Дата' },
        { key: 'time', label: 'Время' },
        { key: 'amount', label: 'Сумма' },
        { key: 'reason', label: 'Действие' },
      ],
    }
  },
  computed: {
    ...mapState('history', ['history']),
  },
  methods: {
    ...mapActions('history', ['setHistory']),
  },
}
</script>
