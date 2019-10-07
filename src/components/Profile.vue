<template>
  <div class="profile container-fluent">
    <img class="img-fluid" src="@/example/image/2.jpg" />
    <h5 class="card-title">{{ user.id }}</h5>
    <h5 class="card-title">{{ user.name }}</h5>
  </div>
</template>

<script>
export default {
  name: "Profile",
  data() {
    return {};
  },
  mounted() {
    this.init();
    this.start();
  },
  props: {},
  methods: {
    init() {
      this.$store.dispatch("user/clear");
    },
    start() {
      this.$store.dispatch("user/startListener", { id: "test" });
    },
    stop() {
      this.$store.dispatch("user/stopListener");
    }
  },
  computed: {
    user() {
      return this.$store.getters["user/data"];
    }
  }
};
</script>
