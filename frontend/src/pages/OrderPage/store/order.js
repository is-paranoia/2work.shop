import {makeAutoObservable,runInAction, makeObservable} from "mobx"
import authUser from "../../../store/authUser"

class Order {

    id = null
    title = null
    description = null
    authorId = null
    workerId = null
    tagId = null
    price = null
    createdAt = null
    endedAt = null

    workerNickname = null
    authorNickname = null

    constructor() {
        makeAutoObservable(this)
    }

    async getOrder(id) {
            let response = await fetch(`/api/orders/${id}`, 
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
        
            if (response.ok) {
                let data = await response.json()
                runInAction(() => {
                    this.id = data.id
                    this.title = data.title
                    this.description = data.description
                    this.authorId = data.authorId
                    this.workerId = data.workerId
                    this.tagId = data.tagId
                    this.price = data.price
                    let data_time = new Date(Date.parse(data.createdAt))
                    let formatedCreatedAt = `${data_time.getHours()}:${data_time.getMinutes()} ${("0"+data_time.getDate()).slice(-2)}.${("0"+data_time.getMonth()).slice(-2)}.${data_time.getFullYear()}`
                    this.createdAt = formatedCreatedAt
                    this.endedAt = data.endedAt

                    this.getUserNickname(data.authorId).then((nickname) => {
                        runInAction(() => {
                            this.authorNickname = nickname
                        })
                    })
                    if (data.workerId !== null) {
                        this.getUserNickname(data.workerId).then((nickname) => {
                            runInAction(() => {
                                this.workerNickname = nickname
                            })
                        })
                    }
                })
            } else {
                console.log('Error')
            }
    }

    setWorker(userId) {
        this.workerId = userId
    }

    async getUserNickname(userId) {
        let response = await fetch(`/api/users/${userId}`, 
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
        })
        let data = await response.json()
        if (data.nickname) {
            return data.nickname
        } else {
            return null
        }
    }
}

export default new Order()