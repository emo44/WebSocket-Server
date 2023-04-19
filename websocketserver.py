import websockets
import asyncio
import time

async def websocket_request_handler(websocket, path):
    client_data = await websocket.recv()
    print(time.ctime() + '\n' + client_data + '\n\r')
    response_data = "Datos recibidos por el cliente:\n" + client_data
    await websocket.send(response_data)

async def start_websocket_server(host, port_number):
    async with websockets.serve(websocket_request_handler, host, port_number):
        print('websocket server en el puerto : ' + str(port_number))
        await asyncio.Future()  # espera infinita

if __name__ == '__main__':
    host = "localhost"
    port_number = 9999
    asyncio.run(start_websocket_server(host, port_number))