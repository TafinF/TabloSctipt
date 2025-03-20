const Comand = {
    SEP_COM: "_",
    SEP_ARG: "!",
    Timer_Start: "TSt",
    Timer_Pause: "TPa",
    Point_Add_K1: "PAK1",
    Point_Add_K2: "PAK2",
    Point_Sub_K1: "PSK1",
    Point_Sub_K2: "PSK2",
    Komand_Name_1: "K1",
    Komand_Name_2: "K2"

}
let socket = new WebSocket("ws://localhost:8765");
console.log(socket);
// function cli(params) {
//     socket.send("Test");
//     console.log(socket);

// }
socket.onmessage = function (event) {
    var incomingMessage = event.data;
    console.log("Пришло сообщение:");
    console.log(incomingMessage);
    switch (incomingMessage) {
        case "?":
        console.log("Представляюсь");
            socket.send("I_Master");
            break;

        default:
            console.log("Не знаю что делать, пришло сообщение:");
            console.log(incomingMessage);
            break;
    }
};
socket.onclose = function (event) {
    var incomingMessage = event.data;
    console.log("Соединение разорвано:");
    console.log(incomingMessage);
};

function cl_Timer_Start() {
    socket.send(Comand.Timer_Start);
}
function cl_Timer_Pause() {
    socket.send(Comand.Timer_Pause);
}
function cl_Point_Add_K1() {
    socket.send(Comand.Point_Add_K1);
}
function cl_Point_Add_K2() {
    socket.send(Comand.Point_Add_K2);
}
function cl_Komand_Name() {
    socket.send(Comand.Komand_Name_1+Comand.SEP_COM+"Команда с проблеом"+Comand.SEP_ARG+"Команда безпробела");
}