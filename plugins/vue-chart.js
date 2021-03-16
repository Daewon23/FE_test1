import { Pie } from 'vue-chartjs'
import Vue from 'vue'

Vue.component('MyChart', {
  extends: Pie,
  props: ['options', 'data', 'dataset'],
  mounted() {
    this.renderChart(this.data, this.options, this.label)
  },
})
