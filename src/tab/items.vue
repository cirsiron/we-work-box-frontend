<template>
<div class='items-wrapper'>
  <div class="item-list"
    v-if="itemCardList.length"
  >
    <div
      v-if="isShow"
      class="item-card my-add-item"
    >
      <i class="el-icon-plus" @click="handleAddCard()"></i>
    </div>
    <div class="item-card"
      :key="index"
      v-for="(item, index) in itemCardList"
      @click="handleLink(item)"
    >
      <i class="item-card-icon el-icon-edit" @click="handleEditCard(item, index)"></i>
      <div class="card-pic">
        <img :src="item.logo || 'https://file.ipadown.com/tophub/assets/images/media/appinn.com.png_120x120.png'" alt="">
      </div>
      <div class="card-title">
        {{ item.name }}
      </div>
      <div v-if="item.link" class="card-link">
        <a :href="item.link" target="_blank">跳转链接</a>
      </div>
      <div class="card-description">
        {{ item.description }}
      </div>
    </div>
  </div>
  <div v-else class="no-data">
    暂无数据
  </div>
  <el-dialog
    v-if="itemCardList.length"
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
        <span class="Card-logo-src">{{ editCardForm.logo }}</span>
      </el-form-item>
      <el-form-item label="名称" prop="name">
        <el-input v-model="editCardForm.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="链接" prop="link">
        <el-input v-model="editCardForm.link" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="类型" class="Card-type" prop="type">
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
      <el-form-item label="描述" prop="description">
        <el-input type="textarea" v-model="editCardForm.description" autocomplete="off"></el-input>
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
import { TAB_CONTENT, TAB_CONTENT_LIST } from '../constants'
import { mapActions } from 'vuex'

export default {
  props: {
    data: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      // Card弹窗显示
      dialogCardVisible: false,
      activeIndex: 1,
      // Card修改表单数据
      editCardForm: {
        logo: '',
        name: '',
        link: '',
        type: [0],
        description: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入名称或关键字', trigger: 'blur' }
        ],
        type: [
          { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
        ],
        description: [
          { required: true, message: '请输入描述文字', trigger: 'blur' }
        ]
      },
      editType: 1
    }
  },
  computed: {
    tabContents () {
      return JSON.parse(JSON.stringify(TAB_CONTENT_LIST))
    },
    itemCardList () {
      return this.$store.state.workModule.cards[this.data.value || 0]
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
      return +this.data.value === +TAB_CONTENT['我的'] // 如果是'我的'类型会显示，其他不显示
    }
  },
  mounted () {
  },
  methods: {
    ...mapActions([
      'addCard',
      'removeCard'
    ]),
    resetForm (editType = 1) {
      this.$refs.form.resetFields()
      this.editType = editType // 添加
    },
    // 新增
    handleAddCard () {
      this.dialogCardVisible = true
      this.$nextTick(() => {
        const add = 1
        this.resetForm(add)
      })
    },
    // 编辑Card
    handleEditCard (item = {}, index = 1) {
      this.dialogCardVisible = true
      this.activeIndex = index
      this.$nextTick(() => {
        const edit = 2
        this.resetForm(edit)
        this.editCardForm = JSON.parse(JSON.stringify(item))
      })
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
          // this.editCardForm = fmd
        }
      }
    },
    // Card: 添加工作项
    fetchAddWork () {
      const card = JSON.parse(JSON.stringify(this.editCardForm))
      this.addCard({
        tabIndex: this.data.value,
        card
      })
    },
    // Card: 删除工作项
    fetchDeleteWork () {
      this.removeCard({
        tabIndex: this.data.value,
        cardIndex: this.activeIndex
      })
      this.dialogCardVisible = false
    },
    fetchModifyWork () {
      this.editCard({
        tabIndex: this.data.value,
        cardIndex: this.activeIndex,
        card: JSON.parse(JSON.stringify(this.editCardForm))
      })
    },
    fetchQueryWork () {
      // Card: 查询工作项
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
    },
    handleLink () {
      // const { link } = item
      // if (!link) {
      //   return
      // }
      // window.open(link)
    }
  }
}
</script>
<style lang='scss'>
.items-wrapper {
  overflow: auto;
  height: calc(100vh - 180px);
  .no-data {
    text-align: center;
    margin: 100px;
  }
  .item-list {
    display: flex;
    flex-wrap: wrap;
    .item-card {
      position: relative;
      margin-right: 10px;
      width: 16.6%;
      min-width: 120px;
      text-align: center;
      padding-right: 14px;
      .item-card-icon {
        display: none;
        position: absolute;
        right: 8px;
        top: 8px;
        font-size: 16px;
        cursor: pointer;
      }
      a {
        text-decoration: none;
      }
      &:hover {
        .item-card-icon {
          display: block;
        }
      }
    }
    .card-pic {
      width: 60px;
      height: 60px;
      margin: 30px auto 10px;
      position: relative;
      img {
        width: 80%;
        padding: 10%;
        border-radius: 100%;
        overflow: hidden;
        border: 1px solid #f3f3f3;
      }
    }
    .my-add-item {
      display: flex;
      justify-content: center;
      align-items: center;
      .el-icon-plus {
        font-size: 36px;
        color: #a29e9e;
      }
    }
    .card-title {

    }
    .card-type {

    }
    .card-link {
      overflow: hidden;
      text-overflow:ellipsis;
      white-space:nowrap;
    }
    .card-description {

    }
  }
  .upload-logo {
    .el-form-item__content {
      display: flex;
      .Card-logo-src {
        min-width: 100px;
        margin-left: 8px;
      }
    }
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

@media (max-width: 1024px) {
  .items-wrapper {
    .item-list {
      .item-card {
        width: 20%;
      }
    }
  }
}

@media (max-width: 768px) {
  .items-wrapper {
    .item-card {
      width: 25%;
    }
  }
}
</style>
