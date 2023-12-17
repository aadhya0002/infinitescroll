import React,{useState,useEffect} from "react";
import{StyleSheet,FlatList,View,Text,ActivityIndicator} from "react-native";
import axios from "axios";
import client from "./sanity";
//import { red100 } from "react-native-paper/lib/typescript/styles/themes/v2/colors";



const App=()=>{
  const [users,setUsers]=useState([]);
  const [currentPage,setCurrentPage]=useState(0);
  const [data, setData] = useState([]);

  
  // let query = `*[_type == "placement23"]{...}`;
  // client.fetch(query)
  // .then(res=>{
  //   setUsers(res);
  // })

  const renderItem=({item})=>{
    return(
      <View style={StyleSheet.itemWrapperStyle}>
      <View style={StyleSheet.contentWrapperStyle}>
        <Text style={styles.textNameStyle}>{`${item.name} ${item.name.first} ${item.name.last}`}</Text>
        <Text style={styles.textEmailStyle}>{item.email}</Text>
      </View>
      </View>
    )
  }

  const renderLoader=()=>{
    //{setTimeout(()=>{
      return(
        <View style={styles.loaderStyle}>
            <ActivityIndicator size="large" color="#aaa"/>
        </View>
      )
    //},200)}
  }

  useEffect(()=>{
    const value  = 10 + (10*currentPage);
    let query=`*[_type == "placement23"]{...}`;
    client.fetch(query).then((res)=>{
      setData(res.slice(0,value));
    })
    // const data = users.slice(0,value);
    // setData(data);
    

  },[currentPage])
  return(
    <FlatList
      data={data}
      renderItem={renderItem}
      onEndReached={()=>{
        setCurrentPage(currentPage+1);
      }}
      onEndReachedThreshold={0.5}
      ListFooterComponent={renderLoader}
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
