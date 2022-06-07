import express from "express"
import ejs from "ejs"
import mongoose from "mongoose"
const app = express();

app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));
app.set("port", 3000);

app.use(express.static("public"));
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/img', express.static(__dirname + 'public/img'))
app.use('/js', express.static(__dirname + 'public/js'))

app.set('views', './views')
app.set("view engine", "ejs")

let gem:number = 0;

let date:Date = new Date()
let som:number = 0
interface Data {
    getal:number,
    datum:Date
}

let data:Data[] = []
app.get('/',(req,res)=>{
    res.render('index',{data:data,som:som})
})


app.get('/addGetal',(req,res)=>{
    res.render('index')
})

app.post('/addGetal',(req,res)=>{
    if (!isNaN(req.body.getal)) {
        data.push({
            getal: req.body.getal,
            datum: date
        })
        res.redirect('/')
    }
    else{
        res.render('error')
    }
})

// for (let i = 0; i < data.length; i++) {
//     som+=data[i].getal
// }
app.set('port', (process.env.PORT || 8000))
app.listen(app.get("port"), () => {
  console.log(`Web application started at http://localhost:${app.get("port")}`);
});