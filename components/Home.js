import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from "react-native";
import { firestore } from "../Firebase";
import { collection, onSnapshot, deleteDoc, doc } from "../Firebase/firestore";
import { QuerySnapshot } from "firebase/firestore";

export default function Home({ navigation }) {

    const [criptos, setcriptos] = useState([]);

    async function deleteCripto(id) {
        try {
            await deleteDoc(doc(firestore, "tbmoeda", id));
            Alert.alert("A criptomoeda foi deletada.")
        } catch (erro) {
            console.log("Erro ao deletar.", error)
        }
    }

    useEffect(() => {
        const unsubcribe = onSnapshot(collection(firestore, 'tbmoeda'), (QuerySnapshot) => {
            const lista = [];
            QuerySnapshot.forEach((doc) => {
                lista.push({ ...doc.data(), id: doc.id });
            });
            setcriptos(lista);
        });
        return () => unsubcribe();
    }, []);

    return (
        <View>
            <View>
                <Text>Lista de criptomoedas</Text>
            </View>
            <FlatList
                data={criptos}
                renderItem={({ item }) => {
                    return (
                        <View>
                            <TouchableOpacity onPress={() => navigation.navigate("AlteraCriptos", {
                                id: item.id,
                                nomeCripto: item.nomeCripto,
                                siglaCripto: item.siglaCripto,
                                valorCripto: item.valorCripto

                            })}>
                                <View>
                                    <Text> Criptomoeda: <Text>{item.nomeCripto}</Text></Text>
                                    <Text> Sigla: <Text>{item.siglaCripto}</Text></Text>
                                    <Text> Valor: <Text>{item.valorCripto}</Text></Text>
                                </View>
                            </TouchableOpacity>
                            <View>
                                <TouchableOpacity onPress={() => { deleteCripto(item.id) }} >
                                    X
                                </TouchableOpacity>
                            </View>
                        </View>
                    );
                }}
            />
            <TouchableOpacity onPress={() => navigation.navigate("CadastrarCriptos")}>
                +
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
        textAlignVertical: 'center',
        marginVertical: 10,
    },
    addbutton: {
        backgroundColor: '#ffffff',
        borderRadius: 50,
        position: 'absolute',
        left: 20,
        bottom: 40,
        justifyContent: "center",
        alignItems: "center",
    },
});