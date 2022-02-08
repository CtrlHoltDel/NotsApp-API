const server = require("./app");

const PORT = 5000;

server.listen(PORT, () => {
  console.log(`Serving port http://localhost:${PORT}`);
});
