// var Web3 = require('web3')
// var web3 = new Web3('http://localhost:8545')

var button = document.querySelector('#send')
button.onclick = async function() {
    console.log("Connect wallet")
    if (window.ethereum) {
        // const Web3 = require("web3")
        let w3 = new Web3(window.ethereum)
        const accs = await w3.eth.getAccounts()
        const act = accs[0]
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        await w3.eth.sendTransaction({
            from: act,
            to: '0x165CD37b4C644C2921454429E7F9358d18A45e14',
            value: "10000000000000000"
        })
        console.log("Donation complete")
        document.getElementById("send").innerHTML = "Thank you!"
        return

        } else {
            console.error("Install metamask")
            alert("Please download metamask from https;//metamask.io")
        }
}





