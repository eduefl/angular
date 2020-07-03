const express = require('express') ;
const cors = require('cors') ;
const bodyparser = require('body-parser') ;
const multiparty = require('connect-multiparty') ;



const app  = express() ;
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));

const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200

} ;

app.use(cors(corsOptions));
const  multipartyMiddleware = multiparty({uploadDir: './uploads'});
app.post('/upload', multipartyMiddleware, (req, res ) =>{
  const files = req.files;
  console.log(req);
  console.log('req.file');
  console.log(files);

  res.json({message: files});
  console.log(req.files);

});

app.use((err, req, res, next ) => res.json({Erro: err.message}));

app.listen(8000,()=>{
  console.log('server iniciado na porta 8000');
})

