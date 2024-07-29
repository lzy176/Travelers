"use strict"
const http = require('http');
const path = require('path');
const fs = require('fs');
const multiparty = require('multiparty');
const UPLOAD_DIR = path.resolve(__dirname, '.', 'files') // 准备好地址用来存切片
const server = http.createServer(async (req, res) => {
  // // 简单cors
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  // 请求预检
  if (req.method === 'OPTIONS') {
    res.status = 200
    res.end('预检通过')
    return
  }
  if (req.url === '/upload') {
    const form = new multiparty.Form();

    form.parse(req, (err, fields, files) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Server Error');
        return;
      }

      // console.log('Fields:', fields); // 打印出表单的文本字段
      // console.log('Files:', files); // 打印出上传的文件
      if (!fs.existsSync(UPLOAD_DIR)) {
        fs.mkdirSync(UPLOAD_DIR);
      };
      const file = files.file[0];
      const fileName = fields.chunkName[0]
      const suffix = file.originalFilename.split('.').pop();

      const newPath = './files/' + fileName;

      // 将文件移动到新的位置
      fs.rename(file.path, newPath, (err) => {
        if (err) {
          res.writeHead(500, { 'Content-Type': 'text/plain' });
          res.end('Server Error');
          return;
        }
        res.end('File uploaded');
      });
    });
  }
  if (req.url === '/merge') {
    const { fileName, size } = await resolvePost(req);
    mergeFileChunks('./files/', fileName, size)
  }

});
const resolvePost = (req) => {
  return new Promise((resolve, reject) => {
    let chunk = ''  // 参数数据包
    req.on('data', (data) => {
      chunk += data
    })
    req.on('end', () => {
      resolve(JSON.parse(chunk))
    })
  })
}
const pipeStream = (filePath, writeStream) => {
  return new Promise((resolve, reject) => {
    const readStream = fs.createReadStream(filePath)
    readStream.on('end', () => {
      fs.unlinkSync(filePath) // 移除切片
      resolve()
    })
    readStream.pipe(writeStream) // 将切片读成流汇入到可写流中
  })
}
const mergeFileChunks = (filePath, fileName, size) => {
  // 读取filePath下所有的切片
  fs.readdir(filePath, (err, chunks) => {
    const chunkFiles = chunks.filter(file => file.startsWith(fileName)).sort((a, b) => a.split('-')[1] - b.split('-')[1]);
    const arr = chunkFiles.map((chunkPath, index) => {
      return pipeStream(
        path.resolve(filePath, chunkPath),
        fs.createWriteStream( // 合并地点
          path.resolve(filePath, fileName),
          {
            start: index * size,  // 0 - 2M, 2M - 4M, ……
          }
        )
      )
    })
  }) // 读文件夹的所有文件
}


server.listen(3000, () => {
  console.log('Server is running at http://localhost:3000');
});
