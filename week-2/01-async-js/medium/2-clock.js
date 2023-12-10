const clock = () => {
  const moment = require("moment");

  setInterval(() => {
    process.stdout.write("\x1Bc");
    console.log(moment().format("MM/DD/YYYY HH:mm:ss"));
  }, 1000);
};
clock();
