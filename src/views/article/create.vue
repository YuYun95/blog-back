<template>
  <div class="article-create">
    <!--    <el-upload-->
    <!--      action="https://jsonplaceholder.typicode.com/posts/"-->
    <!--      list-type="picture-card">-->
    <!--      <i class="el-icon-plus"></i>-->
    <!--    </el-upload>-->
    <z-form
      ref="jrf"
      :options="formDialog.options"
      :option-value="formDialog.optionValue"
    >
      <template slot="formSlot">
        <el-form-item label="内容">
          <div class="editor-container">
            <quill-editor
              ref="myQuillEditor"
              v-model="formDialog.optionValue.articleContent"
              :options="editorOption"
              @blur="onEditorBlur($event)"
              @focus="onEditorFocus($event)"
              @change="onEditorChange($event)">
            </quill-editor>
          </div>
        </el-form-item>
      </template>
    </z-form>
    <div class="btn">
      <el-button
        type="primary"
        @click="$refs.jrf.handleCheckData() && handleSubmitArticle($refs.jrf.handleGetFormData())">
        确定
      </el-button>
    </div>
  </div>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'
import ZForm from '@/components/ZForm'
import ZFormFunction from '@/components/ZForm/ZFormFunction'
import { addArticle } from '@/api/article'

export default {
  name: 'Create',
  components: {
    ZForm,
    quillEditor
  },

  mixins: [ZFormFunction],

  data() {
    return {
      content: '',
      editorOption: {
        theme: 'snow',
        modules: {
          toolbar: {
            container: [
              ['bold', 'italic', 'underline', 'strike'],
              ['blockquote', 'code-block'],
              [{ 'header': 1 }, { 'header': 2 }],
              [{ 'list': 'ordered' }, { 'list': 'bullet' }],
              [{ 'script': 'sub' }, { 'script': 'super' }],
              [{ 'indent': '-1' }, { 'indent': '+1' }],
              ['link', 'image', 'video'],
              [{ 'color': [] }, { 'background': [] }],
              [{ 'align': [] }],
              [{ 'size': ['small', false, 'large', 'huge'] }]
            ]
            // handlers: {
            //   'image': function(value) { // 上传图片
            //     if (value) {
            //       document.querySelector('.el-upload__input').click()
            //     } else {
            //       this.quill.format('image', false)
            //     }
            //   }
            // }
          }
        }
      }
    }
  },
  computed: {
    editor() {
      return this.$refs.myQuillEditor.quill
    }
  },
  mounted() {
    this.formDialog = {
      optionValue: {
        articleTitle: '',
        articleSummary: '',
        articleSort: '',
        articleContent: '',
        articleRelease: true
      },
      options: {
        articleTitle: {
          label: '文章标题',
          rules: [
            { required: true, message: '请输入文章标题', trigger: 'blur' }
          ]
        },
        articleSummary: {
          label: '文章摘要'
        },
        articleRelease: {
          label: '发布',
          type: 'switch'
        }
      }
    }
  },
  methods: {
    /**
     * 提交文章
     * @param value
     */
    handleSubmitArticle(value) {
      addArticle(value).then(res => {
        this.$message.success(res.msg[0])
        this.$router.push({ path: '/article/index' })
      })
    },
    onEditorReady(editor) { // 准备编辑器
    },
    onEditorBlur() {}, // 失去焦点事件
    onEditorFocus() {}, // 获得焦点事件
    onEditorChange() {}, // 内容改变事件
    saveHtml(event) {
      console.log(this.formDialog.optionValue)
    }
  }
}
</script>

<style lang="scss" scoped>
.article-create {
  padding: 15px;

  .btn {
    text-align: right;
  }
}

.editor-container {
  height: 600px;
}

.quill-editor {
  width: 100%;
  height: 550px;
}
</style>
