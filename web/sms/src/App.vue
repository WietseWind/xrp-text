<template>
  <div id="app">
    <main role="main">
      <router-view/>
    </main>

    <footer class="footer">
      <div class="container text-center">
        <small>
          <span class="text-muted">By <a href="https://twitter.com/WietseWind" target="_blank">@WietseWind</a></span>
          &dash;
          <span class="text-muted"><a href="https://xrptipbot.com" target="_blank">xrptipbot.com</a></span>
          &dash;
          <span class="text-muted"><a href="https://ledger.exposed" target="_blank">ledger.exposed</a></span>
          &dash;
          Github:
          <span class="text-muted"><a href="https://github.com/WietseWind/Xrp-Text" target="_blank">Source</a></span>
          &dash;
          Design by
          <span class="text-muted"><a href="http://twitter.com/dappyroots" target="_blank">@dappyroots</a></span>
        </small>
      </div>
    </footer>
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
body {
  margin-bottom: 60px; /* Margin bottom by footer height */
}
@media (min-width: 768px) {
  html {
    font-size: 16px;
  }
}

.footer {
  a {
    color: #327EC7;
  }
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 60px; /* Set the fixed height of the footer here */
  overflow: hidden;
  line-height: 60px; /* Vertically center the text there */
  background-color: #f5f5f5;
}
</style>
