const { Kafka } = require("kafkajs");
const { SchemaRegistry } = require("@kafkajs/confluent-schema-registry");
const { insertTelemetry, closeDbConnections } = require("./db");

const main = async () => {
  // const registry = new SchemaRegistry({ host: "http://localhost:8081" });

  const kafka = new Kafka({
    clientId: "my-app",
    brokers: ["localhost:9093"],
  });

  const consumer = kafka.consumer({ groupId: "test-telemetry" });

  await consumer.connect();
  await consumer.subscribe({ topic: "telemetry", fromBeginning: true });

  const shutdown = async () => {
    await consumer.disconnect();
    await closeDbConnections();
  };

  process.on("SIGINT", shutdown);
  process.on("SIGHUP", shutdown);

  await consumer.run({
    eachMessage: async ({ message }) => {
      const telemetry = JSON.parse(message.value);
      await insertTelemetry(telemetry);
      console.log(telemetry);
    },
  });
};

main().catch((e) => {
  console.error(e);
  process.exit(1);
});