# pyinstaller websocketserver.py --onefile --icon="C:\Users\emo\python\images\proxy.ico"
import websockets
import asyncio
import time
import sqlite3
import json

async def websocket_request_handler(websocket, path):
    client_data = await websocket.recv()
    print(time.ctime() + '\n' + client_data + '\n\r')
    response_data = "Datos recibidos por el cliente:\n" + client_data
    await websocket.send(response_data)
    save_to_database(client_data)

def save_to_database(client_data):
    conn = sqlite3.connect('datos.db')
    c = conn.cursor()
    c.execute('''CREATE TABLE IF NOT EXISTS datos
                 (id INTEGER PRIMARY KEY AUTOINCREMENT,
                 identificador TEXT,
                  time TEXT,
                  text TEXT)''')
    
    data = json.loads(client_data)
    c.execute('''INSERT INTO datos (id, time, text) VALUES (?, ?, ?)''', (data['identificador'], data['time'], data['text']))
    conn.commit()
    conn.close()

async def start_websocket_server(host, port_number):
    async with websockets.serve(websocket_request_handler, host, port_number):
        print('websocket server en el puerto : ' + str(port_number))
        await asyncio.Future()  # espera infinita

if __name__ == '__main__':
    host = "localhost"
    port_number = 9999
    asyncio.run(start_websocket_server(host, port_number))