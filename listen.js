const app = require("./app");

const { PORT = 9000 } = process.env;

app.listen(PORT, () => {
  console.log(`App open at http://localhost:${PORT}`);
});
