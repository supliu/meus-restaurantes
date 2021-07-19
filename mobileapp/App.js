import React, { useEffect, useState } from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import ListaRestaurantes from './ListaRestaurantes';
import * as Location from 'expo-location';
import { ActivityIndicator, Text, View } from 'react-native';

const client = new ApolloClient({
  uri: 'http://192.168.0.13:8080/graphql',
  cache: new InMemoryCache()
});

export default function App() {

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
      (async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
          return;
        }
  
        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
      })();
  }, []);

  return (
    <ApolloProvider client={client}>

      { 
        errorMsg && (
          <View style={{ width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
            <Text>{ errorMsg }</Text>
          </View>
        )
      }

      { 
        location == null && (
          <View style={{ width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
            <ActivityIndicator />
            <Text>Procurando Latitude/Longitude</Text>
          </View>
        )
      }

      { location && <ListaRestaurantes latitude={location.coords.latitude} longitude={location.coords.longitude} />}

    </ApolloProvider>
  );
}
