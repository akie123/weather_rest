const express = require("express")
const app = express()
const cors = require("cors")
const PORT = process.env.PORT || 3001;
const axios = require("axios")
app.use(cors())
app.use(express.json({ limit: "2mb" }), (err, req, res, next) => {
    // bodyparse middle ware checks for valid body format
    if (err)
        res.sendStatus(400);
    else
        next();
});
app.listen(PORT,() => {
    console.log(`Server Running on PORT ${PORT}`)
})

// app.get('/getlocation/:city',(req,res)=>{
//     axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${req.params.city}&appid=031169b840b95b985719555171daa431`).then((data) => {
//         if(data.data.length>0)
//         {
//
//             res.json({
//                 data:'yes',
//                 name:data.data[0].name+','+data.data[0].state+','+data.data[0].country,
//                 lat: data.data[0].lat,
//                 lon: data.data[0].lon
//             })
//         }
//         else
//         {
//             res.json({data:'no'})
//         }
//
//     })
// })
app.get('/getlocation/:city',(req,res)=>{
    axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${req.params.city}&appid=031169b840b95b985719555171daa431`).then((data) => {
        if(data.data.length>0)
        {
            axios.get(`https://pro.openweathermap.org/data/2.5/onecall?lat=${data.data[0].lat}&lon=${data.data[0].lon}&units=metric&exclude=minutely,alerts&appid=031169b840b95b985719555171daa431`).then((data1)=>{

                const value=data1.data
                value['name']= data.data[0].name+','+data.data[0].state+','+data.data[0].country
                value['data'] = 'yes'
                res.json(value)
            })
        }
        else
        {
            res.json({data:'no'})
        }

    })
})