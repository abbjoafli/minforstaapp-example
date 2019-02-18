import React from "react";
import {
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  WebView,
  StyleSheet
} from "react-native";
export default class Calender extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      difference: null,
      breaks: [
        {
          name: "Sportlov",
          startDate: "25",
          startMonth: "2"
        },
        {
          name: "Påsklov",
          startDate: "15",
          startMonth: "4"
        },
        { name: "Sommarlov", startDate: "13", startMonth: "6" },
        { name: "Katt1 födelsedag", startDate: "15", startMonth: "6" },
        { name: "Katt2 födelsedag", startDate: "24", startMonth: "6" },
        { name: "Födelsedag", startDate: "20", startMonth: "10" },
        { name: "Katt3 födelsedag", startDate: "25", startMonth: "10" },
        { name: "Halloween", startDate: "30", startMonth: "10" },
        { name: "Julafton", startDate: "24", startMonth: "12" },
        { name: "Nyår", startDate: "29", startMonth: "12" }
      ]
    };
  }

  componentDidMount() {
    let day = new Date();
    let payday = new Date(day.getUTCFullYear(), day.getMonth(), 25);
    let difference = payday.getDate() - day.getDate();
    if (day.getDate() > 25) {
      daysleft = this.DaysInMonth(day, day.getMonth()) - day.getDate();
      difference = daysleft + 25;
    }
    console.log(difference);
    let tempbreaks=  this.state.breaks;
    tempbreaks.forEach(importantday => {
      let Enddate= new Date(day.getFullYear(),importantday.startMonth,importantday.startDate);
  importantday.daysLeft= this.DaysLeftCalc(day,Enddate);
console.log(importantday);
  
    });
  

    this.setState({
      difference: difference,
      breaks:tempbreaks
    });
  }

DaysLeftCalc(startdate,enddate){
  enddate.setMonth(enddate.getMonth()-1);
if (startdate.getMonth()== enddate.getMonth()){
  if (startdate.getDate()> enddate.getDate()) {
    return 0;
  }
  else
  return enddate.getDate()-startdate.getDate();
  }
  else
  {
    let totaldays= 0;
    totaldays+=  this.DaysLeftInMonth(startdate);
    totaldays+=  this.DaysLeftInMonth(enddate);
    if (startdate.getMonth() +1 !=enddate.getMonth()) {
      numberofwholemonths= enddate.getMonth()- startdate.getMonth();
      while (numberofwholemonths>0) {
        totaldays+= this.DaysInMonth(startdate,numberofwholemonths+startdate.getMonth());
        numberofwholemonths-=1;
      }
    }
    return totaldays;
  }

}
DaysLeftInMonth(day) {
  let daysinmonth= new Date(day.getUTCFullYear(),day.getMonth(),0);
  return daysinmonth.getDate()- day.getDate();
}
  DaysInMonth(day, month) {
    return new Date(day.getUTCFullYear(), month, 0).getDate();
  }

  WriteOutBreaks() {
    return this.state.breaks.map((Thebreak, i) => {
      return (
        <View key={i} style={styles.Frame}>

{Thebreak.daysLeft!=0?<Text style={styles.Titletext}>{Thebreak.name} är om {Thebreak.daysLeft}!</Text>:null}

         
        </View>
      );
    });
  }

  render() {
    return (
      <View style={{ marginTop: 20, flex: 1 }}>
        <Text style={styles.Titletext}>
          Nästa lön är om {this.state.difference} dagar!
        </Text>
        {this.WriteOutBreaks()}
      </View>
    );
  }
}
const styles = StyleSheet.create({
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
  }
});
