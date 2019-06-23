const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});
/**
* An HTTP endpoint that acts as a webhook for HTTP request event
* @returns {object} workflow The result of your workflow steps
*/
module.exports = async (context) => {
  let room = context.params['room'];
  let taken = context.params['taken'];
  
  // Prepare workflow object to store API responses
  
  let workflow = {};

  console.log(`Running airtable.query[@0.1.1].update()...`);
  let select = {
    "Room": room
  };
  workflow.updateQueryResult = await lib.airtable.query['@0.1.1'].update({
    table: `Rooms`,
    where: select,
    fields: {
      'Room': room,
      'Taken': taken,
      'Time': new Date().toUTCString()
    }
  });

  return workflow;
};