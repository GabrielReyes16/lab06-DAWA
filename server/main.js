var express = require("express");
var app = express();
var server = require("http").Server(app);
var io = require("socket.io")(server);


var messages = [
    {
        id : 1,
        author : "Math",
        text : "Holabuenas!"
    },
    {
        id : 2,
        author : "Gab",
        text : "Hola! que tal?!"
    },
    {
        id : 3,
        author : "Someone",
        text : "Ehm, hola!"
    },
];

app.use(express.static("public"));

app.get("/hello", function (req, res){
    res.status(200).send("Hola mundo!");
})

io.on("connection", function (socket){
    console.log("Alguien se ha conectadio con Sockets");
    socket.emit("messages", messages);

    socket.on("new-message", function (data) {
        messages.push(data);

        io.sockets.emit("messages", messages);
    });
});

server.listen(8080, function () {
    console.log("Servidor corriendo en el puerto 8080");
});
