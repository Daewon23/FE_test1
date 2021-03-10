<template>
  <div class="container">
    <div class="row mt-4">
      <div v-if="history.length" class="col-12">
        <b-table
          hover
          :items="history"
          :fields="fields"
          @row-clicked="click"
        ></b-table>
      </div>
      <div v-else class="empty-history">Вы еще не делали никаких операций!</div>
    </div>
    <history-edit-modal />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import HistoryEditModal from '@/components/HistoryEditModal'
export default {
  components: {
    HistoryEditModal,
  },
  data() {
    return {
      fields: [
        { key: 'date', label: 'Дата' },
        { key: 'time', label: 'Время' },
        { key: 'amount', label: 'Сумма', sortable: true },
        { key: 'reason_title', label: 'Действие', sortable: true },
      ],
    }
  },
  computed: {
    ...mapState('history', ['history']),
    ...mapState('currency', ['amountToAdd']),
  },
  methods: {
    ...mapActions('history', ['setHistory', 'editHistoryAmount']),

    click(item, e, index) {
      if (item.reason === 'addNewWallet') {
        return false
      }

      // this.editHistoryAmount({ id: item.id, amount: item.amount })
    },
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
