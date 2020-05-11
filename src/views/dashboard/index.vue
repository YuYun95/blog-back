<template>
  <div class="dashboard-container">
    <panel-group class="panel-group" />
    <statistics-group class="statistics-group" />
    <near-future />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import PanelGroup from './components/PanelGroup'
import StatisticsGroup from './components/StatisticsGroup'
import NearFuture from './components/NearFuture'

export default {
  name: 'Dashboard',
  components: {
    PanelGroup,
    StatisticsGroup,
    NearFuture
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    min-height: calc(100vh - 50px);
    padding: 15px;
    background-color: rgb(240, 242, 245);
    position: relative;
  }

  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
