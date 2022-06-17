const mongoose = require("mongoose");

const TelemetrySchema = new mongoose.Schema({
  device: {
    type: String,
    required: true,
  },
  temperature: {
    type: Number,
    default: 0,
  },
});

const Telemetry = mongoose.model("Telemetry", TelemetrySchema);

module.exports = Telemetry;