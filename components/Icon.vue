<template>
  <font-awesome-icon :icon="[prefix, name]" />
</template>
<script>
export default {
  props: {
    prefix: {
      default: String,
      reuqired: false,
    },
    name: {
      default: String,
      reuqired: false,
    },
  },
}
</script>
