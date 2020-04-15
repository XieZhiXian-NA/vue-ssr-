<template>
  <div></div>
</template>

<script>
export default {
  data() {
    return {};
  },
  serverRequest(store) {
    return store.dispatch("getHomeInfo");
  },
  computed: {
    homeInfo() {
      return this.$store.state.homeInfo;
    },
  },
};
</script>

<style lang="scss" scoped></style>
