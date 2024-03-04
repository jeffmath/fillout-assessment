import * as superagent from "superagent";

async function testFetchingResponses() {
  const filters = [
    {
      id: "bE2Bo4cGUv49cjnqZ4UnkW",
      condition: "does_not_equal",
      value: "Jane",
    },
    // {
    //   id: "dSRAe3hygqVwTpPK69p5td",
    //   condition: "greater_than",
    //   value: "2021-08-22",
    // },
  ];
  // note that Railway only uses the Express server's port number internally,
  // so when employing the server's Railway domain name, the port number is not used
  // const hostName = "localhost:3000";
  const hostName = "fillout-assessment-production.up.railway.app";
  try {
    const res = await superagent
      .get(`http://${hostName}/cLZojxk94ous/filteredResponses`)
      .query({
        filters: filters.map((filter) => JSON.stringify(filter)),
      });
    console.log(`Received response:\n${JSON.stringify(res.body, null, 2)}`);
  } catch (err) {
    console.error(err);
  }
}

void testFetchingResponses();
