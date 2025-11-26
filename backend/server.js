const express = require('express');
const supabaseClient = require('@supabase/supabase-js');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Configuração CORS
const corsOptions = {
   origin:'*', 
   credentials:true,
   optionSuccessStatus:200,
}

app.use(cors(corsOptions));

// Middlewares
app.use(morgan('combined'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Servir arquivos estáticos do frontend
app.use(express.static(path.join(__dirname, '../frontend')));

// Configuração Supabase
const supabase = supabaseClient.createClient(
    'https://hcjlnnthlvxvuidqfxbt.supabase.co', 
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhjamxubnRobHZ4dnVpZHFmeGJ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQwOTM0NzIsImV4cCI6MjA3OTY2OTQ3Mn0.YADn9EffhGJ_ap2G2ztEq8RjeQnoLk5-v0iRlR5A9mU'
);

// GET - Teste de conexão com Supabase
app.get('/api/test', async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('products')
            .select('count', { count: 'exact', head: true });
        
        if (error) throw error;
        
        res.json({ 
            status: 'success',
            message: '✅ Conectado ao Supabase!',
            database: 'products table accessible',
            timestamp: new Date().toISOString()
        });
        console.log('✅ Teste de conexão Supabase: OK');
    } catch (error) {
        res.status(500).json({ 
            status: 'error',
            message: '❌ Erro na conexão com Supabase',
            error: error.message 
        });
        console.log('❌ Teste de conexão Supabase: FALHOU', error.message);
    }
});

// GET - Listar todos os produtos
app.get('/api/products', async (req, res) => {
    try {
        const {data, error} = await supabase
            .from('products')
            .select();
        
        if (error) throw error;
        
        res.json(data);
        console.log(`Listou todos os produtos: ${data.length} encontrados`);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET - Buscar produto por ID
app.get('/api/products/:id', async (req, res) => {
    try {
        console.log("Buscando produto ID: " + req.params.id);
        
        const {data, error} = await supabase
            .from('products')
            .select()
            .eq('id', req.params.id)
            .single();
        
        if (error) throw error;
        
        res.json(data);
        console.log("Produto encontrado:", data);
    } catch (error) {
        res.status(404).json({ error: 'Produto não encontrado' });
    }
});

// POST - Criar novo produto
app.post('/api/products', async (req, res) => {
    try {
        const {data, error} = await supabase
            .from('products')
            .insert({
                name: req.body.name,
                description: req.body.description,
                price: req.body.price,
            })
            .select();
        
        if (error) throw error;
        
        res.status(201).json({ message: "Produto criado!", data });
        console.log("Produto criado:", req.body.name);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// PUT - Atualizar produto
app.put('/api/products/:id', async (req, res) => {
    try {
        const {data, error} = await supabase
            .from('products')
            .update({
                name: req.body.name,
                description: req.body.description,
                price: req.body.price
            })
            .eq('id', req.params.id)
            .select();
        
        if (error) throw error;
        
        res.json({ message: "Produto atualizado!", data });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// DELETE - Deletar produto
app.delete('/api/products/:id', async (req, res) => {
    try {
        console.log("Deletando produto ID: " + req.params.id);
        
        const {error} = await supabase
            .from('products')
            .delete()
            .eq('id', req.params.id);
        
        if (error) throw error;
        
        res.json({ message: "Produto deletado!" });
        console.log("Produto deletado - ID: " + req.params.id);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Rota raiz - serve o index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend', 'index.html'));
});

// Rota 404
app.use((req, res) => {
    res.status(404).json({ error: "Rota não encontrada" });
});

// Iniciar servidor
app.listen(port, '0.0.0.0', () => {
    console.log(`🚀 Servidor rodando em http://0.0.0.0:${port}`);
    console.log(`📊 API disponível em http://0.0.0.0:${port}/api/products`);
    console.log(`🌐 Acesse externamente: http://SEU_IP_EC2:${port}`);
});