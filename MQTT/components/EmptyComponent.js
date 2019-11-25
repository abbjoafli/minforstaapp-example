

import React from 'react';
import { StyleSheet, Text, View } from "react-native";





export default class EmptyComponent extends React.Component {


    
    constructor(props)
    {
        super(props);

        this.state= {
            message:"Det här är en exempelvariabel",
            booltest:false,
            arraytest:["Kalle","Kulle","Bulle"],
        }
    }

    componentDidMount(){
        
        console.info("Startad, här är en variabel från state"+ this.state.booltest);
        this.Exempelmetod();
    }

    Exempelmetod(){
       let array= this.state.arraytest;
       array.push("Jocke");
       this.setState({arraytest:array});
    }


 AnnanExempelmetod(){
    return this.state.arraytest.map((namn,i) => {
   
   return ( <View key={i} style={styles.container}>
      
   <Text style={styles.instructions}>{i}.{namn}</Text>

   
   </View>
   );
    });
   }
 
      
    render() {
        const state = this.state;

    return (

      <View style={styles.container}>


        <Text style={styles.welcome}> {state.message}!</Text>


        { this.AnnanExempelmetod()}
      </View>

    );
      }
}
const styles= StyleSheet.create({
    container: {

        flex: 1,
    
        justifyContent: "center",
    
        alignItems: "center",
    
        backgroundColor: "#F5FCFF"
    
      },
    
      welcome: {
    
        fontSize: 20,
    
        textAlign: "center",
    
        margin: 10
    
      },
    
      instructions: {
    
        textAlign: "center",
    
        color: "#333333",
    
        marginBottom: 5
    
      }

})
