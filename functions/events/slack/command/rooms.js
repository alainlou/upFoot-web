const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});
/**
* An HTTP endpoint that acts as a webhook for Slack command event
* @param {object} event Slack command event body (raw)
* @returns {object} workflow The result of your workflow steps
*/
module.exports = async (event) => {

  // Prepare workflow object to store API responses
  
  let workflow = {};
  
  // Fetch room info from Airtable
  
  workflow.queryResult = await lib.airtable.query['@0.1.1'].select({
    table: "Traffic"
  })
  
  let result = '';
  for(let row of workflow.queryResult['rows']) {
    result += row['fields']['Space'] + ': ' + row['fields']['Traffic'] + '\n';
  }
  
  // [Workflow Step 1]
  
  console.log(`Running slack.conversations[@0.0.5].info()...`);
  
  workflow.channel = await lib.slack.conversations['@0.0.5'].info({
    id: `${event.channel_id}`
  });
  
  // [Workflow Step 2]
  
  console.log(`Running slack.users[@0.3.19].retrieve()...`);
  
  workflow.user = await lib.slack.users['@0.3.19'].retrieve({
    user: `${event.user_id}`
  });
  
  // [Workflow Step 3]
  
  console.log(`Running slack.users[@0.3.19].messages.create()...`);
  
  workflow.response = await lib.slack.messages['@0.3.5'].create({
    id: `${event.user_id}`,
    text: result
  });

  return workflow;
};