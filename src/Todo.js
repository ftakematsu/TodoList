import React from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";

function Todo({item, checkTodo, setSelectedId}) {

  const selectItem = () => {
    //alert("Você concluiu a tarefa " + item.id + ": " + item.title);
    setSelectedId(item.id);
    checkTodo(item);
  }

  return (
    <TouchableOpacity 
      onPress={ selectItem } 
      style={ (item.status==1) ? styles.itemChecked : styles.itemNonChecked }
    >
      <Text style={styles.title}>{item.name}</Text>
    </TouchableOpacity>
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
});

export default Todo;
