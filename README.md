# XRP Text

This application runs a a service where users can deposit XRP to a central wallet, 
withdraw XRP to their own wallet and exchange XRP by sending just a text message
with a phone (so this also works at dumbphones and/or without an internet connection)

This project has some similarities with the [XRP Tip Bot](https://xrptipbot.com), except with increased limits and text messages as the only way of communicating with the platform.

## Dependencies

- Node 8+
- [Twilio](https://www.twilio.com/) is used for inbound and outbound text messages.
- A MySQL / MariaDB database server is used to persist users and transactions.
- A free TCP port, where a HTTP server will launch to receive Twilio webhooks.

# Configure

1. Make sure your MySQL / MariaDB database server is running and accepting connections. Setup a database, user and password and import the SQL script: [`database/mysql.sql`](https://github.com/WietseWind/xrp-text/blob/master/database/mysql.sql)
2. Copy [`config.sample.json`](https://github.com/WietseWind/xrp-text/blob/master/config.sample.json) to `config.json` and make changes: add your Twilio keys and MySQL server credentials.
3. Make sure your computer is publicly accessible on the http port configured in the config file.
4. Configure Twilio to send Webhooks for incoming messages to your computer at the port configured in step 3. 

# Run

Launch the application:

```
node index.js
```

If you want to the application to auto-reload (for development) on change:

```
npm run dev
```
