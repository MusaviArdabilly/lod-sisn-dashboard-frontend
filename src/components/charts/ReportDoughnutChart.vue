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
            position: 'right',
            labels: {
              generateLabels: function(chart) {
                const data = chart.data;
                if (data.labels.length && data.datasets.length) {
                  return data.labels.map((label, i) => {
                    const ds = data.datasets[0];
                    const meta = chart.getDatasetMeta(0);
                    return {
                      text: `${label}: ${ds.data[i]}`, // combine label with its data value
                      fillStyle: ds.backgroundColor[i], // use the background color from the dataset
                      strokeStyle: undefined, // remove the border
                      lineWidth: 0, // ensure no border width
                    };
                  });
                }
                return [];
              }
            }
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
  },
  computed: { //delete this
    chartData() {
      return this.chartDataProps;
    }
  }
}

</script>