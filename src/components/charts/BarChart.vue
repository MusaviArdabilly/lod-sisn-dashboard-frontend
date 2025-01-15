<template>
  <Bar
    ref="barChart"
    :options="chartOptions"
    :data="chartDataProps"
  />
</template>

<script>
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
  name: 'BarChart',
  components: { Bar },
  props: {
    chartDataProps: {
      type: Object,
      // required: true
    }
  },
  data() {
    return {
      chartOptions: {
        layout: {
          padding: 0
          },
        // indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
        }
      }
    }
  },
  watch: {
    chartDataProps: {
      handler(newData) {
        if (this.$refs.barChart?.chart) {
          this.$refs.barChart.chart.data = newData
          this.$refs.barChart.chart.update();
          // console.log('Chart updated');
        } else {
          // console.log('Chart not updated: Chart instance not available');
        }
      },
      deep: true
    }
  },
  computed: { //delete this
    chartData() {
      return this.chartDataProps;
    }
  }
}
</script>