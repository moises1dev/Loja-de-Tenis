const LOGGED_USER_KEY = 'fs_logged_customer';
const ADMIN_SESSION_KEY = 'fs_admin_logged_v1';

const API_BASE = '';

function $(sel){ return document.querySelector(sel); }
function $all(sel){ return Array.from(document.querySelectorAll(sel)); }

let currentProducts = [];

/* =================== */
/* HELPERS             */
/* =================== */

async function apiFetch(path, options = {}) {
  const url = API_BASE + path;
  const config = {
    headers: {
      'Accept': 'application/json'
    },
    ...options
  };

  if (config.body && !(config.body instanceof FormData)) {
    config.headers['Content-Type'] = 'application/json';
    config.body = JSON.stringify(config.body);
  }

  const res = await fetch(url, config);

  let data;
  try {
    data = await res.json();
  } catch (e) {
    data = null;
  }

  if (!res.ok) {
    if (data && data.error) {
      throw new Error(data.error);
    }
    throw new Error('Erro HTTP: ' + res.status);
  }

  if (!data) {
    throw new Error('Resposta inválida do servidor.');
  }

  if (data.error) {
    throw new Error(data.error);
  }

  return data;

}

function formatPrice(v){
  return Number(v || 0).toLocaleString('pt-BR', { style:'currency', currency:'BRL' });
}

/* =================== */
/* PRODUCTS            */
/* =================== */

async function loadProducts(){
  const brand = $('#filter-brand')?.value || '';
  const gender = $('#filter-gender')?.value || '';
  const q = $('#search-input')?.value?.trim() || '';

  const params = new URLSearchParams();
  if (brand) params.append('brand', brand);
  if (gender) params.append('gender', gender);
  if (q) params.append('search', q);

  try {
    const data = await apiFetch('api_products.php?' + params.toString());
    currentProducts = data.products || [];
    renderProducts(currentProducts);
  } catch (err) {
    alert('Erro ao carregar produtos: ' + err.message);
  }
}

function renderProducts(list){
  const grid = $('#products-grid');
  if (!grid) return;

  list = (list || []).slice().sort((a, b) => {
    const na = (a.name || '').toLocaleUpperCase('pt-BR');
    const nb = (b.name || '').toLocaleUpperCase('pt-BR');
    return na.localeCompare(nb, 'pt-BR');
  });

  grid.innerHTML = '';
  if(list.length === 0){
    $('#empty-msg')?.classList.remove('hidden');
    return;
  }
  $('#empty-msg')?.classList.add('hidden');

  list.forEach(p => {
    const card = document.createElement('article');
    card.className = 'card';
    const nome = p.name || '(sem nome)';
    const marca = (p.brand || '').toUpperCase();
    const genero = p.gender || '';
    card.innerHTML = `
      <div class="thumb">
        <img src="${p.image_url || 'https://via.placeholder.com/600x400?text=No+Image'}" alt="${nome}">
      </div>
      <h4>${nome}</h4>
      <div class="meta">
        <span>${formatPrice(p.price)}</span>
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

/* =================== */
/* ADMIN CRUD          */
/* =================== */

function getLoggedAdmin(){
  const raw = localStorage.getItem(ADMIN_SESSION_KEY);
  if(!raw) return null;
  try { return JSON.parse(raw); } catch(e){ return null; }
}

function setLoggedAdmin(admin){
  if(admin){
    localStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify({
      id: admin.id,
      name: admin.name
    }));
  } else {
    localStorage.removeItem(ADMIN_SESSION_KEY);
  }
}

function openAdmin(){
  const admin = getLoggedAdmin();
  if(!admin){
    openAdminLogin();
    return;
  }
  const modal = $('#admin');
  if(!modal) return;
  modal.setAttribute('aria-hidden','false');
  populateAdmin();
}

function closeAdmin(){
  const modal = $('#admin');
  if(!modal) return;
  modal.setAttribute('aria-hidden','true');
  clearForm();
}

function populateAdmin(){
  const container = $('#admin-list');
  if(!container) return;
  container.innerHTML = '';
  currentProducts.forEach(p => {
    const item = document.createElement('div');
    item.className = 'admin-item';
    item.innerHTML = `
      <div>
        <strong>${p.name || '(sem nome)'}</strong>
        • ${p.gender || 'Unissex'}
        • ${formatPrice(p.price)}
        • Estoque: ${p.stock || 0}
      </div>
      <div>
        <button class="btn" data-admin="edit" data-id="${p.id}">Editar</button>
        <button class="btn" data-admin="del" data-id="${p.id}">Excluir</button>
      </div>`;
    container.appendChild(item);
  });
}

function fillForm(p){
  $('#produto-id').value = p.id;
  $('#produto-nome').value = p.name || '';
  $('#produto-marca').value = p.brand || '';
  $('#produto-genero').value = p.gender || '';
  $('#produto-preco').value = p.price || '';
  $('#produto-tamanho').value = p.size || '';
  $('#produto-estoque').value = p.stock || 0;
  $('#produto-imagem').value = p.image_url || '';
}

function clearForm(){
  $('#produto-id').value = '';
  $('#product-form')?.reset();
}

async function saveFromForm(e){
  e.preventDefault();
  const id = $('#produto-id').value ? Number($('#produto-id').value) : null;
  const name = $('#produto-nome').value.trim();
  const brand = $('#produto-marca').value;
  const gender = $('#produto-genero').value;
  const price = Number($('#produto-preco').value) || 0;
  const size = $('#produto-tamanho').value.trim();
  const stock = Number($('#produto-estoque').value) || 0;
  const image_url = $('#produto-imagem').value.trim();

  if(!name || !brand || !gender || !price){
    alert('Preencha nome, marca, gênero e preço.');
    return;
  }

  const payload = {
    action: id ? 'update' : 'create',
    id,
    name,
    brand,
    gender,
    price,
    size,
    stock,
    image_url
  };

  try {
    await apiFetch('api_products.php', {
      method: 'POST',
      body: payload
    });
    await loadProducts();
    populateAdmin();
    clearForm();
    alert('Produto salvo com sucesso!');
  } catch (err) {
    alert('Erro ao salvar produto: ' + err.message);
  }
}

async function deleteProduct(id){
  if(!confirm('Deseja realmente excluir esse produto?')) return;
  try {
    await apiFetch('api_products.php', {
      method: 'POST',
      body: { action: 'delete', id }
    });
    await loadProducts();
    populateAdmin();
  } catch (err) {
    alert('Erro ao excluir: ' + err.message);
  }
}

/* =================== */
/* CLIENTES            */
/* =================== */

function setLoggedCustomer(customer){
  if(customer){
    localStorage.setItem(LOGGED_USER_KEY, JSON.stringify({
      id: customer.id,
      nome: customer.name,
      email: customer.email,
      usuario: customer.username
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

function openCustomerAuth(){
  const modal = $('#customer-auth');
  if(!modal) return;
  modal.setAttribute('aria-hidden', 'false');
}

function closeCustomerAuth(){
  const modal = $('#customer-auth');
  if(!modal) return;
  modal.setAttribute('aria-hidden', 'true');
  $('#form-login')?.reset();
  $('#form-register')?.reset();
}

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

/* =================== */
/* ADMIN LOGIN         */
/* =================== */

function openAdminLogin(){
  const modal = $('#admin-login');
  if(!modal) return;
  modal.setAttribute('aria-hidden', 'false');
  $('#form-admin-login')?.reset();
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
  // ano no rodapé
  $('#year').textContent = new Date().getFullYear();

  // carregar produtos do BD
  loadProducts();

  // filtros
  $('#filter-brand')?.addEventListener('change', loadProducts);
  $('#filter-gender')?.addEventListener('change', loadProducts);
  $('#search-input')?.addEventListener('input', () => {
    loadProducts();
  });

  // Área Admin
  $('#btn-admin')?.addEventListener('click', (e) => {
    e.preventDefault();
    openAdmin();
  });

  document.querySelector('[data-close]')?.addEventListener('click', closeAdmin);
  $('#close-admin-btn')?.addEventListener('click', closeAdmin);
  $('#admin')?.addEventListener('click', (ev) => {
    if(ev.target === $('#admin')) closeAdmin();
  });

  // lista admin (editar/excluir)
  $('#admin-list')?.addEventListener('click', (ev) => {
    const btn = ev.target.closest('button');
    if(!btn) return;
    const id = Number(btn.dataset.id);
    const action = btn.dataset.admin;
    const p = currentProducts.find(x => x.id === id);
    if(action === 'edit' && p){
      fillForm(p);
    } else if(action === 'del'){
      deleteProduct(id);
    }
  });

  // botões nos cards de produto
  $('#products-grid')?.addEventListener('click', (ev) => {
    const btn = ev.target.closest('button');
    if(!btn) return;
    const action = btn.dataset.action;
    const id = Number(btn.dataset.id);
    const p = currentProducts.find(x => x.id === id);
    if(!p) return;

    if(action === 'view'){
      alert(`Produto: ${p.name}
Preço: ${formatPrice(p.price)}
Tamanho: ${p.size || '-'}
Estoque: ${p.stock || 0}`);
    } else if(action === 'edit'){
      openAdmin();
      setTimeout(()=> fillForm(p), 200);
    }
  });

  // CRUD form
  $('#product-form')?.addEventListener('submit', saveFromForm);
  $('#btn-clear')?.addEventListener('click', clearForm);

  // busca header
  $('#btn-search')?.addEventListener('click', ()=> $('#search-input')?.focus());

  /* ==== LOGIN / CADASTRO CLIENTE ==== */

  const btnLogin = $('#btn-login');
  btnLogin?.addEventListener('click', (e) => {
    e.preventDefault();
    openCustomerAuth();
    switchAuthTab('login');
  });

  document.querySelector('[data-close-auth]')?.addEventListener('click', closeCustomerAuth);

  const customerModal = $('#customer-auth');
  customerModal?.addEventListener('click', (ev) => {
    if(ev.target === customerModal) closeCustomerAuth();
  });

  $all('#customer-auth .tab').forEach(btn => {
    btn.addEventListener('click', () => {
      switchAuthTab(btn.dataset.tab);
    });
  });

  // cadastro cliente
  $('#form-register')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const nome = $('#reg-nome').value.trim();
    const email = $('#reg-email').value.trim().toLowerCase();
    const usuario = $('#reg-usuario').value.trim().toLowerCase();
    const senha = $('#reg-senha').value;

    if(!nome || !email || !usuario || !senha){
      alert('Preencha todos os campos.');
      return;
    }

    try {
      await apiFetch('api_register_customer.php', {
        method: 'POST',
        body: { name: nome, email, username: usuario, password: senha }
      });
      alert('Cadastro realizado com sucesso! Agora faça login.');
      switchAuthTab('login');
      $('#form-register').reset();
    } catch (err) {
      alert('Erro no cadastro: ' + err.message);
    }
  });

  // login cliente
  $('#form-login')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const ident = $('#login-ident').value.trim().toLowerCase();
    const senha = $('#login-senha').value;
    if(!ident || !senha){
      alert('Informe seus dados de login.');
      return;
    }

    try {
      const data = await apiFetch('api_login_customer.php', {
        method: 'POST',
        body: { ident, password: senha }
      });
      setLoggedCustomer(data.customer);
      alert(`Bem-vindo, ${data.customer.name}!`);
      closeCustomerAuth();
    } catch (err) {
      alert('Erro no login: ' + err.message);
    }
  });

  // logout cliente
  $('#btn-logout')?.addEventListener('click', async () => {
    try {
      await apiFetch('api_login_customer.php?action=logout');
    } catch (e) {}
    setLoggedCustomer(null);
  });

  // estado inicial do header
  updateHeaderAuthState();

  /* ==== LOGIN ADMIN ==== */

  $('#form-admin-login')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const user = $('#admin-user').value.trim();
    const pass = $('#admin-pass').value;

    if(!user || !pass){
      alert('Informe usuário e senha de administrador.');
      return;
    }

    try {
      const data = await apiFetch('api_login_admin.php', {
        method: 'POST',
        body: { username: user, password: pass }
      });
      setLoggedAdmin(data.admin);
      alert(`Admin logado: ${data.admin.name}`);
      closeAdminLogin();
      openAdmin();
    } catch (err) {
      alert('Erro no login admin: ' + err.message);
    }
  });

  // fechar login admin
  document.querySelector('[data-close-admin-login]')?.addEventListener('click', closeAdminLogin);
  const adminLoginModal = $('#admin-login');
  adminLoginModal?.addEventListener('click', (ev) => {
    if(ev.target === adminLoginModal) closeAdminLogin();
  });

  // logout admin
  const adminLogoutBtn = $('#admin-logout-btn');
  adminLogoutBtn?.addEventListener('click', async () => {
    try {
      await apiFetch('api_login_admin.php?action=logout');
    } catch (e) {}
    setLoggedAdmin(null);
    closeAdmin();
    alert('Você saiu da Área Admin.');
  });
});
