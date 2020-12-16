const fs = require("fs");
const path = require('path');
const toml = require('toml');
const serve = require('koa-static')
const concat = require('concat-stream');
const resourceProxy = require('./middleware/resourceProxy');
const Koa = require('koa');
const app = new Koa();
const result = async function(){
    var files = await new Promise(resolve=>{
        fs.createReadStream(path.resolve(__dirname,'../configuration.toml'), 'utf8').pipe(concat(function(data) {
            var parsed = toml.parse(data);
            resolve(parsed)
        }));
    })
    global.config = files; //加到node全局变量中，便于全局访问
};


const initServer = async ()=>{
    await result();
    app.use(resourceProxy);
    app.listen(3000);
}
initServer();