<?php
header('Content-Type: application/json; charset=utf-8');
require __DIR__ . '/db.php';

$method = $_SERVER['REQUEST_METHOD'];

// LOGOUT: GET api_login_customer.php?action=logout
if ($method === 'GET') {
    $action = isset($_GET['action']) ? $_GET['action'] : '';
    if ($action === 'logout') {
        unset($_SESSION['customer_id']);
        echo json_encode(['success' => true]);
        exit;
    }

    http_response_code(400);
    echo json_encode(['error' => 'Ação inválida.']);
    exit;
}

// Só aceitamos POST para login
if ($method !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Método não permitido.']);
    exit;
}

// Ler JSON ou POST normal
$raw = file_get_contents('php://input');
$data = json_decode($raw, true);
if (!is_array($data)) {
    $data = $_POST;
}

// Campos enviados pelo front:
// body: { ident, password: senha }
$ident    = isset($data['ident'])    ? trim($data['ident'])    : '';
$password = isset($data['password']) ? $data['password']       : '';

if ($ident === '' || $password === '') {
    http_response_code(400);
    echo json_encode(['error' => 'Informe login e senha.']);
    exit;
}

try {
    // Buscar por email OU username
    $stmt = $pdo->prepare(
        "SELECT id, name, email, username, password_hash
         FROM customers
         WHERE email = :email OR username = :username
         LIMIT 1"
    );
    $stmt->execute([
        ':email' => $ident,
        ':username' => $ident
    ]);
    $customer = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$customer) {
        http_response_code(400);
        echo json_encode(['error' => 'Usuário não encontrado.']);
        exit;
    }

    // Verificar senha
    if (!password_verify($password, $customer['password_hash'])) {
        http_response_code(400);
        echo json_encode(['error' => 'Senha inválida.']);
        exit;
    }

    // Login OK
    $_SESSION['customer_id'] = $customer['id'];

    unset($customer['password_hash']);

    echo json_encode(['customer' => $customer]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'error' => 'Erro ao realizar login.'
        // Se quiser ver o erro real, TEMPORARIAMENTE:
        // ,'details' => $e->getMessage()
    ]);
}
