const server = require("./app");

const { PORT = 9000 } = process.env;

console.log(process.env);

server.listen(PORT, () => {
  console.log(`Serving port http://localhost:${PORT}`);
});
