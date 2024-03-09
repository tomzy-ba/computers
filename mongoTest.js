#! /usr/bin/env node

console.log(
  'This script populates some test books, authors, genres and bookinstances to your database. Specified database as argument - e.g.: node populatedb "mongodb+srv://cooluser:coolpassword@cluster0.lz91hw2.mongodb.net/local_library?retryWrites=true&w=majority"'
);

// Get arguments passed on command line
const userArgs = process.argv.slice(2);

const Part = require("./models/part");
const Brand = require("./models/brand");

const parts = [];
const brands = [];

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const mongoDB = userArgs[0];

main().catch((err) => console.log(err));

async function main() {
  console.log("Debug: About to connect");
  await mongoose.connect(mongoDB);
  console.log("Debug: Should be connected?");
  await partCreate("nvidia RTX 4080", "GPU", "Nvidia");
  console.log("Debug: Closing mongoose");
  mongoose.connection.close();
}

// We pass the index to the ...Create functions so that, for example,
// genre[0] will always be the Fantasy genre, regardless of the order
// in which the elements of promise.all's argument complete.
async function partCreate(name, type, brand) {
  const part = new Part({
    name: name,
    type: type,
    brand: brand._id,
  });
  await part.save();
  part[index] = part;
  console.log(`Added Part: ${name}`);
}

async function brandCreate() {
  const brand = new Brand({
    name: "Nvidia",
    location: "US",
  })
}
