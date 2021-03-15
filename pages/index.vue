<template>
  <div class="container">
    <div class="row mt-4">
      <div v-for="wallet in wallets" :key="wallet.id" class="col-3">
        <Card :title="wallet.title" />
      </div>
    </div>
    <div class="row">
      <div class="col-5">
        <div class="wallet-wrap">
          <WalletsInfo />
        </div>
      </div>
      <div class="col-6">
        <Chart :data="chartData" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'
export default {
  data() {
    return {}
  },
  computed: {
    ...mapState('currency', ['wallets']),
    ...mapGetters('currency', ['chartData']),
  },
  methods: {
    ...mapActions('currency', ['getTotals']),
  },
}
</script>

<style lang="scss">
.wallet-wrap {
  margin-top: 1em;
}
</style>
