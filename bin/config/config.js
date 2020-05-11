const dotenv = require('dotenv');
const result = dotenv.config();

if (result.error) {
  console.log("Error has occured, ", result.error);
}


const { parsed: envs } = result;
module.exports = envs;