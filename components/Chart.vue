<template>
  <div>
    <my-line :data="data" />
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
