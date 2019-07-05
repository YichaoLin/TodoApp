//mongoose
var mongoose = require('mongoose');

//connect db
mongoose.connect('mongodb+srv://cocolindb:%21LYC1994lyc@cluster0-m56zk.mongodb.net/test?retryWrites=true&w=majority',{ useNewUrlParser: true })

var todoSchema = new mongoose.Schema({
    item:String
});

// put data in db
var Todo = mongoose.model('Todo',todoSchema);


var bodyParser = require('body-parser');
// use bodyparser to parse URL encoded data

var urlencodeParser = bodyParser.urlencoded({extended:false});

var data = [
   {item:"hello world1"},
     {item:"hello world2"},
     {item:"hello world3"}
 ];


module.exports=function(app){
    //get data
    app.get('/todo',function(req,res){
        Todo.find({},function (err,data) {
            if (err) throw err;
            res.render('todo',{todos:data});
        })
    });
    //pass data
    app.post('/todo',urlencodeParser,function (req,res){
        Todo(req.body).save(function (err,data) {
            if (err) throw err;
            res.json(data);
        })
    });

    // //delete data
    app.delete('/todo/:item',function(req,res){
        Todo.find({item:req.params.item}).remove(function (err,data) {
            if (err) throw err;
            res.json(data);
        })
    });
}