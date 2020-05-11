<template>
  <div>
    <el-form ref="form" :model="optionValue" :label-width="labelWidth">
      <el-row class="elrow" :gutter="30" type="flex">
        <!--        :xs="24" :sm="24" :md="12" :lg="12" :xl="8"-->
        <el-col v-for="(item, name) in options" :key="item.label" :xs="xs" :sm="sm" :md="md" :lg="lg" :xl="xl">

          <!--slot-->
          <slot v-if="item.type==='slot'" :name="name" />

          <!--     text/password     -->
          <el-form-item
            v-else-if="item.type === 'text' || item.type === 'password' || !item.type"
            :label="item.label"
            :prop="name"
            :rules="item.rules"
          >
            <span v-if="item.isText" v-text="optionValue[name]" />
            <el-input
              v-else
              v-model="optionValue[name]"
              size="small"
              :disabled="item.disabled"
              :type="item.type"
              :placeholder="`请输入${item.label || '内容'}`"
              clearable
              @blur="item.rolling ? $emit('rolling', name ,optionValue) : undefined"
            >
              <template v-if="item.append" slot="append">
                <div v-html="item.append" />
              </template>
            </el-input>
          </el-form-item>

          <!-- number -->
          <el-form-item
            v-else-if="item.type === 'number'"
            :label="item.label"
            :prop="name"
            :rules="item.rules"
          >
            <el-input
              v-model.number="optionValue[name]"
              :disabled="item.disabled"
              size="small"
              :placeholder="`请输入${item.label || '内容'}`"
              clearable
              @blur="item.rolling ? $emit('rolling', name, optionValue) : undefined"
            />
          </el-form-item>

          <!--    counter      -->
          <el-form-item
            v-else-if="item.type === 'counter'"
            :label="item.label"
            :prop="name"
            :rules="item.rules"
            @blur="item.rolling ? $emit('rolling', name, optionValue) : undefined"
          >
            <el-input-number
              v-model.number="optionValue[name]"
              :disabled="item.disabled"
              size="small"
              controls-position="right"
              :min="item.min || 0"
              :max="item.max"
            />
          </el-form-item>

          <!--select-->
          <el-form-item
            v-else-if="item.type === 'select'"
            :label="item.label"
            :prop="name"
            :rules="item.rules"
          >
            <el-select
              v-model="optionValue[name]"
              :disabled="item.disabled"
              size="small"
              :placeholder="`请选择${item.label || '内容'}`"
              filterable
              default-first-option
              clearable
              @change="item.rolling ? $emit('rolling', name, optionValue) : undefined"
            >
              <el-option
                v-for="option in item.selectItems"
                :key="option.value"
                :label="option.label"
                :value="option.value"
              />
            </el-select>
          </el-form-item>

          <!--select-multiple -->
          <el-form-item
            v-else-if="item.type === 'multiple'"
            :label="item.label"
            :prop="name"
            :rules="item.rules"
          >
            <el-select
              v-model="optionValue[name]"
              :disabled="item.disabled"
              size="small"
              :placeholder="`请选择${item.label || '内容'}`"
              multiple
              filterable
              collapse-tags
              clearable
              @change="item.rolling ? $emit('rolling', name, optionValue) : undefined"
            >
              <el-option
                v-for="option in item.selectItems"
                :key="option.value"
                :label="option.label"
                :value="option.value"
              />
            </el-select>
          </el-form-item>

          <!--textarea-->
          <el-form-item
            v-else-if="item.type === 'textarea'"
            :label="item.label"
            :prop="name"
            :rules="item.rules"
          >
            <el-input
              v-model="optionValue[name]"
              :disabled="item.disabled"
              type="textarea"
              :placeholder="`请输入${item.label || '内容'}`"
              clearable
              @blur="item.rolling ? $emit('rolling', name, optionValue) : undefined"
            />
          </el-form-item>

          <!-- date -->
          <el-form-item
            v-else-if="item.type === 'date'"
            :label="item.label"
            :prop="name"
            :rules="item.rules"
          >
            <el-date-picker
              v-model="optionValue[name]"
              :disabled="item.disabled"
              size="small"
              align="right"
              type="date"
              :editable="false"
              :placeholder="`请选择${item.label || '日期'}`"
              :picker-options="pickerOptions"
              @change="item.rolling ? $emit('rolling', name, optionValue) : undefined"
            />
          </el-form-item>

          <!-- dateTime -->
          <el-form-item
            v-else-if="item.type === 'dateTime'"
            :label="item.label"
            :prop="name"
            :rules="item.rules"
          >
            <el-date-picker
              v-model="optionValue[name]"
              :disabled="item.disabled"
              size="small"
              type="datetime"
              :editable="false"
              :placeholder="`请选择${item.label || '日期和时间'}`"
              @change="item.rolling ? $emit('rolling', name, optionValue) : undefined"
            />
          </el-form-item>

          <!--switch-->
          <el-form-item
            v-else-if="item.type ==='switch'"
            :label="item.label"
            :prop="name"
          >
            <el-switch
              v-model="optionValue[name]"
              :disabled="item.disabled"
              @change="item.rolling ? $emit('rolling', name, optionValue) : undefined"
            />
          </el-form-item>

        </el-col>
      </el-row>

      <slot name="formSlot" />

    </el-form>
  </div>
</template>

<script>
import { GMTToStr } from '../../utils'

export default {
  props: {
    options: {
      type: Object,
      default: function() {
        return {}
      }
    },
    optionValue: {
      type: Object,
      required: true,
      default: function() {
        return {}
      }
    },
    labelWidth: {
      type: String,
      default: 'auto'
    },
    // :xs="24" :sm="24" :md="12" :lg="12" :xl="8"
    xs: {
      type: Number,
      default: 24
    },
    sm: {
      type: Number,
      default: 24
    },
    md: {
      type: Number,
      default: 24
    },
    lg: {
      type: Number,
      default: 24
    },
    xl: {
      type: Number,
      default: 24
    }
  },

  data() {
    return {
      select: '',
      pickerOptions: {
        shortcuts: [
          {
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date())
            }
          },
          {
            text: '昨天',
            onClick(picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24)
              picker.$emit('pick', date)
            }
          },
          {
            text: '一周前',
            onClick(picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', date)
            }
          }
        ]
      }
    }
  },
  methods: {
    handleCheckData() {
      let flag = null
      this.$refs.form.validate((valid) => {
        if (valid) {
          flag = true
        } else {
          flag = false
        }
      })
      return flag
    },

    handleGetFormData() {
      Object.keys(this.options).map((v) => {
        if (this.options[v].type === 'date') {
          this.optionValue[v] = GMTToStr(this.optionValue[v])
        } else if (this.options[v].type === 'dateTime') {
          this.optionValue[v] = GMTToStr(this.optionValue[v])
        } else if (this.options[v].type === 'switch' && this.options[v] === '') { // TODO
          this.optionValue[v] = true
        }
      })
      return this.optionValue
    }
  }
}
</script>

<style lang="scss" scoped>
.el-date-editor.el-input {
  width: 100% !important;
}

.elrow {
  flex-wrap: wrap;
  align-items: center;
}

.el-select {
  width: 100% !important;
}
</style>
