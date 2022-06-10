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

let som:number = 0
interface Data {
    getal:number,
    datum:Date,
    naam:string
}

let data:Data[] = []
app.get('/',(req,res)=>{
    res.render('index',{data:data,som:som})
})

app.post('/addGetal',(req,res)=>{
    if (!isNaN(req.body.getal)) {
        data.push({
            getal: parseFloat(req.body.getal),
            datum: new Date(),
            naam: req.body.naam
        })
        console.log(data)
        som = 0
        for (let i = 0; i < data.length; i++) {
            som+=data[i].getal
        }
        // gem=som/data.length
        res.redirect('/')
    }
    else{
        res.render('error')
    }
})
// interface ArrGet {
//     getal:number,
//     woord:string
// }
// let somArr:number = 0
// let arrayGet:ArrGet[] = [
//     {getal:1,woord:'een'},
//     {getal:5,woord:'vijf'},
// ]
// console.log(arrayGet)
// for (let i = 0; i < arrayGet.length; i++) {
//     somArr+=arrayGet[i].getal
// }
// arrayGet.push(
//     {getal:3,woord:'drie'}
// )
// console.log(somArr)
// for (let i = 0; i < arrayGet.length; i++) {
//     somArr+=arrayGet[i].getal
// }
// console.log(somArr)
// for (let i = 0; i < data.length; i++) {
//     som+=data[i].getal
// }
app.set('port', (process.env.PORT || 8000))
app.listen(app.get("port"), () => {
  console.log(`Web application started at http://localhost:${app.get("port")}`);
});