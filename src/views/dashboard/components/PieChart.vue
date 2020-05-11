<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'

require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize'

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '300px'
    }
  },
  data() {
    return {
      chart: null
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart()
    })
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')

      this.chart.setOption({
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          type: 'scroll',
          orient: 'vertical',
          right: 10,
          top: 20,
          bottom: 20,
          data: ['Industries', 'Technology', 'Forex', 'Gold', 'Forecasts','Industries1', 'Technology1', 'Forex1',
            'Gold1', 'Forecasts1']
        },
        series: [
          {
            name: '测试',
            type: 'pie',
            roseType: 'radius',
            radius: [0, 80],
            center: ['30%', '50%'],
            data: [
              { value: 320, name: 'Industries' },
              { value: 240, name: 'Technology' },
              { value: 149, name: 'Forex' },
              { value: 100, name: 'Gold' },
              { value: 59, name: 'Forecasts' },
              { value: 320, name: 'Industries1' },
              { value: 240, name: 'Technology1' },
              { value: 149, name: 'Forex1' },
              { value: 100, name: 'Gold1' },
              { value: 59, name: 'Forecasts1' }
            ],
            animationEasing: 'cubicInOut',
            animationDuration: 2600,
            label: {
              show: false
            }
          }
        ]
      })
    }
  }
}
</script>
