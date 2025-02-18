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
        print("У нас новенький")
        await websocket.send("?")
    else:
        print("Этого знаю")
    print(websocket)
    async for message in websocket:
        if "I_Master" in message:
            master = websocket
            await websocket.send("You_Master")
        if "I_Slave" in message:
            slave = websocket
            await websocket.send("You_Slave")
        if websocket == master and not slave==None:
             await slave.send(message)
        if websocket == slave and not master==None:
             await master.send(message)
        #  await websocket.send(message)


async def main():
    async with serve(echo, "localhost", 8765) as server:
        await server.serve_forever()


if __name__ == "__main__":
    asyncio.run(main())