<template>
  <div class='cards-wrapper'>
    <div v-if="+card.value === 0" class="my-cards-wrapper">
      <span v-if="!isShowRemoveIcon" class="el-icon-edit-outline" @click="handleShowRemoveIcon(true)"></span>
      <span v-else class="el-icon-circle-check" @click="handleShowRemoveIcon(false)"></span>
      <div class="tabs-custom">
        <div class="tabs-titles">
          <div class="tabs-title-item" :class="currentMode === key ? 'active': null" v-for="(itemCard, key) in localCardObject" :key="key" @click="handleActiveTab(itemCard, key)">
            <draggable
              class="tabs-target-draggable"
              :list="localCardObject[key]"
              group="card-itmes"
              @update="handleMoveUpdateCard"
            >
              <span>{{ key }}</span>
              <span
                v-if="isShowRemoveIcon && key !== '默认'"
                class="el-icon-circle-close"
                @click="handleRemoveMyTab(key)"
              ></span>
            </draggable>
          </div>
          <el-button
            class="tab-add"
            size="small"
            icon="el-icon-plus"
            circle
            plain
            @click="handleAddMyTab"
          >
          </el-button>
        </div>
        <div class="tabs-content">
          <draggable v-if="localCardObject[currentMode] && localCardObject[currentMode].length"
            :group="{ name: 'card-itmes' }"
            :list="localCardObject[currentMode]"
            @end="handleChangeEndCard"
          >
            <transition-group class="item-list" type="transition" name="flip-list" tag="div">
                <div class="item-card"
                  :key="item.id || item.name"
                  v-for="(item, index) in localCardObject[currentMode]"
                >
                  <div class="card-mask"
                    @click="handleLink(item.link)"
                  ></div>
                  <i class="item-card-icon el-icon-edit" @click="handleEditCard(item, index)"></i>
                  <div class="card-pic">
                    <img :src="item.logo || 'http://vit.hp.guahao-inc.com/favicon.ico'" alt="">
                  </div>
                  <div class="card-title">
                    {{ item.name }}
                  </div>
                  <div class="card-content">
                    {{ item.content }}
                  </div>
                </div>
            </transition-group>
          </draggable>
          <div
            class="item-card my-add-item"
            @click="handleAddCard()"
          >
            <i class="el-icon-plus"></i>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="item-list"
        v-if="+card.value !== 0 && itemCardList.length"
      >
        <div class="item-card"
          :key="index"
          v-for="(item, index) in itemCardList"
        >
          <div class="card-mask" 
            @click="handleLink(item.link)"
          ></div>
          <i class="item-card-icon el-icon-edit" @click="handleEditCard(item, index)"></i>
          <div class="card-pic">
            <img :src="item.logo || 'http://vit.hp.guahao-inc.com/favicon.ico'" alt="">
          </div>
          <div class="card-title">
            {{ item.name }}
          </div>
          <div class="card-content">
            {{ item.content }}
          </div>
        </div>
        <div
          v-if="isShow"
          class="item-card my-add-item"
          @click="handleAddCard()"
        >
          <i class="el-icon-plus"></i>
        </div>
      </div>
      <div
        v-else-if="isShow"
        class="item-card my-add-item"
        @click="handleAddCard()"
      >
        <i class="el-icon-plus"></i>
      </div>
      <div
        v-else
        class="no-data"
      >
        <slot>
          oops! 暂无内容
        </slot>
      </div>
    </div>
    <el-dialog
      title="添加分类"
      :close-on-click-modal="false"
      :visible.sync="dialogEditMyTabVisible"
      width="30%"
    >
      <el-input v-model="editMyTabValue" placeholder="分类名"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogEditMyTabVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleMyTabConfirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
/**
* Created by huanghui on 2020/10/13
* 文件功能描述: 卡片
*/
import draggable from 'vuedraggable'
import { mapState, mapActions } from 'vuex'
import { LOCAL_MINE_TAB_ITEMS, TAB_CONTENT, CARDS } from '../constants'
import { storage } from '../utils'

export default {
  components: {
    draggable
  },
  props: {
    card: {
      type: Object,
      default: () => ({})
    },
    data: [Object, Array],
    currentMode: String
  },
  data () {
    return {
      dialogEditMyTabVisible: false,
      editMyTabValue: '',
      localCardObject: {},
      isShowRemoveIcon: false
    }
  },
  watch: {
    data (val) {
      if (+this.card.value !== 0) {
        return []
      }
      this.localCardObject = val || {}
    },
    localCardObject: {
      handler (val) {
        if (!val) {
          return
        }
        const localItems = {}
        Object.keys(val).forEach(i => {
          const item = val[i]
          localItems[i] = item.map(ii => {
            return {
              ...ii,
              tabName: i
            }
          }).filter(iii => {
            return iii.id && iii.name
          })
        })
        this.cards[0] = localItems
        this.setCards(this.cards)
      },
      deep: true
    }
  },
  computed: {
    ...mapState({
      cards: state => {
        return state.workModule.cards
      }
    }),
    dragOptions () {
      return {
        animation: 0.2,
        group: 'card-itmes'
      }
    },
    itemCardList () {
      return this.data || []
    },
    isShow () {
      return +this.card.value === +TAB_CONTENT['我的'] // 如果是'我的'类型会显示，其他不显示
    },
    isShowEditIcon () {
      return Object.keys(this.localCardObject || {}).length > 1
    }
  },
  mounted () {
    if (this.card.value === '0') {
      this.data && (this.localCardObject = this.data)
    }
  },
  methods: {
    ...mapActions([
      'setCards'
    ]),
    handleShowRemoveIcon (flag) {
      this.isShowRemoveIcon = flag
    },
    handleRemoveMyTab (key) {
      delete this.cards[0][key]
      this.setCards(this.cards)
      this.$emit('onEmitFetchCards', 10)
      setTimeout(() => {
        this.$emit('setCurrentMode', '默认')
      })
    },
    handleMoveUpdateCard (e) {
      this.$nextTick(() => {
        this.setCards({
          ...this.cards
        })
      })
    },
    handleActiveTab (item, key) {
      this.$emit('setCurrentMode', key)
    },
    handleChangeEndCard (data) {
      const { oldIndex, newIndex } = data
      let items
      if (+this.card.value === 0) {
        items = this.cards[this.card.value][this.currentMode] || {}
        const cache = items[oldIndex]
        items[oldIndex] = items[newIndex]
        items[newIndex] = cache
        this.setCards(this.cards)
      }
    },
    resetForm (val) {
      this.$emit('resetForm', val)
    },
    // 编辑Card
    handleEditCard (item = {}, index = 1) {
      this.$emit('onDialogCardVisible', true)
      this.$emit('setActiveIndex', index)
      this.$nextTick(() => {
        const edit = 2
        this.resetForm(edit)
        this.$emit('onEditCardForm', JSON.parse(JSON.stringify({
          ...item,
          tabName: this.currentMode
        })))
      })
    },
    // 新增
    handleAddCard () {
      this.$emit('onDialogCardVisible', true)
      this.$nextTick(() => {
        const add = 1
        this.resetForm(add)
      })
    },
    handleLink (link) {
      if (/http/.test(link)) {
        window.open(link)
      }
    },
    // 添加我的本地类型
    handleAddMyTab () {
      this.editMyTabValue = ''
      this.dialogEditMyTabVisible = true
    },
    handleMyTabConfirm () {
      const value = this.editMyTabValue.replace(/(^\s*)|(\s*$)/g, '')
      if (!value) {
        this.$message.warning('请输入tab标签名称')
        return false
      }
      this.dialogEditMyTabVisible = false
      this.localCardObject[this.editMyTabValue] = []
      storage.set(LOCAL_MINE_TAB_ITEMS, this.localCardObject)
      const data = storage.get(CARDS)
      data[0] = this.localCardObject
      storage.set(CARDS, data)
      this.setCards(data)
    }
  }
}
</script>
<style lang='scss'>
.cards-wrapper {
  position: relative;
  height: 100%;

  .el-icon-circle-close {
    position: absolute;
    right: -14px;
    top: -4px;
  }
  .tabs-target-draggable {
    position: relative;
    height: 100%;
    .item-card {
      position: absolute!important;
      top: -50%!important;
      left: -50%!important;
      transform: scale(0.5)!important;
    }
  }
  .tabs-custom {
    display: flex;
    height: 100%;
    padding-top: 10px;
    .tabs-titles {
      padding: 0 10px 0 0;
      width: 100px;
      height: 100%;
      overflow: hidden;
      overflow-y: auto;
      font-size: 14px;
      text-align: right;
      font-weight: 500;
      color: #303133;
      border-right: 1px solid #e4e7ed;
      cursor: pointer;
    }
    .tabs-title-item {
      height: 80px;
      padding: 4px 0;
      padding-right: 13px;
      overflow: hidden;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      &.active {
        color: #409eff;
      }
    }
    .tabs-content {
      padding-left: 10px;
      flex: calc(100% - 100px);
      height: 100%;
      overflow: auto;
    }
    .tab-add {
      margin-top: 10px;
    }
  }
  .flip-list-move {
    transition: transform 0.5s;
  }
  .my-cards-wrapper {
    position: relative;
    height: 98%;
    & > .el-icon-edit-outline, & > .el-icon-circle-check {
      position: absolute;
      left: 0;
      top: 0;
      z-index: 10;
      font-size: 16px;
      cursor: pointer;
    }
    .card-tabs {
      .el-tabs__header {
        width: 120px;
        padding-top: 34px;
      }
      .el-tabs__content {
        height: 100%;
        overflow: auto;
      }
    }
  }
  .no-data {
    text-align: center;
    margin: 100px;
    color: #409EFF;
  }
  .item-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    .card-pic {
      width: 60px;
      height: 46px;
      margin: 10px auto 10px;
      position: relative;
      img {
        width: 80%;
        padding: 10%;
        border-radius: 100%;
        overflow: hidden;
        border: 1px solid #f3f3f3;
      }
    }
    .card-title {
      font-size: 16px;
      height: 40px;
      font-weight: 600;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .card-content {
      max-height: 46px;
      overflow: hidden;
    }
    .card-link {
      overflow: hidden;
      text-overflow:ellipsis;
      white-space:nowrap;
      a {
        color: #409EFF;
      }
    }
  }
  .item-card {
    position: relative;
    flex: 1;
    flex-grow: 1;
    margin: 10px;
    max-width: 160px;
    height: 180px;
    min-width: 140px;
    text-align: center;
    border-radius: 6px;
    padding: 0 10px 10px 10px;
    border: 1px solid #eee;
    &:hover {
      box-shadow: 0 2px 10px 0 rgba(0,0,0,.15);
    }
    .card-mask {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 80%;
      z-index: 1;
      cursor: pointer;
    }
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
  .my-add-item {
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    .el-icon-plus {
      font-size: 36px;
      color: #a29e9e;
    }
  }
}
</style>
