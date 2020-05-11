<template>
  <el-row :gutter="40" class="panel-group">
    <el-col :xs="24" :sm="24" :lg="12" class="card-panel-col">
      <el-card class="box-card">
        <z-table :table-data="articleData" :table-header="articleHeader" />
      </el-card>
    </el-col>
    <el-col :xs="24" :sm="24" :lg="12" class="card-panel-col">
      <el-card class="box-card">
        <z-table :table-data="comtData" :table-header="comHeader" />
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
import ZTable from '@/components/ZTable'

export default {

  name: 'NearFuture',

  components: {
    ZTable
  },

  data() {
    return {
      articleHeader: [
        { label: '标题', prop: 'articleTitle' },
        { label: '分类', prop: 'articleSort' },
        { label: '浏览数', prop: 'articleViews' },
        { label: '发布时间', prop: 'releaseTime' }
      ],
      articleData: [
        {
          articleTitle: '文章标题',
          articleSort: 'node.js',
          articleViews: '100',
          releaseTime: '2020-03-19'
        },
        {
          articleTitle: '文章标题',
          articleSort: 'node.js',
          articleViews: '100',
          releaseTime: '2020-03-19'
        },
        {
          articleTitle: '文章标题',
          articleSort: 'node.js',
          articleViews: '100',
          releaseTime: '2020-03-19'
        },
        {
          articleTitle: '文章标题',
          articleSort: 'node.js',
          articleViews: '100',
          releaseTime: '2020-03-19'
        },
        {
          articleTitle: '文章标题',
          articleSort: 'node.js',
          articleViews: '100',
          releaseTime: '2020-03-19'
        }
      ],
      comHeader: [
        { label: '评论人', prop: 'username' },
        { label: '评论内容', prop: 'commentContent' },
        { label: '出处', prop: 'source' },
        { label: '评论时间', prop: 'commentDate' }
      ],
      comtData: [
        {
          username: '用户名',
          commentContent: '评论内容',
          source: '出处',
          commentDate: '2020-03-19'
        },
        {
          username: '用户名',
          commentContent: '评论内容',
          source: '出处',
          commentDate: '2020-03-19'
        },
        {
          username: '用户名',
          commentContent: '评论内容',
          source: '出处',
          commentDate: '2020-03-19'
        },
        {
          username: '用户名',
          commentContent: '评论内容',
          source: '出处',
          commentDate: '2020-03-19'
        },
        {
          username: '用户名',
          commentContent: '评论内容',
          source: '出处',
          commentDate: '2020-03-19'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.card-panel-col {
  margin-bottom: 32px;
}
</style>
