import { Bar } from 'vue-chartjs'
import Vue from 'vue'

Vue.component('MyChart', {
  extends: Bar,
  props: ['options', 'data', 'dataset'],
  mounted() {
    this.renderChart(this.data, this.options, this.label)
  },
})
