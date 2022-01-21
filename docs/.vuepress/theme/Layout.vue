<template>
  <Layout>
    <template #navbar-before> </template>
    <template #page-bottom>
      <NavTree id="navTree" />
    </template>
  </Layout>
</template>

<script>
import Layout from "@vuepress/theme-default/lib/client/layouts/Layout.vue";
import NavTree from "./NavTree.vue";

export default {
  components: {
    Layout,
    NavTree,
  },
  mounted() {
    document.onkeydown = function (e) {
      if (e.key === ".") {
        const repLink =
          "https://github.dev/liujunjia1996/liujunjia1996.github.io/blob/main/docs";
        window.open(repLink + window.location.pathname.replace(".html", ".md"));
      }
    };
  },
};
</script>

<style lang="css">
#navTree {
  position: fixed;
  z-index: 9999;
  right: 10px;
  top: 100px;
}
</style>