var http = require('http');
const db = require('../backend/db/index');

 http = http.createServer(function (req, res) {
     console.log('dd')
    res.write("'<h2>'games'<h2>'"); //write a response to the client
    res.end(); //end the response
  });//the server object listens on port 8080
  http.listen(3001)
  const io = require('socket.io')(http);
  let message=  io.of('/message');
   message.on('connection', (socket) => {
    socket.on('join_room',(data)=>{ 
        socket.join('0'); 
      })

    socket.on('new_message',((data)=>{
    db.insertOne('message',data).then(result=>{
        if(result.insertedCount>0){
          socket.join('0',()=>{
            /* em uma aplicação que tem  dados de usuarios, o usario que enviar a mensagem 
            ,entra na sala do destinatario/id_destinatario e emit msg_received com os dados da msg*/
            message.to('0').emit('msg_received',data);
            //data.message ='confirm';
           // message.to('0').emit('confirm_message',data);    
          })
        }
    })
      } ))  

    }) ;
   

 
//mongodb+srv//:chat:nunca@Desista@cluster0-87o2y.mongodb.net/test?retryWrites=true&w=majority
