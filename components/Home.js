import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from "react-native";
import { firestore } from "../Firebase";
import { collection, onSnapshot, deleteDoc, doc } from "firebase/firestore";

export default function Home({ navigation }) {

    const [criptos, setcriptos] = useState([]);

    async function deleteCripto(id) {
        try {
            await deleteDoc(doc(firestore, 'tbmoeda', id));
            Alert.alert("A criptomoeda foi deletada.")
        } catch (error) {
            console.log("Erro ao deletar.", error)
        }
    }

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(firestore, 'tbmoeda'), (querySnapshot) => {
            const lista = [];
            querySnapshot.forEach((doc) => {
                lista.push({ ...doc.data(), id: doc.id });
            });
            setcriptos(lista);
        });
        return () => unsubscribe();
    }, []);

    return (
        <View style={estilo.container}>
            <View>
                <Text style={estilo.titulo}>Lista de criptomoedas</Text>
            </View>
            <FlatList
                data={criptos}
                renderItem={({ item }) => {
                    return (
                        <View style={estilo.criptos}>
                            <TouchableOpacity 
                                onPress={() => navigation.navigate("Alterar", {
                                    id: item.id,
                                    nomeCripto: item.nomeCripto,
                                    siglaCripto: item.siglaCripto,
                                    valorCripto: item.valorCripto
                                })}
                            >
                                <View>
                                    <Text style={estilo.titulocriptos}>
                                        Criptomoeda: <Text style={estilo.textocriptos}>{item.nomeCripto}</Text>
                                    </Text>
                                    <Text style={estilo.titulocriptos}>
                                        Sigla: <Text style={estilo.textocriptos}>{item.siglaCripto}</Text>
                                    </Text>
                                    <Text style={estilo.titulocriptos}>
                                        Valor: <Text style={estilo.textocriptos}>{item.valorCripto}</Text>
                                    </Text>
                                </View>
                            </TouchableOpacity>
                            <View style={estilo.botaodeletar}>
                                <TouchableOpacity onPress={() => deleteCripto(item.id)} >
                                    <Text style={estilo.textocriptos}>X</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    );
                }}
                keyExtractor={item => item.id}
            />
            <TouchableOpacity 
                style={estilo.addbutton} 
                onPress={() => navigation.navigate("Cadastrar")}
            >
                <Text style={estilo.textocriptos}>+</Text>
            </TouchableOpacity>
        </View>
    );
}

const estilo = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    titulo: {
        marginTop: 50,
        fontSize: 38,
    },
    itens: {
        marginHorizontal: 10,
        marginVertical: 10,
        padding: 10,
    },
    titulocriptos: {
        fontSize: 13,
        color: '#fff',
    },
    textocriptos: {
        fontSize: 15,
        fontWeight: "bold",
    },
    criptos: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 10,
        marginVertical: 10,
        padding: 10,
        backgroundColor: '#0000CD',
        borderRadius: 10,
    },
    botaodeletar: {
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
    },
    addbutton: {
        backgroundColor: '#ffffff',
        borderRadius: 50,
        position: 'absolute',
        right: 20,
        bottom: 40,
        justifyContent: "center",
        alignItems: "center",
        width: 50,
        height: 50,
    },
});
