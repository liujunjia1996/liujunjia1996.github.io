<template>
  <div class="month">
    <div class="day-container">
      <div v-for="i in amount" :key="i" :class="getClass(i)"></div>
    </div>
    <div class="text-center mt-2">{{ showMonth ? month : "" }}</div>
  </div>
</template>

<script>
import dayjs from "dayjs";

export default {
  props: {
    showMonth: {
      type: Boolean,
      default: false,
    },
    indent: {
      type: Number,
      default: 0,
    },
    startTime: {
      type: Number,
      default: 0,
    },
    endTime: {
      type: Number,
      default: 0,
    },
    submitList: {
      type: Array,
      default: [],
    },
  },
  computed: {
    amount() {
      return (
        this.indent +
        (dayjs(this.endTime).date() - dayjs(this.startTime).date() + 1)
      );
    },
    month() {
      return dayjs(this.startTime).month() + 1 + "月";
    },
    startTimeDayjs() {
      return dayjs(this.startTime)
    }
  },
  data() {
    return {
      value: "",
      res: "",
    };
  },
  methods: {
    getClass(idx) {
      const base = ['day']
      if (idx <= this.indent) {
        base.push('day-transparent')
        return base
      }
      const offset = idx - this.indent - 1
      const timestamp = this.startTimeDayjs.add(offset, 'day').valueOf()
      const activeItem = this.submitList.find(item => {
        return timestamp === dayjs(item.time * 1000).startOf('day').valueOf()
      })
      if (activeItem) {
        base.push('day-active')
      }
      return base
    },
  },
  mounted() {},
};
</script>

<style scoped lang="scss">
.day {
  width: 10px;
  height: 10px;
  background-color: rgba(0, 0, 0, 0.05);
  &-transparent {
    background-color: transparent;
  }
  &-active {
    background-color: greenyellow;
  }
}
.day-container {
  display: grid;
  grid-auto-flow: column;
  grid-gap: 2px;
  grid-template-rows: repeat(7, 10px);
}
</style>
