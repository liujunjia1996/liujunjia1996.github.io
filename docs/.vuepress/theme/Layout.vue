<template>
  <Layout>
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
};
</script>

<style lang="css">
#navTree {
  position: fixed;
  z-index: 9999;
  right: 10px;
  top: 100px;
}
@media screen and (max-width: 1700px) {
  #navTree {
    display: none;
  }
}
</style>