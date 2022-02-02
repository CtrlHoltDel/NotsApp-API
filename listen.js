const app = require("./app");

const { PORT = 3000 } = process.env;

console.log(PORT, "<<<");

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
