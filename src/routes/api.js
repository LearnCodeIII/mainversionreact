var express = require('express')
var router = express.Router()
var uuidv4 = require('uuid/v4')
var bodyParser = require('body-parser')
var multer = require('multer') //檔案上傳套件
// var upload = multer({ dest: 'public/uploads/' })//設定檔案儲存位置(但無法設定檔名)
const upload = multer({ dest: 'temp_uploads' }) //設定上傳的暫存目錄(直接放資料夾名稱，代表是此專案中的該資料夾)
const fs = require('fs') //處理檔案的核心套件

// var storage = multer.diskStorage({
//   //以此方式設定檔案名稱及路徑
//   destination: function(req, file, cb) {
//     cb(null, 'public/uploads/')
//   },
//   filename: function(req, file, cb) {
//     cb(null, file.originalname)
//   },
// })
// var upload = multer({ storage: storage })

//將body-parser設定成頂層middleware，因放在所有route之前，故會對所有route作用
//查看HTTP HEADER的Content-Type:如果是application/x-www-form-urlencoded，就以此方法解析
router.use(bodyParser.urlencoded({ extended: false }))
//查看HTTP HEADER的Content-Type:如果是application/json，就以此方法解析
router.use(bodyParser.json())

//http://localhost:3000/api 測試node連結成功地址
router.get('/', function(req, res, next) {
  res.send('api')
})

//檔案上傳簡單範例
//http://localhost:3000/api/upload
// router.post('/upload', upload.single('myfile'), function(req, res, next) {
//   // req.file is the `avatar` file
//   // req.body will hold the text fields, if there were any
//   res.send(req.file)
// })

//會員檔案上傳(single)
router.post('/member-upload-single', upload.single('myfile'), (req, res) => {
  console.log(req.file)
  let ext = ''
  let finalname = uuidv4()
  const result = {
    success: false,
    info: '',
    filename: '',
  }
  if (req.file && req.file.originalname) {
    //判斷檔案屬性及檔案名稱是否為空
    switch (req.file.mimetype) {
      case 'image/png':
        ext = '.png'
      case 'image/jpeg':
        if (!ext) {
          ext = '.jpg'
        }
        fs.createReadStream(req.file.path).pipe(
          fs.createWriteStream(
            __dirname + '/../../public/images/member/' + finalname + ext
          )
        )

        res.json({
          success: true,
          filename: finalname + ext,
        })
        return
      default:
        result.info = '檔案格式不符，請重新選擇 !'
    }
  } else {
    result.info = '沒有選擇檔案'
  }
  res.json(result)
})

//戲院檔案上傳(single)
router.post('/cinema-upload-single', upload.single('myfile'), (req, res) => {
  console.log(req.file)
  let ext = ''
  let finalname = uuidv4()
  const result = {
    success: false,
    info: '',
    filename: '',
  }
  if (req.file && req.file.originalname) {
    //判斷檔案屬性及檔案名稱是否為空
    switch (req.file.mimetype) {
      case 'image/png':
        ext = '.png'
      case 'image/jpeg':
        if (!ext) {
          ext = '.jpg'
        }
        fs.createReadStream(req.file.path).pipe(
          fs.createWriteStream(
            __dirname + '/../../public/images/cinemaImg/' + finalname + ext
          )
        )

        res.json({
          success: true,
          filename: finalname + ext,
        })
        return
      default:
        result.info = '檔案格式不符，請重新選擇 !'
    }
  } else {
    result.info = '沒有選擇檔案'
  }
  res.json(result)
})

module.exports = router
