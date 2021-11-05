import React, { useRef, useState } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { EvilIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { CheckBox } from 'react-native-elements';

function Todo({item, checkTodo, setSelectedId}) {

  const [isVisible, setIsVisible] = React.useState(true);
  const [isChecked, setIsChecked] = React.useState(item.status);

  const handleCheck = () => {
    setIsChecked(!isChecked); 
    
    // TODO incluir o comando para definir a tarefa como concluída
  }

  const handleVisible = () => {
    setIsVisible(!isVisible);
    alert("Você removeu o item " + item.id);
    // TODO incluir o comando para remover o item a partir da API
  }
  
  const swipeRef = useRef();

  const closeSwipable = () => {
    swipeRef?.current?.close();
  }

  const rightAction = () => {
    return (
      <View style={styles.rightSwipe}>
        <Text style={{ color: "#fff" }}>Remover</Text>
      </View>
    );
  }

  const leftAction = () => {
    if (isChecked) {
      return (
        <View style={styles.leftSwipeIncomplete}>
          <Text style={{ color: '#fff' }}>Desmarcar</Text>
        </View>
      );
    }
    else {
      return (
        <View style={styles.leftSwipeComplete}>
          <Text style={{ color: "#fff" }}>Marcar</Text>
        </View>
      );
    }
  }

  

  const selectItem = () => {
    //alert("Você concluiu a tarefa " + item.id + ": " + item.title);
    setSelectedId(item.id);
    checkTodo(item);
  }

  // Se estiver visível, retornar vazio
  if (isVisible === false) {
    return (
      <View></View>
    );
  }

  return (
    <Swipeable
      ref={swipeRef}
      onSwipeableOpen={closeSwipable}
      onSwipeableRightOpen={handleVisible}
      onSwipeableLeftOpen={handleCheck}
      renderLeftActions={leftAction}
      renderRightActions={rightAction}
      overshootFriction={1}
      friction={1}
      containerStyle={{overflow: 'hidden'}}
    >
        <View style={styles.item}>
          <CheckBox
            style={styles.toggle}
            checkedIcon='check-circle'
            uncheckedIcon='radio-button-unchecked'
            checked={isChecked}
            onIconPress={handleCheck}
            color={'#3293b3'}
            iconType={'material'}
          />
          <Text style={isChecked ? styles.complete : styles.incomplete}>{item.name}</Text>
          <TouchableOpacity onPress={handleVisible}><EvilIcons name='trash' size={28} color='#af5b5e'/></TouchableOpacity>
        </View>
    </Swipeable>

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

export default Todo;
