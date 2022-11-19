var couchbase = require("couchbase");

async function main() {
  const clusterConnStr = "couchbases://cb.5hpyveasfjwyafi.cloud.couchbase.com";
  const username = "mojak";
  const password = "Mojak_@1516";
  const bucketName = "travel-sample";

  const cluster = await couchbase.connect(clusterConnStr, {
    username: username,
    password: password,
    kvTimeout: 10000,
  });

  // Sets a pre-configured profile called "wanDevelopment" to help avoid latency issues
  // when accessing Capella from a different Wide Area Network
  // or Availability Zone (e.g. your laptop).
  //   cluster.applyProfile("wanDevelopment");

  const bucket = cluster.bucket(bucketName);

  // Get a reference to the default collection, required only for older Couchbase server versions
  const defaultCollection = bucket.defaultCollection();

  const collection = bucket.collection("users");

  const user = {
    type: 'user',
    name: 'Michael',
    email: 'michael123@test.com',
    interests: ['Swimming', 'Rowing'],
  }

  await collection.upsert()

  //   const user = {
  //     type: 'user',
  //     name: 'Michael',
  //     email: 'michael123@test.com',
  //     interests: ['Swimming', 'Rowing'],
  //   }

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
