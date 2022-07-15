import React, {useState, useEffect, useContext} from "react";
import {Link, Navigate, useNavigate, useParams} from "react-router-dom";
import {ethers} from "ethers"
import "./WorkerCard.css"
import {observer} from "mobx-react-lite"


const WorkerCard = ({orderData, status, contract}) => {

    const user = JSON.parse(localStorage.getItem("userData"))
    const params = useParams()
    let navigate = useNavigate();

    const [wallet, setWallet] = useState("")
    const [balance, setBalance] = useState(0)
    const [error, setError] = useState("")
    const [buttonText, setButtonText] = useState("Connect wallet")
    const [sign, setSign] = useState("")
    const [tx, setTx] = useState({
        txHash: "",
        value: 0,
        status: 0,
        comment: ""
    })

    useEffect(() => {
        
    }, [status, wallet, contract.contract_address, contract.abi])

    const walletSignHandler = async (wallet) => {
        await window.ethereum.request({method: "personal_sign", params: [wallet, 'Receive payment from 2WORK']}).then((sign)=>{
            console.log(sign)
        })
    }

    
    const chainChangeHandler = () => {
        if (window.ethereum.networkVersion !== 3) {
            changeChain()
        }
        window.location.reload()
    }

    const walletChangeHandler = (wallet) => {
        setWallet(wallet)
        if (window.ethereum.networkVersion !== 3) {
            changeChain()
        }
        let text = (wallet.slice(0, -(wallet.length-6))+"..."+wallet.slice(wallet.length-4))
        setButtonText(text)
        getBalance(wallet.toString())
    }

    const connectWalletHandler = () => {
        if (window.ethereum) {
            if (window.ethereum.networkVersion == 3) {
                window.ethereum.request({method: 'eth_requestAccounts'}).then((result) => {
                    console.log(result);
                    walletChangeHandler(result[0])
                    walletSignHandler(result[0])
                })
            } else {
                changeChain()
            }
            
            
        } else {
            setError('Install MetaMask')
        }
    }

    const sendEthHandler = async () => {
        let sendedTx = {
            txHash: "",
            value: 0,
            status: 0,
            comment: ""
        }
        const addr = contract.contract_address
        if (wallet !== "") {
            console.log("RECEIVE ETH");
            //await window.ethereum.send("eth_requestAccount")
            const provider = new ethers.providers.Web3Provider(window.ethereum)
            const signer = provider.getSigner()
            const abi = contract.abi
            const final_contract = new ethers.Contract(addr, abi, signer);
            const tx = await final_contract.sendWorkerPayment(orderData.id)
            sendedTx.txHash = tx.hash
            sendedTx.value = ethers.utils.formatEther(tx.value.toString())
            let receipt = await tx.wait()
            if (receipt.status == 1) {
                sendedTx.status = 1
                sendedTx.comment = "Good"
            } else {
                sendedTx.status = receipt.status
                sendedTx.comment = "Error"
            }
            try {
                const user = JSON.parse(localStorage.getItem("userData"))
                const data = await fetch(`/api/payments/${params.id}`, {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + user.token,
                    },
                    body: JSON.stringify(sendedTx),
                    method: "POST"
                })
                status.getPaymentStatus(params.id)
                console.log("Payment receive", data)
            } catch (e) {
                console.log(e)
            }
            console.log(tx);
            console.log(receipt);
        }
    }

    const changeChain = async () => {
        try {
            // check if the chain to connect to is installed
            await window.ethereum.request({
              method: 'wallet_switchEthereumChain',
              params: [{ chainId: ethers.utils.hexValue(3) }], // chainId must be in hexadecimal numbers
            });
          } catch (error) {
            // This error code indicates that the chain has not been added to MetaMask
            // if it is not, then install it into the user MetaMask
            if (error.code === 4902) {
              try {
                await window.ethereum.request({
                  method: 'wallet_addEthereumChain',
                  params: [
                    {
                      chainId: ethers.utils.hexValue(3),
                      rpcUrl: 'https://rpc.ankr.com/eth_ropsten',
                    },
                  ],
                });
              } catch (addError) {
                console.error(addError);
              }
            }
            console.error(error);
          }
    }

    const getBalance = (wallet) => {
        window.ethereum.request({method: "eth_getBalance", params: [wallet, "latest"]}).then((balance) => {
            setBalance(ethers.utils.formatEther(balance))
        })
    }

    const submitHandler = () => {
        status.workerSubmit()
    }

    if (window.ethereum) {
        window.ethereum.on('accountsChanged', walletChangeHandler)
        window.ethereum.on('chainChanged', chainChangeHandler)
    } else {
        console.log('Install MetaMask')
    }

    return (
        <div className="WorkerCard">
            <div><h2>Worker</h2></div>
            { wallet == "" && status.globalStatus == "Wait worker receive" ? <button className="walletWorkerConnectButton" onClick={connectWalletHandler}>
                {buttonText}
            </button> : <div></div>}
            
            
            { status.globalStatus == "Wait worker receive" ? <button className="sendEthWorkerButton" onClick={sendEthHandler}>
                Receive payment
            </button> : status.globalStatus == "Ended" ? <button className="sendEthWorkerButton">
                Thank you!
            </button> : <button className="sendEthWorkerButton" disabled={true} onClick={sendEthHandler}>
                Wait author
            </button>}
            { status.globalStatus == "Wait worker submit" ? <button className="sendEthWorkerButton" onClick={submitHandler}>
                Complete order
            </button>: null}

        </div>
    )
}

export default observer(WorkerCard)