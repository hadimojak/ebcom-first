var couchbase = require("couchbase");

async function main() {
  const clusterConnStr = "192.168.120.126:8091/";
  const username = "root";
  const password = "123456";
  const bucketName = "default";

  // try {
  const cluster = await couchbase.connect(clusterConnStr, {
    username: username,
    password: password,
  });
  // } catch (error) {}

  const bucket = cluster.bucket(bucketName);
  const collection = bucket.collection("testUser");

  const result = await collection.get("user");
  console.log(result.content);

  // const user = {
  //   type: "user",
  //   name: "Michael",
  //   email: "michael123@test.com",
  //   interests: ["Swimming", "Rowing"],
  // };

  // await collection.upsert("user", testUser);

  // queryResult.rows.forEach((row) => {
  //   console.log(row);
  // });

  // const data = await collection.get("user");
  // console.log(data);

  //   // Create and store a document
  //   await collection.upsert('michael123', user)

  //   // Load the Document and print it
  //   // Prints Content and Metadata of the stored Document
  //   let getResult = await collection.get('michael123')
  //   console.log('Get Result: ', getResult)

  //   // Perform a N1QL Query
  //   const queryResult = await bucket
  //     .scope('inventory')
  //     .query('SELECT name FROM `airline` WHERE country=$1 LIMIT 10', {
  //       parameters: ['United States'],
  //     })
  //   console.log('Query Results:')
  //   queryResult.rows.forEach((row) => {
  //     console.log(row)
  //   })
}

// Run the main function
main()
  .catch((err) => {
    console.log("ERR:", err);
    process.exit(1);
  })
  .then(process.exit);
