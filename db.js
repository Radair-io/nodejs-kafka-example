/** @format */

const mongoose = require('mongoose');
const telemetryModel = require('./models');

mongoose.connect('mongodb://localhost:27017/radairdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', function () {
  console.log('Connected successfully');
});

const insertTelemetry = async (data) => {
  mongoose.connect('mongodb://localhost:27017/radairdb', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const telemetry = new telemetryModel(data);
  console.log(telemetry);
  try {
    await telemetry.save();
  } catch (error) {
    console.log(error);
  }
};

const closeDbConnections = async () => {
  await db.close();
};

module.exports = {
  insertTelemetry,
  closeDbConnections,
};
