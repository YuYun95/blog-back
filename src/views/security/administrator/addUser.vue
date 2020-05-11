<template>
  <div class="add-user">
    <z-form
      ref="jrf"
      :options="formDialog.options"
      :option-value="formDialog.optionValue"
    >
      <template slot="formSlot">
        <el-form-item label="头像">
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
      </template>
    </z-form>
    <div class="btn">
      <el-button
        type="primary"
        @click="$refs.jrf.handleCheckData() && handleSubmitUser($refs.jrf.handleGetFormData())">
        确定
      </el-button>
    </div>
  </div>
</template>

<script>
import ZForm from '@/components/ZForm'
import ZFormFunction from '@/components/ZForm/ZFormFunction'
import { validPhone } from '@/components/ZForm/formRules'
import { addAdmin } from '../../../api/security/administrator'

export default {
  name: 'AddUser',
  components: {
    ZForm
  },

  mixins: [ZFormFunction],

  data() {
    return {
      imageUrl: ''
      // imageUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1584957594102&di=6f79fd0bdb7a15732826bb1bdec5b845&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201704%2F10%2F20170410095843_SEvMy.thumb.700_0.jpeg'
    }
  },
  mounted() {
    const checkPassword = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('确认密码不能为空'))
      } else if (value !== this.formDialog.optionValue.password) {
        console.log(value, this.formDialog.optionValue.password)
        callback(new Error('两次密码不一致'))
      } else {
        callback()
      }
    }
    this.formDialog = {
      optionValue: {
        account: '',
        password: '',
        confirmPassword: '',
        userEmail: '',
        userPhone: '',
        userAvatar: ''
      },
      options: {
        account: {
          label: '用户名',
          rules: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 3, max: 32, message: '长度在 3 到 32 个字符', trigger: 'blur' }
          ]
        },
        password: {
          label: '密码',
          type: 'password',
          rules: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 6, max: 32, message: '长度在 6 到 32 个字符', trigger: 'blur' }
          ]
        },
        confirmPassword: {
          label: '确认密码',
          type: 'password',
          rules: [
            { required: true, validator: checkPassword, trigger: 'blur' },
            { min: 6, max: 32, message: '长度在 6 到 32 个字符', trigger: 'blur' }
          ]
        },
        userPhone: {
          label: '手机号',
          rules: [
            { trigger: 'change', validator: validPhone }
          ]
        },
        userEmail: {
          label: '邮箱',
          rules: [
            { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
          ]
        }
      }
    }
  },
  methods: {

    /**
     * 上传头像成功回调
     * @param res
     * @param file
     */
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },

    /**
     * 图片校验
     * @param file
     * @returns {boolean|string}
     */
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg' || 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },

    /**
     * 提交新增管理员
     * @param value
     */
    handleSubmitUser(value) {
      addAdmin(value).then(res => {
        this.$message.success(res.msg[0])
        this.$router.push({ path: '/security/administrator/index' })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.add-user {
  max-width: 500px;
  padding: 15px;

  .btn {
    text-align: right;
  }
}

</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
