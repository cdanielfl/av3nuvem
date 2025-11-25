const productList = document.querySelector('#products');
const addProductForm = document.querySelector('#add-product-form');

// Função para buscar todos os produtos
async function fetchProducts() {
  const response = await fetch('/api/products');
  const products = await response.json();

  // Limpar lista de produtos
  productList.innerHTML = '';

  // Adicionar cada produto à lista
  products.forEach(product => {
    const productCard = document.createElement('div');
    productCard.className = 'product-card';
    
    productCard.innerHTML = `
      <div class="product-info">
        <div class="product-name">${product.name}</div>
        <div class="product-description">${product.description}</div>
        <div class="product-price">R$ ${parseFloat(product.price).toFixed(2)}</div>
      </div>
      <div class="product-actions">
        <button class="btn-update" onclick="updateProductPrompt(${product.id}, '${product.name}', '${product.description}', ${product.price})">
          <i class="fas fa-edit"></i> Editar
        </button>
        <button class="btn-delete" onclick="deleteProductConfirm(${product.id})">
          <i class="fas fa-trash"></i> Excluir
        </button>
      </div>
    `;

    productList.appendChild(productCard);
  });
}


// Event listener para o botão de envio do formulário Adicionar Produto
addProductForm.addEventListener('submit', async event => {
  event.preventDefault();
  const name = addProductForm.elements['name'].value;
  const description = addProductForm.elements['description'].value;
  const price = addProductForm.elements['price'].value;
  await addProduct(name, description, price);
  addProductForm.reset();
  await fetchProducts();
});



// Função para adicionar um novo produto
async function addProduct(name, description, price) {
  const response = await fetch('/api/products', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, description, price })
  });
  return response.json();
}

// Função para atualizar um produto
async function updateProduct(id, name, description, price) {
  const response = await fetch(`/api/products/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, description, price })
  });
  return response.json();
}

// Função para buscar produto por ID
async function searchProduct() {
  const id = document.getElementById('search-id').value;
  const resultDiv = document.getElementById('search-result');
  
  if (!id) {
    resultDiv.innerHTML = '<div class="error-message">Por favor, digite um ID de produto</div>';
    return;
  }
  
  try {
    const response = await fetch(`/api/products/${id}`);
    
    if (!response.ok) {
      resultDiv.innerHTML = '<div class="error-message">Produto não encontrado</div>';
    } else {
      const product = await response.json();
      resultDiv.innerHTML = `
        <div class="search-result-card">
          <h3><i class="fas fa-check-circle"></i> Produto Encontrado:</h3>
          <p><strong>ID:</strong> ${product.id}</p>
          <p><strong>Nome:</strong> ${product.name}</p>
          <p><strong>Descrição:</strong> ${product.description}</p>
          <p><strong>Preço:</strong> R$ ${parseFloat(product.price).toFixed(2)}</p>
        </div>
      `;
    }
  } catch (error) {
    resultDiv.innerHTML = '<div class="error-message">Erro ao buscar produto</div>';
  }
}

// Função para deletar um produto
async function deleteProduct(id) {
  const response = await fetch(`/api/products/${id}`, {
    method: 'DELETE'
  });
  return response.json();
}

// Função auxiliar para confirmar exclusão
async function deleteProductConfirm(id) {
  if (confirm('Tem certeza que deseja excluir este produto?')) {
    await deleteProduct(id);
    await fetchProducts();
  }
}

// Função auxiliar para atualizar produto via prompt
async function updateProductPrompt(id, currentName, currentDescription, currentPrice) {
  const newName = prompt('Digite o novo nome:', currentName);
  const newDescription = prompt('Digite a nova descrição:', currentDescription);
  const newPrice = prompt('Digite o novo preço:', currentPrice);
  
  if (newName && newDescription && newPrice) {
    await updateProduct(id, newName, newDescription, newPrice);
    await fetchProducts();
  }
}


