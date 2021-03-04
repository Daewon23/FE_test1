<template>
  <b-card-group deck>
    <b-card header="Добавить новый кошелек">
      <div class="wrapper">
        <div class="inputs">
          <multiselect
            v-model="currencyModel"
            :options="currencyOptions"
            track-by="value"
            label="text"
            placeholder="Валюта"
            class="currency-select"
          />
          <b-form-input
            v-model="amountModel"
            type="number"
            placeholder="Сумма"
          />
        </div>
        <div class="button">
          <b-button variant="outline-success" @click="addNewWallet"
            >Добавить</b-button
          >
        </div>
      </div>
    </b-card>
  </b-card-group>
</template>

<script>
import { mapActions, mapState, mapMutations } from 'vuex'
import Multiselect from 'vue-multiselect'
export default {
  name: 'AddWallet',
  components: {
    Multiselect,
  },
  computed: {
    ...mapState('currency', ['selectedCurrency', 'amount', 'currencyOptions']),

    currencyModel: {
      get() {
        return this.selectedCurrency
      },
      set(value) {
        this.UPDATE_STATE({
          field: 'selectedCurrency',
          value,
        })
      },
    },

    amountModel: {
      get() {
        return this.amount
      },
      set(value) {
        this.UPDATE_STATE({
          field: 'amount',
          value,
        })
      },
    },
  },
  methods: {
    ...mapActions('currency', ['addWallet']),
    ...mapMutations('currency', ['UPDATE_STATE']),
    addNewWallet() {
      this.addWallet()
    },
  },
}
</script>

<style lang="scss">
.currency-select {
  margin-bottom: 0.5em;
}
.button {
  display: flex;
  justify-content: center;
  margin-top: 0.5em;
}
</style>
