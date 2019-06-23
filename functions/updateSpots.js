const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});
/**
* An HTTP endpoint that acts as a webhook for HTTP request event
* @returns {object} workflow The result of your workflow steps
*/
module.exports = async (context) => {
  let spot= context.params['spot'];
  let people= context.params['people'];
  
  // Prepare workflow object to store API responses
  
  let workflow = {};

  console.log(`Running airtable.query[@0.1.1].update()...`);
  let select = {
    "Spot": spot
  };
  workflow.updateQueryResult = await lib.airtable.query['@0.1.1'].update({
    table: `Spots`,
    where: select,
    fields: {
      'Spot': spot,
      'People': people,
      'Time': new Date().toUTCString()
    }
  });

  return workflow;
};