# MQTT I REACT NATIVE
Följ denna länk för att använda MQTT i REACT NATIVE [how-to-use-mqtt-with-react-native](https://motion-software.com/blog/how-to-use-mqtt-with-react-native/).
## Ändringar som behöver göras
### MqttService.js
1. Det ni måste ändra för att få det att fungera är först och främst rad 3 i MqttService.js till
`import init from "../libraries/mqtt";` så den kopplar rätt.

2. Efter det så måste ni lägga till er MQTT broker adress, min är den nedan. Detta ändrar ni på rad 26
`this.client=new Paho.MQTT.Client('ws://maqiatto.com:8883/ws', clientId);`

3. På rad 54 måste ni lägga till användarnamnet och lösenordet för att kunna ansluta till det.
`this.client.connect({userName : "joakim.flink@abbindustrigymnasium.se",password : "lösen",`

### MQTTUSER (eller vad man nu döper sin MQTT komponent till)

4. I onSubscribe vill man ändra till sin topics adress, min är nedan
`        MqttService.subscribe('joakim.flink@abbindustrigymnasium.se/lampa', this.onWORLD)`

