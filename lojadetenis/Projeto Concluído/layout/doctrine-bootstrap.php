<?php

use Doctrine\ORM\ORMSetup;
use Doctrine\ORM\EntityManager;

require __DIR__ . '/vendor/autoload.php';

$isDevMode = true;

$paths = [__DIR__ . '/src/Entity'];

$config = ORMSetup::createAttributeMetadataConfiguration(
    $paths,
    $isDevMode,
    null,
    null,
    false
);

$dbParams = [
    'driver'   => 'pdo_mysql',
    'host'     => 'localhost',
    'port'     => 3306,
    'user'     => 'root',
    'password' => '',
    'dbname'   => 'findsneakers',
    'charset'  => 'utf8mb4',
];

$entityManager = EntityManager::create($dbParams, $config);
