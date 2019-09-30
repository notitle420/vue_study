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
  mounted() {},
  props: {
    user: {
      type: Object
    }
  },
  methods: {},
  computed: {}
};
</script>
