

import React from 'react';
import { Button ,Platform, StyleSheet, Text, View,TextInput  } from "react-native";

import MqttService from "../src/core/services/MqttService";

import OfflineNotification from "../src/core/components/OfflineNotifications";

const instructions = Platform.select({

    ios: "Press Cmd+R to reload,\n" + "Cmd+D or shake for dev menu",
  
    android:
  
      "Double tap R on your keyboard to reload,\n" +
  
      "Shake or press menu button for dev menu"
  
  });

export default class MQTTUser extends React.Component {


    
    constructor(props)
    {
        super(props);

        this.state= {
            isConnected: false,
            message:"",
            text:"",
        }
    }

    componentDidMount(){
        MqttService.connectClient(

            this.mqttSuccessHandler,
      
            this.mqttConnectionLostHandler
      
          );

    }

    onWORLD=message=> {

        this.setState({
        
        message
        
        });
    };

    mqttSuccessHandler = () => {

        MqttService.subscribe('joakim.flink@abbindustrigymnasium.se/lampa', this.onWORLD)
    
        console.info("connected to mqtt");
        this.setState({
    
          isConnected: true
    
        });
        
    
      };
    
      mqttConnectionLostHandler = () => {
    
        this.setState({
    
          isConnected: false
    
        });
    
      };


      onPublish= () => {

        // MqttService.publishMessage("joakim.flink@abbindustrigymnasium.se/lampa", "Hello from the app");
        MqttService.publishMessage("joakim.flink@abbindustrigymnasium.se/lampa", this.state.text);
        
        }
      
    render() {
        const {isConnected,message  } = this.state;

    return (

      <View style={styles.container}>

        {!isConnected && <OfflineNotification />}


        <Text style={styles.instructions}>{instructions}</Text>
        
        <Text style={styles.welcome}>You received message: {message}</Text>
        <Button

onPress={this.onPublish}

title="Publish"

color="#841584"

/> 
 <TextInput
 style={styles.textbox}
        multiline
        numberOfLines={4}
        onChangeText={(text) => this.setState({text})}  
  
      />

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
    
      },
      textbox: {
    
    
        backgroundColor: "#ffffb3",
        
        marginBottom: 5
    
      }

})
