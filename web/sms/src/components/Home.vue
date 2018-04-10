<template>
  <div class="hello">
    <div class="container-fluid blue logo">
      <a href="/"><img src="/static/assets/Logo.svg" alt="XRP Text Logo" /></a>
    </div>
    <div class="container-fluid blue jumbotron">
      <div class="container">
        <div class="row">
          <div class="col-md-4 col-lg-6">
            <h1>Send XRP using text messages</h1>
            <p>
              When sending funds, both you and the recipient will
              receive a text message, so you can even send XRP to people
              that never used <b>XRP Text</b> before.
            </p>

            <a href="#learn" class="btn btn-success btn-lg"><i class="fa fa-info"></i> Learn more</a>
            <br /><br />&nbsp;
          </div>
          <div class="col-md-8 col-lg-6 text-center">
            <div class="phone-container">
              <div class="phone">
                <div class="screenshot">
                  <video width="100%" poster="/static/screenshot.png" autoplay loop muted style="max-width: 100%;">
                    <source src="/static/screenshot.png" type="image/png">
                    <source src="/static/iPhoneLow.mp4" type="video/mp4">
                    <param name="autoplay" value="true">
                    <param name="loop" value="true">
                    <param name="muted" value="true">
                    <param name="showlogo" value="false">
                  </video>
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
            <h2>These are the <b>XRP Text</b> numbers you can send a message to:</h2>
          </div>
          <div class="col-lg-2"></div>
          <div class="col-12">&nbsp;<br />&nbsp;</div>
          <div class="col-sm-6">
            <div class="number global">
              <h3>Global users (US)</h3>
              <p>+16502977977</p>
            </div>
          </div>
          <div class="col-sm-6">
            <div class="number se">
              <h3>Global users (SE)</h3>
              <p>+46765193977</p>
            </div>
          </div>
          <div class="col-sm-6">
            <div class="number nl">
              <h3>Users in NL</h3>
              <p>+3197004499330</p>
            </div>
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
              You can send commands by sending a text message
              to one of the <b>XRP Text</b> bot numbers: <code>+3197004499330</code> and
              <code>+16502977977</code>. By sending a message
              to the <b>XRP Text</b> bot, you can deposit, withdraw or send
              funds to another mobile phone number.
              <br />
              <br />
              When sending funds, both you and the recipient will
              receive a text message, so you can even send XRP to people
              that never used <b>XRP Text</b> before.
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
            <h1>What to send</h1>
            <h5>(in a text message)</h5>
          </div>
          <div class="col-12">&nbsp;<br />&nbsp;</div>
          <div class="col-md-4 expl">
            <img class="icon" src="/static/assets/icon_send.svg" alt="Send" />
            <h4>send <code>amount</code> to <code>number</code></h4>
            <p>Send the specified amount to a mobile phone number.</p>
            <p>If you don't enter a country code, the country code of your own number will be used.</p>
            <p>
              <small>
                Add a currency (USD / EUR) after the amount to auto-convert to the current amount of XRP (based on the Bitstamp rates).
              </small>
            </p>
          </div>
          <div class="col-md-4 expl">
            <img class="icon" src="/static/assets/icon_deposit.svg" alt="Deposit" />
            <h4>deposit</h4>
            <p>A destination wallet address and your personal destination tag will be sent to you, so you can fund your <b>XRP Text</b> account.</p>
          </div>
          <div class="col-md-4 expl">
            <img class="icon" src="/static/assets/icon_withdraw.svg" alt="Withdraw" />
            <h4>withdraw <code>amount</code> to <code>wallet</code></h4>
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
            <a href="#sample" @click="sampleMsgs=true" class="btn btn-lg btn-success"><i class="fa fa-search"></i> Sample messages</a>
          </div>
          <div class="col-lg-1 col-sm-2 text-sample" v-if="sampleMsgs"></div>
          <div class="col-lg-4 col-sm-8 text-sample text-left" v-if="sampleMsgs">
            <div class="text out"><u>deposit</u></div>
            <div class="text in">Deposit XRP to: <b>rQYxX...HC6F</b><br />
              Use Destination Tag:<br />
              <b>XXXXXX</b><br /><br />
              DO NOT FORGET THE DESTINATION TAG!</div>
          </div>
          <div class="col-lg-1 text-sample" v-if="sampleMsgs"></div>
          <div class="col-lg-1 col-sm-2 text-sample" v-if="sampleMsgs"></div>
          <div class="col-lg-4 col-sm-8 text-sample text-left" v-if="sampleMsgs">
            <div class="text out"><u>send</u> <b>2</b> to <b>+316233...2191</b> </div>
            <div class="text in">Send <b>2 XRP</b><br />(1.23 USD / 1.00 EUR) to <b>+316233...2191</b><br />
              To confirm, reply these 7 digits (within 1 hour):<br />
              <b>XXXXXXX</b>
            </div>
            <div class="clearfix"></div>
            <small class="text-muted">... then confirm by sending the <b>XXXXXXX</b> code. </small>
          </div>
          <div class="col-lg-1 text-sample" v-if="sampleMsgs"></div>
          <div class="col-lg-1 col-sm-2 text-sample" v-if="sampleMsgs"></div>
          <div class="col-lg-4 col-sm-8 text-sample text-left" v-if="sampleMsgs">
            <div class="text out"><u>send</u> <b>3 <span class="dark">USD</span></b> to <b>+316233...2191</b> </div>
            <div class="text in">Send <b>3 USD</b><br />(6.78901 XRP) to <b>+316233...2191</b><br />
              To confirm, reply these 7 digits (within 1 hour):<br />
              <b>XXXXXXX</b>
            </div>
            <div class="clearfix"></div>
            <small class="text-muted">... then confirm by sending the <b>XXXXXXX</b> code. </small>
          </div>
          <div class="col-lg-1 text-sample" v-if="sampleMsgs"></div>
          <div class="col-lg-1 col-sm-2 text-sample" v-if="sampleMsgs"></div>
          <div class="col-lg-4 col-sm-8 text-sample text-left" v-if="sampleMsgs">
            <div class="text out"><u>withdraw</u> <b>5</b> to <b>rPdvC6...oG2FFkT 12345</b></div>
            <div class="text in">Please confirm withdrawing:
              <b>5 XRP</b> to:<br />
              <b>rPdvC6...oG2FFkT</b>, tag: <b>123456</b><br />
              by replying within 1 hour:<br />
              <b>XXXXXXX</b>
            </div>
            <div class="clearfix"></div>
            <small class="text-muted">... then confirm by sending the <b>XXXXXXX</b> code. </small>
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
              <a href="https://www.twilio.com/sms/pricing/us" target="_blank">Twilio</a>
                is used to send and receive the text messages. Twilio charges small amounts
                (a few dollarcents) for the messages sent. The <b>XRP Text</b> bot will
                convert the Twilio text message fee to XRP and charge this on your account balance.
                <a href="https://www.twilio.com/sms/pricing/us" target="_blank">The fee</a> varies from
                <code>USD 0.01</code> to <code>USD 0.09</code> (depending on your country).
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
            <h3>Do you make money with <b>XRP Text</b>?</h3>
          </div>
        </div>
      </div>
      <div class="container-fluid answer" :class="{ show: questionIsOpen(1) }">
        <div class="container">
          <p>
              No. I only convert and charge the Twilio message fee, to cover
              the costs of the text messages, XRP transaction fee and monthly
              fee for the phone numbers you can text to. I pay for this domain name,
              hosting and testing myself.
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
              To prevent number spoofing you will receive a message with a unique
              code (7 digits) when you want to send / withdraw XRP. You'll have to reply
              these 7 digits to the <b>XRP Text</b> bot to confirm sending / withdrawing
              the funds. <b>However: Text messages (SMS) are not 100% secure.</b> Please
              be advised to keep a relatively low balance in your account.
          </p>
        </div>
      </div>
      <div class="container-fluid lightblue faq">
        <div class="container" :class="{ show: questionIsOpen(3) }">
          <div @click="toggleQuestion(3)" class="question">
            <h3>Why is my balance suddenly lower?</h3>
          </div>
        </div>
      </div>
      <div class="container-fluid answer" :class="{ show: questionIsOpen(3) }">
        <div class="container">
          <p>
              Please read "What does it cost" a few FAQs up. The Text message fee
              Twilio charges will be charged. <a href="https://www.twilio.com/sms/pricing/us" target="_blank"><u>The fee</u></a> varies from
              <code>USD 0.01</code> to <code>USD 0.09</code> (depending on your country).
          </p>
        </div>
      </div>
      <div class="container-fluid lightblue faq">
        <div class="container" :class="{ show: questionIsOpen(4) }">
          <div @click="toggleQuestion(4)" class="question">
            <h3>Is there a number in my country?</h3>
          </div>
        </div>
      </div>
      <div class="container-fluid answer" :class="{ show: questionIsOpen(4) }">
        <div class="container">
          <p>
              For now, only the US and NL number are available. Since
              Twilio charges a few USD a number (recurring, monthly)
              I will register dedicated numbers only for a small amount
              of countries (since I personally pay the recurring fee).
          </p>
        </div>
      </div>
      <div class="container-fluid lightblue faq">
        <div class="container" :class="{ show: questionIsOpen(5) }">
          <div @click="toggleQuestion(5)" class="question">
            <h3>How to cancel a transaction?</h3>
          </div>
        </div>
      </div>
      <div class="container-fluid answer" :class="{ show: questionIsOpen(5) }">
        <div class="container">
          <p>
              Just let it expire (1 hour) by not replying the 7 digit confirmation code.
          </p>
        </div>
      </div>
      <div class="container-fluid lightblue faq">
        <div class="container" :class="{ show: questionIsOpen(6) }">
          <div @click="toggleQuestion(6)" class="question">
            <h3>Why don't I receive the <code>balance</code> or howto message?</h3>
          </div>
        </div>
      </div>
      <div class="container-fluid answer" :class="{ show: questionIsOpen(6) }">
        <div class="container">
          <p>
              Balance / howto messages are sent max. 1x per 30 minutes per
              user to prevent balance drain caused by the message fee. You probably
              received such a message recently.
          </p>
        </div>
      </div>
      <div class="container-fluid lightblue faq">
        <div class="container" :class="{ show: questionIsOpen(7) }">
          <div @click="toggleQuestion(7)" class="question">
            <h3>Where are my funds stored?</h3>
          </div>
        </div>
      </div>
      <div class="container-fluid answer" :class="{ show: questionIsOpen(7) }">
        <div class="container">
          <p>
              In a central <b>XRP Text</b> wallet. Only the application and I know the
              secret, and I will not steal your money! (If I was planning on doing this I would not
              have published everything under my own first and last name 😉)
          </p>
        </div>
      </div>
      <div class="container-fluid lightblue faq">
        <div class="container" :class="{ show: questionIsOpen(8) }">
          <div @click="toggleQuestion(8)" class="question">
            <h3>Why some users can't reply to a text...</h3>
          </div>
        </div>
      </div>
      <div class="container-fluid answer" :class="{ show: questionIsOpen(8) }">
        <div class="container">
          <p>
              In some occasions the messages from the <b>XRP Text</b> bot have a different
              sender (caller ID) than the numbers registered (<code>+3197004499330</code> and
              <code>+16502977977</code>).
              I can't change this nor can Twilio. Just send your reply to one of the
              valid <b>XRP Text</b> numbers.
          </p>
        </div>
      </div>
      <div class="container-fluid lightblue faq">
        <div class="container" :class="{ show: questionIsOpen(9) }">
          <div @click="toggleQuestion(9)" class="question">
            <h3>How can the bot integrate with my messages / contacts?</h3>
          </div>
        </div>
      </div>
      <div class="container-fluid answer" :class="{ show: questionIsOpen(9) }">
        <div class="container">
          <p>
              It can't. Thats why you send your messages to the bot,
              the bot updates the funds of you (and the recipient)
              in central database, and then
              confirms the mutation by sending out another text. To you,
              and -if you sent funds- to the recipient. So:<br />
              <code>You » Bot » [database] ... Bot » Recipient</code>
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
      background-color: lighten( #cfcfcf, 12%);
      border-radius: 15px;
      padding: 3px 15px;
      margin-bottom: 15px;
      &.in {
        float: right;
        text-align: right;
        color: #666;
      }
      &.out {
        background-color: #EFF8F0;
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
        color: #39B950;
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
      border-bottom: 1px solid #39B950;
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
      background-color: #39B950;
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
      color: #39B950;
    }
    &.lightblue {
      background-color: lighten(#CAEACC, 10%);
      color: #39B950;
    }
    &.dark {
      background-color: #3D3E3F;
      color: #fff;
    }
  }
</style>
