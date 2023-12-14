import React,{useState,useEffect} from "react";
import{StyleSheet,FlatList,View,Text} from "react-native";
import axios from "axios";



const App=()=>{
  const [users,setUsers]=useState([]);
  const getUsers =()=>{
    axios.get(`https://randomuser.me/api/?page=3&results=10`)
    .then(res=>{
      setUsers(res.data.results);
    })
  }

  const renderItem=({item})=>{
    return(
      <View style={StyleSheet.itemWrapperStyle}>
      <Image style={styles.itemImageStyle} source={{uri:item.picture.large}}></Image>
      <View style={StyleSheet.contentWrapperStyle}>
        <Text style={styles.textNameStyle}>{`${item.name.title} ${item.name.first} ${item.name.last}`}</Text>
        <Text>{item.email}</Text>
      </View>
      </View>
    )
  }
  useEffect(()=>{
    getUsers();
  })
  return(
    <FlatList
      data={users}
      renderItem={renderItem}
      keyExtractor={item=>item.email}
    />
    //<View>
    //   <Text>
    //     Hello world
    //   </Text>
    // </View>
  )
}

const styles=StyleSheet.create({
  itemWrapperStyle:{
    flexDirection:'row',
    paddingHorizontal:16,
    paddingVertical:16,
    borderBottomWidth:1,
    borderColor:'red'
  },
  itemImageStyle:{
    width:50,
    height:50,
    marginRight:16
  },
  contentWrapperStyle:{
    justifyContent:"space-around"
  }
})

export default App;