/** @format */

const { Kafka } = require('kafkajs');
const {
  SchemaRegistry,
  SchemaType,
} = require('@kafkajs/confluent-schema-registry');
const { generateTelemetry } = require('./test-data');

const publishTestRecords = ({ topic }) => {
  let interrupted = false;

  const interrupt = () => {
    interrupted = true;
  };

  process.on('SIGINT', interrupt);
  process.on('SIGHUP', interrupt);

  const main = async () => {
    // const registry = new SchemaRegistry({ host: "http://localhost:8081" });

    // const { id } = await registry.register({
    //   type: SchemaType.AVRO,
    //   schema: JSON.stringify(schema),
    // });

    const kafka = new Kafka({
      clientId: 'my-app',
      brokers: ['localhost:9093'],
    });

    const producer = kafka.producer();

    await producer.connect();
    let i = 0;
    while (!interrupted) {
      const payload = generateTelemetry();
      console.log(`publishing to ${topic}`, payload);
      const encodedValue = JSON.stringify(payload);
      await producer.send({
        topic,
        messages: [{ key: String(i), value: encodedValue }],
      });
      i++;
      await new Promise((resolve) => setTimeout(resolve, Math.random() * 5000));
    }
    await producer.disconnect();
  };

  main().catch((e) => {
    console.error(e);
    process.exit(1);
  });
};

// const telemetrySchema = {
//   type: "record",
//   name: "Telemetry",
//   namespace: "examples",
//   fields: [
//     { type: "string", name: "device" },
//     { type: "int", name: "temperature" },
//   ],
// };

publishTestRecords({
  topic: 'telemetry',
});
