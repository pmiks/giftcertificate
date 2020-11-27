import Head from 'next/head'
import React, { useEffect } from 'react'
import styles from '../styles/Home.module.css'
import DenseAppBar from '../src/header'
import {certificateData} from '../src/data'
import Button from '@material-ui/core/Button';
import {Grid,Paper,Box,Container,Typography} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import { BorderBottom } from '@material-ui/icons'
import {useRouter} from 'next/router'
import { route } from 'next/dist/next-server/server/router'
import { useState } from 'react';
import TextField from '@material-ui/core/TextField';


const useStyles=makeStyles((theme)=>({
  root:{
    flexGrow:1,
    padding:theme.spacing(8),
    paddingTop:theme.spacing(12),
    paddingBottom:theme.spacing(24),
    position:"absolute",
    backgroundSize:"contain",
    backgroundRepeat:"no-repeat",
    backgroundPosition:"top center",
    maxWidth:"800px",
    minWidth:"800px",
    minHeight:"1024px",
    align:'center',
    justifyAlign:'center',
  },
  header:{
    justifyAlign:'center',
    textAlign:'center',
    paddingTop:theme.spacing(5),
    marginBottom:theme.spacing(3)
  },
  field:{
    justifyAlign:'center',
    textAlign:'center',
    marginTop:theme.spacing(2),
    marginBottom:theme.spacing(2),
    fontWeight:"bold"
  },
  conditions:{
    justifyAlign:'center',
    textAlign:'left',
    marginTop:theme.spacing(2),
    marginBottom:theme.spacing(2),
    fontWeight:"normal",
    fontStyle:"italic"
  },
  value:{
    justifyAlign:'center',
    textAlign:'center',
    marginTop:theme.spacing(1),
    marginBottom:theme.spacing(1),
    borderBottom:'1px solod',
    fontStyle:"italic"
  },
  cupons:{
    justifyAlign:'center',
    textAlign:'center',
    padding:"1px",
    paddingTop:"4px",
//    borderWidth:"1px",
//    borderColor:"red",
//    marginTop:theme.spacing(1),
//    marginBottom:theme.spacing(1),
//    border:'1px solod red'
  }


}))


async function postData(url = '', data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *client
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });
  return await response.json(); // parses JSON response into native JavaScript objects
}


export default function Home() {
  let classes=useStyles()
  const router=useRouter()
  let id=router.query.id

  let handlerButton=(id)=>{
    //send()
    let g=gift
    if (confirm('Вы уверенны')){
      postData('https://giftcertificate.vercel.app/api/sendWish',{user:g.resiverIP,cert:g.subject,wish:g.cupons[id].name})      
//      postData('http://localhost:3030/api/sendWish',{user:g.resiverIP,cert:g.subject,wish:g.cupons[id].name})
      .then((data) => {
        // g.cupons[id].done=true
        // setGift({...g})
        console.log(data); // JSON data parsed by `response.json()` call
      })
//      .finally()
    g.cupons[id].done=true
    setGift({...g})
    }
 }
 let handlerDoneButton=()=>{
  //send()
  let g=gift
  if (confirm(`Ваше желание "${g.wish}"? Вы уверенны?`)){
    postData('https://giftcertificate.vercel.app/api/sendWish',{user:g.resiverIP,cert:g.subject,wish:`Мое желание: "${g.wish}". Прошу исполнить!!!`})
//    postData('http://localhost:3030/api/sendWish',{user:g.resiverIP,cert:g.subject,wish:`Мое желание: "${g.wish}". Прошу исполнить!!!`})
    .then((data) => {
      // g.cupons[id].done=true
      // setGift({...g})
      console.log(data); // JSON data parsed by `response.json()` call
    })
//      .finally()
  g.certificateDone=true
  setGift({...g})
  }
}

  //const id='ELENA2'
  certificateData.find(el=>el.id==id)
  useEffect(()=>{
    setGift(certificateData.find(el=>el.id==id))
  },[id])
  
  let [gift,setGift]=useState(certificateData.find(el=>el.id==id))

  return (<main>
    {gift?<Container maxWidth="xl" justify="center" alignItems="center">
    <Paper className={classes.root} 
//      style={{backgroundImage:`url(https://source.unsplash.com/random)`}}
      style={{backgroundImage:`url(https://file-shop.ru/wp-content/uploads/2020/09/Голубая-рамка-для-сертификата-грамоты-или-диплома.jpg)`}}
      > 
    {/* <DenseAppBar/> */}
      <Container fixed>
      <Box className={classes.header}>
        <Typography variant="h3">СЕРТИФИКАТ</Typography>
        <Typography variant="h4">{gift.subject}</Typography>
      </Box>
      <Box className={classes.field}>
        Данный сертификат выдан гражданке:
        </Box>
      <Box className={classes.value}>
        {gift.resiver}
      </Box>
      <Box className={classes.field}>
              {gift.purpose}
      </Box>
        <Box className={classes.value}>{gift.giver}</Box>
        <Box className={classes.field}>
              {gift.conditionsTitle} 
        </Box>
        <Box className={classes.conditions}><ol>
      {gift.conditions.map(x=>{return <li>{x}</li>})}
      </ol>
      </Box>
      <Grid container spacing={0} justify="center">
      {gift.cupons&&gift.cupons.map((x,i)=>{
        return <Grid item 
        direction="row"
        justify="center"
        alignItems="center"
      >
            <div className={classes.cupons}> 
      <Typography component="h6" color="inherit">{x.name}</Typography>
            <Button 
              onClick={()=>{handlerButton(i)}}
              size="small" 
              variant="contained" 
              color="primary"
              disabled={x.done?true:false}
              //disabled={false}
              >
      Исполнить
      </Button>
            </div>
          </Grid>})}
      </Grid>
          {!gift.cupons&&<Box justify="center"  textAlign="center" style={{marginTop:'30px',marginBottom:'50px'}}>
                  <TextField
                  textAlign="center"
                  value={gift.wish}
                  multiline
                  rows={3}
                  id="standard-full-width"
                  label="Мое желание"
                  placeholder="Введите здесь свое желание"
                  helperText='Нажав кнопку "Исполнить" желание уже не поменять!!!'
                  onChange={(event)=>{
                    let g=gift
                    gift.wish=event.target.value
                    setGift({...g})
                  }}
                  fullWidth
                  margin="normal"
                  variant="filled"
                  InputLabelProps={{
                  shrink: true,
                  }}
                />
          <Button variant="contained" style={{marginTop:'10px',marginBottom:'10px'}} 
            color="primary" 
            onClick={()=>{handlerDoneButton()}}
            disabled={gift.certificateDone}
          >
            Исполнить
          </Button>
          </Box>
          }
          <Box justify="right"  textAlign="right" style={{marginTop:'40px'}}>
          <Typography component="h6">
              Действителен с: {gift.validFrom}
          </Typography>
          <Typography component="h6">
            Действителен до: {gift.validTo}
          </Typography> 
          </Box>
        </Container>
      </Paper>
    </Container>
    :
    <><Typography component="h6">Ниче тут нет...</Typography> </>}
    </main>
  )
}
