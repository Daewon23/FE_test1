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
        { key: 'amount', label: 'Сумма', sortable: true },
        { key: 'reason', label: 'Действие', sortable: true },
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

<style lang="scss">
.empty-history {
  width: 100%;
  display: flex;
  justify-content: center;
  font-size: 1.7em;
  font-weight: 500;
}
</style>
