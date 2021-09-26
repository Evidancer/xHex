'use strict';
const fs = require('fs');
module.exports = function (req, res) {
    let path;
    switch (req.url) {
        case "/" || "/index":
            path = "public/index.html";
            break;
        default:
            path = req.url.substr(1);
    }

    if(path.substr(0, 6) != "public") {
        notFound(res);
        return;
    }

    fs.access(path, fs.constants.F_OK, (err)=>{
        if(err) {
            notFound(res);
            return;
        }
        res.statusCode=200;
        fs.createReadStream(path).pipe(res);
    })
}

function notFound(res) {
    res.statusCode = 404;
    res.end("PAGE NOT FOUND");
    return;
}