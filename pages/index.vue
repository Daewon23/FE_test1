<template>
  <div class="container">
    <div class="row mt-4">
      <div class="col-3">
        <Card title="В гривневом кошельке" :amount="getTotalUAH" />
      </div>
      <div class="col-3">
        <Card
          title="В долларовом кошельке"
          :amount="getTotalUSD"
          :amount-in-uah="getUsdInUah"
        />
      </div>
      <div class="col-3">
        <Card
          title="В евровом кошельке"
          :amount="getTotalInEUR"
          :amount-in-uah="getEurToUah"
        />
      </div>
      <div class="col-3">
        <Card title="Общая сумма в грн" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    getTotalUAH() {
      return this.$store.getters.getTotalInUah + ' гривен'
    },
    getTotalUSD() {
      return this.$store.getters.getTotalInUsd + ' долларов'
    },
    getTotalInEUR() {
      return this.$store.getters.getTotalInEur + ' евро'
    },

    getUsdInUah() {
      return this.$store.getters.getFromUsdToUah
    },

    getEurToUah() {
      return this.$store.getters.getFromEurToUah
    },
  },
  mounted() {
    this.$store.dispatch('getRates')
  },
}
</script>

<style>
.wrapper {
  margin-top: 1em;
}
</style>
