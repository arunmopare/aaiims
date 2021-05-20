// this helper will log everything to console

const production = false;
exports.logger = (message, data) => {
  if (!production) {
    console.log(message, data);
  }
};
