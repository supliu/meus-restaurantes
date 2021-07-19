<?php

namespace Database\Seeders;

use App\Models\Restaurante;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        Restaurante::create([
            'nome' => 'Bistrô Saudace',
            'endereco' => 'Av. Afonso Pena, 322',
            'telefone' => '(31) 99012-0122',
            'foto' => 'restaurantes/restaurant01.jpeg',
            'latitude' => -19.9167405,
            'longitude' => -43.9402801,
        ]);

        Restaurante::create([
            'nome' => 'Bar do Júlio',
            'endereco' => 'Rua da Bahia, 1800',
            'telefone' => '(31) 99888-1100',
            'foto' => 'restaurantes/restaurant02.jpeg',
            'latitude' => -19.9294585,
            'longitude' => -43.9390073,
        ]);

        Restaurante::create([
            'nome' => 'Churrascaria Monteiro',
            'endereco' => 'Rua dos Tamóios, 20',
            'telefone' => '(31) 99202-0000',
            'foto' => 'restaurantes/restaurant03.jpeg',
            'latitude' => -19.9208783,
            'longitude' => -43.9366492,
        ]);
    }
}
