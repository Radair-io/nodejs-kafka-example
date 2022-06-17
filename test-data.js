/** @format */

const { faker } = require('@faker-js/faker');

const devices = [
  'hYTBROF02MTGHn0P8T1z',
  'Egg8e8UaVJyLpXVyF5G7',
  'p0Unzqi7StE6GQd6YkEo',
];

const generateTelemetry = () => {
  return {
    device: 'hYTBROF02MTGHn0P8T1z',
    temperature: Math.floor(Math.random() * 35 + 1),
  };
};

module.exports = {
  generateTelemetry,
};
