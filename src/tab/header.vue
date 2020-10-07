<template>
  <div class='header-wrapper'>
    <div class="logo">
      <img src="../assets/imgs/logo.png" width="80px" height="40px" alt="">
      <div class="todo-btn">
        <el-badge :value="todoCount" class="item">
          <el-button
            round
            size="small"
            @click="handleDrawerTodo"
          >今日代办</el-button>
        </el-badge>
      </div>
    </div>
    <div class="search">
      <el-input
        clearable
        placeholder="输入关键字 回车进行搜索"
        prefix-icon="el-icon-search"
        v-model="searchVal"
        @change="handleSearch"
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
  </div>
</template>
<script>
/**
* Created by huanghui on 2020/09/24
* 文件功能描述:头部文件
*/
import { mapState } from 'vuex'

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
  },
  methods: {
    handleSearch () {
      console.log(this.searchVal)
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
<style lang='scss'>
.header-wrapper {
  display: flex;
  height: 80px;
  align-items: center;
  background: #F3F3F3;
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
