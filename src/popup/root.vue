<template>
    <div>
      <el-button type="primary" @click="tab">
        New tab
      </el-button>
    </div>
</template>
<script>
  export default {
    data: () => ({
    }),
    computed: { },
    created () { },
    mounted () { },
    methods: {
      tab () {
        chrome.tabs.create({ url: 'pages/app.html' })
      }
    }
  }
</script>
<style lang="less">
  div {
    color: blue
  }
</style>