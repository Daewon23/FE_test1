<template>
  <b-card header="Снять деньги с кошелька">
    <div class="wrapper">
      <multiselect
        v-model="modelSelectedCurrencyWithDraw"
        :options="wallets"
        track-by="id"
        label="title"
        placeholder="Выберете кошелек"
        class="currency-select mb-2"
        :searchable="false"
      />
      <b-form-input
        v-model="modelAmountWithDraw"
        type="number"
        placeholder="Сумма снятия"
      />
    </div>
    <div class="button">
      <b-button
        :disabled="!selectedCurrencyToWithDraw || !amountToWithDraw"
        variant="outline-primary"
        @click="withdrawMoneyFromWallet"
        >Вывести</b-button
      >
    </div>
  </b-card>
</template>

<script>
import Multiselect from 'vue-multiselect'
import { mapActions, mapMutations, mapState } from 'vuex'
export default {
  name: 'WithdrawMoney',
  components: {
    Multiselect,
  },
  computed: {
    ...mapState('currency', [
      'selectedCurrencyToWithDraw',
      'amountToWithDraw',
      'currencyOptions',
      'wallets',
    ]),

    modelSelectedCurrencyWithDraw: {
      get() {
        return this.selectedCurrencyToWithDraw
      },
      set(value) {
        this.UPDATE_STATE({
          field: 'selectedCurrencyToWithDraw',
          value,
        })
      },
    },

    modelAmountWithDraw: {
      get() {
        return this.amountToWithDraw
      },
      set(value) {
        this.UPDATE_STATE({
          field: 'amountToWithDraw',
          value,
        })
      },
    },
  },

  methods: {
    ...mapMutations('currency', ['UPDATE_STATE']),
    ...mapActions('currency', ['withdrawMoney']),

    withdrawMoneyFromWallet() {
      this.withdrawMoney()
    },
  },
}
</script>

<style scoped></style>
