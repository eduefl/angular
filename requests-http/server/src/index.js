const express = require('express') ;
const cors = require('cors') ;
//const bodyparser = require('body-parser') ;
//const multiparty = require('connect-multiparty') ;
var multer  = require('multer')

//const fileupload = require("express-fileupload");

 const app  = express() ;
//app.use(fileupload());


// const corsOptions = {
//   origin: '*',
//   optionsSuccessStatus: 200

// } ;

//app.use(cors(corsOptions));
//const  multipartyMiddleware = multiparty({uploadDir: './uploads'})

var storage = multer.diskStorage(
  {
      destination: './uploads/',
      filename: ( req, file, cb ) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
          cb( null, uniqueSuffix + '-'+ file.originalname );
      }
  }
);
//const upload = multer({ dest: './uploads' })
var upload = multer( { storage: storage } );
//app.use(bodyparser.json());
//app.use(bodyparser.urlencoded({extended: false}));
app.post('/upload', upload.any(), (req, res ) =>{
  const files = req.files;
  console.log(res.body);
  console.log(files);
  res.json({message: files});
});

app.use((err, req, next ) => res.json({Erro: err.message}));

app.listen(8000,()=>{
  console.log('server iniciado na porta 8000');
})

