### 注意, image 文件下 只允许有主题文件夹 例如dark
### 主题文件夹 下面 只允许有 语言名称文件夹例如: zhCN

### 具体文件查找方法以及逻辑由 setups/getImgPath.js 实现

### 最重要的一点, 查找是由深到浅的, 如果当前主题为 dark, 语言为 zhCN, 文件为 1.png,那么只会找到 /image/dark/zh_CN/1.png, 而不会找到 /image/1.png (除非 /image/dark/zh_CN/ 下不存在1.png)

