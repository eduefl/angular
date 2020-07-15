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

app.get('/dowloadExcel',(req,res)=>{
  console.log(req.query.color1); // an exemple how to use param queryes
  //console.log(res);
  res.download('./uploads/1594560932530-307007592-LEGACY TABLES RUSSIA.xlsx');
});

app.get('/dowloadFile',(req,res)=>{
  console.log(req.query.file1); //to see the file name
  //console.log(res);
  res.download('./uploads/'+req.query.file1);
});


app.get('/dowloadPDF',(req,res)=>{
  res.download('./uploads/1594736932440-409088621-FERREIRA LIMA EDUARDO MR 18JAN2019 GRU.PDF');
});

app.use((err, req, next ) => res.json({Erro: err.message}));


app.listen(8000,()=>{
  console.log('server iniciado na porta 8000');
})

