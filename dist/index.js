"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
//const http = require('http'); // Common JS
const http = __importStar(require("http")); // ES Module
const server = http.createServer((req, res) => {
    res.writeHead(200, { "content-Type": "application/json" });
    const data = {
        products: [
            { id: 1, title: "First product" },
            { id: 2, title: "second product" },
            { id: 3, title: "Third product" },
            { id: 4, title: "Fourth product" },
        ]
    };
    res.write(JSON.stringify(data));
    res.end();
});
const PORT = 5000;
server.listen(PORT); // ** URL => http://localhost:5000 => Browser => compile => JS
console.log(`Server running at => http://localhost:${PORT}`);
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
// server.listen(PORT); // ** URL => http://localhost:5000 => Browser => compile => JS
// console.log(`Server running at => http://localhost:${PORT}`);
// export default server;
