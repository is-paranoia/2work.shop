import {makeAutoObservable,runInAction, makeObservable} from "mobx"
//import authUser from "../../../store/authUser"
import order from "../../store/order"

class Status {

    id = null
    orderId = null
    authorStatus = null // submit
    workerStatus = null // submit
    payments = []
    globalStatus = null

    constructor() {
        makeAutoObservable(this)
    }

    async getPaymentStatus(order_id) {
        const user = JSON.parse(localStorage.getItem("userData"))
        let response = await fetch(`/api/status/${order_id}`, 
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + user.token,
                },
                method: "GET"
        })
        if (response.ok) {
            let data = await response.json()
            runInAction(() => {
                this.id = data.id
                this.orderId = data.orderId
                this.authorStatus = data.authorStatus
                this.workerStatus = data.workerStatus
            })
        }
        this.getPayments(order_id)
    }

    async getPayments(order_id) {
        try{
            const user = JSON.parse(localStorage.getItem("userData"))
            const response = await fetch(`/api/payments/order_id/${order_id}`, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + user.token,
                  },
                method: "GET"
            })
            if (response.ok) {
                console.log("RES{s");
                let data = await response.json()
                data.forEach(payment => {
                    let data_time = new Date(Date.parse(payment.timestamp))
                    let paymentCreatedAt = `${data_time.getHours()}:${data_time.getMinutes()} ${("0"+data_time.getDate()).slice(-2)}.${("0"+data_time.getMonth()).slice(-2)}.${data_time.getFullYear()}`
                    payment.timestamp = paymentCreatedAt
                })
                this.payments = data
                this.checkGlobalStatus()
            }
        } catch (e) {
            console.log(e);
        }
    }

    async checkGlobalStatus () {
        let authorSendPayment = false
        let workerReceivePayment = false
        this.payments.forEach((payment)=>{
            if (payment.userId == order.authorId && payment.orderId == order.id && payment.comment == "Good") {
                authorSendPayment = true
            }
            if (payment.userId == order.workerId && payment.orderId == order.id && payment.comment == "Good") {
                workerReceivePayment = true
            }
        })
        let newGlobalStatus = ""
        if (authorSendPayment) {
            if (this.workerStatus == "submit") {
                if (this.authorStatus == "submit") {
                    if (workerReceivePayment) {
                        newGlobalStatus = "Ended"
                    } else {
                        newGlobalStatus = "Wait worker receive"
                    }
                } else {
                    newGlobalStatus = "Wait author submit"
                }
            } else {
                newGlobalStatus = "Wait worker submit"
            }
        } else {
            newGlobalStatus = "Wait author payment"
        }

        if (newGlobalStatus !== this.globalStatus) {
            this.setGlobalStatus(newGlobalStatus)
        }
    }

    async workerSubmit() {
        if (this.globalStatus == "Wait worker submit") {
            try {
                const user = JSON.parse(localStorage.getItem("userData"))
                const data = await fetch(`/api/status/submit/worker/${order.id}`, {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + user.token,
                      },
                    body: JSON.stringify({}),
                    method: "PUT"})
                this.workerStatus = "submit"
                this.getPaymentStatus(order.id)
            } catch (e) {
                console.log(e)
            }
        }
    }

    async authorSubmit() {
        if (this.globalStatus == "Wait author submit") {
            try {
                const user = JSON.parse(localStorage.getItem("userData"))
                const data = await fetch(`/api/status/submit/author/${order.id}`, {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + user.token,
                      },
                    body: JSON.stringify({}),
                    method: "PUT"})
                this.authorStatus = "submit"
                this.getPaymentStatus(order.id)
            } catch (e) {
                console.log(e)
            }
        }
    }

    async setGlobalStatus(newGlobalStatus) {
        this.globalStatus = newGlobalStatus
    }
}

export default new Status()