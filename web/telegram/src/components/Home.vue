<template>
  <div class="hello">
    <div class="container-fluid blue logo">
      <a href="/"><img src="/static/assets/Logo.svg" alt="XRP Text Logo" /></a>
    </div>
    <div class="container-fluid blue jumbotron">
      <div class="container">
        <div class="row">
          <div class="col-md-4 col-lg-6">
            <h1>Send XRP using Telegram</h1>
            <p>
              When sending funds, both you and the recipient will
              receive a text message, so you can even send XRP to people
              that never used <b>XRP Text</b> before.
            </p>

            <a href="#learn" class="btn btn-primary btn-lg"><i class="fa fa-info"></i> Learn more</a>
            <br /><br />&nbsp;
          </div>
          <div class="col-md-8 col-lg-6 text-center">
            <div class="phone-container">
              <div class="phone">
                <div class="screenshot">
                  <!-- <video width="100%" poster="/static/screenshot.png" autoplay loop muted style="max-width: 100%;">
                    <source src="/static/screenshot.png" type="image/png">
                    <source src="/static/iPhoneLow.mp4" type="video/mp4">
                    <param name="autoplay" value="true">
                    <param name="loop" value="true">
                    <param name="muted" value="true">
                    <param name="showlogo" value="false">
                  </video> -->
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container-fluid white pad">
      <a name="learn"></a>
      <div class="container">
        <div class="row text-center">
          <div class="col-lg-2"></div>
          <div class="col-lg-8">
            <h2>Use XRP Text in Telegram:</h2>
          </div>
          <div class="col-lg-2"></div>
          <div class="col-12">&nbsp;<br />&nbsp;
            <p class="text-center">The only thing you need to do is click on <code>START</code> button in the bot and your journey will begin!</p>
            <p class="text-center"><a class="btn btn-primary btn-lg" target="_blank" href="https://t.me/RippledBot">Join with @RippledBot</a></p>
          </div>
        </div>
      </div>
    </div>
    <div class="container-fluid lightblue xtrapad">
      <div class="container text-center">
        <div class="row">
          <div class="col-lg-2"></div>
          <div class="col-lg-8">
            <h1>How does it work?</h1>
            <p>
              You just need to run the commands in the <code>Rippled Bot</code>. Also run tip command in groups to have fun with tipping to others,
              you can deposit, withdraw or send
              funds to another telegram members with just their username.
              <br />
              <br />
              When sending funds, the recipient will
              receive a notification, also you can even send XRP to people
              that never used <code>Rippled Bot</code> before.
            </p>
          </div>
          <div class="col-lg-2"></div>
        </div>
      </div>
    </div>
    <div class="container-fluid white pad">
      <a name="learn"></a>
      <div class="container">
        <div class="row text-center">
          <div class="col-lg-2"></div>
          <div class="col-lg-8">
            <h1>What to run</h1>
            <h5>(in the bot)</h5>
          </div>
          <div class="col-12">&nbsp;<br />&nbsp;</div>
          <div class="col-md-4 expl">
            <img class="icon" src="/static/assets/icon_send.svg" alt="Send" />
            <h4>/send <code>+amount</code>  <code>@username</code></h4>
            <p>Send the specified amount to a telegram member by username.</p>
          </div>
          <div class="col-md-4 expl">
            <img class="icon" src="/static/assets/icon_deposit.svg" alt="Deposit" />
            <h4>/deposit</h4>
            <p>A destination wallet address and your personal destination tag will be shown, so you can fund your  account.</p>
          </div>
          <div class="col-md-4 expl">
            <img class="icon" src="/static/assets/icon_withdraw.svg" alt="Withdraw" />
            <h4>/withdraw <code>amount</code> <code>wallet</code></h4>
            <p>Withdraw the specified amount of XRP to the wallet (rXXX....). Your withdrawal will processed immediately.</p>
            <p>
              <small>
                You can append a space or colon to specify a destination tag for you withdrawal.
              </small>
            </p>
          </div>
          <div class="col-12">
            <a name="sample"></a>
            <br />
            <br />
            <a href="#sample" @click="sampleMsgs=true" class="btn btn-lg btn-primary"><i class="fa fa-search"></i> Sample commands</a>
          </div>
          <div class="col-lg-1 col-sm-2 text-sample" v-if="sampleMsgs"></div>
          <div class="col-lg-4 col-sm-8 text-sample text-left" v-if="sampleMsgs">
            <div class="text out"><u>/deposit</u></div>
            <div class="text in">Address: <b>rQYxX...HC6F</b><br />
              Destination Tag:<br />
              <b>XXXXXX</b>
            </div>
          </div>
          <div class="col-lg-1 text-sample" v-if="sampleMsgs"></div>
          <div class="col-lg-1 col-sm-2 text-sample" v-if="sampleMsgs"></div>
          <div class="col-lg-4 col-sm-8 text-sample text-left" v-if="sampleMsgs">
            <div class="text out"><u>/send</u> <b>+2</b> <b>@baltazar223</b> </div>
            <div class="text in"><b>2 XRP</b> Successfully sent to @baltazar223!
            </div>
            <div class="clearfix"></div>
            <small class="text-muted">sending tips in groups have same structure as sending funds directly to another user just use <code>/tip</code> instead</small>
          </div>
          <div class="col-lg-1 text-sample" v-if="sampleMsgs"></div>
          <div class="col-lg-1 col-sm-2 text-sample" v-if="sampleMsgs"></div>
          <div class="col-lg-4 col-sm-8 text-sample text-left" v-if="sampleMsgs">
            <div class="text out"><u>/balance</u></div>
            <div class="text in"><b>Balance:</b> <code>0.870000 XRP</code>
            </div>
          </div>
          <div class="col-lg-1 text-sample" v-if="sampleMsgs"></div>
          <div class="col-lg-1 col-sm-2 text-sample" v-if="sampleMsgs"></div>
          <div class="col-lg-4 col-sm-8 text-sample text-left" v-if="sampleMsgs">
            <div class="text out"><u>/withdraw</u> <b>5</b> <b>rPdvC6...oG2FFkT 12345</b></div>
            <div class="text in"><b>CONFIRM WITHDRAW</b><br />
              <b>5 XRP</b><br />
              <b>rPdvC6...oG2FFkT</b>, tag: <b>123456</b><br />
            </div>
            <div class="clearfix"></div>
            <small class="text-muted">... then confirm by running <code>/confirm</code> command</small>
          </div>
          <div class="col-lg-1 text-sample" v-if="sampleMsgs"></div>
        </div>
      </div>
    </div>
    <div class="container-fluid blue xtrapad">
      <div class="container text-center">
        <div class="row">
          <div class="col-lg-2"></div>
          <div class="col-lg-8">
            <h1>What does it cost?</h1>
            <p>
              Absolutely <b>nothing</b> 🎉
            </p>
          </div>
          <div class="col-lg-2"></div>
        </div>
      </div>
    </div>
    <div class="faqs">
      <div class="container-fluid lightblue header">
        <div class="container text-center">
          <h1>FAQ's</h1>
        </div>
      </div>
      <div class="container-fluid lightblue faq">
        <div class="container" :class="{ show: questionIsOpen(1) }">
          <div @click="toggleQuestion(1)" class="question">
            <h3>Do you make money with <b>XRP Text</b> for Telegram?</h3>
          </div>
        </div>
      </div>
      <div class="container-fluid answer" :class="{ show: questionIsOpen(1) }">
        <div class="container">
          <p>
            No. It's free anyway ;)
          </p>
        </div>
      </div>
      <div class="container-fluid lightblue faq">
        <div class="container" :class="{ show: questionIsOpen(2) }">
          <div @click="toggleQuestion(2)" class="question">
            <h3>What about security?</h3>
          </div>
        </div>
      </div>
      <div class="container-fluid answer" :class="{ show: questionIsOpen(2) }">
        <div class="container">
          <p>
              The bot server is just visible to telegram servers and the only contact way is the telegram API . So no contact from outside world :)
          </p>
        </div>
      </div>
    </div>
    <div class="container-fluid text-center dark">
      <div class="container">
          <h3><i class="fa fa-exclamation-triangle"></i> Please note!</h3>
          <p>
            This project is in <b>public beta</b>. There may be glitches.
            <br />
            <small>I won't accept liability for any loss of funds.</small>
          </p>
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
    text-align: left;
    display: inline-block;
    padding-left: 52px;
    background-repeat: no-repeat;
    background-position: 0px 0px;
    padding-top: 3px;
    background-size: 38px 38px;
    &.global {
      background-image: url('/static/assets/icon_global.png');
    }
    &.se {
      background-image: url('/static/assets/icon_se.png');
    }
    &.nl {
      background-image: url('/static/assets/icon_nl.png');
    }
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
      border-bottom: 1px solid #327EC7;
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
