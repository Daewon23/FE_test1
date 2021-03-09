<template>
  <div class="container-fluid primary-bg-color">
    <div class="nav-wrapper">
      <b-navbar toggleable="lg" type="dark" variant="info">
        <b-navbar-brand href="#">Money Keeper</b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item><nuxt-link to="/">Dashboard</nuxt-link></b-nav-item>
            <b-nav-item
              ><nuxt-link to="/actions">Действия</nuxt-link></b-nav-item
            >
            <b-nav-item
              ><nuxt-link to="/history">История действий</nuxt-link></b-nav-item
            >
          </b-navbar-nav>

          <b-navbar-nav class="ml-auto">
            {{ getUser.first_name + getUser.last_name }}
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Sidebar',
  computed: {
    getUser() {
      return this.$store.state.user
    },
  },
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
.primary-bg-color {
  background-color: #16a2b8;
}
.nav-wrapper {
  max-width: 1140px;
  margin: 0 auto;
}
</style>
