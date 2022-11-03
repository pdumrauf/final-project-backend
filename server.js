const path = require("path");
const dotenv = require("dotenv");

const jwt = require("jsonwebtoken");

dotenv.config(
    path.resolve(process.cwd(), process.env.NODE_ENV + ".env")
);

const express = require("express");
const { engine } = require("express-handlebars");
const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");

const connectDB = require("./config/db");

const productRouterFn = require("./routers/productRouter");
const cartRouterFn = require("./routers/cartRouter");
const authRouterFn = require("./routers/authRouter");
const appRouterFn = require("./routers/appRouter");

const passport = require("passport");
const session = require("express-session");
const flash = require("express-flash");
const initializePassport = require("./config/passport");

const ErrorsMiddleware = require("./middlewares/ErrorsMiddleware");
const chatRouterFn = require("./routers/chatRouter");

const MessageService = require("./services/MessageService");
const MessageRepository = require("./repositories/MessageRepository");

const messageRepository = new MessageRepository();
const messageService = new MessageService(messageRepository);

//TODO
//-validaciones
//chat :)

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

const PORT = process.env.PORT || 8080;

connectDB(process.env.MONGODB_URI);

app.use(express.static("./public/uploads"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
    session({
        secret: process.env.JWT_SECRET,
        resave: true,
        saveUninitialized: true,
        rolling: true,
        cookie: {
            maxAge: 1000 * 60 * 10,
        },
    })
);

initializePassport(passport);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.engine(
    "hbs",
    engine({
        extname: ".hbs",
        defaultLayout: `${__dirname}/views/index.hbs`,
        layoutsDir: `${__dirname}/views/layouts`,
        partialsDir: `${__dirname}/views/partials`,
    })
);
app.set("views", "./views");
app.set("view engine", "hbs");

app.set("io", io);

app.use("/api/products", productRouterFn());
app.use("/api/chat", chatRouterFn());
app.use("/api/cart", cartRouterFn());
app.use("/auth", authRouterFn());
app.use("/", appRouterFn());

const errorsMiddleware = new ErrorsMiddleware();
app.use(errorsMiddleware.error404);
app.use(errorsMiddleware.errorHandler);

const server = httpServer.listen(PORT, () => {
    console.log(`listening on port: ${PORT}`);
});

server.on("error", (err) => console.log(err));

io.on("connection", async (socket, next) => {
    console.log(`new user id: ${socket.id}`);
    socket.emit("success", { hola: "hola" });

    socket.on("authorize", async (token) => {
        jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
            if (err) {
                return socket.emit("unauthorized", { error: "unauthorized", msg: "not valid token" });
            }

            socket.user = decoded;
        });
        if (socket.user) {
            try {
                const messages = await messageService.getAll();
                socket.emit("authorized", messages);
            } catch (err) {
                console.error(err);
            }
        }
    });
    socket.on("postMessage", async (message) => {
        const newMessage = await messageService.createMessage(message, socket.user);
        io.emit("newMessage", newMessage);
    });
});



