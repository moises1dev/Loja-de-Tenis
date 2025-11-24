<?php

return [
    'modules' => [
        'Application',
    ],
    'module_listener_options' => [
        'config_glob_paths' => [
            'config/autoload/{,*.}global.php',
        ],
        'module_paths' => [
            './module',
            './vendor',
        ],
    ],
];
