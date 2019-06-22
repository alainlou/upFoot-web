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
  
  // [Workflow Step 1]
  
  console.log(`Running slack.channels[@0.4.18].messages.create()...`);

  // Setting the message to display in Slack
  let message = name + ` was `;
  if(verified === true) {
    message = message + `verified.`;
  } else {
    message = message + `not verified.`;
  }
  
  workflow.response = await lib.slack.channels['@0.4.18'].messages.create({
    channel: `#fingerprint-demo`,
    text: message,
    attachments: null
  });

  return workflow;
};