const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});
/**
* An HTTP endpoint that acts as a webhook for HTTP request event
* @returns {object} workflow The result of your workflow steps
*/
module.exports = async (context) => {

  console.log(context.params);

  // Prepare workflow object to store API responses
  
  let workflow = {};
  
  // [Workflow Step 1]
  
  console.log(`Running slack.channels[@0.4.18].messages.create()...`);
  
  workflow.response = await lib.slack.channels['@0.4.18'].messages.create({
    channel: `#fingerprint-demo`,
    text: `Hello from stdlib!`,
    attachments: null
  });

  return workflow;
};