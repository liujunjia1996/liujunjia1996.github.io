<template>
  <div v-if="navTreeArr.length > 1" ref="navTree" class="navTree">
    <p
      v-for="(v, i) in navTreeArr"
      :key="i"
      :class="[getClass(v.level), i === currentIndex ? 'active' : '']"
      @click="scroll(i)"
    >
      {{ v.text }}
    </p>
  </div>
</template>

<script>
export default {
  props: {
    source: {
      default: "theme-default-content",
      type: String,
    },
  },
  data() {
    return {
      navTreeArr: [],
      domHead: [],
      domHeadArray: [],
      currentIndex: 0,
      realScroll: null,
      topPadding: -20,
    };
  },
  mounted() {
    this.init(2);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.realScroll);
  },
  methods: {
    initScroll() {
      this.realScroll = this.debouceAndThrotte(this.handleScroll);
      window.addEventListener("scroll", this.realScroll);
    },
    handleScroll() {
      this.domHeadArray.some((v, i) => {
        if (this.checkInScreen(v)) {
          this.currentIndex = i;
          return true;
        }
      });
    },
    debouceAndThrotte(fn, wait = 200, mustAnswer = 666) {
      let lastTime = 0;
      let timeId = null;
      return function () {
        const nowTime = new Date().getTime();
        if (lastTime === 0) lastTime = nowTime;
        if (nowTime - lastTime < mustAnswer) {
          clearTimeout(timeId);
          timeId = setTimeout(() => {
            lastTime = nowTime;
            fn();
          }, wait);
        } else {
          lastTime = nowTime;
          fn();
        }
      };
    },
    checkInScreen(e) {
      const client = e.getBoundingClientRect();
      return client.top > this.topPadding && client.bottom < window.innerHeight;
    },
    destroy() {
      this.navTreeArr = this.domHead = this.domHeadArray = [];
    },
    getTop(element, offset = 0) {
      let actualTop = element.offsetTop;
      let current = element.offsetParent;
      while (current !== null) {
        actualTop += current.offsetTop;
        current = current.offsetParent;
      }
      return offset + actualTop;
    },
    init(index = 3) {
      this.destroy();
      this.container = document.getElementsByClassName(this.source)[0];
      console.log("navTree init!");
      if (!this.container) return;
      // 导航最多显示 index 级目录，判断出层级最高的前index级标签
      const h1s = this.container.getElementsByTagName("h1");
      const h2s = this.container.getElementsByTagName("h2");
      const h3s = this.container.getElementsByTagName("h3");
      const h4s = this.container.getElementsByTagName("h4");
      const h5s = this.container.getElementsByTagName("h5");
      const h6s = this.container.getElementsByTagName("h6");
      let vH1Tag, vH2Tag, vH3Tag;
      [h1s, h2s, h3s, h4s, h5s, h6s].forEach((v, i) => {
        if (!v.length) return;
        if (vH1Tag == null) {
          vH1Tag = "h" + (i + 1);
        } else if (vH2Tag == null) {
          vH2Tag = "h" + (i + 1);
        } else if (vH3Tag == null) {
          vH3Tag = "h" + (i + 1);
        }
      });
      if (!vH1Tag) return;
      this.query = [vH1Tag, vH2Tag, vH3Tag]
        .slice(0, index)
        .filter((v) => !!v)
        .join(",");
      this.domHead = this.container.querySelectorAll(this.query);
      this.domHeadArray = Array.from(this.domHead);
      const levelMap = { [vH1Tag]: 1, [vH2Tag]: 2, [vH3Tag]: 3 };
      this.domHeadArray.forEach((v) => {
        this.navTreeArr.push({
          text: v.innerText.slice(1),
          level: levelMap[v.tagName.toLowerCase()],
        });
      });
      if (!this.realScroll) {
        this.initScroll();
      }
    },
    getClass(l) {
      return "navTree_indent" + l;
    },
    scroll(index) {
      this.animateTo(this.getTop(this.domHead[index], 0));
    },
    animateTo(scrollTarget) {
      scrollTarget = this.checkOverBottom(scrollTarget);
      window.removeEventListener("scroll", this.realScroll);
      let scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      const step = () => {
        const distance = scrollTarget - scrollTop;
        scrollTop = scrollTop + distance / 5;
        if (Math.abs(distance) < 2) {
          window.scrollTo(0, scrollTarget);
          window.addEventListener("scroll", this.realScroll);
        } else {
          window.scrollTo(0, scrollTop);
          requestAnimationFrame(step);
        }
      };
      step();
    },
    checkOverBottom(scrollTarget) {
      const app = document.getElementById("app");
      const appHeight = app.offsetHeight || app.clientHeight;
      const canScrollHeight = appHeight - window.innerHeight;
      if (scrollTarget > canScrollHeight) return canScrollHeight;
      return scrollTarget;
    },
  },
};
</script>
<style lang="scss" scoped>
.navTree {
  padding-left: 2px;
  user-select: none;
  z-index: 2;
  font-size: 14px;
  position: fixed;
  right: 32px;
  top: 16px;
  width: 202px;
  cursor: pointer;
  white-space: nowrap;
  max-height: 600px;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
  .title {
    font-family: OPPOSans-R;
    font-size: 14px;
    color: #000;
    padding-left: 20px;
    cursor: initial;
  }
  p {
    color: #999;
    margin: 0;
    line-height: 28px;
    overflow: hidden;
    text-overflow: ellipsis;
    position: relative;
    left: -2px;
    z-index: 2;
    border-left: 2px solid #f2f4f8;
    &:not(.title):hover {
      background-color: #f6f8fa;
    }
    &.active {
      border-left: 2px solid #000c40;
      color: #000c40;
      // border-left: 2px solid #2fc29b;
      // color: #2fc29b;
    }
  }
  &_indent1 {
    padding-left: 15px;
  }
  &_indent2 {
    padding-left: 30px;
  }
  &_indent3 {
    padding-left: 45px;
  }
}

@media screen and (max-width: 1420px) {
  .navTree {
    display: none;
  }
}
</style>