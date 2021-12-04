<template>
  <a class="navbar-edit" title="only for myself" @click="handleClick">edit this page</a>
</template>

<script>
export default {
  methods: {
    handleClick() {
      const repLink = 'https://github.dev/liujunjia1996/liujunjia1996.github.io/blob/main/docs'
      window.open(repLink + window.location.pathname.replace(".html",'.md'));
    },
  },
};
</script>

<style>
.navbar-edit {
  margin: 0 50px 0 0;
  cursor: pointer;
  user-select: none;
}
</style>