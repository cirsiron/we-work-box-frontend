<template>
  <div class="root-wrapper">
    <!-- 头部 -->
    <v-header
      @handleDrawerTodo="handleDrawerTodo"
      @handleDrawerCalendar="handleDrawerCalendar"
    />
    <!-- 列表位置 -->
    <div class="content-wrapper">
      <el-tabs
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
          <Items :data="item"/>
        </el-tab-pane>
      </el-tabs>
    </div>
    <el-drawer
      title="待办事项"
      :withHeader="false"
      :visible.sync="drawerTodoShow"
      direction="ltr"
      size="60%"
    >
      <TODO />
    </el-drawer>
    <el-drawer
      title="📅 日历"
      :withHeader="false"
      :visible.sync="drawerShow"
      direction="rtl"
      size="40%"
    >
      <el-calendar>
        <!-- 这里使用的是 2.5 slot 语法，对于新项目请使用 2.6 slot 语法-->
        <template
          slot="dateCell"
          slot-scope="{ data }">
          <p :class="data.isSelected ? 'is-selected' : ''">
            {{ data.day.split('-').slice(1).join('-') }} {{ data.isSelected ? '✔️' : ''}}
          </p>
        </template>
      </el-calendar>
    </el-drawer>
    <v-dialog
      v-if="isFirstShow"
      :centerDialogVisible="centerDialogVisible"
      :show="showDialog"
      :hide="hideDialog"
    />
  </div>
</template>
<script>
import VHeader from './header'
import Items from './items'
import TODO from './todo/Home.vue'
import vDialog from './dialog'
import { mapActions } from 'vuex'

export default {
  components: {
    VHeader,
    Items,
    TODO,
    vDialog
  },
  data: () => ({
    frontEndList: [],
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
      return !(window.localStorage.getItem('SHOW_TYPE'))
    }
  },
  methods: {
    ...mapActions([
      'removeContent',
      'setContents'
    ]),
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
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      })
    }
  }
}
</script>
<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.root-wrapper {
  margin-top: 12px;
  .content-wrapper {
    position: relative;
    display: flex;
    justify-content: center;
    .el-tabs {
      width: 68%;
      .is-closable {
        .el-icon-close {
          margin-left: 10px;
        }
      }
    }
  }
}
</style>
