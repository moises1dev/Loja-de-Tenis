<?php

header('Content-Type: application/json; charset=utf-8');

require __DIR__ . '/doctrine-bootstrap.php';

use App\Entity\Product;

// Exemplo simples: listar todos os produtos usando Doctrine
try {
    $repo = $entityManager->getRepository(Product::class);
    $products = $repo->findAll();

    $data = [];
    foreach ($products as $p) {
        $data[] = [
            'id'        => $p->getId(),
            'name'      => $p->getName(),
            'brand'     => $p->getBrand(),
            'gender'    => $p->getGender(),
            'size'      => $p->getSize(),
            'price'     => $p->getPrice(),
            'stock'     => $p->getStock(),
            'image_url' => $p->getImageUrl(),
        ];
    }

    echo json_encode(['products' => $data]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Erro Doctrine: ' . $e->getMessage()]);
}
