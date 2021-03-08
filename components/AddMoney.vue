<template>
  <b-card-group deck>
    <b-card header="Пополнить кошелек">
      <div class="wrapper">
        <multiselect
          v-model="modelSelectedCurrencyAdd"
          :options="wallets"
          track-by="id"
          label="title"
          placeholder="Выберете кошелек"
          class="currency-select mb-2"
          :searchable="false"
        />
        <b-form-input
          v-model="modelAmountAdd"
          type="number"
          placeholder="Сумма"
        />
      </div>
      <div class="button">
        <b-button
          variant="outline-success"
          :disabled="!amountToAdd || !selectedCurrencyToAdd"
          @click="addMoneyToWallet"
          >Пополнить</b-button
        >
      </div>
    </b-card>
  </b-card-group>
</template>

<script>
import Multiselect from 'vue-multiselect'
import { mapMutations, mapState, mapActions } from 'vuex'

export default {
  name: 'AddMoney',
  components: {
    Multiselect,
  },
  data() {
    return {
      amountModel: null,
      currencyModel: null,
    }
  },

  computed: {
    ...mapState('currency', [
      'selectedCurrencyToAdd',
      'amountToAdd',
      'currencyOptions',
      'wallets',
    ]),

    modelSelectedCurrencyAdd: {
      get() {
        return this.selectedCurrencyToAdd
      },
      set(value) {
        this.UPDATE_STATE({
          field: 'selectedCurrencyToAdd',
          value,
        })
      },
    },

    modelAmountAdd: {
      get() {
        return this.amountToAdd
      },
      set(value) {
        this.UPDATE_STATE({
          field: 'amountToAdd',
          value,
        })
      },
    },
  },

  methods: {
    ...mapMutations('currency', ['UPDATE_STATE']),
    ...mapActions('currency', ['addMoney']),
    addMoneyToWallet() {
      this.addMoney()
    },
  },
}
</script>

<style scoped></style>
