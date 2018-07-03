# 公司3D地图组件开发

## 项目获取

- 修改本地`npm`源

```
## 如果在外网或者在内网已经做过则省略此步骤
npm config set registry=http:192.168.9.19:4873
```

- 获取`npm`包

```
cd jscmapgl
npm install
## 如果在内网获取失败则可能是服务挂了，请联系宋乾坤排查
```

## 项目使用

```
## 启动 map 层开发
npm run dev_map

## 启动交互层开发
npm run dev

## 在dist目录生成编译后的工具包
npm run build
```
