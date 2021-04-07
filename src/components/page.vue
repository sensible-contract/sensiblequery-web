<template>
  <nav aria-label="Output Page">
    <ul class="pagination pagination-sm justify-content-center">
      <li class="page-item" :class="preDisable?'disabled':''" >
        <a @click="goPre" class="page-link" tabindex="-1">Prev</a>
      </li>

      <li class="page-item"
          :class="current===index?'active':''" v-for="index in pages" :key="index" ref="pages">
        <a @click="jumpToPage(index)" v-if="isShowBtn(index)" class="page-link" >{{index}}</a>
        <span v-else-if="isShowEllipsis (index)" class="page-link">&#8230;</span>
      </li>

      <li class="page-item" :class="nextDisable?'disabled':''" >
        <a @click="goNext" class="page-link" >Next</a>
      </li>
    </ul>
  </nav>
</template>

<script type='text/ecmascript-6'>
export default {
  props: {
    total: {
      type: Number,
      default: 50
    }
  },
  data () {
    return {
      current: 1, // 定义当前页current
      pageSize: 16, // 每页显示数据pageSize
      pageLength: 0, // 页码长度pageLength
      pagesBase: new Array(10)
    }
  },
  computed: {
    pages () {
      this.pagesBase[0] = 1
      this.pagesBase[1] = 2
      for (let i = 2; i < 10; i++) {
        this.pagesBase[i] = this.pageLength+1
      }

      let i = 2
      let d = this.current-3
      for (; d < this.current+3; d++) {
        if (d > 2 && d < this.pageLength-1) {
          this.pagesBase[i] = d
          i++
        }
      }
      if (3 < this.pageLength) {
        this.pagesBase[i] = this.pageLength-1
        i++;
      }
      if (2 < this.pageLength) {
        this.pagesBase[i] = this.pageLength
      }
      return this.pagesBase
    },

    preDisable () { // 是否禁用上一页
      return this.current === 1
    },
    nextDisable () { // 是否禁用下一页
      return this.current === this.pageLength
    }
  },
  watch: {
    total (val) { // 监听数据总数total的改变在计算页码列表getPagesLength()
      this.getPagesLength()
    },
    current (val) { // 监听当前页current改变，向父组件传递参数当前页
      this.$emit('change', val)
    }
  },
  created () { // 初始化计算页码列表getPagesLength()
    this.getPagesLength()
  },
  methods: {
    getPagesLength () { // 计算页码列表
      console.log("total:", this.total)
      const more = this.total % this.pageSize ? 1 : 0
      this.pageLength = parseInt(this.total / this.pageSize) + more
      console.log("pageLength:", this.pageLength)
    },
    jumpToPage (index) { // 点击页码
      this.current = index
    },
    goPre () { // 上一页
      this.current -= this.current === 1 ? 0 : 1
    },
    goNext () { // 下一页
      this.current += this.current === this.pageLength ? 0 : 1
    },
    isShowBtn (index) { // 页码是否被省略
      if (0 >= index) {
        return false
      }
      if (this.pageLength < index) {
        return false
      }

      if (this.pageLength < 8) {
        return true
      }
      if (index === 1 || index === this.pageLength) {
        return true
      }
      if (this.current < 4 && index < 6) {
        return true
      }
      if (this.current > this.pageLength - 4 && index > this.pageLength - 6) {
        return true
      }
      if (index < this.current + 3 && index > this.current - 3) {
        return true
      }
      return false
    },
    isShowEllipsis (index) { // 是否显示省略号
      return index === 2 || index === this.pageLength - 1
    }
  }
}
</script>
