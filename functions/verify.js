const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});
/**
* An HTTP endpoint that acts as a webhook for HTTP request event
* @returns {object} workflow The result of your workflow steps
*/
module.exports = async (context) => {

  let name = context.params['name'];
  let verified = context.params['verified'];

  console.log(context.params);
  console.log(verified);

  /**
   * let name = context.http.headers['x-name']
   * let verified = context.http.headers['x-verified']
   */
  
  // Prepare workflow object to store API responses
  
  let workflow = {};
  
  console.log(`Running slack.channels[@0.4.18].messages.create()...`);

  // Setting the message to display in Slack
  let message = name + ` was `;
  if(verified === 'true') {
    message = message + `verified.`;
  } else {
    message = message + `not verified.`;
  }

  workflow.slackBotResult = await lib.slack.channels['@0.4.18'].messages.create({
    channel: `#fingerprint-demo`,
    text: message,
    attachments: null
  });

  console.log(`Running airtable.query[@0.1.1].insert()...`);
  workflow.insertQueryResult = await lib.airtable.query['@0.1.1'].insert({
    table: `Credentials`,
    fields: {
      'Name': name,
      'Verified': verified,
      'Time': new Date().toUTCString()
    }
  });

  return workflow;
};