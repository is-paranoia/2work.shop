import React, {useState, useEffect, useContext} from "react";
import {Link, Navigate, useNavigate} from "react-router-dom";
import {ethers} from "ethers"
import "./EtherCard.css"

const EtherCard = () => {

    const [wallet, setWallet] = useState("")
    const [balance, setBalance] = useState(0)
    const [error, setError] = useState("")
    const [buttonText, setButtonText] = useState("Connect wallet")
    const [sign, setSign] = useState("")

    useEffect(() => {
        getWallet()
    }, [])

    let getWallet = async () => {
        
    }

    const walletSignHandler = async (wallet) => {
        await window.ethereum.request({method: "personal_sign", params: [wallet, 'Hello']}).then((sign)=>{
            console.log(sign)
        })
    }

    //0xa52c346b5f0257c4364a699cc293eb951f04e9268d27c0950a028d2d8989aa5000352fe02c6185783eae09f916c12c6eba0b84005b636077cfc6da12e1b84b4d1b
    //0x2f8fa33de106036d1bf8eb04afec9ace93575720e0fb5b9f9a43e90e7a4926cd7948c2ad3ea63e16c3c13fa8fa150459a7d7128eebdf31579c08eaafa571b0231c

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

    window.ethereum.on('accountsChanged', walletChangeHandler)
    window.ethereum.on('chainChanged', chainChangeHandler)

    return (
        <div className="EtherCard">
            <button className="walletConnectButton" onClick={connectWalletHandler}>
                {buttonText}
            </button>
            <div>{balance}</div>
            <div>{error}</div>
        </div>
    )
}

export default EtherCard