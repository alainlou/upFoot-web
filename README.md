# upFoot-web

This is an web service built with Standard Library for our foot traffic [IoT sensor](https://github.com/alainlou/upFoot-IoT). It takes HTTP requests from our device to update our Airtable (our primary data store).

| HTTP Method | Path | Query Params | Return Value |
| ----------- | ---- | ------------ | ------------ |
| `*` | /update | space, traffic | Update traffic conditions for a given space
| `*` | /updateRooms | room, taken | Update if a room is taken
| `*` | /updateSpots | spot, people | Update people count for a given spot

Slack webhooks are injested by functions under functions/events/slack/command for querying the data in the Airtable.
