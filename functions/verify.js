const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});
/**
* An HTTP endpoint that acts as a webhook for HTTP request event
* @returns {object} workflow The result of your workflow steps
*/
module.exports = async (context) => {

  let name = context.params['name'];
  let verified = context.params['verified']

  let tmp = context.http.headers;
  
  console.log(tmp);
  
  // Prepare workflow object to store API responses
  
  let workflow = {};
  
  // [Workflow Step 1]
  
  console.log(`Running slack.channels[@0.4.18].messages.create()...`);
  
  workflow.response = await lib.slack.channels['@0.4.18'].messages.create({
    channel: `#fingerprint-demo`,
    text: name + ` has entered the building.`,
    attachments: null
  });

  return workflow;
};