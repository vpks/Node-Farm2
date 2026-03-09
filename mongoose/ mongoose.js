const mongoose = require('mongoose');

mongoose
  .connect(
    `mongodb+srv://vpks:m2f-2qsnHK-Lp!b@cluster0.jnwc5.mongodb.net/Natours?appName=Cluster0`,
  )
  // eslint-disable-next-line no-unused-vars
  .then((e) => {
    // console.log(e.modelNames());
  })
  // eslint-disable-next-line no-unused-vars
  .catch((err) => {
    // console.log(err);
  });
module.exports = mongoose;

// eslint-disable-next-line import/no-extraneous-dependencies

// const { MongoClient } = require('mongodb');

// const uri =
//   'mongodb+srv://vpks:m2f-2qsnHK-Lp!b@cluster0.jnwc5.mongodb.net/?appName=Cluster0';
// const client = new MongoClient(uri);

// async function run() {
//   try {
//     const mongoose = await client.connect();
//     return mongoose;
//     // Select Database and Collection
//     // const database = client.db('Natours');
//     // const collection = database.collection('Tours');
//   } finally {
//     // await client.close();
//   }
// }
// run()
//   .then((e) => {
//     module.exports = e;
//   })
//   .catch(console.dir);
