
import { access, chmod, mkdir, rename } from 'node:fs/promises'
import path from 'node:path'
import { $ } from 'zx'
import { httpsDownload } from '../main/httpsDownload'

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

async function downloadLatestVersion(ytDlpPath) {
  return new Promise((resolve, reject) => {
   
    httpsDownload(downloadUrl, ytDlpPath).then(() => {
      console.log('下载成功')
      resolve('下载成功')
    }).catch((error) => {
      console.error('下载失败:', error)
      reject(error)
    })
  }).catch((error) => {
    console.error('下载失败:', error)
  })
}
