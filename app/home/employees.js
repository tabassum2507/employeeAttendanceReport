import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { Ionicons, AntDesign  } from '@expo/vector-icons'; 
import { TextInput } from 'react-native-gesture-handler';
import { useRouter } from 'expo-router';
import SearchResults from '../../components/SearchResults';

const employees = () => {
    const [employees, setEmployees] = useState([]) 
    const [input, setInput] = useState("")
    const router = useRouter()

    useEffect(() => {
    const fetchEmployeeData = async() => {
        try{
          const res = await axios.get("http://192.168.0.103:8000/employee")
          console.log("pppp", res.data)
          setEmployees(res.data)
         
        } catch (error){
          console.log("error while fetching the employees data", error)
        }
    }
    fetchEmployeeData()
    }, [])
   
  return (
    <View style={{flex: 1, backgroundColor: "#fff"}}>
      <View style={{flexDirection: "row", alignItems:"center", backgroundColor: "#fff"}}>
        <Ionicons style={{marginLeft: 10}} name="arrow-back" size={24} color="black" />
        <Pressable  style={{
            flexDirection: "row",
            alignItems: "center",
            marginHorizontal: 7,
            gap: 10,
            backgroundColor: "white",
            borderRadius: 3,
            height: 40,
            flex: 1,
          }}>
        <AntDesign name="search1" size={20} color="black" />
        <TextInput
        placeholder='Search' style={{flex: 1}} value={input} onChangeText={(text) => setInput(text)}>

        </TextInput>

        {employees.length > 0 && (
          <View>
            <Pressable onPress={() => router.push("/home/addDetails")}>
            <AntDesign name="pluscircle" size={24} color="#0072b1" />
            </Pressable>
          </View>
        )}
        </Pressable>
      </View>

      {employees.length > 0 ? (
         <SearchResults data={employees} input={input} setInput={setInput} />
       
      ) : (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text>No Data</Text>
          <Text>Press on the plus button and add your Employee</Text>
          <Pressable onPress={() => router.push("/home/addDetails")}>
            <AntDesign
              style={{ marginTop: 30 }}
              name="pluscircleo"
              size={24}
              color="black"
            />
          </Pressable>
        </View>
      )}
    </View>
  )
}

export default employees

const styles = StyleSheet.create({})