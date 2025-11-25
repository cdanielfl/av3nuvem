const express = require('express');
const { createClient } = require('@supabase/supabase-js');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('.'));

// Cliente Supabase
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

// Buscar todos os produtos
app.get('/api/products', async (req, res) => {
  const { data, error } = await supabase.from('products').select('*');
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// Buscar produto por ID
app.get('/api/products/:id', async (req, res) => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', req.params.id)
    .single();
  
  if (error) return res.status(404).json({ error: 'Produto não encontrado' });
  res.json(data);
});

// Criar novo produto
app.post('/api/products', async (req, res) => {
  const { name, description, price } = req.body;
  const { data, error } = await supabase
    .from('products')
    .insert([{ name, description, price }])
    .select();
  
  if (error) return res.status(500).json({ error: error.message });
  res.json(data[0]);
});

// Atualizar produto
app.put('/api/products/:id', async (req, res) => {
  const { name, description, price } = req.body;
  const { data, error } = await supabase
    .from('products')
    .update({ name, description, price })
    .eq('id', req.params.id)
    .select();
  
  if (error) return res.status(500).json({ error: error.message });
  if (!data.length) return res.status(404).json({ error: 'Produto não encontrado' });
  res.json(data[0]);
});

// Deletar produto
app.delete('/api/products/:id', async (req, res) => {
  const { error } = await supabase
    .from('products')
    .delete()
    .eq('id', req.params.id);
  
  if (error) return res.status(500).json({ error: error.message });
  res.json({ message: 'Produto deletado' });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});