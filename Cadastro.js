import React, {useState, useEffect} from "react";
import { View, TextInput, Button, StyleSheet, Text, FlatList } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Cadastro = () =>{
    const[nome,setNome]= useState('');//variavel que armazena o nome
    const[idade,setIdade]= useState('');//variavel que armazena o endereço
    const[mensagem,setMensagem]= useState('');//variavel que armazena mensagem
    const[usuarios,setUsuarios]= useState([]);//array que armzena o nome e idade

    //useEffect executa no momento que carrega o componente e a tem a função de carregar as informações salvas ou quando muda.
    useEffect(()=>{
        //é uma função assicrona, ou seja, espera até que algo esteja pronto para continuar 
        const carregarUsuarios = async() =>{
            //busca usuarios(nome e idade) salvos no AsyncStorage
            const usuariosSalvos = await AsyncStorage.getItem('usuarios');
            if (usuariosSalvos){//verificar se existe dados guardados
                setUsuarios(JSON.parse(usuariosSalvos));//Converte JSON para array e atualiza no array usuarios
            } 

        };
        carregarUsuarios();//chama a função ao iniciar o componente
    },[]); // Roda apenas uma vez 

    //função de cadastro de novo usuário

    const handleCadastro = async() =>{
        try{
            const usuario ={nome, idade}//cria um objeto usuários com os dados de nome e idade
            const novoUsuarios = [...usuarios, usuario]//adcionar um novo usuario a lista atual
            await AsyncStorage.setItem('usuarios', JSON.stringify(novoUsuarios));//Salva a lista de usuários no banco de dados
            
            setMensagem('Cadastro Realizado com sucesso!')//mensagem de sucesso
            setNome('')//limpar o campo 
            setIdade('')//limpar o campo
            setUsuarios(novoUsuarios);//atualiza a lista de usuarios com o novo cadastro
        }
        catch{
            setMensagem('Erro ao cadastrar' + error.message);
        }
    };
    //criando a tela
    return(
        <View style={styles.container}>
            <TextInput placeholder="Nome"
            value={nome}
            onChangeText={setNome}// atualiza o estado do nome
            style={styles.input} />

            <TextInput placeholder="Idade"
            value={idade}
            onChangeText={setIdade}// atualiza o estado do nome
            style={styles.input} />

            <Button title="Cadastrar" onPress={handleCadastro}/>
            {mensagem ? <Text style={styles.mensagem}>{mensagem}</Text>:null}

            <FlatList
            data={usuarios}//define a fonte de dados para o array com os usuários cadastrados
            keyExtractor={(item, index)=>index.toString()}//define uma chave unica para cada item(cria um índice)
            renderItem={({item})=>(
                <View style={styles.usuarioContainer}>
                    <Text style={styles.usuarioTexto}>Nome: {item.nome}</Text>
                    <Text style={styles.usuarioTexto}>idade: {item.idade}</Text>
                    </View>
            )}
            style={styles.lista}//estilizar a lista
            />

            </View>
    );
};
//estilos para os componentes
const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        padding:16,
        backgroundColor:'#f9f9f9',
    },
    input:{
        height:40,
        borderColor:'gray',
        borderWidth:1,
        marginBottom:12,
        paddingLeft:8,
        borderRadius:5,
        backgroundColor:'#fff',
    },
    mensagem:{
        marginTop:12,
        color:'green',
        textAlign:'center',
    },
    lista:{
        marginTop:20,
    },
    usuarioContainer:{
        padding:10,
        marginVertical: 5,
        borderWidth:1,
        borderColor:'ccc',
        borderRadius:5,
        backgroundColor:'#e7f3fe',
    },
    usuarioTexto:{
        fontSize: 16,
    },
});

export default Cadastro;