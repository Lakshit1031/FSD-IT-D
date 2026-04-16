import http from "http";
import url from "url";

const server = http.createServer((req, res) => {
    if (req.url === "/favicon.ico") return;
    const myURL = url.parse(req.url, true);
    console.log(myURL);

    switch (myURL.pathname) {
        case "/":
            res.end("Home Page");
            break;
        case "/login":
            res.end(`Hii ${myURL.query.name}`);
            break;
        case "/products":
            res.end("products");
            break;
        case "/cart":
            res.end("cart")
            break;
        default:
            res.end("page not found");
    }
})

server.listen(8800, () => console.log(`server is running at http://localhost:8800`))