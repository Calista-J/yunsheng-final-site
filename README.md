# 云声载韵网页部署说明

这个目录已经整理成适合直接部署到静态托管平台的版本，推荐使用 Vercel。

## 为什么这样改

- 页面保留了图片和核心内容。
- 大体积本地视频不再直接打包进网页播放，避免部署失败或打开过慢。
- 报告、压缩包、视频等入口统一改成了外链配置，方便后续替换成网盘、OSS、COS、B 站或公众号文章链接。

## 上线前只需要改一个文件

编辑 `assets/site-config.js`，把下面这些 `"#"` 换成真实线上链接：

- `finalVideo`
- `mixVideo`
- `tweetVideo1`
- `tweetVideo2`
- `reportDocx`
- `reportPdf`
- `newsZip`
- `tweetZip`
- `finalZip`
- `authorizationImage`

示例：

```js
window.SITE_LINKS = {
  finalVideo: "https://example.com/final-video",
  mixVideo: "https://example.com/mix-video",
  tweetVideo1: "https://example.com/tweet-video-1",
  tweetVideo2: "https://example.com/tweet-video-2",
  reportDocx: "https://example.com/report.docx",
  reportPdf: "https://example.com/report.pdf",
  newsZip: "https://example.com/news.zip",
  tweetZip: "https://example.com/tweet.zip",
  finalZip: "https://example.com/final.zip",
  authorizationImage: "https://example.com/authorization.jpg"
};
```

## 推荐的外链放置方式

- 视频：B 站、腾讯视频、阿里云 OSS、腾讯云 COS、七牛云
- 文档和压缩包：腾讯微云、百度网盘直链、OSS、COS、学校服务器
- 授权截图：可以直接放在当前站点，也可以放图床

## 部署到 Vercel

1. 把 `web` 目录上传到一个 GitHub 仓库
2. 登录 Vercel
3. 选择 `Add New Project`
4. 导入该仓库
5. Root Directory 选择 `web`
6. 直接部署

部署完成后，Vercel 会给你一个可直接访问的公网链接。

## 当前目录中的大视频说明

`assets/media` 里如果还保留了本地大视频文件，它们不会再被网页直接引用。为了减小仓库体积，正式上传前建议把这些超大 mp4 移出部署仓库，只保留图片、HTML、CSS、JS 即可。
