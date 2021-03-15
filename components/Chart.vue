<template>
  <div>
    <my-chart :data="data" />
  </div>
</template>

<script>
export default {
  props: {
    data: {
      required: false,
      type: Object,
    },
  },
  data() {
    return {}
  },
}
</script>
