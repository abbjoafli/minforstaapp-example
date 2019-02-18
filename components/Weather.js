import React from 'react';
import TabBarIcon from '../components/TabBarIcon';
import {Platform} from "react-native";
import { Text,View,Image,ScrollView,TouchableOpacity, WebView,StyleSheet } from 'react-native';
export default class Weather extends React.Component {

    constructor(props)
    {
        super(props);

        this.state= {
            weatherdata: null,
            källa: "https://www.yr.no/sted/Sverige/Västmanland/Västerås/varsel.xml",
            loadin: false,
            location: null,
            Suninfo: null
        }
    }

    componentDidMount(){
      const parseString= require("react-native-xml2js").parseString;

        return fetch(this.state.källa)
        .then((response) => response.text())
        .then((responseData) => parseString(responseData, (err,result)=> {

  console.log(result.weatherdata);
          console.log(result.weatherdata.sun[0].$);
          // console.log(rss.items[0]);
          let sun= result.weatherdata.sun[0].$;
          let location= result.weatherdata.location[0];
          let data= result.weatherdata.forecast[0].tabular[0].time;
          this.setState({
              Suninfo: sun, loadin:true,
              weatherdata: data,
              location:location
          });

        }));
    }
Solen(){
  const solupp= new Date(this.state.Suninfo.rise);
  const solned= new Date(this.state.Suninfo.set);
return (
  <View>
<Text  style={styles.Titletext}>
Soluppgång: {solupp.getHours()+":"+solupp.getMinutes()}
<TabBarIcon name={Platform.OS==="ios"?"ios-sunny":"md-sunny"}/>
</Text>
<Text  style={styles.Titletext}>
Solnedgång: {solned.getHours()+":"+solned.getMinutes()}
<TabBarIcon name={Platform.OS==="ios"?"ios-moon":"md-moon"}/>
</Text>

  </View>
);

}

Hourconveter(tid,idag,imorgon,iövermorgon){
let timmar = tid.getDate()+"/"+(tid.getMonth()+1)+ " klockan "+tid.getHours();
if (tid.toDateString()===idag.toDateString()) {
   timmar = "Idag klockan "+tid.getHours();
}
else if (tid.toDateString()===imorgon.toDateString()) {
  timmar = "Imorgon klockan "+tid.getHours();
}
else if (tid.toDateString()===iövermorgon.toDateString()) {
  timmar = "Iövermorgon klockan "+tid.getHours();
}
return timmar;
}

Symbolmapper(number){
 if (number==12 || number==13) {
   return "snow";
}
else if (number==1 ||number==2) {
  return "contract";
}
else if (number==3 ||number==4) {
  return "partly-sunny";
}
else if (number==5) {
  return "rainy";
}
else if (number==9) {
  return "water";
}
}

Heatmapper(heat){
  if (heat <-9) {
    return "svinkallt";
 }
 else if (heat<0) {
   return "kallt";
 }
 else if (heat >10) {
   return "varmt";
 }
 else if (heat >20) {
   return "svinvarmt";
 }
 else  
   return "ok";
 
}

WriteoutWeather(){
const idag= new Date();
const imorgon= new Date(idag.getTime()+1*8640000)
const iövermorgon= new Date(idag.getTime()+2*8640000)

 return this.state.weatherdata.map((value,i) => {
const tid= new Date(value.$.from);
let timmar = this.Hourconveter(tid,idag,imorgon,iövermorgon);
let heat= value.temperature[0].$.value;
let extrastyle=this.Heatmapper(heat);
let symbol = this.Symbolmapper(value.symbol[0].$.number);

return ( <View key={i} style={styles.Frame}>
   
<Text style={[styles.Titletext,styles[extrastyle]]}>{timmar}:{heat}

<TabBarIcon name={Platform.OS==="ios"?"ios-"+[symbol]:"md-"+[symbol]}/>
</Text>
</View>
);
 });
}

  render() {
    if (this.state.loadin!=true) { 
        return( 
          <View style={{marginTop:20,flex:1}}>
             <TouchableOpacity onPress={this.closeLink}>
                <Text style={styles.Titletext}>Vänta</Text>
             </TouchableOpacity>
           
          </View>
    
        );
          }

      else
      return(  <View style={styles.component}> <View style={{marginTop:20,flex:1}}>
      <Text  style={styles.Titletext} >Väder för {this.state.location.name[0]}, {this.state.location.country[0]}</Text>
   
        {this.Solen()}
      <ScrollView  style={styles.Frame}>

    { this.WriteoutWeather()}
      </ScrollView>
  </View>  </View>  );
}
}
const styles= StyleSheet.create({

    Image: {
        width: "60%",
        height: 80,
        resizeMode: "contain",
        marginTop: 3,
        marginLeft: -10
      },
      Titletext: {
        marginLeft: 2,
        fontSize: 20,
        fontWeight: "bold",
        color: "black",
        lineHeight: 24,
        textAlign: "left"
      },
      Frame: {
        borderRadius: 4,
        borderWidth: 0.5,
        borderColor: "#d6d7da"
      },
      component: {
        backgroundColor: "white",
        width: "100%",
        flexDirection: "row",
        paddingLeft: 3,
        paddingRight: 3,
        paddingTop: 7.5,
        paddingBottom: 7.5
      },
      kallt:{backgroundColor:"blue"},
      svinkallt:{backgroundColor:"grey"},
      ok:{backgroundColor:"green"},
      svinvarmt:{backgroundColor:"red"},
      varmt:{backgroundColor:"yellow"},


})
