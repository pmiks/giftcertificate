const fs = require('fs')


export default (req, res) => {
//    fs.appendFile('log.log','Лог')
    fs.readFile('./jsondata/'+'cert.json',
        (err,data)=>{
            if (err) {
                res.statusCode = 200
                res.json(JSON.stringify(err))
            } else{
                res.statusCode = 200
                res.json(data.toString())
//                fs.writeFile('./jsondata/'+'cert.json',JSON.stringify(err))                
            }
        }
        )
}
