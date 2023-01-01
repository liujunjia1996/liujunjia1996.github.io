<template>
  <div>
    {{ title }}
    <div class="wrap">
      <div
        class="box"
        :class="index <= cur ? 'active' : null"
        v-for="index in count"
        :key="index"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    count: Number,
  },
  data() {
    return {
      cur: "",
    };
  },
  created() {
    if (this.title === "今年进度") {
      this.cur = this.getDay();
    } else {
      this.cur = new Date().getFullYear() - 1996;
    }
    // markdown 的 vue 组件是提前生成好的静态代码？ 
    console.log(this.cur);
  },
  methods: {
    getDay() {
      const currentYear = new Date().getFullYear().toString();
      // 今天减今年的第一天（xxxx年01月01日）
      const hasTimestamp = new Date() - new Date(currentYear);
      // 86400000 = 24 * 60 * 60 * 1000
      let hasDays = Math.ceil(hasTimestamp / 86400000);
      return hasDays;
    },
  },
};
</script>

<style scoped>
.wrap {
    margin-bottom: 10px;
}
.box {
  width: 10px;
  height: 10px;
  margin: 0 4px;
  display: inline-block;
  background-color: #e2e2e2;
}
.active {
  background-color: #c1e8f9;
}
</style>
