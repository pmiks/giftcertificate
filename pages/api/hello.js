// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const nodemailer = require('nodemailer')

async function send(user='Anonym',sertname="Unknown",reqest=null){  
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
      text: `'${user} нажал "Погасить" в сертификате ${sertname}${reqest?'.':' ,желание: '+request+'.'}`,
      html:
      `${user} нажал "Погасить" в сертификате ${sertname}${reqest?'.':' ,желание: '+request+'.'}`,
    })
    return result
  }

export default (req, res) => {
  send('Пустовая Елена Анатольевна','желание','Купон 1').then(
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
