<template>
  <div class="hello">
    <div class="container-fluid dark logo">
      <a href="/"><img src="/static/assets/Logo.svg" alt="XRP Text Logo" /></a>
    </div>
    <div class="container-fluid dark jumbotron">
      <div class="container">
        <div class="row">
          <div class="col-md-12 col-lg-12 col-12 text-center">
            <h1>Send XRP using text messages</h1>

            <br /><br />&nbsp;
          </div>
        </div>
      </div>
    </div>
    <div class="container-fluid white pad">
      <a name="learn"></a>
      <div class="container">
        <div class="row text-center">
          <div class="col-12 text-center">
            <h4>Do you want to use SMS Text or Telegram?</h4>
            <br />&nbsp;
            <br />&nbsp;
          </div>
          <div class="col-6 text-center">
            <a href="https://sms.xrptext.com">
              <div class="number">
                <h3>SMS Text</h3>
                <p>by @WietseWind</p>
                <img src="../assets/message.svg" class="logo" />
                <br />
              </div>
            </a>
          </div>
          <div class="col-6 text-center">
            <a href="https://telegram.xrptext.com">
              <div class="number">
                <h3>Telegram</h3>
                <p>by @baltazar223</p>
                <img src="../assets/telegram.svg" class="logo" />
                <br />
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      sampleMsgs: false,
      questionsOpen: []
    }
  },
  methods: {
    questionIsOpen (q) {
      return this.questionsOpen.indexOf(q) > -1
    },
    toggleQuestion (q) {
      let pos = this.questionsOpen.indexOf(q)
      if (pos < 0) {
        this.questionsOpen.push(q)
      } else {
        this.questionsOpen.splice(pos, 1)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .dark {
    color: #3D3E3F;
  }
  a {
    color: #3D3E3F;
    &:hover {
      color: #327EC7;
      h3 {
        text-decoration: underline !important;
      }
    }
  }
  h1 {
    font-weight: 300;
    line-height: 1.15em;
    padding-bottom: 10px;
    font-size: 2.9em;
  }
  h2 {
    font-weight: 300;
  }
  h5 {
    font-weight: 300;
    padding-top: 0;
    margin-top: -10px;
    line-height: 1em;
  }
  p {
    font-size: 1.25em;
    line-height: 1.55em;
  }
  img.icon {
    height: 85px;
    margin-bottom: 10px;
  }
  .expl {
    padding-top: 20px;
    font-size: 0.95em;
    h4 {
      color: #3D3E3F;
    }
    p {
      line-height: 1.3em;
      small {
        line-height: 1em;
      }
    }
  }
  .text-sample {
    margin-top: 40px;
    .text {
      clear: both;
      max-width: 75%;
      background-color: lighten( #cfcfcf, 10%);
      border-radius: 15px;
      padding: 3px 15px;
      margin-bottom: 15px;
      &.in {
        float: right;
        text-align: right;
      }
      &.out {
        background-color: #E2F1FC;
        float: left;
      }
    }
  }
  div.faqs {
    a {
      color: #3D3E3F;
    }
    .answer {
      display: none;
      &.show {
        display: block;
        padding-top: 30px;
        color: #327EC7;
        padding-bottom: 50px;
        background-image: none;
      }
    }
    div.faq {
      padding-top: 10px;
      padding-bottom: 5px;
      div.container {
        background-image: url('/static/assets/arrowup.png');
        &.show {
          background-image: url('/static/assets/arrowdown.png');
          background-position: 95% 26px;
          div.question {
            h3 {
              font-weight: 700;
            }
          }
        }
        background-repeat: no-repeat;
        background-position: 95% 21px;
        padding-top: 0;
        padding-bottom:0;
        div.question {
          cursor: pointer;
          padding-top: 20px;
          padding-bottom: 20px;
          h3 {
            font-weight: 300;
            padding-right: 65px;
          }
        }
      }
    }
    div.header {
      padding-bottom: 10px;
    }
  }
  div.number {
    .logo {
      max-width: 100px;
      width: 100%;
    }
    text-align: left;
    display: inline-block;
    background-repeat: no-repeat;
    background-position: 0px 0px;
    padding-top: 3px;
    background-size: 38px 38px;
    h3 {
      font-weight: 300;
    }
    p {
      font-weight: bold;
      color: #3D3E3F;
      font-size: 1.65em;
    }
  }
  a.btn {
    font-weight: 700;
    &.btn-primary {
      background-color: #48A1F2;
      border-color: #48A1F2;
      &:active {
        background-color: #fff;
        color: #48A1F2;
        border-color: #48A1F2;
        box-shadow: none !important;
        outline: none !important;
      }
      &:focus {
        box-shadow: none;
        outline: none;
      }
    }
    &.btn-lg {
      padding: 13px 30px;
      font-size: 1em;
    }
  }
  div.container-fluid {
    padding-top: 40px; padding-bottom: 40px;
    &.jumbotron {
      border-radius: 0; padding-bottom: 0;
      margin-bottom: 0;
      div.phone-container {
        display: block; position: relative;
        right: 0; width: 422px; height: 650px;
        overflow: hidden; max-width: 100%; right: -30px;
      }
      div.phone {
        margin: 0 auto 0 auto; display: block; width: 422px;
        height: 650px; background-repeat: no-repeat;
        background-position: top left;
        background-image: url('/static/assets/iPhone.png');
        overflow: hidden; padding-right: 2px;
        div.screenshot {
          width: 376px; height: 559px;
          margin: 0 auto 0 auto; margin-top: 92px;
          display: block; background-color: #ccc;
          background-image: url('/static/screenshot.png');
          background-size: cover;
          background-repeat: no-repeat;
          background-position: top center;
        }
      }
    }
    &.pad {
      padding-top: 75px;
      padding-bottom: 75px;
    }
    &.xtrapad {
      padding-top: 100px;
      padding-bottom: 100px;
    }
    &.logo {
      padding-left: 60px;
      a {
        display: inline-block;
        img {
          display: block;
          height: 90px;
        }
      }
    }
    &.blue {
      background-color: #327EC7;
      color: #fff;
      a:not(.btn) {
        color: #FC992E;
      }
      code {
        color: #FDDD58;
      }
    }
    &.white {
      background-color: #fff;
      color: #327EC7;
    }
    &.lightblue {
      background-color: #E2F1FC;
      color: #327EC7;
    }
    &.dark {
      background-color: #3D3E3F;
      color: #fff;
    }
  }
</style>
