const PRODUCTS_KEY = 'fs_products_v1';
const CUSTOMERS_KEY = 'fs_customers_v1';
const LOGGED_USER_KEY = 'fs_logged_customer';
const ADMIN_SESSION_KEY = 'fs_admin_logged_v1';

/* Lista de admins fixa no código (mais seguro que ter cadastro aberto no site).
   Em sistema real: isso iria para o backend / banco. */
const ADMIN_USERS = [
  { usuario: 'dcarvz', senha: 'carv1234', nome: 'Daniel Carvalho' },
  { usuario: 'gsena', senha: 'sena1234', nome: 'Guilherme Sena' },
  { usuario: 'moises', senha: 'moises1234', nome: 'Moisés Ribeiro' }
];

const sampleProducts = [
  { id: 1, nome: 'GAZELLE', marca: 'adidas', genero: 'feminino', preco: 599.00, tamanho: '39-43', estoque: 12, imagem: 'GAZELLE.png' },
  { id: 2, nome: 'Tanjun Next Nature', marca: 'nike', genero: 'masculino', preco: 599.00, tamanho: '38/42-44', estoque: 5, imagem: 'Tanjun Next Nature.png' },
  { id: 3, nome: 'Casual Shuffle Cabedal Em Sintético', marca: 'puma', genero: 'masculino', preco: 329.99, tamanho: '38-46', estoque: 8, imagem: 'Casual Shuffle Cabedal Em Sintético.png' },
  { id: 4, nome: 'Veloz 3', marca: 'olympikus', genero: 'unisex', preco: 299.00, tamanho: '36-44', estoque: 20, imagem: 'Veloz 3.png' },
  { id: 5, nome: 'Delta 122', marca: 'olympikus', genero: 'masculino', preco: 199.00, tamanho: '36-44', estoque: 21, imagem: 'Delta 122.png' },
  { id: 6, nome: 'Air Max Alpha Trainer 6', marca: 'nike', genero: 'masculino', preco: 799.00, tamanho: '43-46', estoque: 17, imagem: 'Air Max Alpha Trainer 6.png' },
  { id: 7, nome: 'Cortez TXT', marca: 'nike', genero: 'unisex', preco: 649.99, tamanho: '36-40', estoque: 11, imagem: 'Cortez TXT.png' },
  { id: 8, nome: 'Gel-Nagoya ST', marca: 'asics', genero: 'masculino', preco: 399.00, tamanho: '39-43', estoque: 19, imagem: 'Gel-Nagoya ST.png' },
  { id: 9, nome: 'Runfalcon 5', marca: 'adidas', genero: 'masculino', preco: 399.00, tamanho: '38-44', estoque: 27, imagem: 'Runfalcon 5.png' },
  { id: 10, nome: 'Duramo Speed 2', marca: 'adidas', genero: 'feminino', preco: 599.00, tamanho: '34-40', estoque: 15, imagem: 'Duramo Speed 2.png' },
  { id: 11, nome: 'Voa 2', marca: 'olympikus', genero: 'feminino', preco: 299.99, tamanho: '41-43', estoque: 24, imagem: 'Voa 2.png' },
  { id: 12, nome: 'NY 90', marca: 'adidas', genero: 'feminino', preco: 399.00, tamanho: '34-42', estoque: 23, imagem: 'NY 90.png' },
  { id: 13, nome: 'Velophasis Sprint2K', marca: 'puma', genero: 'masculino', preco: 599.00, tamanho: '37-42', estoque: 18, imagem: 'Velophasis Sprint2K.png' },
  { id: 14, nome: 'Puma Club II', marca: 'puma', genero: 'feminino', preco: 449.99, tamanho: '34-46', estoque: 8, imagem: 'Puma Club II.png' },
  { id: 15, nome: 'Glory Cup Sole Series', marca: 'qix', genero: 'masculino', preco: 404.90, tamanho: '34-39', estoque: 18, imagem: 'Glory Cup Sole Series.png' },
  { id: 16, nome: 'Acqua', marca: 'olympikus', genero: 'feminino', preco: 222.11, tamanho: '35-39', estoque: 30, imagem: 'Acqua.png' },
  { id: 17, nome: 'Duramo Rc2 W', marca: 'adidas', genero: 'feminino', preco: 177.49, tamanho: '34-39', estoque: 11, imagem: 'Duramo Rc2 W.png' },
  { id: 18, nome: 'Buzzer 2', marca: 'under armour', genero: 'masculino', preco: 439.00, tamanho: '38-48', estoque: 16, imagem: 'Buzzer 2.png' },
  { id: 19, nome: 'Flint Back To Skull', marca: 'oakley', genero: 'masculino', preco: 399.00, tamanho: '35-39', estoque: 19, imagem: 'Flint Back To Skull.png' },
  { id: 20, nome: 'Air Max DN', marca: 'nike', genero: 'masculino', preco: 1299.99, tamanho: '38-43', estoque: 6, imagem: 'Air Max DN.png' },
  { id: 21, nome: 'Runfalcon 5 Turquesa', marca: 'adidas', genero: 'unisex', preco: 399.99, tamanho: '38-45', estoque: 14, imagem: 'Runfalcon 5 Turquesa.png' },
  { id: 22, nome: 'Air Max 1', marca: 'nike', genero: 'feminino', preco: 1199.99, tamanho: '34-39', estoque: 16, imagem: 'Air Max 1.png' },
  { id: 23, nome: 'Dunk Low Retro SE', marca: 'nike', genero: 'masculino', preco: 899.99, tamanho: '38-44', estoque: 20, imagem: 'Dunk Low Retro SE.png' },
  { id: 24, nome: 'Galaxy Star 2.0', marca: 'adidas', genero: 'masculino', preco: 399.00, tamanho: '36-49', estoque: 7, imagem: 'Galaxy Star 2.0.png' },
  { id: 25, nome: 'Flex Experience 12', marca: 'nike', genero: 'feminino', preco: 349.99, tamanho: '34-40', estoque: 17, imagem: 'Flex Experience 12.png' },
  { id: 26, nome: 'Speedcat OG', marca: 'puma', genero: 'feminino', preco: 399.99, tamanho: '34-39', estoque: 36, imagem: 'Speedcat OG.png' },
  { id: 27, nome: 'Club 5v5', marca: 'puma', genero: 'feminino', preco: 449.99, tamanho: '40-42', estoque: 44, imagem: 'Club 5v5.png' },
  { id: 28, nome: 'Daily Dock Canvas', marca: 'aramis', genero: 'masculino', preco: 219.00, tamanho: '40-46', estoque: 24, imagem: 'Daily Dock Canvas.png' },
  { id: 29, nome: 'Court Royale 2', marca: 'nike', genero: 'masculino', preco: 499.99, tamanho: '35-40', estoque: 15, imagem: 'Court Royale 2.png' },
  { id: 30, nome: 'Grand Court Base 00s', marca: 'adidas', genero: 'unisex', preco: 399.99, tamanho: '35-43', estoque: 6, imagem: 'Grand Court Base 00s.png' },
  { id: 31, nome: 'Response Runner', marca: 'adidas', genero: 'masculino', preco: 299.00, tamanho: '38-44', estoque: 12, imagem: 'Response Runner.png' },
  { id: 32, nome: 'Duramo SL 2', marca: 'adidas', genero: 'unisex', preco: 499.99, tamanho: '34-44', estoque: 21, imagem: 'Duramo SL 2.png' },
  { id: 33, nome: 'Journey Run', marca: 'nike', genero: 'feminino', preco: 799.00, tamanho: '36-42', estoque: 31, imagem: 'Journey Run.png' },
  { id: 34, nome: 'SB Force 58', marca: 'nike', genero: 'unisex', preco: 599.99, tamanho: '35-44', estoque: 26, imagem: 'SB Force 58.png' },
  { id: 35, nome: 'Maxxi Lite', marca: 'fila', genero: 'masculino', preco: 349.99, tamanho: '39-44', estoque: 24, imagem: 'Maxxi Lite.png' },
  { id: 36, nome: 'Pacific', marca: 'nike', genero: 'feminino', preco: 549.99, tamanho: '34-40', estoque: 20, imagem: 'Pacific.png' },
  { id: 37, nome: 'Venum', marca: 'olympikus', genero: 'unisex', preco: 139.99, tamanho: '34-38', estoque: 15, imagem: 'Venum.png' },
  { id: 38, nome: 'Court Shot', marca: 'nike', genero: 'masculino', preco: 499.99, tamanho: '37-44', estoque: 14, imagem: 'Court Shot.png' },
  { id: 39, nome: 'Court Division Mid', marca: 'nike', genero: 'masculino', preco: 549.99, tamanho: '40-49', estoque: 15, imagem: 'Court Division Mid.png' },
  { id: 40, nome: 'Up', marca: 'puma', genero: 'unisex', preco: 300.00, tamanho: '34-43', estoque: 4, imagem: 'Up.png' },
  { id: 41, nome: 'Air Max Plus TN', marca: 'nike', genero: 'masculino', preco: 1299.99, tamanho: '38-44', estoque: 14, imagem: 'Air Max Plus TN.png' },
  { id: 42, nome: 'Pride 4', marca: 'olympikus', genero: 'feminino', preco: 493.00, tamanho: '40-44', estoque: 24, imagem: 'Pride 4.png' },
  { id: 43, nome: 'Air Force', marca: 'nike', genero: 'feminino', preco: 899.99, tamanho: '34-37', estoque: 8, imagem: 'Air Force.png' },
  { id: 44, nome: 'Jordan CMFT', marca: 'nike', genero: 'unisex', preco: 999.00, tamanho: '34-38', estoque: 10, imagem: 'Jordan CMFT.png' },
  { id: 45, nome: 'Handball Spezial', marca: 'adidas', genero: 'unisex', preco: 699.99, tamanho: '39-44', estoque: 6, imagem: 'Handball Spezial.png' },
  { id: 46, nome: 'Inclusion', marca: 'fila', genero: 'feminino', preco: 400.00, tamanho: '34-40', estoque: 22, imagem: 'Inclusion.png' },
  { id: 47, nome: 'Gel-Pulse 16 SE', marca: 'asics', genero: 'masculino', preco: 699.00, tamanho: '38-42', estoque: 13, imagem: 'Gel-Pulse 16 SE.png' },
  { id: 48, nome: 'Dropset 3', marca: 'adidas', genero: 'unisex', preco: 899.00, tamanho: '40-45', estoque: 9, imagem: 'Dropset 3.png' },
  { id: 49, nome: 'VL Court 3.0', marca: 'adidas', genero: 'masculino', preco: 399.99, tamanho: '38-44', estoque: 5, imagem: 'VL Court 3.0.png' },
  { id: 50, nome: 'Europa Pro', marca: 'lacoste', genero: 'masculino', preco: 499.00, tamanho: '38-43', estoque: 19, imagem: 'Europa Pro.png' }
];

function $(sel){ return document.querySelector(sel); }
function $all(sel){ return Array.from(document.querySelectorAll(sel)); }

/* =================== */
/* PRODUCTS / LISTA    */
/* =================== */

function getProducts(){
  const raw = localStorage.getItem(PRODUCTS_KEY);
  if(!raw){
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(sampleProducts));
    return sampleProducts.slice();
  }
  try { return JSON.parse(raw); } catch(e){ return []; }
}
function saveProducts(list){ localStorage.setItem(PRODUCTS_KEY, JSON.stringify(list)); }

function formatPrice(v){
  return Number(v || 0).toLocaleString('pt-BR', { style:'currency', currency:'BRL' });
}

function renderProducts(list){
  list = (list || []).slice().sort((a, b) => {
    const na = (a.nome || '').toLocaleUpperCase('pt-BR');
    const nb = (b.nome || '').toLocaleUpperCase('pt-BR');
    return na.localeCompare(nb, 'pt-BR');
  });

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
    const nome = p.nome || '(sem nome)';
    const marca = (p.marca || '').toUpperCase();
    const genero = p.genero || '';
    card.innerHTML = `
      <div class="thumb">
        <img src="${p.imagem || 'https://via.placeholder.com/600x400?text=No+Image'}" alt="${nome}">
      </div>
      <h4>${nome}</h4>
      <div class="meta">
        <span>${formatPrice(p.preco)}</span>
        <span class="muted">${marca}${genero ? ' • ' + genero : ''}</span>
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
  if(brand) list = list.filter(p => (p.marca || '').toLowerCase() === brand.toLowerCase());
  if(gender) list = list.filter(p => (p.genero || '').toLowerCase() === gender.toLowerCase());
  if(q) list = list.filter(p => (p.nome || '').toLowerCase().includes(q));
  renderProducts(list);
}

/* =================== */
/* ADMIN MODAL CRUD    */
/* =================== */

function openAdmin(){
  // se não tiver admin logado, força login
  const admin = getLoggedAdmin();
  if(!admin){
    openAdminLogin();
    return;
  }
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
    item.innerHTML = `
      <div>
        <strong>${p.nome || '(sem nome)'}</strong>
        • ${p.genero || 'Unissex'}
        • ${formatPrice(p.preco)}
        • Estoque: ${p.estoque || 0}
      </div>
      <div>
        <button class="btn" data-admin="edit" data-id="${p.id}">Editar</button>
        <button class="btn" data-admin="del" data-id="${p.id}">Excluir</button>
      </div>`;
    container.appendChild(item);
  });
}

/* Form CRUD */
function fillForm(p){
  $('#produto-id').value = p.id;
  $('#produto-nome').value = p.nome || '';
  $('#produto-marca').value = p.marca || '';
  $('#produto-genero').value = p.genero || '';
  $('#produto-preco').value = p.preco || '';
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
    const idx = list.findIndex(x => x.id === id);
    if(idx >= 0){
      list[idx] = { ...list[idx], nome, marca, genero, preco, tamanho, estoque, imagem };
    }
  } else {
    const newid = list.length ? Math.max(...list.map(x => x.id || 0)) + 1 : 1;
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

/* =================== */
/* CLIENTES / LOGIN    */
/* =================== */

function getCustomers(){
  const raw = localStorage.getItem(CUSTOMERS_KEY);
  if(!raw) return [];
  try { return JSON.parse(raw); } catch(e){ return []; }
}
function saveCustomers(list){
  localStorage.setItem(CUSTOMERS_KEY, JSON.stringify(list));
}

function setLoggedCustomer(customer){
  if(customer){
    localStorage.setItem(LOGGED_USER_KEY, JSON.stringify({
      nome: customer.nome,
      email: customer.email,
      usuario: customer.usuario
    }));
  } else {
    localStorage.removeItem(LOGGED_USER_KEY);
  }
  updateHeaderAuthState();
}

function getLoggedCustomer(){
  const raw = localStorage.getItem(LOGGED_USER_KEY);
  if(!raw) return null;
  try { return JSON.parse(raw); } catch(e){ return null; }
}

function openCustomerAuth(){
  const modal = $('#customer-auth');
  if(!modal) return;
  modal.setAttribute('aria-hidden', 'false');
}

function closeCustomerAuth(){
  const modal = $('#customer-auth');
  if(!modal) return;
  modal.setAttribute('aria-hidden', 'true');
  $('#form-login').reset();
  $('#form-register').reset();
}

/* alternar abas login/cadastro cliente */
function switchAuthTab(tab){
  const loginForm = $('#form-login');
  const regForm = $('#form-register');
  const tabs = $all('#customer-auth .tab');

  tabs.forEach(btn => {
    btn.classList.toggle('active', btn.dataset.tab === tab);
  });

  if(tab === 'login'){
    loginForm.classList.remove('hidden');
    regForm.classList.add('hidden');
  } else {
    regForm.classList.remove('hidden');
    loginForm.classList.add('hidden');
  }
}

/* estado do header (cliente logado) */
function updateHeaderAuthState(){
  const user = getLoggedCustomer();
  const greeting = $('#user-greeting');
  const btnLogout = $('#btn-logout');
  const btnLogin = $('#btn-login');

  if(!greeting || !btnLogout || !btnLogin) return;

  if(user){
    greeting.textContent = `Olá, ${user.nome.split(' ')[0]}!`;
    greeting.classList.remove('hidden');
    btnLogout.classList.remove('hidden');
    btnLogin.classList.add('hidden');
  } else {
    greeting.textContent = '';
    greeting.classList.add('hidden');
    btnLogout.classList.add('hidden');
    btnLogin.classList.remove('hidden');
  }
}

/* =================== */
/* ADMIN LOGIN         */
/* =================== */

function getLoggedAdmin(){
  const raw = localStorage.getItem(ADMIN_SESSION_KEY);
  if(!raw) return null;
  try { return JSON.parse(raw); } catch(e){ return null; }
}

function setLoggedAdmin(admin){
  if(admin){
    localStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify({
      usuario: admin.usuario,
      nome: admin.nome
    }));
  } else {
    localStorage.removeItem(ADMIN_SESSION_KEY);
  }
}

function openAdminLogin(){
  const modal = $('#admin-login');
  if(!modal) return;
  modal.setAttribute('aria-hidden', 'false');
  const form = $('#form-admin-login');
  if(form) form.reset();
}

function closeAdminLogin(){
  const modal = $('#admin-login');
  if(!modal) return;
  modal.setAttribute('aria-hidden', 'true');
}

/* =================== */
/* DOMContentLoaded    */
/* =================== */

document.addEventListener('DOMContentLoaded', () => {
  // ano footer
  $('#year').textContent = new Date().getFullYear();

  // render inicial produtos
  renderProducts(getProducts());

  // filtros
  $('#filter-brand').addEventListener('change', applyFilters);
  $('#filter-gender').addEventListener('change', applyFilters);
  $('#search-input').addEventListener('input', applyFilters);

  // Área Admin (agora protegida)
  $('#btn-admin').addEventListener('click', (e) => {
    e.preventDefault();
    openAdmin(); // openAdmin decide se pede login ou abre direto
  });

  // fechar admin modal
  document.querySelector('[data-close]').addEventListener('click', closeAdmin);
  $('#close-admin-btn').addEventListener('click', closeAdmin);

  // fechar admin clicando fora
  $('#admin').addEventListener('click', (ev) => {
    if(ev.target === $('#admin')) closeAdmin();
  });

  // ações lista admin (editar/excluir)
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

  // botões nos cards de produto
  $('#products-grid').addEventListener('click', (ev) => {
    const btn = ev.target.closest('button');
    if(!btn) return;
    const action = btn.dataset.action;
    const id = Number(btn.dataset.id);
    const p = getProducts().find(x => x.id === id);
    if(!p) return;

    if(action === 'view'){
      alert(`Produto: ${p.nome}\nPreço: ${formatPrice(p.preco)}\nTamanho: ${p.tamanho}\nEstoque: ${p.estoque}`);
    } else if(action === 'edit'){
      openAdmin();
      setTimeout(()=> fillForm(p), 200);
    }
  });

  // CRUD form
  $('#product-form').addEventListener('submit', saveFromForm);
  $('#btn-clear').addEventListener('click', clearForm);

  // busca header
  $('#btn-search').addEventListener('click', ()=> $('#search-input').focus());

  /* ==== LOGIN / CADASTRO CLIENTE ==== */

  const btnLogin = $('#btn-login');
  if(btnLogin){
    btnLogin.addEventListener('click', (e) => {
      e.preventDefault();
      openCustomerAuth();
      switchAuthTab('login');
    });
  }

  const closeAuthBtn = document.querySelector('[data-close-auth]');
  if(closeAuthBtn){
    closeAuthBtn.addEventListener('click', closeCustomerAuth);
  }

  const customerModal = $('#customer-auth');
  if(customerModal){
    customerModal.addEventListener('click', (ev) => {
      if(ev.target === customerModal) closeCustomerAuth();
    });
  }

  $all('#customer-auth .tab').forEach(btn => {
    btn.addEventListener('click', () => {
      switchAuthTab(btn.dataset.tab);
    });
  });

  // cadastro cliente
  $('#form-register').addEventListener('submit', (e) => {
    e.preventDefault();
    const nome = $('#reg-nome').value.trim();
    const email = $('#reg-email').value.trim().toLowerCase();
    const usuario = $('#reg-usuario').value.trim().toLowerCase();
    const senha = $('#reg-senha').value;

    if(!nome || !email || !usuario || !senha){
      alert('Preencha todos os campos.');
      return;
    }

    const clientes = getCustomers();
    const emailExists = clientes.some(c => c.email === email);
    const userExists = clientes.some(c => c.usuario === usuario);

    if(emailExists){
      alert('Já existe um cliente cadastrado com esse email.');
      return;
    }
    if(userExists){
      alert('Esse nome de usuário já está em uso.');
      return;
    }

    clientes.push({
      id: clientes.length ? Math.max(...clientes.map(c => c.id || 0)) + 1 : 1,
      nome,
      email,
      usuario,
      senha
    });
    saveCustomers(clientes);

    alert('Cadastro realizado com sucesso! Agora faça login.');
    switchAuthTab('login');
    $('#form-register').reset();
  });

  // login cliente
  $('#form-login').addEventListener('submit', (e) => {
    e.preventDefault();
    const ident = $('#login-ident').value.trim().toLowerCase();
    const senha = $('#login-senha').value;
    if(!ident || !senha){
      alert('Informe seus dados de login.');
      return;
    }

    const clientes = getCustomers();
    const cliente = clientes.find(c =>
      (c.email === ident || c.usuario === ident) &&
      c.senha === senha
    );

    if(!cliente){
      alert('Dados inválidos. Verifique email/usuário e senha.');
      return;
    }

    setLoggedCustomer(cliente);
    alert(`Bem-vindo, ${cliente.nome}!`);
    closeCustomerAuth();
  });

  // logout cliente
  const btnLogout = $('#btn-logout');
  if(btnLogout){
    btnLogout.addEventListener('click', () => {
      setLoggedCustomer(null);
    });
  }

  // estado inicial header cliente
  updateHeaderAuthState();

  /* ==== LOGIN ADMIN ==== */

  // submit login admin
  $('#form-admin-login').addEventListener('submit', (e) => {
    e.preventDefault();
    const user = $('#admin-user').value.trim();
    const pass = $('#admin-pass').value;

    if(!user || !pass){
      alert('Informe usuário e senha de administrador.');
      return;
    }

    const admin = ADMIN_USERS.find(a => a.usuario === user && a.senha === pass);
    if(!admin){
      alert('Credenciais de administrador inválidas.');
      return;
    }

    setLoggedAdmin(admin);
    alert(`Admin logado: ${admin.nome}`);
    closeAdminLogin();
    openAdmin(); // agora pode abrir admin
  });

  // fechar login admin (X)
  const closeAdminLoginBtn = document.querySelector('[data-close-admin-login]');
  if(closeAdminLoginBtn){
    closeAdminLoginBtn.addEventListener('click', closeAdminLogin);
  }

  // fechar login admin clicando fora
  const adminLoginModal = $('#admin-login');
  if(adminLoginModal){
    adminLoginModal.addEventListener('click', (ev) => {
      if(ev.target === adminLoginModal) closeAdminLogin();
    });
  }

// Logout admin
const adminLogoutBtn = $('#admin-logout-btn');
if(adminLogoutBtn){
  adminLogoutBtn.addEventListener('click', () => {
    setLoggedAdmin(null);
    closeAdmin();
    alert('Você saiu da Área Admin.');
  });
}
});
