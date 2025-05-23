
import https from 'https'
import fs, {createWriteStream} from 'node:fs'
import {promisify} from 'node:util'
const pipeline = promisify(require("node:stream").pipeline);

export async function httpsDownload(url:string, outputPath:string) {
  const tempPath = outputPath + ".temp";
  return new Promise((resolve, reject) => {
    const request = https.get(url, { headers: { "User-Agent": "Node.js-Downloader" } }, (res) => {
      if(!res.statusCode) return reject(new Error("下载失败，未获取到响应"))
      // 处理重定向（3xx 状态码）
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return httpsDownload(res.headers.location, outputPath).then(resolve).catch(reject);
      }

      // 非 200 状态码视为失败
      if (res.statusCode !== 200) {
        return reject(new Error(`下载失败，状态码: ${res.statusCode}`));
      }

      // 流式写入临时文件
      const fileStream = createWriteStream(tempPath);
      pipeline(res, fileStream)
        .then(async () => {
          // 非 Windows 系统设置权限
          if (process.platform !== "win32") {
            await promisify(fs.chmod)(tempPath, 0o755);
          }
          // 重命名为目标文件
          await promisify(fs.rename)(tempPath, outputPath);
          resolve("下载成功");
        })
        .catch(reject);
    });

    // 处理请求错误
    request.on("error", reject);
  });
}