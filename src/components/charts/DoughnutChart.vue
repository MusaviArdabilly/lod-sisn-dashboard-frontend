<template>
  <Doughnut
    ref="doughnutChart"
    :options="chartOptions"
    :data="chartDataProps"
  />
</template>

<script>
import { Doughnut } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale)

export default {
  name: 'doughnutChart',
  components: { Doughnut },
  props: {
    chartDataProps: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      chartOptions: {
        layout: {
          padding: 0
        },
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: 'right'
          },
          tooltip: {
            enabled: true,
            mode: 'nearest', // ensure tooltips show up on the nearest data point
            intersect: false // show tooltip when hovering close to a point, not just directly over it
          },
        }
      }
    }
  },
  watch: {
    chartDataProps: {
      handler(newData) {
        if (this.$refs.doughnutChart?.chart) {
          this.$refs.doughnutChart.chart.data = newData;
          this.$refs.doughnutChart.chart.update();
          // console.log('Chart updated');
        } else {
          // console.log('Chart not updated: Chart instance not available');
        }
      },
      deep: true, // Watch nested properties inside chartDataProps
    }
  }
}

</script>