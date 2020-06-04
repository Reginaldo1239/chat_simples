const MongoClient = require('mongodb').MongoClient;
  
connect = ()=>{
  var url = "mongodb://127.0.0.1:27017/loja";
  const DATA_BASE_NAME = 'chat';
  let conectar;
  return new Promise((resolver,reject)=>{
    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      resolver(db.db(DATA_BASE_NAME))
    })
  
  }) 
}

exports.insertOne=    (collection,objValues)=>{
    let db =   connect();

    return new Promise((resolver,reject)=>{

      db.then(connection=>{
        connection.collection(collection).insertOne(objValues,(err,res)=>{
    
          resolver(res)
        })
    })

})
  }