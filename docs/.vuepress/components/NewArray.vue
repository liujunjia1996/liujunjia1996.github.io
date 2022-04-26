<template>
  <div>
    <input class="ipt" v-model="value" type="text" />
    <button class="btn" @click="handleClear">clear</button>
    <button class="btn" @click="handleCast">cast</button>
    <input class="ipt ipt2" disabled :value="res" type="text" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: "",
      res: "",
    };
  },
  methods: {
    handleCast() {
      let v = this.value.trim();
      if (!v.startsWith("[") || !v.endsWith("]")) {
        return this.handleClear();
      }
      var i = 0;
      while (v[i++] == "[");
      i--;
      var isStr = v[i] == "'" || v[i] == '"';
      v =
        `new ${isStr ? "String" : "int"}` +
        "[]".repeat(i) +
        v.replaceAll("[", "{").replaceAll("]", "}");
        v.replaceAll("'", '"');
      this.renderAndCopy(v);
    },
    renderAndCopy(v) {
      this.res = v;
      navigator.clipboard.writeText(v);
    },
    handleClear() {
      this.value = "";
      this.res = "";
    },
  },
};
</script>

<style scoped>
.ipt {
  width: 400px;
  line-height: 30px;
  font-size: 20px;
  margin: 10px 10px 10px 0;
}
.ipt2 {
  font-size: 16px;
  width: 530px;
}
.btn {
  margin-right: 10px;
  line-height: 30px;
  font-size: 20px;
}
</style>
