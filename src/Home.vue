<template>
  <div class="home">
    <HelloWorld msg="make-nanka" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "home",
  _components: {
    HelloWorld
  },
  get components() {
    return this._components;
  },
  set components(value) {
    this._components = value;
  }
};
</script>
