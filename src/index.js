const express = require("express");
const CommentsSchema = require("./models/CommentsSchema");
const QuestionsSchema = require("./models/QuestionsSchema");
const app = express();
const server = require("http").createServer(app);
const socket = require("socket.io")(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
        allowedHeaders: [""],
        credentials: false,
    }
});
require("./utils/database"); // Check
const { GET_MESSAGES, NEW_CLASS_MESSAGE_EVENT, numberDataPerRequest, GET_COMMENTS, NEW_COMMENT_EVENT } = require("./utils/constants.json");

socket.on("connection", async socketConnected => {
    // Join a conversation
    const { classCode, questionId } = socketConnected.handshake.query;
    socketConnected.join(classCode);
    socketConnected.join(questionId);

    // Listen for new comments
    socketConnected.on(NEW_COMMENT_EVENT, async data => {
        const { body } = data;

        await new CommentsSchema({
            message: body.message,
            questionId: body.questionId,
            date: new Date().toISOString()
        }).save();

        socket.in(questionId).emit(NEW_COMMENT_EVENT, data);
    });

    socketConnected.on(GET_COMMENTS, async ({ body }) => {
        const totalLength = await CommentsSchema.countDocuments({ questionId });

        await CommentsSchema.find({ questionId }, { __v: 0, classCode: 0 }, { lean: true })
            .limit(body.length + numberDataPerRequest).sort({ "date": -1 }).exec()
            .then(async res => {
                socketConnected.emit(GET_COMMENTS, { comments: res, totalLength });
            }) // Messages
            .catch(err => console.log(err))
    });

    socketConnected.on(GET_MESSAGES, async ({ body }) => {
        const totalLength = await QuestionsSchema.countDocuments({ classCode });

        await QuestionsSchema.find({ classCode }, { __v: 0, classCode: 0, date: 0 }, { lean: true })
            .limit(body.length + numberDataPerRequest).sort({ "date": -1 }).exec()
            .then(async res => {
                socketConnected.emit(GET_MESSAGES, { messages: res, totalLength });
            })
            .catch(err => console.log(err))
    });

    // Listen for new messages
    socketConnected.on(NEW_CLASS_MESSAGE_EVENT, async data => {
        const { body } = data;

        await new QuestionsSchema({
            title: body.title,
            description: body.description, classCode,
            date: new Date().toISOString()
        }).save();

        socket.in(classCode).emit(NEW_CLASS_MESSAGE_EVENT, data);
    });

    // Leave the room if the user closes the socket
    socketConnected.on("disconnect", async () => socketConnected.leave(classCode));
});

app.use(require("cors")());
app.use(express.json());

app.use("/", require("./routes/index.routes"));

server.listen(302, () => console.log("Backend up"));