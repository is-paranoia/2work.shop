import {makeAutoObservable, makeObservable} from "mobx"

class AuthUser {

    storageName = "userData"
    nickname = null
    userId = null
    roleId = null
    token = null
    isAuthenticated = false

    constructor() {
        makeAutoObservable(this)
        let previousLogin = JSON.parse(localStorage.getItem(this.storageName))
        console.log("PrevLogin", previousLogin)

        if (previousLogin && previousLogin.token) {
            console.log("USE PREV LOGIN", previousLogin.token, previousLogin.userId)
            this.login(previousLogin.token, previousLogin.userId, previousLogin.nickname, previousLogin.roleId)
        }
    }

    login(token, userId, nickname, roleId) {
        this.nickname = nickname
        this.userId = userId
        this.roleId = roleId
        this.token = token
        this.isAuthenticated = true
        localStorage.setItem(this.storageName, JSON.stringify({
            userId: this.userId, token: this.token, nickname: this.nickname, roleId: this.roleId
        }))
    }

    logout() {
        this.nickname = null
        this.userId = null
        this.roleId = null
        this.token = null
        this.isAuthenticated = false
        localStorage.removeItem(this.storageName)
    }

}

export default new AuthUser()