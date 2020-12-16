const { rejects } = require('assert');
const fs = require('fs');
const path = require('path');
const defaultOrigin = `../../default/`;
const customOrigin = `../../customization/`;
const domainReg = /\/\/(.*?)\//;
// const filenameReg = /.*\/(.*?\.(html|css|js|png|jpg|jpeg|gif|woff|ttf|eot))/;
const  mimetypes = {
    'css': 'text/css',
    'less': 'text/css',
    'gif': 'image/gif',
    'html': 'text/html',
    'ico': 'image/x-icon',
    'jpeg': 'image/jpeg',
    'jpg': 'image/jpeg',
    'js': 'text/javascript',
    'json': 'application/json',
    'pdf': 'application/pdf',
    'png': 'image/png',
    'svg': 'image/svg+xml',
    'swf': 'application/x-shockwave-flash',
    'tiff': 'image/tiff',
    'txt': 'text/plain',
    'wav': 'audio/x-wav',
    'wma': 'audio/x-ms-wma',
    'wmv': 'video/x-ms-wmv',
    'xml': 'text/xml'
  };
const main = async ctx => {
    const config = global.config;
    const url = ctx.request.url;
    const domain = url.match(domainReg)[1];
    // const filename = url.match(filenameReg)[1];
    const filename = url.split(`//${domain}/`)[1];
    const fileType = filename.slice(filename.lastIndexOf('.')+1);
    ctx.response.type = mimetypes[fileType];
    const customPath = path.resolve(__dirname, `${customOrigin}${domain}/${filename}`);
    let rs = {};
    await new Promise((resolve,rejects) => {
        fs.access(customPath, fs.constants.F_OK, (err) => {
            try {
                rs = fs.createReadStream(err ? path.resolve(__dirname, `${defaultOrigin}${filename}`) : customPath);
                resolve(); 
            } catch (err) {
                rejects(err);
            }
        });
    });
    ctx.response.body = rs;
};
module.exports = main;