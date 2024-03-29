const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});
/**
* An HTTP endpoint that acts as a webhook for HTTP request event
* @returns {object} workflow The result of your workflow steps
*/
module.exports = async (context) => {
  let space = context.params['space'];
  let traffic = context.params['traffic'];
  
  // Prepare workflow object to store API responses
  
  let workflow = {};

  console.log(`Running airtable.query[@0.1.1].update()...`);
  let select = {
    "Space": space
  };
  workflow.updateQueryResult = await lib.airtable.query['@0.1.1'].update({
    table: `Traffic`,
    where: select,
    fields: {
      'Space': space,
      'Traffic': traffic,
      'Time': new Date().toUTCString()
    }
  });

  return workflow;
};