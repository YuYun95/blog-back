<template>
  <el-row :gutter="40">
    <el-col :xs="24" :sm="24" :lg="8" class="card-panel-col">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>分类文章数统计</span>
        </div>
        <div class="chart">
          <pie-chart height="240px" />
        </div>
      </el-card>
    </el-col>
    <el-col :xs="24" :sm="24" :lg="8" class="card-panel-col">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>文章访问TOP.10</span>
        </div>
        <div v-for="o in 10" :key="o" class="article-title">
          {{'列表内容 ' + o }}
          <div class="read">11</div>
        </div>
      </el-card>
    </el-col>
    <el-col :xs="24" :sm="24" :lg="8" class="card-panel-col">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>爬虫访问统计TOP.10</span>
        </div>
        <div class="chart">
          统计图
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
import PieChart from './PieChart'

export default {
  name: 'StatisticsGroup',

  components: {
    PieChart
  }
}
</script>

<style lang="scss" scoped>
.card-panel-col {
  margin-bottom: 32px;
}

.box-card {
  height: 332px;

  .article-title {
    padding: 3px 0;
    color: #248FFF;
    cursor: pointer;

    &:hover {
      color: rgba(36, 143, 255, 0.7);
    }

    &:after {
      display: block;
      content: '';
      clear: both;
    }

    .read {
      float: right;
    }
  }
}
</style>
