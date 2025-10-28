/* app.js — Front-end demo: produtos em memória (utilize o backend para persistência) */

const PRODUCTS_KEY = 'fs_products_v1';

const sampleProducts = [
  { id: 1, nome: 'GAZELLE', marca: 'adidas', preco: 599.00, tamanho: '39-43', estoque: 12, imagem: 'GAZELLE.png' },
  { id: 2, nome: 'Tanjun Next Nature', marca: 'nike', preco: 599.00, tamanho: '38/42-44', estoque: 5, imagem: 'Tanjun Next Nature.png' },
  { id: 3, nome: 'Casual Shuffle Cabedal Em Sintético', marca: 'puma', preco: 329.99, tamanho: '38-46', estoque: 8, imagem: 'Casual Shuffle Cabedal Em Sintético.png' },
  { id: 4, nome: 'Veloz 3', marca: 'Olympikus', preco: 299.00, tamanho: '36-44', estoque: 20, imagem: 'Veloz 3.png' }
];

function $(sel){ return document.querySelector(sel) }
function $all(sel){ return Array.from(document.querySelectorAll(sel)) }

function getProducts(){
  const raw = localStorage.getItem(PRODUCTS_KEY);
  if(!raw){ localStorage.setItem(PRODUCTS_KEY, JSON.stringify(sampleProducts)); return sampleProducts.slice(); }
  try { return JSON.parse(raw); } catch(e){ return []; }
}
function saveProducts(list){ localStorage.setItem(PRODUCTS_KEY, JSON.stringify(list)); }

function formatPrice(v){ return Number(v).toLocaleString('pt-BR', { style:'currency', currency:'BRL' }); }

function renderProducts(list){
  const grid = $('#products-grid');
  grid.innerHTML = '';
  if(!list || list.length === 0){ $('#empty-msg').classList.remove('hidden'); return; }
  $('#empty-msg').classList.add('hidden');

  list.forEach(p => {
    const card = document.createElement('article');
    card.className = 'card';
    card.innerHTML = `
      <div class="thumb"><img src="${p.imagem || 'https://via.placeholder.com/600x400?text=No+Image'}" alt="${p.nome}"></div>
      <h4>${p.nome}</h4>
      <div class="meta">
        <span>${formatPrice(p.preco)}</span>
        <span class="muted">${p.marca.toUpperCase()}</span>
      </div>
      <div class="actions">
        <button class="btn" data-action="view" data-id="${p.id}">Ver</button>
        <button class="btn" data-action="edit" data-id="${p.id}">Editar</button>
      </div>
    `;
    grid.appendChild(card);
  });
}

/* FILTERS */
function applyFilters(){
  const brand = $('#filter-brand').value;
  const q = $('#search-input').value.trim().toLowerCase();
  let list = getProducts();
  if(brand) list = list.filter(p => p.marca === brand);
  if(q) list = list.filter(p => p.nome.toLowerCase().includes(q));
  renderProducts(list);
}

/* ADMIN modal logic */
function openAdmin(){
  const modal = $('#admin');
  modal.setAttribute('aria-hidden','false');
  populateAdmin();
}
function closeAdmin(){
  const modal = $('#admin');
  modal.setAttribute('aria-hidden','true');
  clearForm();
}
function populateAdmin(){
  const list = getProducts();
  const container = $('#admin-list');
  container.innerHTML = '';
  list.forEach(p => {
    const item = document.createElement('div');
    item.className = 'admin-item';
    item.innerHTML = `<div><strong>${p.nome}</strong> • ${formatPrice(p.preco)} • Estoque: ${p.estoque}</div>
      <div>
        <button class="btn" data-admin="edit" data-id="${p.id}">Editar</button>
        <button class="btn" data-admin="del" data-id="${p.id}">Excluir</button>
      </div>`;
    container.appendChild(item);
  });
}

/* Form */
function fillForm(p){
  $('#produto-id').value = p.id;
  $('#produto-nome').value = p.nome;
  $('#produto-marca').value = p.marca;
  $('#produto-preco').value = p.preco;
  $('#produto-tamanho').value = p.tamanho || '';
  $('#produto-estoque').value = p.estoque || 0;
  $('#produto-imagem').value = p.imagem || '';
}

function clearForm(){
  $('#produto-id').value = '';
  $('#product-form').reset();
}

/* Save (create/update) */
function saveFromForm(e){
  e.preventDefault();
  const id = Number($('#produto-id').value) || null;
  const nome = $('#produto-nome').value.trim();
  const marca = $('#produto-marca').value;
  const preco = Number($('#produto-preco').value) || 0;
  const tamanho = $('#produto-tamanho').value.trim();
  const estoque = Number($('#produto-estoque').value) || 0;
  const imagem = $('#produto-imagem').value.trim();

  const list = getProducts();
  if(id){
    // update
    const idx = list.findIndex(x => x.id === id);
    if(idx >= 0){
      list[idx] = { ...list[idx], nome, marca, preco, tamanho, estoque, imagem };
    }
  } else {
    // create
    const newid = list.length ? Math.max(...list.map(x=>x.id)) + 1 : 1;
    list.push({ id:newid, nome, marca, preco, tamanho, estoque, imagem });
  }
  saveProducts(list);
  populateAdmin();
  applyFilters();
  clearForm();
}

/* Delete */
function deleteProduct(id){
  if(!confirm('Deseja realmente excluir esse produto?')) return;
  const list = getProducts().filter(p => p.id !== id);
  saveProducts(list);
  populateAdmin();
  applyFilters();
}

/* Event listeners */
document.addEventListener('DOMContentLoaded', () => {
  // init year
  $('#year').textContent = new Date().getFullYear();

  // initial render
  renderProducts(getProducts());

  // filter events
  $('#filter-brand').addEventListener('change', applyFilters);
  $('#search-input').addEventListener('input', applyFilters);

  // open admin
  document.querySelector('.btn.primary').addEventListener('click', (e) => {
    e.preventDefault();
    openAdmin();
  });

  // modal close
  document.querySelector('[data-close]').addEventListener('click', closeAdmin);

  // admin list actions (delegate)
  $('#admin-list').addEventListener('click', (ev) => {
    const btn = ev.target.closest('button');
    if(!btn) return;
    const id = Number(btn.dataset.id);
    const action = btn.dataset.admin;
    if(action === 'edit'){
      const p = getProducts().find(x => x.id === id);
      if(p) fillForm(p);
    } else if(action === 'del'){
      deleteProduct(id);
    }
  });

  // product card buttons (delegate)
  $('#products-grid').addEventListener('click', (ev) => {
    const btn = ev.target.closest('button');
    if(!btn) return;
    const action = btn.dataset.action;
    const id = Number(btn.dataset.id);
    const p = getProducts().find(x => x.id === id);
    if(action === 'view'){
      alert(`Produto: ${p.nome}\nPreço: ${formatPrice(p.preco)}\nEstoque: ${p.estoque}`);
    } else if(action === 'edit'){
      openAdmin();
      setTimeout(()=> fillForm(p), 200); // small delay to ensure modal visible
    }
  });

  // form submit
  $('#product-form').addEventListener('submit', saveFromForm);
  $('#btn-clear').addEventListener('click', clearForm);

  // search button focus
  $('#btn-search').addEventListener('click', ()=> $('#search-input').focus());
});
