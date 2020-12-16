const fs = require('fs');
const path = require('path');
const Koa = require('koa');
const app = new Koa();

const main = async ctx => {
  ctx.response.type = 'html';
  const customPath = path.resolve(__dirname,'../customization/xaac/temp01.html');
  let rs = {};
  await new Promise((resolve)=>{
    fs.access(customPath,fs.constants.F_OK,(err)=>{
      rs = fs.createReadStream(err ? path.resolve(__dirname,'../default/temp.html'):customPath);
      resolve();
    });
  });
  ctx.response.body = rs;
};

app.use(main);
app.listen(3000);
