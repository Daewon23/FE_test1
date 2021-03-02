<template>
  <div>
    <b-sidebar
      title="Money Keeper"
      bg-variant="dark"
      text-variant="light"
      shadow
      visible
      no-header-close
    >
      <div class="px-3 py-2">
        <nav>
          <div class="link">
            <nuxt-link to="/">Dashboard</nuxt-link>
          </div>
          <div class="link">
            <nuxt-link to="/">История</nuxt-link>
          </div>
          <div class="link">
            <nuxt-link to="/">Профиль</nuxt-link>
          </div>
        </nav>
      </div>
    </b-sidebar>
  </div>
</template>

<script>
export default {
  name: 'Sidebar',
}
</script>

<style lang="scss" scoped>
nav {
  padding: 0.5em 0;
  margin: 0;
  .link {
    padding: 0.5em 1em 0.5em 3em;
    font-size: 0.95em;
    transition: all 0.15s linear;
    cursor: pointer;
    &:hover {
      background-color: rgba(0, 0, 0, 0.1);
    }
  }
}
</style>
