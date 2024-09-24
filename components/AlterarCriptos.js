import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { firestore } from "../Firebase";
import { collection, doc, updateDoc } from "firebase/firestore";

export default function AlterarCriptos({navigation, route}) {

    const id = route.params.id;

    const [nomeCripto, setnomeCripto] = useState(route.params.nomeCripto);
    const [siglaCripto, setsiglaCripto] = useState(route.params.siglaCripto);
    const [valorCripto, setvalorCripto] = useState(route.params.valorCripto);


    async function alterarCripto(id, nomeCripto, siglaCripto, valorCripto) {
        try {
            await updateDoc(doc(collection(firestore, "tbmoeda"), id), {
                nomeCripto: nomeCripto,
                siglaCripto: siglaCripto,
                valorCripto: valorCripto
            })
            Alert.alert("Aviso", "Criptomoeda Alterado com sucesso.")
            navigation.navigate("Home")
        }
        catch (error) {
            console.error("Erro ao alterar: ", error);
            Alert.alert("Erro", "Erro ao alterar. Por favor, tente novamente.");
        }
    }
        return (
            <View style={estilo.container}>
                <View>
                    <Text style={estilo.titulo}> Alterar dados da Criptomoeda </Text>
                </View>
                <View>
                    <TextInput autoCapitalize='words' style={estilo.input} placeholder="Digite a criptomoeda" onChangeText={setnomeCripto} value={nomeCripto} />
                    <TextInput style={estilo.input} placeholder="Digite a Sigla" onChangeText={setsiglaCripto} value={siglaCripto} />
                    <TextInput style={estilo.input} placeholder="Digite o valor" onChangeText={setvalorCripto} value={valorCripto} />
                    <TouchableOpacity
                        style={estilo.btnenviar}
                        onPress={() => {
                            alterarCripto(id, nomeCripto, siglaCripto, valorCripto);
                        }}>
                        <Text style={estilo.btntxtenviar}> Alterar </Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }


    const estilo = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        },
        input: {
            marginVertical: 10,
            marginHorizontal: 10,
            backgroundColor: '#9ac234',
            paddingHorizontal: 20,
            paddingVertical: 10,
            fontSize: 15,
            borderRadius: 10,
        },
        btnenviar: {
            marginTop: 20,
        },
        btntxtenviar: {
            fontSize: 25,
        },
        titulo: {
            marginVertical: 40,
            fontSize: 25,
            textAlign: 'center',
        },
    });