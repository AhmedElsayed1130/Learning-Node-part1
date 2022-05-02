const fs = require("fs")

// a function that reads an html page from my device as a stream and push it into an array
function readHtml(fileName) {
    const htmlPage = [] 
    // opens a read stream for the page
    let myReadStream = fs.createReadStream(__dirname+`/${fileName}.html` , "utf8")
    // make a promise since stream reading will be sync so i need to resolve the file after adding it 
    return new Promise((resolve,reject)=>{
        // reads the data and push it into an array
        myReadStream.on("data",(chunck)=>{
        htmlPage.push(chunck)
        })
        myReadStream.on("end",()=>{
        resolve(htmlPage)
        }) 
    })    
}
// a function that reads an javascript file from my device as a stream and push it into an array
const readJs = (fileName)=>{
    const js = [] 
    var myReadStream = fs.createReadStream(__dirname+`/js/${fileName}.js` , "utf8")
    return new Promise((resolve,reject)=>{
        myReadStream.on("data",(chunck)=>{
        js.push(chunck)
        })
        myReadStream.on("end",()=>{
            resolve(js)
        }) 
    })   
}
// a function that reads an css file from my device as a stream and push it into an array
const readCss = (fileName)=>{
    const css = [] 
    var myReadStream = fs.createReadStream(__dirname+`/css/${fileName}.css` , "utf8")
    return new Promise((resolve,reject)=>{
        myReadStream.on("data",(chunck)=>{
        css.push(chunck)
        })
        myReadStream.on("end",()=>{
            resolve(css)
        }) 
    })   
}
// a function that parse the request body and push it into an array
const readRequests = (request)=>{
    const body = []
    return new Promise((resolve,reject)=>{
        request.on("data",(chunck)=>{
            body.push(chunck)
        })
        request.on("end",()=>{
            resolve(body)
        })
    })
}
// writes data to data.txt file
const writeToDisk = (data)=>{
    // since the inputs are username , email and password 
    fs.appendFileSync("data.txt",data[0].split("=")[1])  
    fs.appendFileSync("data.txt","\t") 
    fs.appendFileSync("data.txt",data[1].split("=")[1])
    fs.appendFileSync("data.txt","\t") 
    fs.appendFileSync("data.txt",data[2].split("=")[1])   
    fs.appendFileSync("data.txt","\n") 
} 

// routing function. is called every time a request is reached to the server
const requestHandler = (request,response) =>{
    let url = request.url
    switch(url){
        case "/" : 
        // after getting the html page it's piped to the resolve function where we set header and
        // write data to the response of the request
            readHtml("login").then((html)=>{
                response.setHeader("Content-Type","text/html")
                response.write(html.toString())
                response.end()
                })
        break;
        case "/css/new.css" :
            readCss("new").then((html)=>{
                response.setHeader("Content-Type","text/css")
                response.write(html.toString())
                response.end()
                })
        break;
        case "/css/bootstrap.css" :
            readCss("bootstrap").then((html)=>{
                response.setHeader("Content-Type","text/css")
                response.write(html.toString())
                response.end()
                })
        break;
        case "/css/responsive.css" :
            readCss("responsive").then((html)=>{
                response.setHeader("Content-Type","text/css")
                response.write(html.toString())
                response.end()
                })
        break;
        case "/css/style.css" :
            readCss("style").then((html)=>{
                response.setHeader("Content-Type",)
                response.write(html.toString())
                response.end()
                })
        break;
        case "/js/bootstrap.js" :
            readJs("bootstrap").then((html)=>{
                response.setHeader("Content-Type","application/javascript")
                response.write(html.toString())
                response.end()
                })
        break;
        case "/js/jquery-3.4.1.min.js" :
            readJs("jquery-3.4.1.min").then((html)=>{
                response.setHeader("Content-Type","application/javascript")
                response.write(html.toString())
                response.end()
                })
        break;
        case "/register.html":
            readHtml("register").then((html)=>{
                response.setHeader("Content-Type","text/html")
                response.write(html.toString())
                response.end()
            })
        break;
        case "/index.html":
            readRequests(request).then((body)=>{
                const parsedBody = Buffer.concat(body).toString();
                let content1 = parsedBody.split("&")
                writeToDisk(content1)
            }).then(()=>{
            readHtml("index").then((html)=>{
                response.setHeader("Content-Type","text/html")
                response.write(html.toString())
                response.end()
                })
            })
            



            // readHtml("index").then((html)=>{
            //     response.setHeader("Content-Type","text/html")
            //     response.write(html.toString())
            //     response.end()
            // })
        break;
    } 
}

module.exports = {
    handler:requestHandler,
    read:readHtml
}