<template>
  <div class="app-container">
    <div class="list-header">
      <el-button size="small" icon="el-icon-edit" @click="handleAddAdmin">新增用户</el-button>
      <el-button size="small" icon="el-icon-delete">批量删除</el-button>
    </div>
    <div class="artilce-list">
      <z-table
        :table-selection="true"
        :table-header="userHeader"
        :table-data="userData"
        col-align="center"
      >
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
      @pagination="handleGetAdminList"
    />
  </div>
</template>

<script>
import ZTable from '@/components/ZTable'
import Pagination from '@/components/Pagination'
import { getAdmin, deletaAdmin } from '../../../api/security/administrator'

export default {
  name: 'Index',

  components: {
    ZTable,
    Pagination
  },

  data() {
    return {
      userHeader: [
        { label: '用户名', prop: 'account' },
        { label: '注册时间', prop: 'createdAt' },
        { label: '操作', type: 'btn', fixed: 'right' }
      ],
      userData: [],
      currentPage: 1, // 当前页
      size: 30, // 每页显示多少条
      total: 1 // 总数
    }
  },

  mounted() {
    this.handleGetAdminList()
  },

  methods: {
    /**
     * 获取管理员列表
     */
    handleGetAdminList() {
      const data = {
        account: this.account,
        currentPage: this.currentPage,
        size: this.size
      }
      getAdmin(data).then(res => {
        this.userData = res.data.list
        this.total = parseInt(res.data.total)
      })
    },

    /**
     * 添加管理员
     */
    handleAddAdmin() {
      this.$router.push({
        path: `/security/administrator/add-user`
      })
    },

    /**
     * 编辑管理员
     * */
    handleEdit(clo) {
      this.$router.push({
        path: `/security/administrator/edit-user`,
        query: { ...clo.scope.row }
      })
    },

    /**
     * 删除管理员
     * @param clo
     */
    handleDelete(clo) {
      this.$confirm('确定删除吗？', '警告', {
        cancelButtonClass: '取消',
        confirmButtonClass: '确定',
        type: 'warning'
      }).then(() => {
        deletaAdmin(clo.scope.row.id).then(res => {
          this.handleGetAdminList()
          this.$message.success(res.msg[0])
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.artilce-list {
  padding: 15px;
  height: 100%;

  .list-header {
    margin-bottom: 15px;
  }
}
</style>
