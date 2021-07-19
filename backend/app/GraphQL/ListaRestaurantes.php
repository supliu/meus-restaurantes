<?php

namespace App\GraphQL;

use App\Models\Restaurante;
use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;
use Illuminate\Support\Facades\DB;
use Supliu\LaravelGraphQL\Query;

class ListaRestaurantes extends Query
{
    protected function args(): array
    {
        return [
            'latitude' => Type::nonNull(Type::float()),
            'longitude' => Type::nonNull(Type::float()),
        ];
    }

    protected function typeResult(): Type
    {
        return Type::listOf(new ObjectType([
            'name' => 'Restaurante',
            'fields' => [
                'foto' => Type::string(),
                'nome' => Type::string(),
                'endereco' => Type::string(),
                'telefone' => Type::string(),
                'distancia' => Type::float(),
            ],
        ]));
    }

    protected function resolve($root, $args, $context, $info)
    {
        $distancia = DB::raw('(ACOS(COS(RADIANS('.$args['latitude'].') ) 
            * COS( RADIANS(latitude))
            * COS( RADIANS(longitude) - RADIANS( '.$args['longitude'].' ) )
            + SIN( RADIANS( '.$args['latitude'].' ) )
            * SIN( RADIANS(latitude))
        ) * 6371) as distancia');

        $result = Restaurante::select('*', $distancia)
            ->orderBy('distancia', 'ASC')
            ->get()
        ;

        return $result->toArray();
    }
}
