<template>
  <font-awesome-icon :icon="[prefix, name]" />
</template>
<script>
export default {
  props: {
    // eslint-disable-next-line vue/require-prop-types
    prefix: {
      default: String,
      required: false,
    },
    // eslint-disable-next-line vue/require-prop-types
    name: {
      default: String,
      required: false,
    },
  },
}
</script>
