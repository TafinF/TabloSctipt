class WebSocketManager_resiver {
    constructor(url) {
        this.url = url;
        this.socket = null;
        this.isConnected = false;
    }
    
    connect() {
        this.socket = new WebSocket(this.url);
        
        this.socket.onopen = () => {
            this.isConnected = true;
            console.log('WebSocket подключен');
            this.sendHello();
        };
        
        this.socket.onerror = (error) => {
            console.error('WebSocket ошибка:', error);
        };
        
        this.socket.onclose = () => {
            this.isConnected = false;
            console.log('WebSocket отключен');
        };
        
        this.socket.onmessage = (event) => {
            this.handleMessage(event);
        };
    }
    sendHello() {
        if (this.isConnected && this.socket) {
            this.socket.send("I_Slave");
        } else {
            console.warn('WebSocket не подключен');
        }
    }
    // Обработчик входящих сообщений
    handleMessage(event) {
        try {
            const dataPack = JSON.parse(event.data);
         
            console.log('📨 Получены данные:', dataPack);
            
            document.querySelector("#k1_name").textContent = dataPack.team_left_name
            document.querySelector("#k1_point").textContent = dataPack.team_left_gol
            document.querySelector("#k2_point").textContent = dataPack.team_right_gol
            document.querySelector("#k2_name").textContent = dataPack.team_right_name
            document.querySelector("#time").textContent = dataPack.time
            document.querySelector("#timeAdd").textContent = dataPack.half
            // Вызываем callback данных
            // if (this.onDataCallback) {
            //     this.onDataCallback(dataPack);
            // }
            
        } catch (error) {
            console.error('❌ Ошибка парсинга JSON:', error, 'Данные:', event.data);
        }
    }

    sendDataPack(dataPack) {
        if (this.isConnected && this.socket) {
            this.socket.send(JSON.stringify(dataPack));
        } else {
            console.warn('WebSocket не подключен');
        }
    }
    
    disconnect() {
        if (this.socket) {
            this.socket.close();
        }
    }
}


// Использование
const wsManager = new WebSocketManager_resiver('ws://localhost:8080');
wsManager.connect();
