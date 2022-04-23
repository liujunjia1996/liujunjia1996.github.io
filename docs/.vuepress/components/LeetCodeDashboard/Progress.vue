<template>
  <div class="progress-round">
    <div
      v-for="i in 4"
      :key="i"
      :style="{ transform: `rotate(${(i - 1) * 90}deg)`, width: getWidth(i) }"
      :class="['progress-bar', `progress-bar--${i}`]"
    ></div>
    <div class="progress-round__inner">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: "",
      res: "",
      progress: 40
    };
  },
  methods: {
    getWidth(stage) {
      const currentStage = stage * 25
      if (currentStage < this.progress) {
        return '50px'
      } else {
        return (25 - (currentStage - this.progress)) / 25 * 50 + 'px'
      }
    }
  },
};
</script>

<style scoped>
.progress-round {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  background-color: rgb(223, 223, 223);
}

.progress-bar {
  position: absolute;
  z-index: 5;
  background-color: rgb(255, 161, 22);
  left: 50px;
  top: 0;
  height: 50px;
  transform-origin: bottom left;
}

.progress-round__inner {
  width: 92px;
  height: 92px;
  border-radius: 50%;
  background-color: #fff;
  position: absolute;
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
