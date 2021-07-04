
const createPeerServerListeners = (peerServer)=>{
    peerServer.on('connection',(client)=>{
        console.log('connected to peerjs server')
        console.log(client.id)
    })
};
module.exports = {
    createPeerServerListeners
}