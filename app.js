const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();
const port = 3000;

// Configuração do multer para upload de arquivos
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// Middleware para servir arquivos estáticos
app.use(express.static('public'));

// Rota para processar dados de um formulário via GET
app.get('/process-form', (req, res) => {
  const queryData = req.query;
  res.send(queryData);
});

// Rota para lidar com upload de arquivos via POST
app.post('/upload-file', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('Nenhum arquivo foi enviado.');
  }
  res.send('Arquivo enviado com sucesso: ' + req.file.filename);
});

// Rota para suportar uma aplicação AJAX
app.get('/get-data', (req, res) => {
  const data = {
    message: 'Este é um conjunto de dados em JSON.',
    items: ['Item 1', 'Item 2', 'Item 3']
  };
  res.json(data);
});

// Inicie o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});