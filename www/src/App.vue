<template>
  <div id="app">
    <main role="main">
      <div class="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom box-shadow">
        <router-link tag="h5" class="my-0 mr-md-auto font-weight-normal logo" to="/">
          XRP Text
        </router-link>
        <nav class="my-2 my-md-0 mr-md-3 text-muted">
          <small>Send XRP using Text messages</small>
        </nav>
      </div>
      <div class="container">
        <router-view/>
      </div>
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
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
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

.container {
  max-width: 960px;
}

.pricing-header {
  max-width: 700px;
}

.card-deck .card {
  min-width: 220px;
}

.border-top { border-top: 1px solid #e5e5e5; }
.border-bottom { border-bottom: 1px solid #e5e5e5; }

.box-shadow { box-shadow: 0 .25rem .75rem rgba(0, 0, 0, .05); }

.routerlink {
  &:not(.btn) {
    color: #343a40!important;
  }
}

.footer {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 60px; /* Set the fixed height of the footer here */
  overflow: hidden;
  line-height: 60px; /* Vertically center the text there */
  background-color: #f5f5f5;
}

.logo {
  background-image: url('assets/logo.png');
  background-repeat: no-repeat;
  background-position: top left;
  background-size: contain;
  padding: 10px;
  padding-left: 55px;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
}
</style>
