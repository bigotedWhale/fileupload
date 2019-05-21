const router = require('koa-router')()
const multer = require('koa-multer')
const path = require('path')

router.prefix('/upload')

//文件上传
//配置
var storage = multer.diskStorage({
  //文件保存路径
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/')
  },
  //修改文件名称
  filename: function (req, file, cb) {
    var fileFormat = (file.originalname).split(".");  //以点分割成数组，数组的最后一项就是后缀名
    cb(null,Date.now() + "." + fileFormat[fileFormat.length - 1]);
  }
})
//加载配置
var upload = multer({ storage: storage });
//路由
router.post('/', upload.single('file'), async(ctx,next)=>{
  ctx.body = {
    filename: ctx.req.file.filename//返回文件名
  }
})

module.exports = router
