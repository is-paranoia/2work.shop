import {makeAutoObservable,runInAction, makeObservable} from "mobx"

class Contract {

    contract_address = ""
    abi = [
        "function test(address payable _tester, uint _amount) public"
    ]

    constructor() {
        makeAutoObservable(this)
    }

}

export default new Contract()