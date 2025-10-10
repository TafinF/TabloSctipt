import asyncio
import threading
from websockets.asyncio.server import serve
from flask import Flask, render_template

app = Flask(__name__)

@app.route('/game')
def game():
    return render_template('master_dipS.html')

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
        if websocket == master and not slave == None:
            print(f'Пришло сообщение: {message} отправлено к slave')
            await slave.send(message)
            isComputeMessege = True
        if websocket == slave and not master == None:
            print(f'Пришло сообщение: {message} отправлено к master')
            await master.send(message)
            isComputeMessege = True
        
        if not isComputeMessege:
            print(f'Пришло сообщение: {message} - не обработанно')

async def websocket_server():
    async with serve(echo, "localhost", 8765) as server:
        print("WebSocket сервер запущен на ws://localhost:8765")
        await server.serve_forever()

def run_websocket_server():
    """Запуск WebSocket сервера в отдельном event loop"""
    loop = asyncio.new_event_loop()
    asyncio.set_event_loop(loop)
    loop.run_until_complete(websocket_server())

def run_flask_app():
    """Запуск Flask приложения"""
    print("Flask сервер запущен на http://localhost:5000")
    app.run(debug=True, use_reloader=False, port=5000)

if __name__ == "__main__":
    # Запускаем WebSocket сервер в отдельном потоке
    websocket_thread = threading.Thread(target=run_websocket_server, daemon=True)
    websocket_thread.start()
    
    # Запускаем Flask в основном потоке
    run_flask_app()