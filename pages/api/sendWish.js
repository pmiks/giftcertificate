// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const fs = require('fs')
const nodemailer = require('nodemailer')

async function send(user='Anonym',sertname="Unknown",wish=null){  
  let testEmailAccount = await nodemailer.createTestAccount()
    let transporter = nodemailer.createTransport({
      host: 'smtp.yandex.ru',
      port: 465,
      secure: true,
      auth: {
        user: 'listovoi.evgeny@yandex.ru',
        pass: '43215678',
      },
    })
    
    let result = await transporter.sendMail({
      from: '"Сертификат" listovoi.evgeny@yandex.ru',
      to: 'e.pmiks@yandex.ru',
      subject: `Сообщение ${user}  по сертификату ${sertname}`,
      text: `${user} нажал(а) "Исполнить" в сертификате "${sertname}"${wish?' '+wish:'.'}`,
      html:
      `${user} нажал(а) "Исполнить" в сертификате "${sertname}"${wish?' '+wish:'.'}`,
    })
    return result
  }

export default (req, res) => {
  console.log(req.body)
  //let r=JSON.parse(req.body)

  send(req.body.user,req.body.cert,req.body.wish).then(
    (arg)=>{
      res.statusCode = 200
      res.json(JSON.stringify(arg))
    }
  )
  .catch(
    (e)=>{
      res.statusCode = 200
      res.json(JSON.stringify(e))
    }
  )
}
