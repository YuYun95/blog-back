<template>
  <div>
    <el-table
      v-loading="loading"
      :data="tableData"
      :border="tableBorder"
      :row-key="rowKey"
      :tree-props="treeProps"
      :stripe="true"
      :highlight-current-row="true"
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        v-if="tableSelection"
        align="center"
        type="selection"
        width="50">
      </el-table-column>

      <el-table-column v-if="serial" type="index" label="序号" width="50" />

      <el-table-column
        v-for="(col, index) in cpTableHeader"
        :key="index"
        :fixed="col.fixed"
        :prop="col.prop"
        :label="col.label"
        :width="col.width"
        :align="col.align || colAlign"
        :min-width="col.minWidth || colMinWidth"
        :show-overflow-tooltip="tooltip"
      >
        <template slot-scope="scope">
          <!--    text      -->
          <span v-if="col.type === 'text' || !col.type">
            {{scope.row[col.prop]}}
          </span>
          <!--    button      -->
          <slot v-else-if="col.type === 'btn'" name="btnSlot" :scope="scope"></slot>
          <!--     switch     -->
          <slot v-else-if="col.type === 'slot'" :name="col.prop" :scope="scope"></slot>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'Index',
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    tableData: { // 表格显示的数据
      type: Array,
      required: true
    },
    tableHeader: { // 表格头部数据
      type: Array,
      required: true
    },
    tableHeight: { // 表格高度
      type: String,
      default: 'auto'
    },
    tableBorder: { // 表格边框
      type: Boolean,
      default: true
    },
    tableSelection: { // 表格多选
      type: Boolean,
      default: false
    },
    rowKey: { // 树结构的row-key
      type: String,
      default: 'id'
    },
    treeProps: { // 树结构子级
      type: Object,
      default: function() {
        return {}
      }
    },
    tooltip: { // 单元格内容过长显示省略号
      type: Boolean,
      default: true
    },
    colMinWidth: { // 单元格最小宽度
      type: String,
      default: 'auto'
    },
    serial: { // 是否显示序列号
      type: Boolean,
      default: false
    },
    colAlign: { // 单元格对齐方式
      type: String,
      default: ''
    }
  },
  data() {
    return {
      cpTableHeader: []
    }
  },
  watch: {
    tableHeader: {
      handler(val) {
        this.cpTableHeader = val
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    // 勾选
    handleSelectionChange(val) {
      this.$emit('selectionChange', val)
    }
  }
}
</script>

<style scoped>

</style>
