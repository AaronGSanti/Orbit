<?php

namespace App\Docs;

use OpenApi\Attributes as OA;

#[OA\Info(
    title: 'Orbit API',
    version: '1.0.0',
    description: 'API de autenticación con Laravel Sanctum'
)]
#[OA\Server(
    url: 'http://localhost:8000',
    description: 'Local'
)]
final class OpenApi {}
