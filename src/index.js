"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//const http = require('http'); // Common JS
var http = require("http"); // ES Module
var fs_1 = require("fs");
var path_1 = require("path");
var server = http.createServer(function (req, res) {
    if (req.url === "/products") {
        var productsFilePath_1 = path_1.default.join(__dirname, "data", "products.json");
        fs_1.default.access(productsFilePath_1, function (err) {
            if (err) {
                console.error("File does not exist or cannot be accessed:", productsFilePath_1);
                return;
            }
            fs_1.default.readFile(productsFilePath_1, "utf8", function (err, data) {
                //console.log("ERROR =>", err);
                res.writeHead(200, { "content-Type": "application/json" });
                console.log("DATA =>", JSON.parse(data));
                res.write(data);
                res.end();
            });
        });
        console.log("Loading Data...");
    }
    else if (req.url === "/products/new") {
        res.writeHead(200, { "content-Type": "text/html" });
        res.write("<html>\n      <head>\n      <title>Add New Product</title>\n      </head>\n      <body>\n      <h2>Add New Product</h2>\n      <form method=\"POST\" action=\"/add-product>\n      </form>\n      </body>\n      </html>");
    }
});
var PORT = 5000;
server.listen(PORT); // ** URL => http://localhost:5000 => Browser => compile => JS
console.log("Server running at => http://localhost:".concat(PORT));
exports.default = server;
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
