<?php
header('Content-Type: application/json; charset=utf-8');
require __DIR__ . '/db.php';

// Só aceitamos POST para cadastro
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
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
// body: { name, email, username, password }
$name     = isset($data['name'])     ? trim($data['name'])     : '';
$email    = isset($data['email'])    ? trim($data['email'])    : '';
$username = isset($data['username']) ? trim($data['username']) : '';
$password = isset($data['password']) ? $data['password']       : '';

if ($name === '' || $email === '' || $username === '' || $password === '') {
    http_response_code(400);
    echo json_encode(['error' => 'Preencha todos os campos.']);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['error' => 'E-mail inválido.']);
    exit;
}

try {
    // Verificar se e-mail ou username já existem
    $stmt = $pdo->prepare(
        "SELECT id 
         FROM customers 
         WHERE email = :email OR username = :username
         LIMIT 1"
    );
    $stmt->execute([
        ':email'    => $email,
        ':username' => $username
    ]);

    if ($stmt->fetch()) {
        http_response_code(400);
        echo json_encode(['error' => 'E-mail ou nome de usuário já cadastrados.']);
        exit;
    }

    // Gerar hash da senha
    $hash = password_hash($password, PASSWORD_DEFAULT);

    // Inserir novo cliente
    $stmt = $pdo->prepare(
        "INSERT INTO customers (name, email, username, password_hash)
         VALUES (:name, :email, :username, :password_hash)"
    );
    $stmt->execute([
        ':name'          => $name,
        ':email'         => $email,
        ':username'      => $username,
        ':password_hash' => $hash
    ]);

    echo json_encode(['success' => true]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Erro ao cadastrar cliente.']);
}
