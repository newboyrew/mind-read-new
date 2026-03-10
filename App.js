import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";

export default function App() {

  const [input,setInput] = useState("")
  const [result,setResult] = useState("")
  const [loading,setLoading] = useState(false)

  const OPENAI_API_KEY = "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"

  const analyzeMind = async () => {

    setLoading(true)

    try{

      const response = await fetch("https://api.openai.com/v1/chat/completions",{

        method:"POST",

        headers:{
          "Content-Type":"application/json",
          "Authorization":"Bearer " + OPENAI_API_KEY
        },

        body: JSON.stringify({

          model:"gpt-4o-mini",

          messages:[
            {
              role:"system",
              content:"You are an AI psychologist. Analyze the user's message and return mood, situation, and what they need right now."
            },
            {
              role:"user",
              content: input
            }
          ]

        })

      })

      const data = await response.json()

      const aiText = data.choices[0].message.content

      setResult(aiText)

    }

    catch(e){
      setResult("Error analyzing mind")
    }

    setLoading(false)

  }

  return (

    <View style={styles.container}>

      <Text style={styles.title}>AI Mind Analyzer</Text>

      <TextInput
      style={styles.input}
      placeholder="Tell the AI how you feel..."
      value={input}
      onChangeText={setInput}
      multiline
      />

      <TouchableOpacity style={styles.button} onPress={analyzeMind}>
        <Text style={styles.buttonText}>Analyze My Mind</Text>
      </TouchableOpacity>

      {loading && <ActivityIndicator size="large" style={{marginTop:20}}/>}

      {result !== "" && (
        <View style={styles.resultBox}>
          <Text style={styles.result}>{result}</Text>
        </View>
      )}

    </View>

  )

}

const styles = StyleSheet.create({

container:{
flex:1,
justifyContent:"center",
padding:20,
backgroundColor:"#eef3ff"
},

title:{
fontSize:28,
fontWeight:"bold",
textAlign:"center",
marginBottom:30
},

input:{
borderWidth:1,
borderColor:"#ccc",
padding:15,
borderRadius:10,
marginBottom:20,
minHeight:100
},

button:{
backgroundColor:"#4a6cff",
padding:15,
borderRadius:10,
alignItems:"center"
},

buttonText:{
color:"white",
fontSize:16,
fontWeight:"bold"
},

resultBox:{
marginTop:30,
backgroundColor:"white",
padding:20,
borderRadius:10
},

result:{
fontSize:16
}

})