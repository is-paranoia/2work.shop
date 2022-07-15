import React, {useState, useEffect, useContext} from "react";
import {Link, Navigate, useNavigate, useParams} from "react-router-dom";
import {ethers} from "ethers"
import "./AuthorCard.css"
import {observer} from "mobx-react-lite"


const AuthorCard = ({orderData, status, contract}) => {

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

    }, [status, wallet, contract.contract_address])

    const walletSignHandler = async (wallet) => {
        await window.ethereum.request({method: "personal_sign", params: [wallet, 'Send payment to 2WORK']}).then((sign)=>{
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
            if (ethers.utils.parseEther(balance.toString()) > ethers.utils.parseEther(orderData.price.toString())){
                console.log("SEND ETH");
            //await window.ethereum.send("eth_requestAccount")
            const provider = new ethers.providers.Web3Provider(window.ethereum)
            const signer = provider.getSigner()
            const abi = contract.abi
            const final_contract = new ethers.Contract(addr, abi, signer);
            const tx = await final_contract.receiveAuthorPayment(orderData.id, {value: ethers.utils.parseEther(orderData.price.toString())})

            //ethers.utils.getAddress(addr)
            //const tx = await signer.sendTransaction({
            //   to: addr,
            //    value: ethers.utils.parseEther(orderData.price.toString()),
            //})
            sendedTx.txHash = tx.hash
            sendedTx.value = ethers.utils.formatEther(tx.value.toString())
            console.log("Value ", tx.value.toString());
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
                console.log("Payment create", data)
            } catch (e) {
                console.log(e)
            }
            console.log(tx);
            console.log(receipt);
            }
            
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
        window.ethereum.request({method: "eth_getBalance", params: [wallet, "latest"]}).then((eth_balance) => {
            console.log(ethers.utils.formatEther(eth_balance))
            setBalance(ethers.utils.formatEther(eth_balance))
        })
    }

    const submitHandler = () => {
        status.authorSubmit()
    }

    if (window.ethereum) {
        window.ethereum.on('accountsChanged', walletChangeHandler)
        window.ethereum.on('chainChanged', chainChangeHandler)
    } else {
        console.log('Install MetaMask')
    }

    return (
        <div className="AuthorCard">
            <div><h2>Author</h2></div>
            { wallet == "" & status.globalStatus == "Wait author payment" ? <button className="walletAuthorConnectButton" onClick={connectWalletHandler}>
                {buttonText}
            </button> : <div></div>}
            
            
            { status.globalStatus == "Wait author payment" ? <button className="sendEthAuthorButton" onClick={sendEthHandler}>
                Send payment
            </button> : status.globalStatus == "Ended" ? <button className="sendEthAuthorButton">
                Thank you!
            </button> : <button className="sendEthAuthorButton" disabled={true} onClick={sendEthHandler}>
                Wait worker
            </button>}
            { status.globalStatus == "Wait author submit" ? <button className="sendEthWorkerButton" onClick={submitHandler}>
                Complete order
            </button>: null}
            
        </div>
    )
}

export default observer(AuthorCard)