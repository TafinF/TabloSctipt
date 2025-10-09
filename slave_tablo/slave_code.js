const Comand = {
    SEP_COM: "_",
    SEP_ARG: "!",
    // Timer_Start: "TSt",
    // Timer_Pause: "TPa",
    // Point_Add_K1: "PAK1",
    // Point_Add_K2: "PAK2",
    // Point_Sub_K1: "PSK1",
    // Point_Sub_K2: "PSK2",
    // Komand_Name_1: "K1",
    // Komand_Name_2: "K2"
    Set_Komand_Name: "KN",
    Set_Time: "TM",
    Set_Store: "ST"
}

let socket = new WebSocket("ws://localhost:8765");
console.log(socket);
// function cli(params) {
//     socket.send("Test");
//     console.log(socket);

// }
socket.onmessage = function (event) {
    let incomingMessage = event.data;
    console.log("Пришло сообщение:");
    console.log(incomingMessage);
    let comand
    let arg
    if (incomingMessage.indexOf(Comand.SEP_COM) >= 0) { // если команда с оргументами
        let sMes = incomingMessage.split(Comand.SEP_COM)
        comand = sMes[0]
        arg = sMes[1]
    }
    else {
        comand = incomingMessage
    }
    switch (comand) {


        case Comand.Set_Komand_Name:
            let komand = arg.split(Comand.SEP_ARG)
            document.getElementById('k1_name').textContent = komand[0];
            document.getElementById('k2_name').textContent = komand[1];
            break;
        case Comand.Set_Store:
            let store = arg.split(Comand.SEP_ARG)
            document.getElementById('k1_point').textContent = store[0];
            document.getElementById('k2_point').textContent = store[1];
            break;
        case Comand.Set_Time:
            document.getElementById('time').textContent = arg;
            break;
        // case Comand.Point_Add_K1:
        //     btn_click_add(1, "k1_point")
        //     break;
        // case Comand.Point_Add_K2:
        //     btn_click_add(1, "k2_point")
        //     break;
        // case Comand.Timer_Start:
        //     timer.start()
        //     break;
        // case Comand.Timer_Pause:
        //     timer.pause()
        //     break;
        case "?":
            console.log("Представляюсь");
            socket.send("I_Slave");
            break;

        default:
            console.log("Не знаю что делать, пришло сообщение:");
            console.log(comand);
            break;
    }

};
socket.onclose = function (event) {
    var incomingMessage = event.data;
    console.log("Соединение разорвано:");
    console.log(incomingMessage);
};
// let timer

// function t_st() {
//     // timer  = new Timer(1)
//     timer.start()
// }
// function t_pau() {
//     timer.pause()
// }
// function btn_click_add(val, id) {
//     let out_p = document.getElementById(id);
//     let newVal = Number(out_p.textContent) + val
//     if (newVal >= 0) {
//         out_p.textContent = newVal
//     }
// }
// document.addEventListener("DOMContentLoaded", () => {
//     let elem = document.getElementById('time');
//     timer = new Timer(15, elem)
// });