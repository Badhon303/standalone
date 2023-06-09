import paho.mqtt.client as mqtt
import json
import ast
import random
import time
import pandas as pd


from datetime import datetime as dt, timezone , timedelta

import configparser


def count():
    count.counter += 1
    return count.counter


def get_random_words(words_list):
    return words_list[random.randint(0, len(words_list)-1)]



def generate_data_array(hardware_id, dateinstance):

    # list to store JSON records
    payload = {
                  "type": "",
                  "data": {
                    "mstatus": "",
                    "cur": "",
                    "volt": "",
                    "rpm": "",
                    "gasFR": "",
                    "hstemp": "",
                    "ambtemp": "",
                    "oid": "",
                    "dis": "",
                    "network": "",
                    "tm": ""
                  }
                }
    
    # random words to inject into records
    #mid = None
    type          =     ['pData']
    mstatus       =     ['running','stop']
    weld_cur      =     0
    weld_volt     =     0
    weld_gas      =     0
    rpm           =     0
    hstemp        =     0
    ambtemp       =     0
    oid           =     '00000000'
    dis           =     '01111111'
    network       =     '28'
    
    
    #generate mid Type
    #record['type'] = random.randint(1,8)  
    #record['hardware_id'] = hardware_id   

    #generate data Type
    payload["type"] = get_random_words(type) 
    
    #generate machine status
    payload["data"]["mstatus"] = get_random_words(mstatus) 
    if payload["data"]["mstatus"] == 'stop':
        payload["data"]["mstatus"] = get_random_words(mstatus)

    if payload["data"]["mstatus"] == 'stop':
        payload["data"]["mstatus"] = get_random_words(mstatus)

    if payload["data"]["mstatus"] == 'stop':
        payload["data"]["mstatus"] = get_random_words(mstatus)
        
    if payload["data"]["mstatus"] == 'stop':
        payload["data"]["mstatus"] = get_random_words(mstatus)

    #generete current if machine is active
    if payload["data"]["mstatus"] == 'running':
        weld_cur = random.randint(80, 90)   
    payload["data"]["cur"] = weld_cur
    
    #generete voltage if machine is active
    if payload["data"]["mstatus"] == 'running':
        weld_volt = random.randint(18, 24)     
    payload["data"]["volt"] = weld_volt
    
        #generete rpm if machine is active
    if payload["data"]["mstatus"] == 'running':
        rpm = random.randint(4, 10)   
    payload["data"]["rpm"] = rpm
    
    #generete gas if machine is active
    if payload["data"]["mstatus"] == 'running':
        weld_gas = random.randint(18, 22)    
    payload["data"]["gasFR"] = weld_gas

    #generete hstemp if machine is active
    if payload["data"]["mstatus"] == 'running':
        hstemp = random.randint(29, 40)    
    payload["data"]["hstemp"] = hstemp

    #generete ambtemp if machine is active
    if payload["data"]["mstatus"] == 'running':
        ambtemp = random.randint(27, 30)    
    payload["data"]["ambtemp"] = ambtemp
    
    #generate OID
    #record['oid'] = str(random.randint(50000000,59999999))
    payload["data"]["oid"] = oid

    #generate dis
    #record['dis'] = get_random_words(dis)
    payload["data"]["dis"] = dis

    payload["data"]["network"] = network
  
    #generate timestamp
    #payload["data"]["tm"]= dateinstance
    payload["data"]["tm"]= dateinstance.strftime('%Y-%m-%d %H:%M:%S')


    return payload

        
def on_publish(client, userdata, mid):
    print ("Message Published...")

      
def date_difference(dt1,dt2):
    if dt1 == dt2:
        return 1*60*24
    else:
        dif = dt2 - dt1
        return dif.days*60*60*24


if __name__ == "__main__":
    
    # Program Execution Time
   #exec_time = time.time()

    config = configparser.RawConfigParser()
    config.read('setup/config.cfg')
    mqtt_conf = config['mqtt_details']
    file = config['file']
    machine_list_filename = file['source_file_name']

    # Get List Of mid to subcribe
    machinesDF = pd.read_excel(machine_list_filename).astype(str)
    mid_list = machinesDF.to_numpy().flatten()

    #print(type(mid_list))
    #print(mid_list)

    #mid_list = ['869247043362190']
    
    startDate = dt.strptime(dt.now().strftime('%Y-%m-%d %H:%M:%S'), '%Y-%m-%d %H:%M:%S')
    endDate = dt.strptime("2022-12-31" + " 23:59:00", '%Y-%m-%d %H:%M:%S')

    size = date_difference(startDate, endDate)
    #size = 30

  
    # MQTT connection
    client = mqtt.Client()

    client.connect(mqtt_conf['host'], int(mqtt_conf['port']), int(mqtt_conf['keepalive']))

    
    for i in range(0,size):

        # Program Execution Time
        #exec_time = time.time()
        
        payload = {}
        
        date_instance = startDate + timedelta(seconds=i)

        for hardware_id in mid_list:
            payload = json.dumps(generate_data_array(hardware_id, date_instance))
            print(payload)
            #print(type(str(payload).encode('utf-8')))
            data = str(payload).encode('utf-8')
            #print(data)
            
            client.publish("smartweld/test/dtb/"+hardware_id, data)

        #print("---Execution time: %s seconds ---" % (time.time() - exec_time))
            
        time.sleep(0.99765)
    
    print("Execution Started...")

    print("\nTask Completed.")
    #print("--- %s seconds ---" % (time.time() - exec_time))

