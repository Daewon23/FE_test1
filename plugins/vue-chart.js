import { Line } from 'vue-chartjs'
import Vue from 'vue'

Vue.component('Chart', {
  extends: Line,
  props: ['options', 'data'],
  mounted() {
    this.renderChart(this.data, this.options, this.label)
  },
})
