const fs = require("fs");
const http = require("http");
const url = require("url");
const templateReplace = require("./module/replaceTemplate");

//blocking code
// const textIn = fs.readFileSync("./txt/input.txt", "utf-8");

// console.log(textIn);

// const textOut = `this is what we know about avagado..:${textIn}.\n created on ${Date()}`;

// fs.writeFileSync("./txt/output.txt", textOut);

// console.log("file written successfully");

// ----->>>>>>>>>>>>>-----------------

//non-blocking code
// fs.readFile("./txt/input.txt", "utf-8", (err, data) => {
//   console.log(data);
// });

// console.log("reading data async..");

// server...

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataParsedJson = JSON.parse(data);
// console.log(dataParsedJson);

const overView = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  "utf-8"
);
const product = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  "utf-8"
);
const card = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  "utf-8"
);

// replace funtion for template replaceall
// function templateReplace(templatecard, el) {
//   let output = templatecard.replace(/{%PRODUCTNAME%}/g, el.productName);
//   output = output.replace(/{%IMAGE%}/g, el.image);
//   output = output.replace(/{%QUANTITY%}/g, el.quantity);
//   output = output.replace(/{%PRICE%}/g, el.price);
//   output = output.replace(/{%ID%}/g, el.id);
//   output = output.replace(/{%PRODUCTDESC%}/g, el.description);

//   if (el.organic) {
//     output = output.replace(/{%NOT_ORGANIC%}/g, "");
//   } else output = output.replace(/{%NOT_ORGANIC%}/g, "not-organic");
//   output = output.replace(/{%NUTRIENTS%}/g, el.nutrients);
//   output = output.replace(/{%FROM%}/g, el.from);

//   return output;
// }

const server = http.createServer((req, res) => {
  //   console.log(req.url);
  //   const pathName = req.url;
  let { query, pathname } = url.parse(req.url, true);

  //overview
  if (pathname === "/" || pathname === "/overview") {
    res.writeHead(200, {
      "content-type": "text/html",
    });
    let replacedHtml = dataParsedJson
      .map((el) => {
        return templateReplace(card, el);
      })
      .join("");

    // console.log(replacedHtml);
    replacedHtml = overView.replace("{%PRODUCT_CARDS%}", replacedHtml);
    res.end(replacedHtml);
  }
  //product
  else if (pathname === "/product") {
    res.writeHead(200, {
      "content-type": "text/html",
    });
    let productTemplate = templateReplace(
      product,
      dataParsedJson.find((el) => {
        if (el.id == query.id) {
          return el;
        }
      })
    );
    res.end(productTemplate);
  } else if (pathname === "/api") {
    // res.end("api");
    res.writeHead(200, {
      "content-type": "application/json",
    });
    res.end(data);
  } else {
    console.log(req);
    res.writeHead(404, {
      "content-type": "text/html",
    });
    res.end("<h1>page not found</h1>");
  }
});

server.listen(8000, "127.0.0.1", () => {
  console.log("server started...");
});
