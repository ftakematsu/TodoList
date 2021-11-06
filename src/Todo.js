import React, {useRef} from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { EvilIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { CheckBox } from 'react-native-elements';

function Todo({item, checkTodo, setSelectedId}) {

  const [isVisible, setIsVisible] = React.useState(true);
  const [isChecked, setIsChecked] = React.useState(item.status);

  const alterarStatusItemApi = async () => {
    const response = await fetch("https://22e0c9f7-1ff9-45c2-b170-a410f270df47-ap-southeast-1.apps.astra.datastax.com/api/rest/v2/keyspaces/todolist/todos/" + item.id, {
      method: "PATCH",
      headers: {
        'X-Cassandra-Token': 'AstraCS:YQLqLEezeziqaoasRIWpciUu:9fd53af7e76c27c85705477dc2deca6d20e79302339bfdd45a2faf90dbb11d57'
      },
      body: JSON.stringify({
        status: (!isChecked) ? 1 : 0
      })
    }).then((response) => {
      setIsChecked(!isChecked);
    });
  }

  const removerItemApi = async () => {
    const response = await fetch("https://22e0c9f7-1ff9-45c2-b170-a410f270df47-ap-southeast-1.apps.astra.datastax.com/api/rest/v2/keyspaces/todolist/todos/" + item.id, {
      method: "DELETE",
      headers: {
        'X-Cassandra-Token': 'AstraCS:YQLqLEezeziqaoasRIWpciUu:9fd53af7e76c27c85705477dc2deca6d20e79302339bfdd45a2faf90dbb11d57'
      }
    }).then((response) => {
      setIsVisible(!isVisible);
    });
  }

  const handleCheck = () => {
    alterarStatusItemApi();
  }

  const handleVisible = () => {
    removerItemApi();
  }

  const selectItem = () => {
    //alert("Você concluiu a tarefa " + item.id + ": " + item.title);
    setSelectedId(item.id);
    checkTodo(item);
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


  // Se estiver visível, retornar vazio
  if (isVisible === false) {
    return (
      <View></View>
    );
  }
  /* Aqui define a aparência de cada item = item.name */
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
