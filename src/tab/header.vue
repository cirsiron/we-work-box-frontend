<template>
  <div class='header-wrapper'>
    <div class="logo">
      <div class="logo-img">
        <img src="../assets/imgs/logo.png" width="40px" height="40px" alt="">
        <el-button size="mini" round @click="handleExport">导出</el-button>
      </div>
      <div class="todo-btn">
        <el-badge :value="todoCount" class="item">
          <el-button
            round
            size="small"
            @click="handleDrawerTodo"
          >今日待办</el-button>
        </el-badge>
      </div>
    </div>
    <div class="search">
      <el-input
        id="search-input"
        ref="input"
        clearable
        placeholder="输入关键字进行搜索"
        prefix-icon="el-icon-search"
        v-model="searchVal"
        @focus="handleFocus"
        @blur="handleBlur"
        @input="handleSearch"
      />
    </div>
    <div class="user">
      <div class="calendar-btn">
        <el-button
          round
          size="small"
          @click="handleDrawerCalendar"
        >查看日历</el-button>
      </div>
    </div>
    <el-dropdown @command="handleMoreCommand">
      <span class="el-dropdown-link">
        <i class="el-icon-more"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="importMark">
          <input type="file" ref="fileElem" style="display:none" @change="getBookmarkData">
          <span ref="fileSelect">上传书签</span>
        </el-dropdown-item>
        <el-dropdown-item command="exportData">
          <span>导出数据</span>
        </el-dropdown-item>
        <el-dropdown-item command="reset">
          <span>重置工作台</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>
<script>
/**
* Created by huanghui on 2020/09/24
* 文件功能描述:头部文件
*/
import { mapState } from 'vuex'
import { saveAs } from 'file-saver'
import jsonFormat from 'json-format'
import { storage } from '../utils'
import { fetchCard } from '../api'
import { LOCAL_MINE_TAB_ITEMS, SHOW_TYPE, CARDS, WORK_CONTENTS, TODO_LIST } from '../constants'

export default {
  data () {
    return {
      searchVal: ''
    }
  },
  watch: {
  },
  computed: {
    ...mapState({
      todos: state => state.todoModule.todos
    }),
    todoCount () {
      return this.todos.filter(todo => !todo.done).length
    }
  },
  mounted () {
    this.focusInput()
    window.addEventListener('keydown', (e) => {
      const { keyCode } = e
      const ctrlKey = e.ctrlKey || e.metaKey
      const altKey = e.altKey
      // alt + space / ctrl + space
      if ((altKey || ctrlKey) && keyCode === 32) {
        this.focusInput()
      }
    })
  },
  methods: {
    focusInput () {
      try {
        this.$refs.input.focus()
      } catch (e) {
        console.log(e)
      }
    },
    handleMoreCommand (cmd) {
      const cmdActions = {
        'importMark': () => {
          this.importBookmark()
        },
        'exportData': () => {
          this.handleExport()
        },
        'reset': () => {
          this.reset()
        }
      }
      cmdActions[cmd] && cmdActions[cmd]()
    },
    importBookmark () {
      this.$refs.fileElem.click()
    },
    matchAll (reg, str) {
      let arr = []
      let res = reg.exec(str)

      if (reg.global) {
        while (res) {
          arr.push(res)
          res = reg.exec(str)
        }
      } else {
        arr.push(res)
      }
      return arr
    },
    parserBookbarkToJson (html) {
      const reg = /<DT><A HREF="(\S+)"\s+[\S\s]+?ICON="([\S\s]+?)"?>((?:[\W\w]+?))<\/A>/g
      const hrefs = this.matchAll(reg, html)
      return hrefs
    },
    getBookmarkData ({ target }) {
      if (!target.files[0]) {
        return
      }
      const reader = new FileReader()
      reader.readAsText(target.files[0], 'utf8')
      reader.onload = () => {
        if (!reader.result) {
          return
        }
        if (/\{[\s\S]+SHOW_TYPE/.test(reader.result)) {
          const jsonRes = JSON.parse(reader.result)
          jsonRes.SHOW_TYPE && storage.set(SHOW_TYPE, jsonRes.SHOW_TYPE)
          jsonRes.CARDS && storage.set(CARDS, jsonRes.CARDS)
          jsonRes.WORK_CONTENTS && storage.set(WORK_CONTENTS, jsonRes.WORK_CONTENTS)
          jsonRes.LOCAL_MINE_TAB_ITEMS && storage.set(LOCAL_MINE_TAB_ITEMS, jsonRes.LOCAL_MINE_TAB_ITEMS)
          jsonRes.TODO_LIST && storage.set(TODO_LIST, jsonRes.TODO_LIST)
          window.location.reload()
        } else {
          const markbooks = this.parserBookbarkToJson(reader.result)
          markbooks && markbooks.length && this.$root.$emit('setBookMarks', markbooks)
        }
      }
    },
    // 数据导出
    handleExport () {
      let data = {}
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i) // 获取本地存储的Key
        const item = storage.get(key)
        data[key] = item
      }
      const dataFormated = jsonFormat(data, {
        type: 'space',
        size: 2
      })
      const blob = new Blob([dataFormated], { type: 'text/json;charset=utf-8' })
      saveAs(blob, '导出数据.json')
    },
    reset () {
      this.$confirm('此操作将重置已选择的标签, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 重置 刷新
        localStorage.clear()
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        window.location.reload()
      })
    },
    handleFocus () {
      const ele = this.$refs.input.$el
      ele.className = (ele.className || '').replace(/\s{2}/g, ' ')
      ele.className = !ele.className ? 'focus' : ele.className + ' ' + 'focus'
    },
    handleBlur () {
      const ele = this.$refs.input.$el
      ele.className = ele.className.replace(/focus/g, '')
    },
    handleSearch () {
      const val = this.searchVal.replace(/(^\s*)|(\s*$)/g, '')
      if (!val) {
        this.$emit('setValBool', false)
        return
      }
      this.$emit('setValBool', true)

      const localItems = storage.get(LOCAL_MINE_TAB_ITEMS) || {}
      let allData = []
      Object.keys(localItems).forEach(i => {
        allData = allData.concat(localItems[i] || [])
      })
      var reg = new RegExp(val, 'gi')
      const filterItems = allData.filter(i => {
        return reg.test(`${i.content}${i.name}`)
      })
      fetchCard.query({
        q: val
      }).then((res) => {
        const data = (res || []).map((item) => {
          const { _source, _id } = item
          return {
            ..._source,
            id: _id
          }
        })
        this.$emit('setSearchItems', [...data, ...filterItems])
      }).catch((err) => {
        this.$emit('setSearchItems', filterItems)
        console.log(err)
      })
    },
    handleDrawerTodo () {
      this.$emit('handleDrawerTodo', true)
    },
    handleDrawerCalendar () {
      this.$emit('handleDrawerCalendar', true)
    }
  }
}
</script>
<style lang='less'>
.header-wrapper {
  display: flex;
  height: 80px;
  align-items: center;
  box-shadow: 0 10px 40px -10px #a2aeb933;
  & > .el-dropdown {
    left: -22px;
    cursor: pointer;
  }
  .logo-img {
    display: flex;
    position: relative;
    text-align: center;
    &:hover {
      .el-button {
        display: block;
      }
    }
    .el-button {
      display: none;
      position: absolute;
      top: 41px;
      left: -7px;
    }
  }
  .logo, .user {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 200px;
    line-height: 40px;
  }
  .search {
    width: calc(100% - 400px);
    display: flex;
    justify-content: center;
    .el-input {
      width: 80%;
      text-align: center;
    }
  }
  .todo-btn, .calendar-btn {
    margin-left: 12px;
  }
}
</style>
