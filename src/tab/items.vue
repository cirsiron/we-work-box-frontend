<template>
<div class='items-wrapper'>
  <Cards
    :data="data"
    :card="card"
    :currentMode="currentMode"
    @resetForm="resetForm"
    @setActiveIndex="handleActiveIndex"
    @setCurrentMode="handleCurrentMode"
    @onDialogCardVisible="handleDialogCardVisible"
    @onEditCardForm="handleEditCardForm"
  />
  <el-dialog
    v-if="itemCardList"
    :title="`${titleName}Card`"
    :visible.sync="dialogCardVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
  >
    <el-form ref="form" :model="editCardForm" label-width="80px" :rules="rules">
      <el-form-item class="upload-logo" label="logo" prop="logo">
        <el-upload
          ref="upload0"
          class="upload-img"
          action="https://res.guahao.cn/kano/uploadbyteam"
          :before-upload="handleUploadImgBefore"
          :limit="1"
        >
          <el-button size="small" type="primary">
            上传logo
          </el-button>
        </el-upload>
        <el-input v-model="editCardForm.logo" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="名称" prop="name">
        <el-input v-model="editCardForm.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="链接" prop="link">
        <el-input v-model="editCardForm.link" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item class="Card-type"  label="类型" prop="type">
        <el-select
          v-model="editCardForm.type"
          placeholder="请选择类型"
          multiple
          filterable
          allow-create
          default-first-option
        >
          <el-option
            :key="name"
            v-for="{ value, name } in tabContents"
            :label="name" :value="value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="描述" prop="content">
        <el-input type="textarea" v-model="editCardForm.content" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button class="dialog-delete-btn" v-if="isShowDelete" type="danger" @click="fetchDeleteWork">删 除</el-button>
      <el-button @click="dialogCardVisible = false">取 消</el-button>
      <el-button type="primary" @click="handleConfirmForm">确 定</el-button>
    </div>
  </el-dialog>
</div>
</template>
<script>
/**
* Created by huanghui on 2020/09/25
* 文件功能描述:
*/
import md5 from 'md5'
import { mapActions } from 'vuex'
import { TAB_CONTENT, TAB_CONTENT_LIST } from '../constants'
import Cards from './cards'
import { storage } from '../utils'

export default {
  components: {
    Cards
  },
  props: {
    card: {
      type: Object,
      default: () => ({})
    },
    data: [Object, Array]
  },
  data () {
    return {
      // Card弹窗显示
      dialogCardVisible: false,
      // Card修改表单数据
      editCardForm: {
        id: '',
        logo: '',
        name: '',
        link: '',
        type: [0],
        content: '',
        tabName: '默认'
      },
      activeIndex: 1,
      rules: {
        name: [
          { required: true, message: '请输入名称或关键字', trigger: 'blur' }
        ],
        type: [
          { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
        ],
        content: [
          { required: true, message: '请输入描述文字', trigger: 'blur' }
        ]
      },
      editType: 1,
      currentMode: '默认' // 我的 tab选中的值
    }
  },
  computed: {
    tabContents () {
      if (storage.get('ROOT_NAME') === 'admin') {
        return JSON.parse(JSON.stringify(TAB_CONTENT_LIST))
      }
      return [
        {
          name: '我的',
          value: 0
        }
      ]
    },
    itemCardList () {
      return this.data
    },
    titleName () {
      const type = {
        1: '新增',
        2: '修改'
      }
      return type[this.editType] || '编辑'
    },
    isShowDelete () {
      return +this.editType === 2
    },
    isShow () {
      return +this.card.value === +TAB_CONTENT['我的'] // 如果是'我的'类型会显示，其他不显示
    }
  },
  mounted () {
  },
  methods: {
    ...mapActions([
      'addCard',
      'removeCard',
      'editCard'
    ]),
    handleCurrentMode (mode) {
      this.currentMode = mode
    },
    resetForm (editType = 1) {
      this.$refs.form.resetFields()
      this.editType = editType // 添加
    },
    handleActiveIndex (index) {
      this.activeIndex = index
    },
    handleDialogCardVisible (bool) {
      this.dialogCardVisible = bool || false
    },
    handleEditCardForm (item) {
      this.editCardForm = item
    },
    handleUploadImgBefore (files, type) {
      const reader = new FileReader()
      if (files) {
        reader.readAsDataURL(files)
        reader.onload = event => {
          // 文件里的文本会在这里被打印出来
          const categoryId = 111
          const fmd = new FormData()
          fmd.append('userId', '处方平台')
          fmd.append('hashValue', md5(event.target.result))
          fmd.append('categoryId', categoryId)
          fmd.append('file', files)
        }
      }
    },
    // Card: 添加工作项
    fetchAddWork () {
      let card = JSON.parse(JSON.stringify(this.editCardForm))
      if (+this.card.value === 0) {
        card = JSON.parse(JSON.stringify({
          ...this.editCardForm,
          id: +new Date()
        }))
      }
      this.addCard({
        tabIndex: this.card.value,
        card,
        callback: () => {
          setTimeout(() => {
            this.$emit('fetchCards')
          }, 1000)
        }
      })
    },
    // Card: 删除工作项
    fetchDeleteWork () {
      const { tabName } = this.editCardForm
      let id
      if (tabName) {
        id = this.data[tabName][this.activeIndex].id
      } else {
        id = this.data[this.activeIndex].id
      }
      if (!id) {
        return
      }
      this.removeCard({
        tabIndex: this.card.value,
        cardIndex: this.activeIndex,
        tabName,
        id,
        callback: () => {
          setTimeout(() => {
            this.$emit('fetchCards')
          }, 1000)
        }
      })
      this.dialogCardVisible = false
    },
    fetchModifyWork () {
      const { tabName } = this.editCardForm
      let id
      if (tabName) {
        id = this.data[tabName][this.activeIndex].id
      } else {
        id = this.data[this.activeIndex].id
      }
      if (!id) {
        return
      }
      this.editCard({
        id,
        tabName,
        tabIndex: this.card.value,
        cardIndex: this.activeIndex,
        card: JSON.parse(JSON.stringify(this.editCardForm)),
        callback: () => {
          setTimeout(() => {
            this.$emit('fetchCards')
          }, 1000)
        }
      })
    },
    handleConfirmForm () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          // 新增
          if (this.editType === 1) {
            this.fetchAddWork()
          } else {
            this.fetchModifyWork()
          }
          this.dialogCardVisible = false
        } else {
          return false
        }
      })
    }
  }
}
</script>
<style lang='scss'>
.items-wrapper {
  overflow: auto;
  height: calc(100vh - 180px);
  .upload-logo {
    .el-form-item__content {
      display: flex;
      .Card-logo-src {
        min-width: 100px;
        margin-left: 8px;
      }
    }
  }
  .upload-img {
    margin-right: 10px;
  }
}

.dialog-footer {
  position: relative;
  .dialog-delete-btn {
    position: absolute;
    left: 50px;
  }
}
.Card-type {
  .el-select {
    width: 100%;
  }
}

</style>
