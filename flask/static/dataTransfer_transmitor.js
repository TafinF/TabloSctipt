// let dataPack = {
//     team_left_gol: "",
//     team_left_fol: "",
//     team_left_name: "",
//     team_right_gol: "",
//     team_right_fol: "",
//     team_right_name: "",
//     time: "",
//     half: ""
// }


class WebSocketManager_transmitor {
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
    }

    sendDataPack(dataPack) {
        if (this.isConnected && this.socket) {
            this.socket.send(JSON.stringify(dataPack));
        } else {
            console.warn('WebSocket не подключен');
        }
    }
    sendHello() {
        if (this.isConnected && this.socket) {
            this.socket.send("I_Master");
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

// // Использование
// const wsManager = new WebSocketManager_transmitor('ws://localhost:8080');
// wsManager.connect();

// let i = 0
// // Обновление данных (например, по таймеру)
// setInterval(() => {
//     const updatedDataPack = {
//         team_left_gol: "3",
//         team_left_fol: "6",
//         team_left_name: "Команда А",
//         team_right_gol: "2",
//         team_right_fol: "4",
//         team_right_name: "Команда Б",
//         time: String(i),
//         half: "2"
//     };
//     i++;
//     wsManager.sendDataPack(updatedDataPack);
// }, 1000); // обновлять каждые 5 секунд