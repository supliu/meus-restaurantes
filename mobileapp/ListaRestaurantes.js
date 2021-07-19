import { gql, useQuery } from '@apollo/client';
import React from 'react';
import { ActivityIndicator, Image, Text, View } from 'react-native';

export default function ListaRestaurantes(params) {

    const { loading, error, data } = useQuery(gql`
        query ($latitude: Float!, $longitude: Float!){
            listaRestaurantes(latitude: $latitude, longitude: $longitude) {
                foto nome endereco telefone distancia
            }
        }
    `, { variables: { latitude: params.latitude, longitude: params.longitude } });

    return (
        <View>
            <View style={{ backgroundColor: '#FF485E', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                <Image source={require('./assets/logo.png')} style={{ marginTop: 48, marginBottom: 12 }} />
            </View>

            { loading && <ActivityIndicator /> }

            {
                data && data.listaRestaurantes.map((row, i) => {
                    return (
                        <View key={i} style={{ flexDirection: 'row', width: '100%', borderTopWidth: 1, borderTopColor: '#CCC', paddingVertical: 8 }}>
                            <View style={{ width: '25%', justifyContent: 'center', alignItems: 'center' }}>
                                <Image source={{ uri: row.foto }} style={{ width: 60, height: 60, borderRadius: 30 }} />
                            </View>
                            <View style={{ width: '50%' }}>
                                <Text style={{ fontWeight: 'bold' }}>{ row.nome }</Text>
                                <Text>{ row.endereco }</Text>
                                <Text>{ row.telefone }</Text>
                            </View>
                            <View style={{ width: '25%', justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ color: '#555', fontWeight: 'bold', fontSize: 21 }}>{ row.distancia.toFixed(1) }</Text>
                                <Text style={{ color: '#555', fontWeight: 'bold' }}>KM</Text>
                            </View>
                        </View>
                    );
                })
            }

        </View>
    );
}
