<template>
  <div class="hello">
    <div class="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
      <h1 class="display-4">XRP Text <b class="text-danger">BETA</b></h1>
      <p class="lead">
        Send XRP using just Text messages 🎉
        <br />
        <small class="text-muted">Works on dumbphones and without internet 😉</small>
      </p>
    </div>

    <div class="card box-shadow">
      <div class="card-body text-center">
        <h5>These are the XRP Text numbers you can send a message to:</h5>
        <div class="row">
          <div class="col text-primary">
            <small class=""><b>NL</b></small>
            <br />
            <h3>+3197004499330</h3>
          </div>
          <div class="col text-primary">
            <small class=""><b>US</b></small>
            <br />
            <h3>+16502977977</h3>
          </div>
        </div>
      </div>
    </div>

    <br />

    <div class="card-deck mb-3 text-center">
      <div class="card mb-4 box-shadow">
        <div class="card-header">
          <h4 class="my-0 font-weight-normal">Demo</h4>
        </div>
        <div class="card-body">
          <video style="max-width: 100%;" width="304" poster="/static/xrptext.png" autoplay>
            <source src="/static/xrptext.png" type="image/png" />
            <source src="/static/xrptext.gif" type="image/gif" />
            <source src="/static/xrptext.mp4" type="video/mp4" />
            <param name="src" value="/static/xrptext.mp4" />
            <param name="autoplay" value="true" />
            <param name="showlogo" value="false" />
          </video>

          <hr />

          <h4>Sample messages</h4>

          <small>Retrieve deposit wallet and destination tag (to send XRP to)</small>
          <p class="alert nbp alert-warning text-center">
            <code>deposit</code>
          </p>
          <small>Response</small>
          <p class="alert nbp alert-success text-center">
            <code class="text-success">
              Deposit XRP to: <b>rQHYSEyxX3GKK3F6sXRvdd2NHhUqaxtC6F</b><br />
              Use Destination Tag:<br />
              <b>XXXXXX</b><br />DO NOT FORGET THE DESTINATION TAG!
            </code>
          </p>
          <hr />

          <small>Send <b>2</b> XRP to <b>+31000000000</b></small>
          <p class="alert nbp alert-warning text-center">
            <code>send 2 to +31000000000</code>
            <br /><small>or</small><br />
            <code>send 2 xrp to +31000000000</code>
          </p>
          <small>Response</small>
          <p class="alert nbp alert-success text-center">
            <code class="text-success">
              Send <b>2 XRP</b> (?.?? USD / ?.?? EUR) to <b>+31683164677</b>. To confirm, reply these 7 digits (within 1 hour):<br />
              <b>XXXXXXX</b>
            </code>
          </p>
          <small class="text-muted">... then confirm by sending the <b>XXXXXXX</b> code.</small>
          <br />

          <small>Send the XRP equivalent of <b>5 USD</b> to <b>+31000000000</b></small>
          <p class="alert nbp alert-warning text-center">
            <code>send 5 USD to +31000000000</code>
          </p>
          <hr />

          <small>Withdraw <b>10</b> XRP
          <br />to <b>rPdvC6ccq8hCdPKSPJkPmyZ4Mi1oG2FFkT</b>
          <br />with destination tag <b>12345</b></small>
          <p class="alert nbp alert-warning text-center">
            <code>withdraw 10 to rPdvC6ccq8hCdPKSPJkPmyZ4Mi1oG2FFkT 12345</code>
          </p>
          <small>Response</small>
          <p class="alert nbp alert-success text-center">
            <code class="text-success">
              Please confirm withdrawing:<br /><b>1 XRP</b> to:<br />
              <b>rPdvC6ccq8hCdPKSPJkPmyZ4Mi1oG2FFkT</b>, tag: <b>123456</b> by replying within 1 hour:<br />
              <b>XXXXXXX</b>
            </code>
          </p>
          <small class="text-muted">... then confirm by sending the <b>XXXXXXX</b> code.</small>
        </div>
      </div>
      <div class="card mb-4 box-shadow">
        <div class="card-header">
          <h4 class="my-0 font-weight-normal">FAQ</h4>
        </div>
        <div class="card-body text-left">
          <div class="faq">
            <h6>How does it work?</h6>
            <p>
              <small class="text-primary">
                You can send commands by sending a text message
                to one of the <i>XRP Text</i> bot numbers: <code>+3197004499330</code> and
                <code>+16502977977</code>. By sending a message
                to the <i>XRP Text</i> bot, you can deposit, withdraw or send
                funds to another mobile phone number.
                <br />
                <br />
                When sending funds, both you and the recipient will
                receive a text message, so you can even send XRP to people
                that never used <i>XRP Text</i> before.
              </small>
            </p>
          </div>
          <div class="faq">
            <h6>What to send (text message)?</h6>
            <p>
              <small class="text-primary">
                <b><code>deposit</code></b> - the destination wallet and your personal destination tag will be sent to you.<br />
                <b><code>withdraw <u>AMOUNT</u> to <u>WALLET</u> <span class="text-muted">TAG</span></code></b> - withdraw the
                specified amount of XRP to the wallet (rXXX....) (and optional: the destination tag)<br />
                <b><code>send <u>AMOUNT</u> <span class="text-muted"><u>CURRENCY</u> to</span> <u>NUMBER</u></code></b> - send
                the specified amount to a mobile phone number. You can omit the currency. You can use the
                currency XRP (of course) or <b>EUR</b> or <b>USD</b> to auto-convert to the current amount of XRP (based on the Bitstamp rates).
                <br />
                <span class="text-secondary"><i>If you don't enter the destination number in international notation (with the
                country code) the country code of your own number will be used.</i></span>
              </small>
            </p>
          </div>
          <div class="faq">
            <h6>What does it cost?</h6>
            <p>
              <small class="text-primary">
                <a href="https://www.twilio.com/sms/pricing/us" target="_blank">Twilio</a>
                is used to send and receive the text messages. Twilio charges small amounts
                (a few dollarcents) for the messages sent. The <i>XRP Text</i> bot will
                convert the Twilio text message fee to XRP and charge this on your account balance.
                <a href="https://www.twilio.com/sms/pricing/us" target="_blank"><u>This fee</u></a> varies from
                <code>USD 0.01</code> to <code>USD 0.09</code> (depending on your country).
              </small>
            </p>
          </div>
          <div class="faq">
            <h6>Do you make money?</h6>
            <p>
              <small class="text-primary">
                No. I only convert and charge the Twilio message fee, to cover
                the costs of the text messages, XRP transaction fee and monthly
                fee for the phone numbers you can text to. I pay for this domain name,
                hosting and testing myself.
              </small>
            </p>
          </div>
          <div class="faq">
            <h6>What about security?</h6>
            <p>
              <small class="text-primary">
                To prevent number spoofing you will receive a message with a unique
                code (7 digits) when you want to send / withdraw XRP. You'll have to reply
                these 7 digits to the <i>XRP Text</i> bot to confirm sending / withdrawing
                the funds. <b>However: Text messages (SMS) are not 100% secure.</b> Please
                be advised to keep a relatively low balance in your account.
              </small>
            </p>
          </div>
          <div class="faq">
            <h6>Why is my balance suddenly lower?</h6>
            <p>
              <small class="text-primary">
                Please read "What does it cost" a few FAQs up. The Text message fee
                Twilio charges will be charged. <a href="https://www.twilio.com/sms/pricing/us" target="_blank"><u>This fee</u></a> varies from
                <code>USD 0.01</code> to <code>USD 0.09</code> (depending on your country).
              </small>
            </p>
          </div>
          <div class="faq">
            <h6>Is there a number in my country?</h6>
            <p>
              <small class="text-primary">
                For now, only the US and NL number are available. Since
                Twilio charges a few USD a number (recurring, monthly)
                I will register dedicated numbers only for a small amount
                of countries (since I personally pay the recurring fee).
              </small>
            </p>
          </div>
          <div class="faq">
            <h6>How to cancel a transaction?</h6>
            <p>
              <small class="text-primary">
                Just let it expire (1 hour) by not replying the 7 digit confirmation code.
              </small>
            </p>
          </div>
          <div class="faq">
            <h6>Why don't I receive the <code>balance</code> or howto message?</h6>
            <p>
              <small class="text-primary">
                Balance / howto messages are sent max. 1x per 30 minutes per
                user to prevent balance drain caused by the message fee. You probably
                received such a message recently.
              </small>
            </p>
          </div>
          <div class="faq">
            <h6>Where are my funds stored?</h6>
            <p>
              <small class="text-primary">
                In a central <i>XRP Text</i> wallet. Only the application and I know the
                secret, and I will not steal your money! (If I was planning on doing this I would not
                have published everything under my own first and last name 😉)
              </small>
            </p>
          </div>
          <div class="faq">
            <h6>Why some users can't reply to a text...</h6>
            <p>
              <small class="text-primary">
                In some occasions the messages from the <i>XRP Text</i> bot have a different
                sender (caller ID) than the numbers registered (<code>+3197004499330</code> and
                <code>+16502977977</code>).
                I can't change this nor can Twilio. Just send your reply to one of the
                valid <i>XRP Text</i> numbers.
              </small>
            </p>
          </div>
          <div class="faq">
            <h6>How can the bot integrate with my messages / contacts?</h6>
            <p>
              <small class="text-primary">
                It can't. Thats why you send your messages to the bot,
                the bot updates the funds of you (and the recipient)
                in central database, and then
                confirms the mutation by sending out another text. To you,
                and -if you sent funds- to the recipient. So:<br />
                <code>You » Bot » [database] ... Bot » Recipient</code>
              </small>
            </p>
          </div>
        </div>
      </div>
    </div>

    <p class="alert alert-danger text-center">
      <b>Please note!</b>
      This project is in <b>public beta</b>. There may be glitches. <br />
      <small>I won't accept liability for any loss of funds.</small>
    </p>

    <br />

  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
  .nbp {
    margin-bottom: 0px;
    margin-top: 4px;
    padding: 4px 10px;
    font-size: .9em;
    line-height: 1.1em;
  }
</style>
