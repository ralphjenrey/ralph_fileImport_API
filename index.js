var express = require('express');
var multer = require('multer');
var cors = require('cors');
require('dotenv').config()

var app = express();

app.use(cors({
  origin: "*"
}));
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Set up Multer middleware
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'upload/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})
const upload = multer({ storage: storage })

// Set up route to handle file uploads
app.post('/upload', upload.single('upfile'), function (req, res, next) {
  // Get file details
  const file = req.file;
  const filename = file.filename;
  const size = file.size;

  // Return response
  res.json({
    message: 'File uploaded successfully',
    filename: filename,
    size: size
  });
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
