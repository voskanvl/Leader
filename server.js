import * as http from "http";

http.createServer((req, res) => {
    res.end("I'm alive!");
}).listen(8080);
