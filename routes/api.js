const {Router} = require("express")
const router = Router()
const auth = require("../middleware/auth.middleware")
const ordersController = require("../controllers/ordersController")
const usersController = require("../controllers/usersController")
const commentsController = require("../controllers/commentsController")
const tagsController = require("../controllers/tagsControllers")
const messagesController = require("../controllers/messagesController")
const respondsController = require("../controllers/respondsController")
const paymentsController = require("../controllers/paymentsController")
const statusesController = require("../controllers/statusesController")


router.get("/users/:id", usersController.getNicknameByUserId)
router.get("/user", auth, usersController.getNicknameByUserAuth)

router.get("/orders/worker_name/:name",ordersController.getOrdersByWorkerName)
router.get("/orders/author_name/:name",ordersController.getOrdersByAuthorName)
router.get("/orders/worker_id/:workerId",ordersController.getOrdersByWorkerId)
router.get("/orders/author_id/:authorId",ordersController.getOrdersByAuthorId)
router.get("/orders/tag_id/:id",ordersController.getOrdersByTagId)
router.get("/orders/:id",ordersController.getOrdersById)
router.get("/orders",ordersController.getOrdersAll)
router.post("/orders", auth,ordersController.addOrder)
router.delete("/orders/:id", auth, ordersController.deleteOrderById)
router.put("/orders/:id", auth,ordersController.changeOrderById)

router.get("/comments/:order_id",commentsController.getCommentsByOrderId)
router.post("/comments/:order_id", auth, commentsController.addCommentByOrderId)

router.get("/tags",tagsController.getTagsAll)
router.post("/tags", auth, tagsController.addTag)

router.post("/chat/:chat_id", auth, messagesController.addMessageByChatId)
router.get("/chat/:id", auth, messagesController.getMessageByChatId)

router.get("/responds/:id", auth, respondsController.getRespondsByOrderId)
router.post("/responds/:id", auth, respondsController.addRespondsByOrderId)
router.delete("/responds/:id", auth, respondsController.deleteRespondsByOrderId)

router.get("/payments/order_id/:id", paymentsController.getPaymentsByOrderId)
router.post("/payments/:order_id", auth, paymentsController.addPaymentByOrderId)

router.get("/status/:id", auth, statusesController.getStatusByOrderId)
router.post("/status/:id", auth, statusesController.addStatusByOrderId)
router.put("/status/submit/worker/:id", auth, statusesController.changeWorkerStatusByOrderId)
router.put("/status/submit/author/:id", auth, statusesController.changeAuthorStatusByOrderId)

module.exports = router