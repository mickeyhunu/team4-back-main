var mqtt = require('mqtt');
const dotenv = require('dotenv');
const logger = require('../lib/logger');
const mqttService = require('../service/mqttService');

dotenv.config();

const mqtt_connect = {
  connecting(did){
    const clientId = `mqtt_${Math.random().toString(16).slice(3)}`

    if(did === 1){
      this.client = mqtt.connect({
        clientId,
        protocol: 'ws',
        reconnectPeriod: 1000,
        hostname: process.env.MACHINE1_HOST,
        port: process.env.MACHINE1_PORT,
        path: process.env.MACHINE1_PATH,
      })
    }
    else if(did === 2){
      this.client = mqtt.connect({
        clientId,
        protocol: 'ws',
        reconnectPeriod: 1000,
        hostname: process.env.MACHINE2_HOST,
        port: process.env.MACHINE2_PORT,
        path: process.env.MACHINE2_PATH,
      })
    }

    this.client.on('connect', () => {
      const topic = 'myEdukit'
      console.log(did+'번 machine MQTT Connected')
  
      this.client.subscribe([topic], () => {
        console.log(`토픽 연결 완료: ${topic}`)
      })
  
      this.client.on('message', async (topic, payload) => {
        // console.log(`토픽 ${topic}에서 전송된 메시지: ${payload.toString()}`);
        let message = JSON.parse(payload)
        let data = message.Wrapper.filter(p => p.tagId === '0' || p.tagId === '1' || p.tagId === '2' || p.tagId === '3' || p.tagId === '4' || p.tagId === '5' || p.tagId === '6' || p.tagId === '7' || p.tagId === '8' || p.tagId === '9' || p.tagId === '10' || p.tagId === '11' || p.tagId === '12' || p.tagId === '13' || p.tagId === '14' || p.tagId === '15' || p.tagId === '16' || p.tagId === '17' || p.tagId === '18' || p.tagId === '19' || p.tagId === '20' || p.tagId === '21' || p.tagId === '22' || p.tagId === '23' || p.tagId === '24' || p.tagId === '25' || p.tagId === '26' || p.tagId === '27' || p.tagId === '28' || p.tagId === '29' || p.tagId === '30' || p.tagId === '31' || p.tagId === '32' || p.tagId === '33' || p.tagId === '34' || p.tagId === '35' || p.tagId === '36' || p.tagId === '37' || p.tagId === '38' || p.tagId === '39' || p.tagId === '40')
        console.log(did+'번 machine MQTT Reading...');
        
        const params = {
          deviceId : did,
          DataTime: data[40].value,
          Start: data[0].value,
          No1PartsError: data[1].value,
          No1_Action: data[2].value,
          No2_Action: data[3].value,
          No3Ready: data[4].value,
          ColorSensor: data[5].value,
          VisionSensor: data[29].value,
          Reset: data[6].value,
          no1_on_off: data[7].value,
          no2_on_off: data[8].value,
          no3_on_off: data[9].value,
          seonsor1_on_off: data[10].value,
          seonsor2_on_off: data[11].value,
          No1Delay: data[30].value,
          No1Count: data[31].value,
          No2Count: data[32].value,
          No3Count: data[33].value,
          lamp_green: data[12].value,
          lamp_yellow: data[13].value,
          lamp_red: data[14].value,
          No3Motor1: data[34].value,
          No3Motor2: data[35].value,
          No1ChipFull: data[15].value,
          No2Chip: data[16].value,
          No2CubeFull: data[17].value,
          No2InPoint: data[18].value,
          No2OutPoint: data[19].value,
          No2Sol: data[20].value,
          No2SolAction: data[21].value,
          No2BackToSquare: data[22].value,
          No2Mode: data[23].value,
          No3Chip: data[24].value,
          VisionCmdMemory: data[25].value,
          No3DiceReading: data[36].value,
          Emergency: data[26].value,
          OutputLimit: data[37].value,
          DiceValue: data[38].value,
          DiceComparisonValue: data[39].value,
          ColorSensorSensing: data[27].value,
          No3Gripper: data[28].value,
        }

        await mqttService.reg(params);
      })
    })
  }
}

module.exports = mqtt_connect;