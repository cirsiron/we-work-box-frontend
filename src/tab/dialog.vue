<template>
  <el-dialog
    :visible.sync="centerDialogVisible"
    :show-close="false"
    width="60%"
    center
    :close-on-click-modal="false"
    :close-on-press-escape="false"
  >
    <div class="header">
      为开发者提供更舒畅的工作流
    </div>
    <div class="body">
      <div class="channel-area">
        <div class="area-title">选择你感兴趣的分类</div>
        <div class="channel-box" @click="handleChecked">
          <div class="channel-item channel1" :class="active == 1 ? 'active' : null">
            <img
              class="icon icon1"
              src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+Cjxzdmcgd2lkdGg9IjI3cHgiIGhlaWdodD0iMjdweCIgdmlld0JveD0iMCAwIDI3IDI3IiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPgogICAgPCEtLSBHZW5lcmF0b3I6IHNrZXRjaHRvb2wgMy42LjEgKDI2MzEzKSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT5wcm9kdWN0PC90aXRsZT4KICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBza2V0Y2h0b29sLjwvZGVzYz4KICAgIDxkZWZzPjwvZGVmcz4KICAgIDxnIGlkPSJQYWdlLTEiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxnIGlkPSJqdWVqaW5fY2hyb21lX2V4dGVuc2lvbl9mb250LWVuZCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTEyMTUuMDAwMDAwLCAtMjA4LjAwMDAwMCkiPgogICAgICAgICAgICA8ZyBpZD0iR3JvdXAtKy1hbmRyb2lkIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxMjE1LjAwMDAwMCwgMjA4LjAwMDAwMCkiPgogICAgICAgICAgICAgICAgPGcgaWQ9Ikdyb3VwIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg0Ljk3MzY4NCwgNS42ODQyMTEpIj4KICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPSJNMy42MzI2NTI2Myw1Ljg2NzA5NDgxIEMzLjU4MDA4Mzk5LDUuNTc3MjYwNTkgMy41NTI2MzE1OCw1LjI3ODY3ODMzIDMuNTUyNjMxNTgsNC45NzM2ODQyMSBDMy41NTI2MzE1OCwyLjIyNjc5NDI3IDUuNzc5NDI1ODUsMCA4LjUyNjMxNTc5LDAgQzExLjI3MzIwNTcsMCAxMy41LDIuMjI2Nzk0MjcgMTMuNSw0Ljk3MzY4NDIxIEMxMy41LDUuMjc4Njc4MzMgMTMuNDcyNTQ3Niw1LjU3NzI2MDU5IDEzLjQxOTk3OSw1Ljg2NzA5NDgxIEMxNS41MTU0NjE0LDYuNDUyNDMwOTQgMTcuMDUyNjMxNiw4LjM3NTY1MDE4IDE3LjA1MjYzMTYsMTAuNjU3ODk0NyBDMTcuMDUyNjMxNiwxMy40MDQ3ODQ3IDE0LjgyNTgzNzMsMTUuNjMxNTc4OSAxMi4wNzg5NDc0LDE1LjYzMTU3ODkgQzEwLjY4NzI0NzksMTUuNjMxNTc4OSA5LjQyOTA1MTU4LDE1LjA1OTk4MzggOC41MjYzMTU3OSwxNC4xMzg3NTA5IEM3LjYyMzU4LDE1LjA1OTk4MzggNi4zNjUzODM3LDE1LjYzMTU3ODkgNC45NzM2ODQyMSwxNS42MzE1Nzg5IEMyLjIyNjc5NDI3LDE1LjYzMTU3ODkgMCwxMy40MDQ3ODQ3IDAsMTAuNjU3ODk0NyBDMCw4LjM3NTY1MDE4IDEuNTM3MTcwMTQsNi40NTI0MzA5NCAzLjYzMjY1MjYzLDUuODY3MDk0ODEgWiIgaWQ9Ik92YWwtMzU0IiBmaWxsPSIjRUFGM0ZEIj48L3BhdGg+CiAgICAgICAgICAgICAgICAgICAgPGNpcmNsZSBpZD0iT3ZhbC0zNTQiIHN0cm9rZT0iIzAwN0ZGRiIgc3Ryb2tlLXdpZHRoPSIwLjcyIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjeD0iOC41MjYzMTU3OSIgY3k9IjQuOTczNjg0MjEiIHI9IjQuOTczNjg0MjEiPjwvY2lyY2xlPgogICAgICAgICAgICAgICAgICAgIDxlbGxpcHNlIGlkPSJPdmFsLTM1NC1Db3B5IiBzdHJva2U9IiMwMDdGRkYiIHN0cm9rZS13aWR0aD0iMC43MiIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgY3g9IjEyLjA3ODk0NzQiIGN5PSIxMC42NTc4OTQ3IiByeD0iNC45NzM2ODQyMSIgcnk9IjQuOTczNjg0MjEiPjwvZWxsaXBzZT4KICAgICAgICAgICAgICAgICAgICA8Y2lyY2xlIGlkPSJPdmFsLTM1NC1Db3B5LTIiIHN0cm9rZT0iIzAwN0ZGRiIgc3Ryb2tlLXdpZHRoPSIwLjcyIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjeD0iNC45NzM2ODQyMSIgY3k9IjEwLjY1Nzg5NDciIHI9IjQuOTczNjg0MjEiPjwvY2lyY2xlPgogICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICA8L2c+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4="
            />
            <span class="title title1">产品</span>
          </div>
          <div class="channel-item channel2" :class="active == 2 ? 'active' : null">
            <img
              class="icon icon2"
              src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+Cjxzdmcgd2lkdGg9IjI3cHgiIGhlaWdodD0iMjdweCIgdmlld0JveD0iMCAwIDI3IDI3IiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPgogICAgPCEtLSBHZW5lcmF0b3I6IHNrZXRjaHRvb2wgMy42LjEgKDI2MzEzKSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT5kZXNpZ248L3RpdGxlPgogICAgPGRlc2M+Q3JlYXRlZCB3aXRoIHNrZXRjaHRvb2wuPC9kZXNjPgogICAgPGRlZnM+PC9kZWZzPgogICAgPGcgaWQ9IlBhZ2UtMSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+CiAgICAgICAgPGcgaWQ9Imp1ZWppbl9jaHJvbWVfZXh0ZW5zaW9uX2ZvbnQtZW5kIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMTIxNS4wMDAwMDAsIC0xNjYuMDAwMDAwKSIgc3Ryb2tlPSIjMDA3RkZGIiBzdHJva2Utd2lkdGg9IjAuNzIiIGZpbGw9IiNFOUYzRkQiPgogICAgICAgICAgICA8ZyBpZD0iUGF0aC05Ni0rLXByb2R1Y3QiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDEyMTUuMDAwMDAwLCAxNjYuMDAwMDAwKSI+CiAgICAgICAgICAgICAgICA8cGF0aCBkPSJNMTQuOTUxNDcwMiw3LjI3MjMyOTM1IEwxNi4zMTgzMDA2LDUuNDU4NDg0MTggQzE3LjAzODE5NjgsNC41MDMxNDk2NSAxOC4zOTMxMTkyLDQuMzE1ODc3MyAxOS4zNDgxMjU5LDUuMDM1NTI2NDggTDIwLjI2NDkzNDksNS43MjYzOTE2MyBDMjEuMjIyMDAxOSw2LjQ0NzU5MzM4IDIxLjQxMjUwNjQsNy44MDEyNjkwMSAyMC42OTUwNDA1LDguNzUzMzc4NTMgTDE5LjMyNjY2NDUsMTAuNTY5Mjc0NyBMMTQuOTUxNDcwMiw3LjI3MjMyOTM1IFogTTE0LjE1NjUzMyw4LjMyNzI0NjYxIEw4LjMzNTI0MjM2LDE2LjA1MjM2MDMgTDcuNDQyOTg1MiwyMS43ODc5Mzc3IEwxMi43MjE0Njg2LDE5LjMzNDY2NTcgTDE4LjUzMTcyNzMsMTEuNjI0MTkyIEwxNC4xNTY1MzMsOC4zMjcyNDY2MSBaIiBpZD0iUGF0aC05NiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTQuMTcwMDk4LCAxMy4zMDgyNTQpIHJvdGF0ZSg1LjAwMDAwMCkgdHJhbnNsYXRlKC0xNC4xNzAwOTgsIC0xMy4zMDgyNTQpICI+PC9wYXRoPgogICAgICAgICAgICA8L2c+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4="
            /><span class="title title2">设计</span>
          </div>
          <div class="channel-item channel3" :class="active == 3 ? 'active' : null">
            <img
              class="icon icon3"
              src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+Cjxzdmcgd2lkdGg9IjI3cHgiIGhlaWdodD0iMjdweCIgdmlld0JveD0iMCAwIDI3IDI3IiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPgogICAgPCEtLSBHZW5lcmF0b3I6IHNrZXRjaHRvb2wgMy43LjEgKDI4MjE1KSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT4zNDJFQzg3Ny1DNUQ1LTQzNEQtQTgwMi1GQUFBMzc1OTZCQTY8L3RpdGxlPgogICAgPGRlc2M+Q3JlYXRlZCB3aXRoIHNrZXRjaHRvb2wuPC9kZXNjPgogICAgPGRlZnM+CiAgICAgICAgPHBhdGggZD0iTTQsNi43MjM0ODExOCBDNCw2LjMyMzkxMzU2IDQuMzI5NzgwNTgsNiA0LjcyMTYyMTUxLDYgTDIyLjI3ODM3ODUsNiBDMjIuNjc2OTE5LDYgMjMsNi4zMTMyOTYzMiAyMyw2LjcyMzQ4MTE4IEwyMywyMC4yNzY1MTg4IEMyMywyMC42NzYwODY0IDIyLjY3MDIxOTQsMjEgMjIuMjc4Mzc4NSwyMSBMNC43MjE2MjE1MSwyMSBDNC4zMjMwODA5NiwyMSA0LDIwLjY4NjcwMzcgNCwyMC4yNzY1MTg4IEw0LDYuNzIzNDgxMTggWiIgaWQ9InBhdGgtMSI+PC9wYXRoPgogICAgICAgIDxtYXNrIGlkPSJtYXNrLTIiIG1hc2tDb250ZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIiBtYXNrVW5pdHM9Im9iamVjdEJvdW5kaW5nQm94IiB4PSItMSIgeT0iLTEiIHdpZHRoPSIyMSIgaGVpZ2h0PSIxNyI+CiAgICAgICAgICAgIDxyZWN0IHg9IjMiIHk9IjUiIHdpZHRoPSIyMSIgaGVpZ2h0PSIxNyIgZmlsbD0id2hpdGUiPjwvcmVjdD4KICAgICAgICAgICAgPHVzZSB4bGluazpocmVmPSIjcGF0aC0xIiBmaWxsPSJibGFjayI+PC91c2U+CiAgICAgICAgPC9tYXNrPgogICAgPC9kZWZzPgogICAgPGcgaWQ9IlBhZ2UtMSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGcgaWQ9Imp1ZWppbl9jaHJvbWVfZXh0ZW5zaW9uX2Rlc2lnbmVyIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMTIxNS4wMDAwMDAsIC0xOS4wMDAwMDApIj4KICAgICAgICAgICAgPGcgaWQ9Ikdyb3VwLTUiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDEyMTUuMDAwMDAwLCAxOS4wMDAwMDApIj4KICAgICAgICAgICAgICAgIDxnIGlkPSJSZWN0YW5nbGUtOTcxLSstZnJvbnRlbmQtKy0mbHQ7LyZndDsiPgogICAgICAgICAgICAgICAgICAgIDxnIGlkPSJSZWN0YW5nbGUtOTcxIj4KICAgICAgICAgICAgICAgICAgICAgICAgPHVzZSBmaWxsPSIjRTlGM0ZEIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIHhsaW5rOmhyZWY9IiNwYXRoLTEiPjwvdXNlPgogICAgICAgICAgICAgICAgICAgICAgICA8dXNlIHN0cm9rZT0iIzAwN0ZGRiIgbWFzaz0idXJsKCNtYXNrLTIpIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHhsaW5rOmhyZWY9IiNwYXRoLTEiPjwvdXNlPgogICAgICAgICAgICAgICAgICAgIDwvZz4KICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPSJNNi41MDQ3ODE0MiwxMy4wMDI3MzIyIEw2LjUwNDc4MTQyLDEzLjYzMzg3OTggTDEwLjk3MDYyODQsMTUuODIzNzcwNSBMMTAuOTcwNjI4NCwxNS4xMDY1NTc0IEw3LjI1MDY4MzA2LDEzLjMxODMwNiBMMTAuOTcwNjI4NCwxMS41MjA0OTE4IEwxMC45NzA2Mjg0LDEwLjgwMzI3ODcgTDYuNTA0NzgxNDIsMTMuMDAyNzMyMiBaIE0xMS45NzQ3MjY4LDE3IEwxMi42NzI4MTQyLDE3IEwxNS4wMTU3MTA0LDEwIEwxNC4zMjcxODU4LDEwIEwxMS45NzQ3MjY4LDE3IFogTTE2LjAyOTM3MTYsMTAuODAzMjc4NyBMMTYuMDI5MzcxNiwxMS41MjA0OTE4IEwxOS43Mzk3NTQxLDEzLjMxODMwNiBMMTYuMDI5MzcxNiwxNS4xMDY1NTc0IEwxNi4wMjkzNzE2LDE1LjgyMzc3MDUgTDIwLjQ5NTIxODYsMTMuNjMzODc5OCBMMjAuNDk1MjE4NiwxMy4wMDI3MzIyIEwxNi4wMjkzNzE2LDEwLjgwMzI3ODcgWiIgaWQ9IiZsdDsvJmd0OyIgZmlsbD0iIzAwN0ZGRiI+PC9wYXRoPgogICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICA8L2c+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4="
            /><span class="title title3">前端</span>
          </div>
          <div class="channel-item channel4" :class="active == 4 ? 'active' : null">
            <img
              class="icon icon4"
              src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+Cjxzdmcgd2lkdGg9IjI3cHgiIGhlaWdodD0iMjdweCIgdmlld0JveD0iMCAwIDI3IDI3IiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPgogICAgPCEtLSBHZW5lcmF0b3I6IHNrZXRjaHRvb2wgMy42LjEgKDI2MzEzKSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT5iYWNrZW5kPC90aXRsZT4KICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBza2V0Y2h0b29sLjwvZGVzYz4KICAgIDxkZWZzPjwvZGVmcz4KICAgIDxnIGlkPSJQYWdlLTEiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxnIGlkPSJqdWVqaW5fY2hyb21lX2V4dGVuc2lvbl9mb250LWVuZCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTEyMTUuMDAwMDAwLCAtMjk0LjAwMDAwMCkiIHN0cm9rZT0iIzAwN0ZGRiIgc3Ryb2tlLXdpZHRoPSIwLjcyIiBmaWxsPSIjRTlGM0ZEIj4KICAgICAgICAgICAgPGcgaWQ9Ik92YWwtMzYwLUNvcHktKy1PdmFsLTM2MC1Db3B5LUNvcHktKy1PdmFsLTM2MC1Db3B5LSstT3ZhbC0zNjAtQ29weS0rLU92YWwtMzYwLUNvcHktKy1PdmFsLTM2MC0rLWZyb250ZW5kIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxMjE1LjAwMDAwMCwgMjk0LjAwMDAwMCkiPgogICAgICAgICAgICAgICAgPGcgaWQ9Ik92YWwtMzYwLUNvcHktKy1PdmFsLTM2MC1Db3B5LUNvcHktKy1PdmFsLTM2MC1Db3B5LSstT3ZhbC0zNjAtQ29weS0rLU92YWwtMzYwLUNvcHktKy1PdmFsLTM2MCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNy4xMDUyNjMsIDUuNjg0MjExKSI+CiAgICAgICAgICAgICAgICAgICAgPGcgaWQ9Ik92YWwtMzYwLUNvcHktKy1PdmFsLTM2MC1Db3B5LUNvcHkiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAuMDAwMDAwLCA3LjEwNTI2MykiPgogICAgICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPSJNNi4zOTQ3MzY4NCw3LjgxNTc4OTQ3IEM5LjkyNjQ1MjQ4LDcuODE1Nzg5NDcgMTIuNzg5NDczNyw2Ljk0MDk3NzQ0IDEyLjc4OTQ3MzcsNS44NjE4NDIxMSBMMTIuNzg5NDczNywyLjM0NDczNjg0IEMxMi43ODk0NzM3LDIuMzQ0NzM2ODQgMCwyLjM0NDczNjg0IDAsMi4zNDQ3MzY4NCBMMCw1Ljg2MTg0MjExIEMwLDYuOTQwOTc3NDQgMi44NjMwMjEyMSw3LjgxNTc4OTQ3IDYuMzk0NzM2ODQsNy44MTU3ODk0NyBaIiBpZD0iT3ZhbC0zNjAtQ29weSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48L3BhdGg+CiAgICAgICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik02LjM5NDczNjg0LDMuOTA3ODk0NzQgQzkuOTI2NDUyNDgsMy45MDc4OTQ3NCAxMi43ODk0NzM3LDMuMDMzMDgyNyAxMi43ODk0NzM3LDEuOTUzOTQ3MzcgQzEyLjc4OTQ3MzcsMC44NzQ4MTIwMzUgOS45MjY0NTI0OCw4LjY3NzI2OTQzZS0xNyA2LjM5NDczNjg0LDguNjc3MjY5NDNlLTE3IEMyLjg2MzAyMTIxLDguNjc3MjY5NDNlLTE3IDAsMC44NzQ4MTIwMzUgMCwxLjk1Mzk0NzM3IEMwLDMuMDMzMDgyNyAyLjg2MzAyMTIxLDMuOTA3ODk0NzQgNi4zOTQ3MzY4NCwzLjkwNzg5NDc0IFoiIGlkPSJPdmFsLTM2MCI+PC9wYXRoPgogICAgICAgICAgICAgICAgICAgIDwvZz4KICAgICAgICAgICAgICAgICAgICA8ZyBpZD0iT3ZhbC0zNjAtQ29weS0rLU92YWwtMzYwLUNvcHkiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAuMDAwMDAwLCAzLjU1MjYzMikiPgogICAgICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPSJNNi4zOTQ3MzY4NCw3LjgxNTc4OTQ3IEM5LjkyNjQ1MjQ4LDcuODE1Nzg5NDcgMTIuNzg5NDczNyw2Ljk0MDk3NzQ0IDEyLjc4OTQ3MzcsNS44NjE4NDIxMSBMMTIuNzg5NDczNywyLjM0NDczNjg0IEMxMi43ODk0NzM3LDIuMzQ0NzM2ODQgMCwyLjM0NDczNjg0IDAsMi4zNDQ3MzY4NCBMMCw1Ljg2MTg0MjExIEMwLDYuOTQwOTc3NDQgMi44NjMwMjEyMSw3LjgxNTc4OTQ3IDYuMzk0NzM2ODQsNy44MTU3ODk0NyBaIiBpZD0iT3ZhbC0zNjAtQ29weSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48L3BhdGg+CiAgICAgICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik02LjM5NDczNjg0LDMuOTA3ODk0NzQgQzkuOTI2NDUyNDgsMy45MDc4OTQ3NCAxMi43ODk0NzM3LDMuMDMzMDgyNyAxMi43ODk0NzM3LDEuOTUzOTQ3MzcgQzEyLjc4OTQ3MzcsMC44NzQ4MTIwMzUgOS45MjY0NTI0OCw4LjY3NzI2OTQzZS0xNyA2LjM5NDczNjg0LDguNjc3MjY5NDNlLTE3IEMyLjg2MzAyMTIxLDguNjc3MjY5NDNlLTE3IDAsMC44NzQ4MTIwMzUgMCwxLjk1Mzk0NzM3IEMwLDMuMDMzMDgyNyAyLjg2MzAyMTIxLDMuOTA3ODk0NzQgNi4zOTQ3MzY4NCwzLjkwNzg5NDc0IFoiIGlkPSJPdmFsLTM2MCI+PC9wYXRoPgogICAgICAgICAgICAgICAgICAgIDwvZz4KICAgICAgICAgICAgICAgICAgICA8ZyBpZD0iT3ZhbC0zNjAtQ29weS0rLU92YWwtMzYwIj4KICAgICAgICAgICAgICAgICAgICAgICAgPHBhdGggZD0iTTYuMzk0NzM2ODQsNy44MTU3ODk0NyBDOS45MjY0NTI0OCw3LjgxNTc4OTQ3IDEyLjc4OTQ3MzcsNi45NDA5Nzc0NCAxMi43ODk0NzM3LDUuODYxODQyMTEgTDEyLjc4OTQ3MzcsMi4zNDQ3MzY4NCBDMTIuNzg5NDczNywyLjM0NDczNjg0IDAsMi4zNDQ3MzY4NCAwLDIuMzQ0NzM2ODQgTDAsNS44NjE4NDIxMSBDMCw2Ljk0MDk3NzQ0IDIuODYzMDIxMjEsNy44MTU3ODk0NyA2LjM5NDczNjg0LDcuODE1Nzg5NDcgWiIgaWQ9Ik92YWwtMzYwLUNvcHkiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+PC9wYXRoPgogICAgICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPSJNNi4zOTQ3MzY4NCwzLjkwNzg5NDc0IEM5LjkyNjQ1MjQ4LDMuOTA3ODk0NzQgMTIuNzg5NDczNywzLjAzMzA4MjcgMTIuNzg5NDczNywxLjk1Mzk0NzM3IEMxMi43ODk0NzM3LDAuODc0ODEyMDM1IDkuOTI2NDUyNDgsOC42NzcyNjk0M2UtMTcgNi4zOTQ3MzY4NCw4LjY3NzI2OTQzZS0xNyBDMi44NjMwMjEyMSw4LjY3NzI2OTQzZS0xNyAwLDAuODc0ODEyMDM1IDAsMS45NTM5NDczNyBDMCwzLjAzMzA4MjcgMi44NjMwMjEyMSwzLjkwNzg5NDc0IDYuMzk0NzM2ODQsMy45MDc4OTQ3NCBaIiBpZD0iT3ZhbC0zNjAiPjwvcGF0aD4KICAgICAgICAgICAgICAgICAgICA8L2c+CiAgICAgICAgICAgICAgICA8L2c+CiAgICAgICAgICAgIDwvZz4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPg=="
            /><span class="title title4">后端</span>
          </div>
          <div class="channel-item channel5" :class="active == 5 ? 'active' : null">
            <img
              class="icon icon5"
              src="../assets/imgs/test-icon.png"
            />
            <span class="title title5">测试</span>
          </div>
        </div>
      </div>
    </div>
    <div class="footer-wrapper" slot="footer">
      <button
        class="start-btn" :disabled="active ? false : true"
        @click="handleStartBtn"
      >开始</button>
    </div>
  </el-dialog>
</template>
<script>
/**
 * Created by huanghui on 2020/10/04
 * 文件功能描述: 首次弹窗
 */
export default {
  props: {
    centerDialogVisible: {
      type: Boolean,
      default: false
    }
  },
  computed: {},
  data () {
    return {
      active: null
    }
  },
  mounted () {},
  methods: {
    hideDialog () {
      this.$emit('hideDialog')
    },
    showDialog () {
      this.$emit('showDialog')
    },
    handleChecked (e) {
      const { className } = e.target
      if (/channel\d/.test(className) || /icon\d/.test(className) || /title\d/.test(className)) {
        const index = (className.match(/\w+(\d+)/) || [])[1]
        this.active = index || 1
      }
    },
    handleStartBtn () {
      if (!this.active) {
        return
      }
      this.centerDialogVisible = false
      window.localStorage.setItem('SHOW_TYPE', this.active)
    }
  }
}
</script>
<style lang='scss'>
.el-dialog {
  width: 700px !important;
}
.el-dialog__body {
  padding: 0 25px 0px !important;
  .header {
    position: relative;
    height: 100px;
    line-height: 100px;
    font-size: 32px;
    color: #fff;
    text-align: center;
    background-color: #007fff;
  }
  .body {
    flex-direction: column;
    display: flex;
    align-items: center;
    .area-title {
      font-size: 1.833rem;
      text-align: center;
      line-height: 3;
    }
    .channel-box {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      padding: 0 20px;
      .channel-item {
        display: flex;
        align-items: center;
        width: 160px;
        height: 80px;
        margin: 0 0 10px;
        border: 1px solid #e6edf4;
        border-radius: 6px;
        cursor: pointer;
        &.active {
          background: #007fff;
          color: #fff;
        }
        .icon {
          width: 40px;
          height: 40px;
          margin: 0 4px;
          margin-left: 10px;
        }
        .title {
          margin-left: 8px;
          font-size: 1.334rem;
        }
      }
    }
  }
}
.footer-wrapper {
  .start-btn {
    margin: 20px 0;
    width: 200px;
    height: 60px;
    font-size: 1.5rem;
    color: #fff;
    background-color: #007fff;
    border: 0;
    border-radius: 4px;
    outline: 0;
    cursor: pointer;
  }

  .start-btn[disabled] {
    background-color: #c2c5cd;
    cursor: not-allowed;
  }
}
</style>
