import React,{useState,useEffect} from "react";
import{StyleSheet,FlatList,View,Text,ActivityIndicator} from "react-native";
import axios from "axios";
//import { red100 } from "react-native-paper/lib/typescript/styles/themes/v2/colors";



const App=()=>{
  const [users,setUsers]=useState([]);
  const [currentPage,setCurrentPage]=useState(1);
  const getUsers =()=>{
    axios.get(`https://randomuser.me/api/?page=${currentPage}&results=20`)
    .then(res=>{
      //setUsers(res.data.results);
      setUsers([...users, ...res.data.results]);
    })
  }

  const renderItem=({item})=>{
    return(
      <View style={StyleSheet.itemWrapperStyle}>
      <View style={StyleSheet.contentWrapperStyle}>
        <Text style={styles.textNameStyle}>{`${item.name.title} ${item.name.first} ${item.name.last}`}</Text>
        <Text style={styles.textEmailStyle}>{item.email}</Text>
      </View>
      </View>
    )
  }

  const renderLoader=()=>{
    return(
      <View style={styles.loaderStyle}>
        <ActivityIndicator size="large" color="#aaa"/>
      </View>
    )
  }
  const loadMoreItem=()=>{
    setCurrentPage(currentPage+1);
  }
  useEffect(()=>{
    getUsers();
  },[currentPage])
  return(
    <FlatList
      data={users}
      renderItem={renderItem}
      keyExtractor={item=>item.email}
      ListFooterComponent={renderLoader}
      onEndReached={loadMoreItem}
      onEndReachedThreshold={0}
    />
  )
}

const styles=StyleSheet.create({
  itemWrapperStyle:{
    flexDirection:'row',
    paddingHorizontal:16,
    paddingVertical:16,
    borderBottomWidth:2,
    backgroundColor:'#ddd'
  },
  itemImageStyle:{
    width:50,
    height:50,
    marginRight:16
  },
  contentWrapperStyle:{
    justifyContent:"space-around"
  },
  textNameStyle:{
    textAlign:"center",
    fontSize:25
  },
  textEmailStyle:{
    textAlign:"center",
    fontSize:18,
    marginBottom:7,
    color:'#90ee90'
  },
  loaderStyle:{
    marginVertical:16,
    alignItems:'center'
  }
})

export default App;
