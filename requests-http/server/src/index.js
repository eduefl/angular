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
const  multipartyMiddleware = multiparty({uploadDir: './uploads'})
app.post('/upload', multipartyMiddleware, (req, res ) =>{
  const files = req.files;
  console.log(files);
  res.json({message: files});
});

app.use((err, req, next ) => res.json({Erro: err.message}));

app.listen(8000,()=>{
  console.log('server iniciado na porta 8000');
})

