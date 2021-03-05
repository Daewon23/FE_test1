<template>
  <div class="container">
    <div class="row mt-4">
      <div class="col-6">
        <b-card-group deck>
          <b-card header="Добавить деньги в кошелек">
            <div class="wrapper">
              <multiselect
                v-model="currencyModel"
                :options="wallets"
                track-by="id"
                label="title"
                placeholder="Выберете кошелек"
                class="currency-select mb-2"
              />
              <b-form-input
                v-model="amountModel"
                type="number"
                placeholder="Сумма"
              />
            </div>
            <div class="button">
              <b-button variant="outline-success" @click="addMoneyToWallet"
                >Добавить</b-button
              >
            </div>
          </b-card>
        </b-card-group>
      </div>
      <div class="col-6">
        <b-button variant="outline-success" @click="getOut">Добавить</b-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import Multiselect from 'vue-multiselect'
export default {
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
      'selectedCurrency',
      'amount',
      'currencyOptions',
      'wallets',
    ]),

    // currencyModel: {
    //   get() {
    //     return this.selectedCurrency
    //   },
    //   set(value) {
    //     this.UPDATE_STATE({
    //       field: 'selectedCurrency',
    //       value,
    //     })
    //   },
    // },

    //     amountModel: {
    //   get() {
    //     return this.amount
    //   },
    //   set(value) {
    //     this.UPDATE_STATE({
    //       field: 'amount',
    //       value,
    //     })
    //   },
    // },
  },

  methods: {
    ...mapMutations('currency', ['UPDATE_STATE']),
    ...mapActions('currency', ['addMoney', 'getOut']),
    addMoneyToWallet() {
      this.addMoney({
        id: this.currencyModel.id,
        amount: +this.amountModel,
      })
    },
  },
}
</script>
