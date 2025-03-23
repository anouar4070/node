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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http = __importStar(require("http"));
const fs_1 = __importStar(require("fs"));
const path_1 = __importDefault(require("path"));
const server = http.createServer((req, res) => {
    var _a;
    // const productsFilePath = path.join(__dirname, "data", "products.json");
    const productsFilePath = path_1.default.join(process.cwd(), "src", "data", "products.json");
    // const assetsPath = path.join(__dirname, "assets");
    const assetsPath = path_1.default.join(process.cwd(), "src", "assets");
    if (req.url === "/products") {
        fs_1.default.access(productsFilePath, err => {
            if (err) {
                console.error("File does not exist or cannot be accessed:", productsFilePath);
                return;
            }
            fs_1.default.readFile(productsFilePath, "utf8", (err, data) => {
                const jsonProducts = JSON.parse(data);
                // ** Write into a file
                res.writeHead(200, { "Content-Type": "application/json" });
                console.log("DATA =>", jsonProducts);
                res.write(data);
                res.end();
            });
        });
    }
    else if (req.url === "/products/new") {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write(`<html>
            <head>
                <title>Add New Product</title>
            </head>
            <body>
                <h2>Add New Product</h2>
                <form method="POST" action="/add-product">
                    <label for="title">Title:</label><br>
                    <input type="text" id="title" name="title" required ><br><br>
                    <label for="title">Description:</label><br>
                    <textarea type="text" id="description" name="description" required></textarea>
                    <br><br>
                    <button type="submit">Add Product</button>
                </form>
            </body>
            </html>`);
        res.end();
    }
    else if (req.url === "/") {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end("<h1>Welcome back!</h1>");
    }
    else if (req.method === "POST" && req.url === "/add-product") {
        let body = "";
        req.on("data", chunk => {
            body += chunk.toString();
        });
        req.on("end", () => __awaiter(void 0, void 0, void 0, function* () {
            const data = new URLSearchParams(body);
            const title = data.get("title");
            const description = data.get("description");
            try {
                const jsonData = yield fs_1.promises.readFile(productsFilePath, "utf8");
                const jsonProducts = JSON.parse(jsonData);
                jsonProducts.products.push({
                    id: jsonProducts.products.length + 1,
                    title: title,
                    description: description,
                });
                const updatedData = JSON.stringify(jsonProducts, null, 2);
                yield fs_1.promises.writeFile(productsFilePath, updatedData, { flag: "w" });
            }
            catch (error) {
                console.log(error);
            }
            res.writeHead(200, { "Content-Type": "text/html" });
            res.write(`<div>
        <h1>Product has been added!</h1>
        <h2>Title: ${title}</h2>
        <p>Description: ${description}</p>
      </div>`);
            res.end();
        }));
    }
    else if (req.method === "GET" && req.url === "/assets") {
        fs_1.default.access(assetsPath, err => {
            if (err) {
                console.error("File does not exist or cannot be accessed:", productsFilePath);
                return;
            }
            fs_1.default.readdir(assetsPath, (err, files) => {
                if (err) {
                    console.error(err);
                    return;
                }
                res.writeHead(200, { "Content-Type": "text/html" });
                res.write("<h1>Here are your assets:</h1>");
                res.write("<ul>");
                files.forEach(file => {
                    res.write(`<li><a href="/delete?file=${encodeURIComponent(file)}">${file}</a></li>`);
                });
                res.write("</ul>");
                res.end();
            });
        });
    }
    else if (req.method === "GET" && ((_a = req.url) === null || _a === void 0 ? void 0 : _a.startsWith("/delete"))) {
        const file = decodeURIComponent(req.url.split("?")[1].split("=")[1]);
        const assetsPath = path_1.default.join(process.cwd(), "src", "assets", file);
        // ** TODO: check if the file exists (use fs.access())
        fs_1.default.unlink(assetsPath, err => {
            if (err) {
                console.error(err);
                return;
            }
            res.writeHead(200, { "Content-Type": "text/html" });
            res.write(`<div>
        <h1>File ${file} has been deleted!</h1>
      </div>`);
            res.end();
        });
    }
    else {
        res.writeHead(404, { "Content-Type": "text/html" });
        res.end("<h1>Not found!</h1>");
    }
});
const PORT = 5000;
server.listen(PORT, () => {
    console.log(`Server running at => http://localhost:${PORT}`);
});
