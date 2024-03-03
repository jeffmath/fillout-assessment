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
  const res = await superagent
    .get(`http://localhost:80/cLZojxk94ous/filteredResponses`)
    .query({
      filters: filters.map((filter) => JSON.stringify(filter)),
    });
  console.log(`Received response:\n${JSON.stringify(res.body, null, 2)}`);
}

void testFetchingResponses();