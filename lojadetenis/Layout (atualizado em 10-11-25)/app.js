const PRODUCTS_KEY = 'fs_products_v1';

const sampleProducts = [
  { imagem: 'GAZELLE.png' },
  { imagem: 'Tanjun Next Nature.png' },
  { imagem: 'Casual Shuffle Cabedal Em Sintético.png' },
  { imagem: 'Veloz 3.png' },
  { imagem: 'Delta 122.png' },
  { imagem: 'Air Max Alpha Trainer 6.png' },
  { imagem: 'Cortez TXT.png' },
  { imagem: 'Gel-Nagoya ST.png' },
  { imagem: 'Runfalcon 5.png' },
  { imagem: 'Duramo Speed 2.png' },
  { imagem: 'Voa 2.png' },
  { imagem: 'NY 90.png' },
  { imagem: 'Velophasis Sprint2K.png' },
  { imagem: 'Puma Club II.png' },
  { imagem: 'Glory Cup Sole Series.png' },
  { imagem: 'Acqua.png' },
  { imagem: 'Duramo Rc2 W.png' },
  { imagem: 'Buzzer 2.png' },
  { imagem: 'Flint Back To Skull.png' },
  { imagem: 'Air Max DN.png' },
  { imagem: 'Runfalcon 5 Turquesa.png' },
  { imagem: 'Air Max 1.png' },
  { imagem: 'Dunk Low Retro SE.png' },
  { imagem: 'Galaxy Star 2.0.png' },
  { imagem: 'Flex Experience 12.png' },
  { imagem: 'Speedcat OG.png' },
  { imagem: 'Club 5v5.png' },
  { imagem: 'Daily Dock Canvas.png' },
  { imagem: 'Court Royale 2.png' },
  { imagem: 'Grand Court Base 00s.png' },
  { imagem: 'Response Runner.png' },
  { imagem: 'Duramo SL 2.png' },
  { imagem: 'Journey Run.png' },
  { imagem: 'SB Force 58.png' },
  { imagem: 'Maxxi Lite.png' },
  { imagem: 'Pacific.png' },
  { imagem: 'Venum.png' },
  { imagem: 'Court Shot.png' },
  { imagem: 'Court Division Mid.png' },
  { imagem: 'Up.png' },
  { imagem: 'Air Max Plus TN.png' },
  { imagem: 'Pride 4.png' },
  { imagem: 'Air Force.png' },
  { imagem: 'Jordan CMFT.png' },
  { imagem: 'Handball Spezial.png' },
  { imagem: 'Inclusion.png' },
  { imagem: 'Gel-Pulse 16 SE.png' },
  { imagem: 'Dropset 3.png' },
  { imagem: 'VL Court 3.0.png' },
  { imagem: 'Europa Pro.png' }
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
  list = list.slice().sort((a, b) => a.nome.localeCompare(b.nome, 'pt-BR'));
  const grid = $('#products-grid');
  grid.innerHTML = '';
  if(!list || list.length === 0){
    $('#empty-msg').classList.remove('hidden');
    return;
  }
  $('#empty-msg').classList.add('hidden');

  list.forEach(p => {
    const card = document.createElement('article');
    card.className = 'card';
    card.innerHTML = `
      <div class="thumb"><img src="${p.imagem || 'https://via.placeholder.com/600x400?text=No+Image'}" alt="${p.nome}"></div>
      <h4>${p.nome}</h4>
      <div class="meta">
        <span>${formatPrice(p.preco)}</span>
        <span class="muted">${p.marca.toUpperCase()} • ${p.genero || ''}</span>
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
  const gender = $('#filter-gender').value;
  const q = $('#search-input').value.trim().toLowerCase();
  let list = getProducts();
  if(brand) list = list.filter(p => p.marca.toLowerCase() === brand.toLowerCase());
  if(gender) list = list.filter(p => (p.genero || '').toLowerCase() === gender.toLowerCase());
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
    item.innerHTML = `<div><strong>${p.nome}</strong> • ${p.genero || 'Unissex'} • ${formatPrice(p.preco)} • Estoque: ${p.estoque}</div>
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
  $('#produto-genero').value = p.genero || '';
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
  const genero = $('#produto-genero').value;
  const preco = Number($('#produto-preco').value) || 0;
  const tamanho = $('#produto-tamanho').value.trim();
  const estoque = Number($('#produto-estoque').value) || 0;
  const imagem = $('#produto-imagem').value.trim();

  const list = getProducts();
  if(id){
    // update
    const idx = list.findIndex(x => x.id === id);
    if(idx >= 0){
      list[idx] = { ...list[idx], nome, marca, genero, preco, tamanho, estoque, imagem };
    }
  } else {
    // create
    const newid = list.length ? Math.max(...list.map(x=>x.id)) + 1 : 1;
    list.push({ id:newid, nome, marca, genero, preco, tamanho, estoque, imagem });
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
  $('#filter-gender').addEventListener('change', applyFilters);
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
      alert(`Produto: ${p.nome}\nPreço: ${formatPrice(p.preco)}\nTamanho: ${p.tamanho}\nEstoque: ${p.estoque}`);
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
    // BOTÃO "Fechar Admin"
  $('#close-admin-btn').addEventListener('click', closeAdmin);

  // FECHAR CLICANDO FORA DO PAINEL
  $('#admin').addEventListener('click', (ev) => {
    if(ev.target === $('#admin')) closeAdmin();
  });
});
