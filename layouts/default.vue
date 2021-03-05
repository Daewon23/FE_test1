<template>
  <div>
    <Header />
    <Nuxt />
    <client-only>
      <notifications position="bottom left" :duration="-1" />
    </client-only>
  </div>
</template>

<style>
body {
  font-family: 'Noto Sans JP', sans-serif;
  font-weight: 300;
}
</style>
