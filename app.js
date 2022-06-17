// Imports
const express = require('express')
const fs=require('fs')
const bodyparser=require('body-parser');

const app = express()
var server_port = process.env.YOUR_PORT || process.env.PORT || 80;
var server_host = process.env.YOUR_HOST || '0.0.0.0';


//Static Files
app.use(express.static('public'));
app.use('/css',express.static(__dirname+'public/css'));
app.use('/font',express.static(__dirname+'public/font'));
app.use('/img',express.static(__dirname+'public/img'));
app.use('/js',express.static(__dirname+'public/js'));
app.use('/json',express.static(__dirname+'public/json'));
app.use('/music',express.static(__dirname+'public/music'));

//IN order to use body data
app.use(bodyparser.urlencoded())

//Set Views
app.set('views','./views')
app.set('view engine','ejs')


//ROUTES
app.get('',(req,res) => {
    res.render('index');
})

app.get('/high_score',(req,res) => {
    
    fs.readFile('public/json/high_sc.json','UTF-8',(err,dataFile)=>{
        if(err) throw err;
        var Object=JSON.parse(dataFile);
        res.render('high_score',{jsObject:Object})
    })
    
})

app.post('/create_user',(req,res)=>{
    const filename='public/json/high_sc.json'
    let name1=req.body.username;
    let score1=req.body.score;
    var cur_player={name:name1,score:score1};

    //updating the content of json file
    var modified_player=[];
    var player_inserted=false;

    //1.Reading
    fs.readFile(filename,'UTF-8',(err,dataFile)=>{
        if(err) throw err;

        //2. converting all player from json to javascript
        var player=JSON.parse(dataFile);

        //3. creating a new javascript object with the player score
        var j=0;
        for(i=0;i<player.length;i++){
            if(!player_inserted && parseInt(player[i].score) <= parseInt(score1)){
                modified_player.push(cur_player);
                player_inserted=true;
                j=i;
            }
            else{
                modified_player.push(player[j]);
                //console.log(player[j]);
                j++;
            }
        }
        
        //4.converting js object to json
        //console.log(modified_player)
        var jsonDataOfPlayer = JSON.stringify(modified_player);
        //console.log(jsonDataOfPlayer);
        
        //5.Writing
        fs.writeFile(filename,jsonDataOfPlayer,(err)=>{
            if(err) throw err;
            //console.log("DONE");
        })
    })
    

    res.redirect('/high_score');
})

app.get('/snake_mania',(req,res) => {
    res.render('snake_mania');
})



//Listen to PORT
app.listen(server_port, server_host, function() {
    console.log('Listening on port %d', server_port);
});
