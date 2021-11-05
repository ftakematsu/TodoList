import * as React from 'react';
import { Text, View, StyleSheet, FlatList, Button, SafeAreaView } from 'react-native';
import Constants from 'expo-constants';
import Header from './src/Header.js';
import TodoList from './src/TodoList.js';
import { useEffect } from 'react';

export default function App() {

  const [myTodoList, setMyTodoList] = React.useState([]);
  const [totalItens, setTotalItens] = React.useState(0);
  const [textAtual, setTextAtual] = React.useState("");

  const buscarTodos = async () => {
    try {
      const response = await fetch("https://22e0c9f7-1ff9-45c2-b170-a410f270df47-ap-southeast-1.apps.astra.datastax.com/api/rest/v2/keyspaces/todolist/todos/rows", {
        method: 'GET',
        headers: {
          'X-Cassandra-Token': 'AstraCS:YQLqLEezeziqaoasRIWpciUu:9fd53af7e76c27c85705477dc2deca6d20e79302339bfdd45a2faf90dbb11d57'
        }
      });

      const dadosTodos = await response.json();
      //alert(dadosTodos.data); 
      
      let dadosOrdenados = dadosTodos.data.sort( function(a, b) {
        return a.id - b.id;
      });

      setMyTodoList(dadosOrdenados);
      setTotalItens(dadosTodos.count);
    }
    catch (error) { 
      
    }
  }

  const inserirTodo = async (text) => {
    try {
      let idAtual = totalItens + 1;
      //let idAtual = myTodoList[myTodoList.length-1].id + 1;
      // Criando um objeto no formato JSON

      const response = await fetch("https://22e0c9f7-1ff9-45c2-b170-a410f270df47-ap-southeast-1.apps.astra.datastax.com/api/rest/v2/keyspaces/todolist/todos",
      {
        method: 'POST',
        headers: {
            'X-Cassandra-Token': 'AstraCS:YQLqLEezeziqaoasRIWpciUu:9fd53af7e76c27c85705477dc2deca6d20e79302339bfdd45a2faf90dbb11d57'
        },
        body: JSON.stringify({
          id: idAtual,
          name: text,
          status: 0
        })
      }).then((response) => {
          //buscarTodos();
          //alert("Todo incluído com sucesso!");
      }).catch((error) => {
        //alert(error);
      });
    }
    catch (error) {
      //alert(error);
    }
  }

  const addMyTodo = (text) => {
    inserirTodo(text);
  }


  /**
   * item: um objeto individual da lista
   */
  const checkTodo = (item) => {
    let copyList = myTodoList;
    let index = copyList.indexOf(item); // Retorna o índice de um elemento
    copyList[index].checked = true; // Atualiza o atributo como true
    // copyList[index].title = "Finished";
    setMyTodoList(copyList); // Atualiza a lista
    //alert(myTodoList[index].title + " " + myTodoList[index].id + " " + myTodoList[index].checked);
  }

  useEffect( () => {
    buscarTodos();
  } );


  return (
    <SafeAreaView style={styles.container}>
      <Header 
        title="Minha lista de tarefas"
        addTodo={addMyTodo}
      />

      
      <TodoList 
        myTodoList = {myTodoList}
        checkTodo = {checkTodo}
      />

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
