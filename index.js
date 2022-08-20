const { fstat } = require('fs');
const http = require('http');
const fs = require('fs');
const port = 3000;
const ip = "192.168.50.211";

const sendResponse = (htmlFile,statusCode,response)=>{
    fs.readFileSync(htmlFile,(error,data)=>{
        if(error){
            response.statusCode = 500;
            response.setHeader('Content-Type', 'text/plain');
            response.end("Sorry, it's penguin's falt");
        }
        else{
            response.statusCode = statusCode;
            response.setHeader('Content-Type', 'text/html');
            response.end(data);

        }

    });
}



const server = http.createServer((require, response) => {
    const method = require.method;
    const url = require.url;
    const cliRequest = new URL(url,`http://${ip}:${port}`);
    if(method === "GET"){
        if(url==="/")
        {
            sendResponse("Web/Head/head.html",200,response);
        }
        else
        {
            sendResponse("Web/templeteFile/notFound.html",404,response);
        }
    }
    else
    {
        sendResponse("Web/templeteFile/notFound.html",404,response);
    }
});





server.listen(port,ip,()=>{
    console.log(`Server running at http://${ip}:${port}`);
});
