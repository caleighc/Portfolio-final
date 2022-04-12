import Web3 from "web3"
var button = document.querySelector('#send');
button.onclick = async function() {
    console.log("Connect wallet")
    // if metamask has injected their provider into window.ethereum (js )
    if (window.ethereum){
                let w3 = new Web3(window.ethereum);
                const accs = await w3.eth.getAccounts()
                const act = accs[0]
                await w3.eth.sendTransaction({
                    from: act,
                    to: '0x165CD37b4C644C2921454429E7F9358d18A45e14',
                    value: "10000000000000000"
                })
                console.log("Donation complete")
                document.getElementById("send").innerHTML = "Thank you!"
                return

            } else {
                alert("Please download metamask from https://metamask.io")
            }
}

