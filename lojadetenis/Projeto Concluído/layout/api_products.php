<?php
header('Content-Type: application/json; charset=utf-8');

require __DIR__ . '/doctrine-bootstrap.php';

use App\Entity\Product;

/**
 * Helper: ler body JSON ou POST normal
 */
function getRequestData(): array {
    $raw = file_get_contents('php://input');
    $data = json_decode($raw, true);
    if (!is_array($data)) {
        $data = $_POST;
    }
    return $data;
}

/**
 * Helper: montar array de produto para o front
 */
function productToArray(Product $p): array {
    return [
        'id'        => $p->getId(),
        'name'      => $p->getName(),
        'brand'     => $p->getBrand(),
        'gender'    => $p->getGender(),
        'size'      => $p->getSize(),
        'description' => $p->getDescription(),
        'price'     => $p->getPrice(),
        'stock'     => $p->getStock(),
        'image_url' => $p->getImageUrl(),
    ];
}

$method = $_SERVER['REQUEST_METHOD'];

try {
    if ($method === 'GET') {
        // ==== LISTAR PRODUTOS COM FILTROS ====
        $brand  = isset($_GET['brand'])  ? trim($_GET['brand'])  : '';
        $gender = isset($_GET['gender']) ? trim($_GET['gender']) : '';
        $search = isset($_GET['search']) ? trim($_GET['search']) : '';

        $qb = $entityManager->createQueryBuilder();
        $qb->select('p')
           ->from(Product::class, 'p');

        $params = [];

        if ($brand !== '') {
            $qb->andWhere('LOWER(p.brand) = :brand');
            $params['brand'] = strtolower($brand);
        }

        if ($gender !== '') {
            $qb->andWhere('LOWER(p.gender) = :gender');
            $params['gender'] = strtolower($gender);
        }

        if ($search !== '') {
            $qb->andWhere('LOWER(p.name) LIKE :search OR LOWER(p.brand) LIKE :search');
            $params['search'] = '%' . strtolower($search) . '%';
        }

        if (!empty($params)) {
            $qb->setParameters($params);
        }

        $qb->orderBy('p.name', 'ASC');

        $products = $qb->getQuery()->getResult();

        $data = [];
        foreach ($products as $p) {
            $data[] = productToArray($p);
        }

        echo json_encode(['products' => $data]);
        exit;
    }

    if ($method === 'POST') {
        $data = getRequestData();
        $action = isset($data['action']) ? $data['action'] : null;

        if ($action === 'create' || $action === 'update') {
            $name       = trim($data['name']      ?? '');
            $brand      = trim($data['brand']     ?? '');
            $gender     = trim($data['gender']    ?? '');
            $price      = (float)($data['price']  ?? 0);
            $size       = trim($data['size']      ?? '');
            $stock      = (int)($data['stock']    ?? 0);
            $image_url  = trim($data['image_url'] ?? '');
            $desc       = isset($data['description']) ? trim($data['description']) : null;

            if ($name === '' || $brand === '' || $gender === '' || $price <= 0) {
                http_response_code(400);
                echo json_encode(['error' => 'Preencha nome, marca, gênero e preço.']);
                exit;
            }

            if ($action === 'create') {
                $product = new Product();
            } else {
                $id = (int)($data['id'] ?? 0);
                if ($id <= 0) {
                    http_response_code(400);
                    echo json_encode(['error' => 'ID inválido para atualização.']);
                    exit;
                }
                $product = $entityManager->find(Product::class, $id);
                if (!$product) {
                    http_response_code(404);
                    echo json_encode(['error' => 'Produto não encontrado.']);
                    exit;
                }
            }

            $product->setName($name)
                    ->setBrand($brand)
                    ->setGender($gender)
                    ->setSize($size)
                    ->setPrice($price)
                    ->setStock($stock)
                    ->setImageUrl($image_url);

            if ($desc !== null && $desc !== '') {
                $product->setDescription($desc);
            }

            if ($action === 'create') {
                $entityManager->persist($product);
            }

            $entityManager->flush();

            echo json_encode([
                'success' => true,
                'product' => productToArray($product),
            ]);
            exit;
        }

        if ($action === 'delete') {
            $id = (int)($data['id'] ?? 0);
            if ($id <= 0) {
                http_response_code(400);
                echo json_encode(['error' => 'ID inválido para exclusão.']);
                exit;
            }

            $product = $entityManager->find(Product::class, $id);
            if (!$product) {
                http_response_code(404);
                echo json_encode(['error' => 'Produto não encontrado.']);
                exit;
            }

            $entityManager->remove($product);
            $entityManager->flush();

            echo json_encode(['success' => true]);
            exit;
        }

        http_response_code(400);
        echo json_encode(['error' => 'Ação inválida.']);
        exit;
    }

    // Método não permitido
    http_response_code(405);
    echo json_encode(['error' => 'Método não permitido.']);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'error' => 'Erro no servidor (Doctrine).',
        // descomenta a linha abaixo se quiser ver o erro real em desenvolvimento
        // 'details' => $e->getMessage()
    ]);
}
