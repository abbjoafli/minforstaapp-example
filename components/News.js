import React from 'react';
import { Text,View,Image,ScrollView,TouchableOpacity, WebView,StyleSheet } from 'react-native';
import * as rssParser from 'react-native-rss-parser';
export default class News extends React.Component {

    constructor(props)
    {
        super(props);

        this.state= {
            websida: this.props.websida,
            Tidskrift: "http://www.aftonbladet.se/rss.xml",
            loadin: false,
            artiklar: [],
            Website:""
        }
    }

    componentDidMount(){
        return fetch(this.state.Tidskrift)
        .then((response) => response.text())
        .then((responseData) => rssParser.parse(responseData))
        .then((rss) => {
          console.log(rss.title);
          console.log(rss.items.length);
          console.log(rss.items[0]);
          this.setState({
              artiklar: rss.items, loadin:true
          });

        });
    }

formertabild = oformateradebildadress => {
const bild= oformateradebildadress.split('"');
return bild[1];

}

openLink(link)
{
    this.setState({Website: link[0].url });
}
closeLink= () =>
{
    this.setState({Website: "" });
}

WriteOutArticles(){
 return this.state.artiklar.map((artikel,i) => {

return ( <View key={i} style={styles.Frame}>
    <TouchableOpacity 
    onPress={() => this.openLink(artikel.links) }>
<Text style={styles.Titletext}>{artikel.title}</Text>
<Image source={{ uri: this.formertabild(artikel.description) }
}style={styles.Image} ></Image>
    </TouchableOpacity>


</View>
);
 });
}

  render() {
    if (this.state.Website!="") { 
        return( 
          <View style={{marginTop:20,flex:1}}>
             <TouchableOpacity onPress={this.closeLink}>
                <Text style={styles.Titletext}>Close</Text>
             </TouchableOpacity>
            <WebView source={{uri: this.state.Website}} style={{marginTop:20,flex:1}}></WebView>
          </View>
    
        );
          }
     else if (this.state.loadin==true) { 
    return( 
      <View style={styles.component}>
          <ScrollView  style={styles.Frame}>

        { this.WriteOutArticles()}
          </ScrollView>
      </View>

    );
      }
      else
    return <Text  style={[this.props.style, { fontFamily: 'space-mono' }]} >Loading!{this.state.Tidskrift} </Text>;
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


})
