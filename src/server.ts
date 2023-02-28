import * as fs from "fs";
import * as http from "http";

const PORT = 3000;

const server = http.createServer((req, res) => {
    console.log(`adres: ${req.url}`);

    let extension = req.url!.split(".")[req.url!.split(".").length - 1];
    let knownExtensions = ["css", "js", "html"];
    if (knownExtensions.includes(extension)) {
        fs.readFile("static" + req.url, function (error, data) {
            res.writeHead(200, { 'Content-Type': getExtensionType(extension) });
            res.write(data);
            res.end();
        })
    } else {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.write("<h1>ERROR 404<h1>");
        res.end();
    }
})


const { Server } = require("socket.io");
const socketio = new Server(server);

socketio.on('connection', (client: any) => {
    console.log("ASDASDASD");

    console.log(client);

    console.log("klient się podłączył z id = ", client.id)
    // client.id - unikalna nazwa klienta generowana przez socket.io
});

function getExtensionType(extension: string) {
    switch (extension) {
        case "css":
            return "text/css";
        case "js":
            return "text/javascript";
        case "html":
            return "text/html";
        default:
            return "text/plain";
    }
}

server.listen(PORT, () => {
    console.log(`serwer startuje na porcie ${PORT}`)
});