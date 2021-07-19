<?php

return [
    /*
    |--------------------------------------------------------------------------
    | Schemas Config
    |--------------------------------------------------------------------------
    |
    | You must provide all information related to your Schema GraphQL.
    |
    */
    'schemas' => [
        'default' => [
            'queries' => [
                'listaRestaurantes' => \App\GraphQL\ListaRestaurantes::class,
            ],
            'mutations' => [],
        ],
    ],
];
