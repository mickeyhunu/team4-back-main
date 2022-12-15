var mqtt = require('mqtt');
const dotenv = require('dotenv');
const logger = require('./logger');
const productService = require('../service/productService');

dotenv.config();

const mqtt_connect_2 = {    //connecting mqtt & reading from plc
  connecting(id, _protocol, _reconnectPeriod, _hostname, _port, _path){
    const clientId = `mqtt_${id}_${Math.random().toString(16).slice(3)}`

    this.client = mqtt.connect({
      clientId,
      protocol: _protocol,
      reconnectPeriod: _reconnectPeriod,
      hostname: _hostname,
      port: _port,
      path: _path,
    })

    let goods = false //생산품 출고 여부
    let prev_goods = false

    let color = false  //색깔 판별 여부
    let prev_color = false
    
    let dice_check = false  //주사위 판별 여부

    let dice = 0  //주사위 판별 여부
    let prev_dice = 0

    this.client.on('connect', () => { //subscribing data
      try{
        const topic = 'myEdukit'
        console.log(id+'번 machine MQTT Connected')

        this.client.subscribe([topic], () => {
          console.log(`토픽 연결 완료: ${topic}`)
        })

        this.client.on('message', async (topic, payload) => {
          try{
            let message = JSON.parse(payload)
            try{
              console.log(id+'번 machine MQTT Reading...');

              prev_goods = goods  //이전 출고 상태 확인
              prev_color = color  //이전 색깔 확인
              prev_dice = dice  //이전 주사위 확인

              let data = message.Wrapper.filter(p => p.tagId === '0' || p.tagId === '1' || p.tagId === '2' || p.tagId === '3' || p.tagId === '4' || p.tagId === '5' || p.tagId === '6' || p.tagId === '7' || p.tagId === '8' || p.tagId === '9' || p.tagId === '10' || p.tagId === '11' || p.tagId === '12' || p.tagId === '13' || p.tagId === '14' || p.tagId === '15' || p.tagId === '16' || p.tagId === '17' || p.tagId === '18' || p.tagId === '19' || p.tagId === '20' || p.tagId === '21' || p.tagId === '22' || p.tagId === '23' || p.tagId === '24' || p.tagId === '25' || p.tagId === '26' || p.tagId === '27' || p.tagId === '28' || p.tagId === '29' || p.tagId === '30' || p.tagId === '31' || p.tagId === '32' || p.tagId === '33' || p.tagId === '34' || p.tagId === '35' || p.tagId === '36' || p.tagId === '37' || p.tagId === '38' || p.tagId === '39' || p.tagId === '40')
              const params = {  //mapping data
                deviceId : id,
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
              
              goods = params.No1_Action
              if(goods == true && prev_goods == false){
                const _params = {
                  deviceId: id,
                  productId: 1,
                  fair: 0,
                  dice: 0,
                  color: '빨간색'
                }
                dice_check = true
                await productService.reg(_params);
              }

              color = params.ColorSensor
              if(color == true && prev_color == false){
                const _params = {
                  deviceId: id,
                  color: '흰색'
                }
                await productService.edit_color(_params);
              }

              dice = params.DiceValue
              if(dice_check==true && prev_dice != dice){
                if(dice == 1 || dice == 0){
                  const _params = {
                    deviceId: id,
                    dice: dice,
                    fair: 0
                  }
                  await productService.edit_dice(_params);
                }
                else {
                  const _params = {
                    deviceId: id,
                    dice: dice,
                    fair: 1,
                  }
                  await productService.edit_dice(_params);
                }
                dice_check = false
              }
            }
            catch{
              const err = new Error(id+'번 machine MQTT reading Failed')
              return logger.error(err.toString());
            }
          } catch{
            console.log(id+'번 machine MQTT Not reading')
          }
        })
      }catch (err) {
        console.log(id+'번 machine MQTT Disconnected')
      }
    })
  }
}

module.exports = { mqtt_connect_2};