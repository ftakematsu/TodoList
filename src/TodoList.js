import React from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import Todo from "./Todo.js";

function TodoList({myTodoList, checkTodo}) {

  const [selectedId, setSelectedId] = React.useState(null);
 

  // Esta função está operando sobre um item individual da minha lista
  const renderItem = ({ item }) => (
    <Todo 
      item={ item } 
      checkTodo= { checkTodo }
      setSelectedId = { setSelectedId }
    />
  );

  return (
    <FlatList
      data={myTodoList}
      extraData={selectedId}
      renderItem={renderItem}
      keyExtractor={item => item.id}
    />
  );

}

const styles = StyleSheet.create({
  itemNonChecked: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  itemChecked: {
    backgroundColor: '#2ECC71',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  complete: {
    textDecorationLine: 'line-through',
    fontSize: 18,
    flex: 1,
    flexWrap: 'wrap'
  },
  incomplete: {
    fontSize: 18,
    flex: 1,
    flexWrap: 'wrap'
  },
  toggle: {
    flexDirection: 'row',
  },
  item: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: 5,
    alignItems: 'center',
    paddingRight: 10,
    borderColor: '#d0dde2',
    borderWidth: 0.5,
    borderRadius: 12,
    backgroundColor: '#fff',
    paddingVertical: 3,
  },
  rightSwipe: {
    flex: 1,
    backgroundColor: '#af5b5e',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 15,
    marginBottom: 5,
  },
  leftSwipeComplete: {
    flex: 1,
    backgroundColor: '#3293b3',
    borderRadius: 12,
    justifyContent: 'center',
    paddingLeft: 15,
    marginBottom: 5,
  },
  leftSwipeIncomplete: {
    flex: 1,
    backgroundColor: '#20b286',
    borderRadius: 12,
    justifyContent: 'center',
    paddingLeft: 15,
    marginBottom: 5,
  },
});

export default TodoList;