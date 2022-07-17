const express = require("express")
const config = require("config")
const body_parser = require("body-parser")
const cors = require("cors")


const app = express()
app.use(cors())
app.use(express.json())
app.use(body_parser.json())
app.use(body_parser.urlencoded({ extended: true }))
app.use("/auth", require("./routes/auth"))
app.use("/api", require("./routes/api"))

const PORT = config.get("port") || 8000

const http = require("http").createServer(app)
const socket = require("socket.io")(http, {
	cors: {
		origin: "*",
		methods: ["GET", "POST"]}
})


async function start() {
	try {
        
		http.listen(PORT, () => console.log(`App has been started at port ${PORT}...`))
		socket.on("connection", (socket) => {
            
			socket.on("joinChat", (data) => {
				socket.join(data)
			})

			socket.on("sendMessage", (data) => {
				socket.to(data.chatId).emit("receiveMessage", data)
			})

			socket.on("disconnect", () => { 

			})
		})
	} catch (e) {
		console.log("Server error", e.message)
		process.exit(1)
	}
}

start()

