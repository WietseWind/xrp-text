<template>
  <div id="app">
    <main role="main">
      <router-view/>
    </main>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss">
html {
  font-size: 14px;
  font-family: 'Roboto', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
html {
  position: relative;
  min-height: 100%;
}
@media (min-width: 768px) {
  html {
    font-size: 16px;
  }
}
</style>
