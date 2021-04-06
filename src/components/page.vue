<template>
  <nav aria-label="Output Page">
    <ul class="pagination pagination-sm justify-content-center">
      <li class="page-item" :class="preDisable?'disabled':''" >
        <a @click="goPre" class="page-link" tabindex="-1">Prev</a>
      </li>

      <li class="page-item"
          :class="current===index?'active':''" v-for="index in pages" :key="index"  ref="pages">
        <a @click="jumpToPage(index)" v-if="isShowBtn(index)" class="page-link" >{{index}}</a>
        <a v-else-if="isShowEllipsis (index)" class="page-link">&#8230;</a>
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
      pages: [], // 页码列表pages
      pageLength: 0 // 页码长度pageLength
    }
  },
  computed: {
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
      this.pages = new Array(this.pageLength)
      for (let i = 0; i < this.pageLength; i++) {
        this.pages[i] = i + 1
      }
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
      if (this.pageLength < 8) {
        return true
      } else {
        if (index === 1 || index === this.pageLength) {
          return true
        } else {
          if (this.current < 4 && index < 6) {
            return true
          } else if (this.current > this.pageLength - 4 && index > this.pageLength - 6) {
            return true
          } else if (index < this.current + 3 && index > this.current - 3) {
            return true
          } else {
            return false
          }
        }
      }
    },
    isShowEllipsis (index) { // 是否显示省略号
      return index === 2 || index === this.pageLength - 1
    }
  }
}
</script>
