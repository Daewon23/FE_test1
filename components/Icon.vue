<template>
  <font-awesome-icon :icon="[prefix, name]" />
</template>
<script>
export default {
  props: {
    prefix: {
      default: String,
      required: false,
      type: String,
    },
    name: {
      default: String,
      required: false,
      type: String,
    },
  },
}
</script>
