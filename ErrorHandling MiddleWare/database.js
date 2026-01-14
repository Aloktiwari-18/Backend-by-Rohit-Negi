// const url="mongodb+srv://Aloktiwari:Alok0018@codingadda.dfgpfuy.mongodb.net/"
const { MongoClient } = require('mongodb');
// or as an es module:
// import { MongoClient } from 'mongodb'

// Connection URL
const url="mongodb+srv://Aloktiwari:Alok0018@codingadda.dfgpfuy.mongodb.net/"

const client = new MongoClient(url);

// Database Name
const dbName = 'CoderArmy';

async function main() {
  // Use connect method to connect to the server
  await client.connect();
  console.log('Connected successfully to server');
  const db = client.db(dbName);
  const collection = db.collection('user');

  // the following code examples can be pasted here...
//   const findResult = collection.find({});

//   for await(const obj of findResult)
//   console.log(obj);
//   console.log('Found documents =>', findResult);
     

 // Add document 
// const insertResult = await collection.insertOne({name:"Aman",age:23,city:"Bhadohi"});
// console.log('Inserted documents =>', insertResult);

// Update Document 

 
  return 'done.';
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());