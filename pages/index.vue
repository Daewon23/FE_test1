<template>
  <div class="container">
    <div class="row mt-4">
      <div v-for="wallet in wallets" :key="wallet.id" class="col-3">
        <Card :title="wallet.title" />
      </div>
    </div>
    <div class="row">
      <div class="col-6">
        <div class="wallet-wrap">
          <WalletsInfo />
        </div>
      </div>
      <div class="col-6">
        <div class="wallet-wrap">
          <AddWallet />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState('currency', ['wallets']),
  },
  mounted() {
    this.$store.dispatch('getRates') // TODO moove
  },
}
</script>

<style lang="scss">
.wallet-wrap {
  margin-top: 1em;
}
</style>
