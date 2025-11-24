<?php
header('Content-Type: application/json; charset=utf-8');
require __DIR__ . '/db.php';

$method = $_SERVER['REQUEST_METHOD'];

// LOGOUT ADMIN
if ($method === 'GET') {
    $action = isset($_GET['action']) ? $_GET['action'] : '';
    if ($action === 'logout') {
        unset($_SESSION['admin_id']);
        echo json_encode(['success' => true]);
        exit;
    }

    http_response_code(400);
    echo json_encode(['error' => 'Ação inválida.']);
    exit;
}

// LOGIN ADMIN
if ($method === 'POST') {
    $raw = file_get_contents('php://input');
    $data = json_decode($raw, true);
    if (!is_array($data)) {
        $data = $_POST;
    }

    $username = isset($data['username']) ? trim($data['username']) : '';
    $password = isset($data['password']) ? $data['password']       : '';

    if ($username === '' || $password === '') {
        http_response_code(400);
        echo json_encode(['error' => 'Informe usuário e senha.']);
        exit;
    }

    try {
        $stmt = $pdo->prepare(
            "SELECT id, name, email, username, password_hash
             FROM admins
             WHERE username = :username
             LIMIT 1"
        );
        $stmt->execute([':username' => $username]);
        $admin = $stmt->fetch();

        if (!$admin || !password_verify($password, $admin['password_hash'])) {
            http_response_code(401);
            echo json_encode(['error' => 'Credenciais inválidas de admin.']);
            exit;
        }

        $_SESSION['admin_id'] = $admin['id'];

        $resp = [
            'id'   => $admin['id'],
            'name' => $admin['name']
        ];

        echo json_encode(['admin' => $resp]);
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(['error' => 'Erro ao realizar login admin.']);
    }
    exit;
}

http_response_code(405);
echo json_encode(['error' => 'Método não permitido.']);
