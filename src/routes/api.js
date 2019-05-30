var express = require('express')
var router = express.Router()
var uuidv4 = require('uuid/v4')
var bodyParser = require('body-parser')
var multer = require('multer') //檔案上傳套件
// var upload = multer({ dest: 'public/uploads/' })//設定檔案儲存位置(但無法設定檔名)
const upload = multer({ dest: 'temp_uploads' }) //設定上傳的暫存目錄(直接放資料夾名稱，代表是此專案中的該資料夾)
const fs = require('fs') //處理檔案的核心套件
var nodemailer = require('nodemailer') // Mail模組
var cors = require('cors')

//設定cors跨網域資料來源白名單
var whitelist = [
  'http://localhost:3000',
  'http://192.168.27.51:3000',
  undefined,
]
//設定白名單(除此名單以外皆不允許)
//沒有來源網域(即自身網域內的頁面)會被認為是undefined，故要加上此設定才可內連
var corsOptions = {
  credentials: true,
  origin: function(origin, callback) {
    //origin:來源網域
    console.log('origin:' + origin)
    if (whitelist.indexOf(origin) !== -1) {
      //判斷來源是否在白名單陣列內
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
}
router.use(cors(corsOptions))
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
//會員註冊email發送
router.post('/sendmail', function(req, res) {
  //設定 SMTP 相關資料
  console.log(req.body)
  var transporter = nodemailer.createTransport({
    service: 'Gmail',
    secureConnection: true, // 使用SSL方式（安全方式，防止被竊取信息）
    auth: {
      user: 'milkteasuu@gmail.com', // generated ethereal user
      pass: 'earlgreysu', // generated ethereal password
    },
    tls: {
      // 不得檢查服務器所發送的憑證
      rejectUnauthorized: false,
    },
  })
  //撰寫Mail相關內容
  var mailOptions = {
    from: '"Movieee會員註冊信件" <milkteasuu@gmail.com>', // sender address
    to: req.body.email, // list of receivers
    subject: '歡迎您加入Movieee!', // Subject line
    text: '測試寄信內容', // plain text body
    html: `<div style="background: #ffffff ;color:#242b34; padding:10px">
    <h2>親愛的<span style="color:#ffa510"> ${
      req.body.nickname
    } </span>您好：</h2>
    <h2>Movieee平台誠摯的歡迎您的加入!</h2>
    <h3>趕快點擊以下連結進行登入，開始創造屬於你自己的收藏清單吧!</h3>
    <br>
    <a href="http://localhost:3000/LoginSign/?id=${
      req.body.id
    }" style="text-decoration: none">>> 點擊我，直接進入Movieee登入頁面吧~</a>
</div>`,
  }
  //發送郵件
  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      return console.log(error)
    }
    //轉址
    // res.redirect('http://localhost:3000/');
  })
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
