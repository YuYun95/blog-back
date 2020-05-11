<template>
  <div class="article-container">
    <div class="list-header">
      <el-button size="small" icon="el-icon-edit" @click="handleCreateArticle">新增文章</el-button>
      <!--      <el-button size="small" icon="el-icon-delete">批量删除</el-button>-->
      <!--      <el-button size="small" icon="el-icon-position">批量发布</el-button>-->
    </div>
    <div class="artilce-list">
      <z-table :table-selection="false" :serial="true" :table-header="articleHeader" :table-data="articleData">
        <template v-slot:openComment="clo">
          <el-switch
            v-model="clo.scope.row.openComment"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="handleOpenOrCloseComment(clo)"
          >
          </el-switch>
        </template>
        <template v-slot:recommend="clo">
          <el-switch
            v-model="clo.scope.row.recommend"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="handleRecommend(clo)"
          >
          </el-switch>
        </template>
        <template v-slot:articleTop="clo">
          <el-switch
            v-model="clo.scope.row.articleTop"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="handleArticleTop(clo)"
          >
          </el-switch>
        </template>
        <template v-slot:articleRelease="clo">
          <el-switch
            v-model="clo.scope.row.articleRelease"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="handleArticleRelease(clo)"
          >
          </el-switch>
        </template>
        <template v-slot:btnSlot="clo">
          <el-button size="mini" type="primary" icon="el-icon-edit" @click="handleEdit(clo)"></el-button>
          <el-button size="mini" type="danger" icon="el-icon-delete" @click="handleDelete(clo)"></el-button>
        </template>
      </z-table>
    </div>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="currentPage"
      :limit.sync="size"
      @pagination="handleGetArticleList"
    />
  </div>
</template>

<script>
import ZTable from '@/components/ZTable'
import Pagination from '@/components/Pagination'
import {
  getArticle,
  deleteArticle,
  openOrCloseComment,
  recommend,
  setArticleTop,
  setArticleRelease
} from '@/api/article'

export default {
  name: 'Index',

  components: {
    ZTable,
    Pagination
  },
  data() {
    return {
      articleTitle: '',
      articleHeader: [
        { label: '文章标题', prop: 'articleTitle' },
        { label: '浏览量', prop: 'articleViews' },
        { label: '评论量', prop: 'articleCommentCount' },
        { label: '喜欢', prop: 'articleLikeCount' },
        { label: '发布时间', prop: 'createdAt' },
        { label: '开启评论', prop: 'openComment', type: 'slot' },
        { label: '推荐', prop: 'recommend', type: 'slot' },
        { label: '置顶', prop: 'articleTop', type: 'slot' },
        { label: '发布', prop: 'articleRelease', type: 'slot' },
        { label: '操作', type: 'btn', fixed: 'right', width: '150px' }
      ],
      articleData: [],
      currentPage: 1, // 当前页
      size: 30, // 每页显示多少条
      total: 1 // 总数
    }
  },

  mounted() {
    this.handleGetArticleList()
  },

  methods: {
    /**
     * 获取文章列表
     */
    handleGetArticleList() {
      const data = {
        articleTitle: this.articleTitle,
        currentPage: this.currentPage,
        size: this.size
      }
      getArticle(data).then(res => {
        this.articleData = res.data.list
        console.log(this.articleData)
        this.total = parseInt(res.data.total)
      })
    },

    /**
     * 新增文章
     */
    handleCreateArticle() {
      this.$router.push({ path: '/article/create' })
    },

    /**
     * 修改文章
     * @param clo
     */
    handleEdit(clo) {
      this.$router.push({
        path: `/article/edit`,
        query: { id: clo.scope.row.id }
      })
    },

    /**
     * 删除文章
     * @param clo
     */
    handleDelete(clo) {
      this.$confirm('确定删除吗？', '警告', {
        confirmButtonClass: '确定',
        cancelButtonClass: '取消',
        type: 'warning'
      }).then(() => {
        deleteArticle(clo.scope.row.id).then(res => {
          this.$message.success(res.msg[0])
          this.handleGetArticleList()
        })
      })
    },

    /**
     * 开启/关闭评论
     * @param clo
     */
    handleOpenOrCloseComment(clo) {
      const articleId = clo.scope.row.id
      const openComment = clo.scope.row.openComment
      openOrCloseComment({ OnOrOff: openComment }, articleId).then(res => {
        this.$message.success(res.msg[0])
        this.handleGetArticleList()
      })
    },

    /**
     * 设置为推荐文章
     * @param clo
     */
    handleRecommend(clo) {
      const articleId = clo.scope.row.id
      const recommendValue = clo.scope.row.recommend
      recommend({ OnOrOff: recommendValue }, articleId).then(res => {
        this.$message.success(res.msg[0])
        this.handleGetArticleList()
      })
    },

    /**
     * 设置文章置顶
     * @param clo
     */
    handleArticleTop(clo) {
      const articleId = clo.scope.row.id
      const recommendValue = clo.scope.row.articleTop
      setArticleTop({ OnOrOff: recommendValue }, articleId).then(res => {
        this.$message.success(res.msg[0])
        this.handleGetArticleList()
      })
    },

    /**
     * 发布文章
     * @param clo
     */
    handleArticleRelease(clo) {
      const articleId = clo.scope.row.id
      const articleRelease = clo.scope.row.articleRelease
      setArticleRelease({ OnOrOff: articleRelease }, articleId).then(res => {
        this.$message.success(res.msg[0])
        this.handleGetArticleList()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.article-container {
  padding: 15px;

  .list-header {
    margin-bottom: 15px;
  }
}
</style>
