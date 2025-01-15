<template>
  <Line
    ref="lineChart"
    :options="chartOptions"
    :data="chartDataProps"
  />
</template>

<script>
import { Line } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale, Filler  } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale, Filler)

export default {
  name: 'LineChart',
  components: { Line },
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
        onClick: (e) => {
          const chartInstance = this.$refs.lineChart.chart;
          
          // Get the elements at the event position
          const elements = chartInstance.getElementsAtEventForMode(e, 'nearest', { intersect: true }, true); //make it false when u dont want to make it mandatory to point
          
          if (elements.length) {
            const element = elements[0]; // Get the first element

            // Retrieve the dataset index and the index of the element
            const datasetIndex = element.datasetIndex;
            const index = element.index;

            // Get the data values
            const dataX = chartInstance.data.labels[index];
            const dataY = chartInstance.data.datasets[datasetIndex].data[index];
            
            // Store the retrieved data in selectedDay
            this.selectedDay = `Label: ${dataX}, Value: ${dataY}`;
            
            console.log(`Clicked at Label: ${dataX}, Value: ${dataY}`);
          }
        },
        plugins: {
          legend: {
            display: true, // Display legend (optional)
            position: 'top', // Position of the legend (optional)
          },
          tooltip: {
            enabled: true, // Enable tooltips
            mode: 'nearest', // Ensure tooltips show up on the nearest data point
            intersect: false, // Show tooltip when hovering close to a point, not just directly over it
          },
          filler: {
            propagate: true,
          }
        },
        scales: {
          x: {
            beginAtZero: true // Optional: Start x-axis at zero
          },
          y: {
            beginAtZero: true // Optional: Start y-axis at zero
          }
        }
      },
      selectedDay: String
    }
  },
  watch: {
    chartDataProps: {
      handler(newData) {
        if (this.$refs.lineChart?.chart) {
          this.$refs.lineChart.chart.data = newData;
          this.$refs.lineChart.chart.update();
          // console.log('Chart updated');
        } else {
          // console.log('Chart not updated: Chart instance not available');
        }
      },
      deep: true, // Watch nested properties inside chartDataProps
    }
  },
  methods: {
    updateChart() {
      // if (this.$refs.lineChart?.chart) {
      //   this.$refs.lineChart.chart.update();
      //   console.log('updated')
      // } else {
      //   console.log('not updated')
      // }
      console.log('no need to manual render, use watch')
    }
  }
}
</script>
