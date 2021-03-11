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
        <Chart :data="ChartData" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  data() {
    return {
      ChartData: {
        labels: ['A', 'B', 'C', 'D', 'E'],
        datasets: [
          {
            label: 'Поступления',
            data: [10, 50, 30, 41, 3],
            fill: false,
            borderColor: 'red',
          },
          {
            label: 'Траты',
            data: [100, 50, 30, 40, 30],
            borderColor: '#bae755',
            fill: false,
          },
        ],
      },
    }
  },
  computed: {
    ...mapState('currency', ['wallets']),
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
