// eslint-disable-next-line import/no-dynamic-require
const fs = require('fs');

const tourModel = require('../../models/TourModel');

const data = JSON.parse(fs.readFileSync('./dev-data/data/tours-simple.json'));
//Import data from file to DB
const dataImport = async () => {
  try {
    await tourModel.create(data);
    process.exit();
  } catch (err) {
    console.log(err);
    process.exit();
  }
};

//delete data from db
const deleteMany = async () => {
  try {
    await tourModel.deleteMany();
    process.exit();
  } catch (err) {
    process.exit();
  }
};

if (process.argv[2] === '--import') {
  dataImport();
} else if (process.argv[2] === '--delete') {
  deleteMany();
}
