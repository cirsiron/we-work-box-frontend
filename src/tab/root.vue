<template>
  <div class="root-wrapper">
    <!-- 头部 -->
    <v-header
      :hasVal="hasVal"
      @setValBool="setValBool"
      @setSearchItems="handleSearchItems"
      @handleDrawerTodo="handleDrawerTodo"
      @handleDrawerCalendar="handleDrawerCalendar"
    />
    <!-- 列表位置 -->
    <div class="content-wrapper">
      <div class="item-list" v-if="searchItems.length">
        <div class="item-card"
          :key="index"
          v-for="(item, index) in searchItems"
          @click="handleLink(item.link)"
        >
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
      </div>
      <div
        v-else-if="hasVal && searchItems.length === 0"
        class="no-data"
      >
        oops! 未找到内容，请更换关键字重试~
      </div>
      <el-tabs
        v-else
        v-model="contentsValue"
        stretch
        @tab-remove="handleRemoveTab"
      >
        <el-tab-pane
          :key="item.name"
          v-for="item in contents"
          :label="item.name"
          :name="item.value"
          :closable="item.closable"
        >
          <Items :card="item" :data="handleItemData(cards, item.value)" @fetchCards="fetchCards"/>
        </el-tab-pane>
      </el-tabs>
    </div>
    <el-drawer
      title="待办事项"
      :withHeader="false"
      :visible.sync="drawerTodoShow"
      direction="ltr"
      size="56%"
    >
      <TODO />
    </el-drawer>
    <el-drawer
      title="📅 日历"
      :withHeader="false"
      :visible.sync="drawerShow"
      direction="rtl"
      size="80%"
    >
      <el-calendar>
        <template
          slot="dateCell"
          slot-scope="{ data }">
          <p class="custom-name" :class="data.isSelected ? 'is-selected' : ''">
            {{ data.day.split('-').slice(1).join('-') }}
            <span v-if="filterTodos(todos, data.day).length">
              <p class="todo-content" :key="i.id" v-for="(i) in filterTodos(todos, data.day)">
                <el-popover
                  placement="top-start"
                  width="200"
                  trigger="hover"
                  :content="filterTodos(todos, data.day).map(dayItem => dayItem.text).reduce((val, cur) => val + ' ' + cur)"
                  @hide="handleRemoveWhenHide"
                >
                  <span slot="reference">{{ i.text }}</span>
                </el-popover>
              </p>
            </span>
          </p>
        </template>
      </el-calendar>
    </el-drawer>
    <v-dialog
      v-if="isFirstShow"
      :centerDialogVisible="centerDialogVisible"
      @show="showDialog"
      @hide="hideDialog"
    />
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import VHeader from './header'
import Items from './items'
import Cards from './cards'
import TODO from './todo/Home.vue'
import vDialog from './dialog'
import { SHOW_TYPE, LOCAL_MINE_TAB_ITEMS, CARDS } from '../constants'
import { fetchCard } from '../api'
import { storage } from '../utils'

export default {
  components: {
    VHeader,
    Items,
    TODO,
    vDialog,
    Cards
  },
  data: () => ({
    hasVal: false, // 搜索框是否有值
    searchItems: [], // 搜索的
    contentsValue: '0',
    centerDialogVisible: true,
    // 抽屉弹出层
    drawerShow: false,
    drawerTodoShow: false // todo弹窗
  }),
  computed: {
    contents () {
      return this.$store.state.workModule.contents
    },
    isFirstShow () {
      return !(window.localStorage.getItem(SHOW_TYPE))
    },
    todos () {
      return this.$store.state.todoModule.todos
    },
    cards () {
      return this.$store.state.workModule.cards
    }
  },
  mounted () {
    this.fetchCards()
    this.onBookMarks()
    this.handleIntro()
  },
  methods: {
    ...mapActions([
      'removeContent',
      'setContents',
      'setCards'
    ]),
    handleItemData (item, type) {
      return item[type]
    },
    handleIntro () {
      const IS_INTRO = 'IS_INTRO'
      const isIntro = storage.get(IS_INTRO)
      if (isIntro) {
        return
      }
      this.$intro().setOptions({
        prevLabel: '上一步',
        nextLabel: '下一步',
        skipLabel: '跳过',
        doneLabel: '结束',
        /* 是否使用键盘Esc退出 */
        exitOnEsc: false,
        exitOnOverlayClick: false
      }).oncomplete(function () {
          //点击跳过按钮后执行的事件
          storage.set(IS_INTRO, true)
      }).onexit(function () {
          //点击结束按钮后， 执行的事件
          storage.set(IS_INTRO, true)
      }).start() // start the guide
    },
    handleRemoveWhenHide () {
      const els = document.getElementsByClassName('el-popover')
      for (let i = 0; i < els.length; i++) {
        const curEl = els[i]
        curEl.parentNode.removeChild(curEl)
      }
    },
    filterTodos (todos, day) {
      return todos.filter(i => {
        let [rangeDate0 = '', rangeDate1 = ''] = i.rangeDate || []
        const startDate = (rangeDate0.match(/\d+-\d+-\d+/g) || [])[0]
        const endDate = (rangeDate1.match(/\d+-\d+-\d+/g) || [])[0]
        if (!startDate || !endDate) {
          return false
        }
        const startTime = +new Date(startDate)
        const endTime = +new Date(endDate)
        const dayTime = +new Date(day)
        return startTime <= dayTime && endTime >= dayTime
      })
    },
    onBookMarks () {
      this.$root.$on('setBookMarks', (data) => {
        const dataList = data.map(i => {
          const link = i[1] || ''
          const logo = i[2] || ''
          const name = i[3] || ''
          return {
            name,
            logo,
            link,
            id: `${+new Date()}${String(Math.random()).slice(2, 8)}`,
            tabName: '默认',
            content: name
          }
        })
        if (!this.cards[0]) {
          this.cards[0] = {}
        }
        this.cards[0] = {
          ...this.cards[0],
          '默认': [
            ...(this.cards[0]['默认'] || []),
            ...dataList
          ]
        }
        storage.set(CARDS, this.cards)
        this.setCards(this.cards)
      })
    },
    setValBool (bool) {
      this.hasVal = bool || false
      // 搜索框为空 重置搜索
      if (!bool) {
        this.searchItems = []
      }
    },
    handleSearchItems (items) {
      this.searchItems = items || []
    },
    transformCards (res) {
      const data = {}
      res.forEach((i) => {
        const { _source, _id } = i
        const { type = [] } = _source || {}
        type.forEach((t) => {
          if (!data[t]) {
            data[t] = [{
              ..._source,
              id: _id
            }]
          } else {
            data[t].push({
              ..._source,
              id: _id
            })
          }
        })
      })
      return data
    },
    fetchCards () {
      fetchCard.query().then((res = []) => {
        const cards = this.transformCards(res)
        const localMineItems = storage.get(LOCAL_MINE_TAB_ITEMS) || {
          '默认': []
        }
        // 合并本地 我的 tab中的数据
        cards[0] = localMineItems
        const cardObj = cards || {}
        // 本地同步存储
        storage.set(CARDS, cardObj)
        this.setCards(cardObj)
      }).catch((err) => {
        console.log(err)
      })
    },
    hideDialog () {
      this.centerDialogVisible = false
    },
    showDialog () {
      this.centerDialogVisible = true
    },
    handleDrawerCalendar () {
      this.drawerShow = true
    },
    handleDrawerTodo () {
      this.drawerTodoShow = true
    },
    handleRemoveTab (name) {
      this.$confirm('此操作将删除该项目, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const content = this.contents.filter(i => i.value === name)
        content && this.removeContent(content[0])
        this.contentsValue = this.contents[0].value
        storage.remove('SHOW_TYPE')
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      })
    },
    handleLink (link) {
      if (/http/.test(link)) {
        window.open(link)
      }
    }
  }
}
</script>
<style lang="less">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body {
  background-image: radial-gradient(ellipse farthest-corner at center top, #fff 0%, #e4e4e4 100%);
}
.root-wrapper {
  margin-top: 12px;
  .el-calendar-day {
    .custom-name {
      height: 100%;
      overflow: hidden;
    }
  }
  .todo-content {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    word-break: break-all;
    width: 100%;
    background: #d9e4dd;
    color: #303133;
    padding: 1px 4px;
    margin-bottom: 2px;
  }
  .content-wrapper {
    position: relative;
    display: flex;
    justify-content: center;
    height: calc(100vh - 92px);
    & > .el-tabs {
      width: 68%;
      max-width: 960px;
      margin-top: 10px;
      padding: 10px;
      padding-top: 0;
      box-shadow: 0 10px 40px -10px rgba(0, 64, 128, 0.2);
      background: rgba(255,255,255,0.8);
      border-radius: 10px;
      .el-tabs__content {
        padding: 0 10px;
      }
      .is-closable {
        .el-icon-close {
          margin-left: 10px;
        }
      }
    }
    & > .item-list {
      display: flex;
      flex-wrap: wrap;
      width: 68%;
      height: calc(100vh - 114px);
      max-width: 960px;
      margin-top: 10px;
      padding: 10px 30px;
      padding-top: 16px;
      box-shadow: 0 10px 40px -10px rgba(0, 64, 128, 0.2);
      border-radius: 10px;
      background: rgba(255, 255, 255, 0.8);
      align-content: flex-start;
      overflow: auto;
      .item-card {
        overflow: hidden;
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
        cursor: pointer;
        &:hover {
          box-shadow: 0 2px 10px 0 rgba(0,0,0,.15);
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
      .card-pic {
        width: 60px;
        height: 46px;
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
      .card-title {
        font-size: 16px;
        height: 40px;
        font-weight: 600;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .card-content {
        max-height: 66px;
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
  }
  .bookmark-btn {
    position: fixed;
    right: 10px;
    bottom: 60px;
    opacity: 0.4;
    &:hover {
      opacity: 1;
    }
  }
  .no-data {
    text-align: center;
    margin: 100px;
    color: #409EFF;
  }
}
#canv {
  position: fixed;
  width: 100vw;
  height: 100vh;
  z-index: -1;
}
</style>
