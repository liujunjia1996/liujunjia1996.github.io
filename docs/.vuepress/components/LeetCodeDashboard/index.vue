<template>
  <div>
    <Summary />
    <Calendar class="mt-6" />
  </div>
</template>

<script>
import Summary from "./Summary.vue"
import Calendar from "./Calendar/index.vue"
export default {
  components: {
    Summary,
    Calendar
  },
  data() {
    return {
      value: "",
      res: "",
    };
  },
  methods: {
   
  },
};
</script>

<style scoped>

</style>
