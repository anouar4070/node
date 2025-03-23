//const http = require('http'); // Common JS
import * as http from "http"; // ES Module
import fs from "fs";
import path from 'path';


const server = http.createServer((req, res) => {
  if (req.url === "/products") {
    const productsFilePath = path.join(__dirname, "data", "products.json");

    fs.access(productsFilePath, err => {
      if(err){
        console.error("File does not exist or cannot be accessed:", productsFilePath);
        return;
      }
      fs.readFile(
        productsFilePath,
        "utf8",
        (err, data) => {
          //console.log("ERROR =>", err);
          res.writeHead(200, { "content-Type": "application/json" });
          console.log("DATA =>", JSON.parse(data));
          res.write(data);
          res.end();
        }
      );
    })
    

    console.log("Loading Data...");
  } else if (req.url === "/products/new") {
    res.writeHead(200, { "content-Type": "text/html" });
    res.write(`<html>
      <head>
      <title>Add New Product</title>
      </head>
      <body>
      <h2>Add New Product</h2>
      <form method="POST" action="/add-product>
      </form>
      </body>
      </html>`);
  }
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

// server.listen(PORT); // URL => http://localhost:5000 => Browser => compile => JS
// console.log(`Server running at => http://localhost:${PORT}`);

// export default server;
