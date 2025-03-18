//const http = require('http'); // Common JS
import * as http from "http"; // ES Module

const server = http.createServer((req, res) => {
  res.writeHead(200, { "content-Type": "application/json" });

const data = {
  products: [
    {id: 1, title: "First product"},
    {id: 2, title: "second product"},
    {id: 3, title: "Third product"},
    {id: 4, title: "Fourth product"},
  ]
}

  res.write(JSON.stringify(data));
  res.end();
});

const PORT = 5000;

server.listen(PORT); // ** URL => http://localhost:5000 => Browser => compile => JS
console.log(`Server running at => http://localhost:${PORT}`);

export default server;


// //const http = require('http'); // Common JS
// import * as http from "http"; // ES Module

// const server = http.createServer((req, res) => {
//   // res.writeHead(200, {"content-Type": "text/plain"});
//   res.writeHead(200, { "content-Type": "text/html" });
//   res.write("<div style='background-color: red'><h1>HI, Anouar!</h1></div>");
//   res.end();
//   // res.end("<span>from end()</span>")
// });

// const PORT = 5000;

// server.listen(PORT); // ** URL => http://localhost:5000 => Browser => compile => JS
// console.log(`Server running at => http://localhost:${PORT}`);

// export default server;
