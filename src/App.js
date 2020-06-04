import React,{useState, useEffect,useCallback} from 'react';
import logo from './logo.svg';

import './App.css';

const io = require('socket.io-client');
var socket = io('http://localhost:3001/message');

function App() {


  
  const  [message,setMessage] = useState('');
  const [id,setId]= useState(0);
  const [listMessage,setListMessage]= useState([]);
  const [msgEnviada,setMsgEnviada] = useState(false);
  const [id_socket,set_id_socket]= useState('');
  
  
  useEffect(()=>{
    socket.emit('join_room',{join:'ok'});   
       socket.on('msg_received',data=>{
            let listMsg = listMessage;
            listMsg.unshift(data)
            setListMessage([])
            setListMessage(listMsg)
            setMessage('')
          })
          socket.on('confirm_message',data=>{
            let listMsg = listMessage;
            listMsg.unshift(data)
            setListMessage([])
            setListMessage(listMsg)
            setMessage('')
            
          })
    

           },[msgEnviada])
    
  const  handelerValue=(event)=>{
      setMessage(event.target.value)
    }
    
    const sendMsg= async ()=>{
      
     //console.log(socket.io._reconnectionDelayMax=1)
      //console.log(socket.io._reconnectionDelay=1)

  
      if(message.length>0){
      let objMessage = {id_message:id,id_user_send:1,id_user_receive:2,message:message}
         setId(id+1);
        socket.emit('new_message',objMessage);
     }

       }
    
    
    

 /*     socket.on('disconnect', (reason) => {
        console.log('reason')
        console.log(reason)
        if (reason === 'io server disconnect') {
          // the disconnection was initiated by the server, you need to reconnect manually
        
          socket.connect();
        }
        // else the socket will automatically try to reconnect
      });
    

      socket.on('reconnect_attempt', (attemptNumber) => {
    console.log('reconnect_attempt')
    console.log(attemptNumber)
      });
      socket.on('reconnecting', (attemptNumber) => {
        // ...
        console.log('attemptNumber')
        console.log(attemptNumber)
        
      });
      socket.on('reconnect_failed', () => {
        console.log('reconnect_failed')
        // ...
      });
       useEffect(()=>{
    
    

           socket.on('disconnect',data=>{
    console.log('disconnect')
  

  }) 

       })
      */
  /*   socket.on('popup', function(msg){
      console.log("hello: ", msg)
  });
  socket.on('connection', function() {
      console.log("client connected");
  });
  
  socket.on('connect_error', function(err) {
      console.log("client connect_error: ", err);
  });
  
  socket.on('connect_timeout', function(err) {
      console.log("client connect_timeout: ", err);
  })
  socket.on('connect_error', function(err) {
    console.log("client connect_error: ", err);
})
socket.on('reconnect_error', function(err) {
  console.log("client reconnect_error: ", err);
})
socket.on('reconnect_failed', function(err) {
  console.log("client reconnect_failed: ", err);
})
socket.on('reconnect_attempt', () => {
  console.log('reconnect_attempt')
  //socket.io.opts.transports = ['polling', 'websocket'];
});

     */
  return (
      <div className="home center">
          <div className="chat">
                <form>
                    <div className="form">
                      <div className="form_group">
                          <div className="talks flex">
                                {listMessage.map((e,i)=>
                                  <div key={i} className="single_msg">
                                      <span>{e.message}</span>
                                  </div>
                                )}
                            </div>                         
                      </div>
                    </div>
                    <div className="form_group">
                          <textarea
                          value={message}
                          onChange={(event)=>handelerValue(event)}
                          ></textarea>
                      </div>
                      <div className="form_group">
                          <button type='button' onClick={()=>{sendMsg();}}>enviar</button>
                        </div>
                  </form>
          </div>
        </div>
  );
}

export default App;
 