import {makeAutoObservable,runInAction, makeObservable} from "mobx"

class Contract {

    contract_address = "0xF3EE84E69c04a4c775d5EC82ae692d5b23fAA8b8"
    abi = [
        "function receiveAuthorPayment(uint _order) public payable",
        "function sendWorkerPayment(uint _order) public"
    ]

    constructor() {
        makeAutoObservable(this)
    }

}

export default new Contract()