<template>
  <div id="app">
    <CommonHeader />
    <img alt="Vue logo" src="@/assets/logo.png" width="300" height="300" />
    <router-view />
  </div>
</template>

<script>
import CommonHeader from "@/components/CommonHeader";
export default {
  name: "App",
  components: {
    CommonHeader: CommonHeader
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
