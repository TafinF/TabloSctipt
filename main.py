import asyncio
from websockets.asyncio.server import serve

connected = set()
slave = None
master = None
async def echo(websocket):
    global connected
    global slave
    global master
    if not websocket in connected:
        connected.add(websocket)
        print(f"У нас новенький: {websocket}")
        await websocket.send("?")
    else:
        print(f"Этого знаю: {websocket}")
    async for message in websocket:
        isComputeMessege = False
        if "I_Master" in message:
            master = websocket
            await websocket.send("You_Master")
            isComputeMessege = True
        if "I_Slave" in message:
            slave = websocket
            await websocket.send("You_Slave")
            isComputeMessege = True
        if websocket == master and not slave==None:
             print(f'Пришло сообщение: {message} отправлено к slave')
             await slave.send(message)
             isComputeMessege = True
            #  return
        if websocket == slave and not master==None:
             print(f'Пришло сообщение: {message} отправлено к master')
             await master.send(message)
             isComputeMessege = True
            #  return
        #  await websocket.send(message)
        if(not isComputeMessege):
            print(f'Пришло сообщение: {message} - не обработанно')


async def main():
    async with serve(echo, "localhost", 8765) as server:
        await server.serve_forever()


if __name__ == "__main__":
    asyncio.run(main())