import axios from 'axios'
import { createWriteStream } from 'node:fs'
import { access, chmod, mkdir, rename } from 'node:fs/promises'
import path from 'node:path'
import { $ } from 'zx'
import { pipeline as streamPipeline } from 'node:stream/promises'
import got from 'got'
import fs from 'node:fs'
import stream from 'node:stream'
// import https from 'https'

const platform = process.platform
const isWindows = platform === 'win32'
const fileName = isWindows ? 'yt-dlp.exe' : 'yt-dlp'
const libPath = process.resourcesPath + '/lib'
const downloadUrl = isWindows
  ? 'https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp.exe'
  : 'https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp'
// 判断libPath目录是否存在
const libPathExists = async () => {
  try {
    await access(libPath)
  } catch (error) {
    // 不存在则创建
    await mkdir(libPath)
  }
}

const ytDlpPath = path.resolve(libPath, fileName)

// 判断lib目录下ytdlp是否存在
export async function checkYtdlp() {
  //   准确获取 yt-dlp 路径
  //   const ytDlpPath = isWindows
  //    ? process.resourcesPath + '\\lib\\' + fileName
  //    : process.resourcesPath + '/lib/' + fileName

  console.log('🚀 ~ checkYtdlp ~ process.resourcesPath:', ytDlpPath)
  try {
    await libPathExists()
    await access(ytDlpPath)
    await downloadLatestVersion(ytDlpPath)
    return ytDlpPath
  } catch (error) {
    // 下载最新的 yt-dlp
    console.log(error)
    await downloadLatestVersion(ytDlpPath)
    return ytDlpPath
  }
}
checkYtdlp()
// 下载最新的 yt-dlp
async function downloadLatestVersion(ytDlpPath) {
  return new Promise((resolve, reject) => {
    streamPipeline(got.stream(downloadUrl), fs.createWriteStream(ytDlpPath))
      .then(() => {
        console.log('下载完成')

        resolve(ytDlpPath)
        if (!isWindows) {
          chmod(fileName, 0o755)
        }
      })
      .catch((error) => {
        console.error('下载失败:', error)
        reject(error)
      })
  }).catch((error) => {
    console.error('下载失败:', error)
  })
}
