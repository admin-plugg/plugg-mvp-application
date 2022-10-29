import pg from "pg";

export default function verifyOrCreateSessionTable(dbCredentials) {
  const client = new pg.Client(dbCredentials);
  const selectQuery = {
    text: "SELECT * FROM pg_catalog.pg_tables WHERE tablename = $1",
    values: ["shopify_sessions"],
  };
  const createQuery = {
    text: `CREATE TABLE IF NOT EXISTS $1 (
      id varchar(255) NOT NULL PRIMARY KEY,
      shop varchar(255) NOT NULL,
      state varchar(255) NOT NULL,
      isOnline boolean NOT NULL,
      scope varchar(255),
      accessToken varchar(255)
    )`,
    values: ["shopify_sessions"],
  };
  console.log("Connecting...");
  client.connect();
  console.log("Connected.");
  client
    .query(selectQuery)
    .then((res) => {
      if (res.rowCount == 0) {
        client
          .query(createQuery)
          .then((res) => console.log(res))
          .catch((err) => console.error(err.stack));
      } else {
        console.log("Table already Exists!!");
      }
    })
    .finally(() => {
      console.log("Promise Setelled");
      client.end();
    });
}
