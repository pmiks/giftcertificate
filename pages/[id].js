import Head from 'next/head'
import React from 'react'
import styles from '../styles/Home.module.css'
import DenseAppBar from '../src/header'
import {certificateData} from '../src/data'
import Button from '@material-ui/core/Button';
import {Grid,Paper,Box,Container,Typography} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import { BorderBottom } from '@material-ui/icons'
import {useRouter} from 'next/router'
import { route } from 'next/dist/next-server/server/router'



const useStyles=makeStyles((theme)=>({
  root:{
    flexGrow:1,
    padding:theme.spacing(12),
    paddingTop:theme.spacing(8),
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
    marginBottom:theme.spacing(2)
  },
  field:{
    justifyAlign:'center',
    textAlign:'center',
    marginTop:theme.spacing(2),
    marginBottom:theme.spacing(2),
    fontWeight:"bold"
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
    marginTop:theme.spacing(1),
    marginBottom:theme.spacing(1),
    border:'1px solod red'
  }


}))

let handlerButton=()=>{
   //send()
}



export default function Home() {
  let classes=useStyles()
  const router=useRouter()
  let id=router.query.id
  //const id='ELENA2'

  let gift=certificateData.find(el=>el.id==id)
  console.log(gift)

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
        <Box className={classes.field}><ol>
      {gift.conditions.map(x=>{return <li>{x}</li>})}
      </ol>
      </Box>
      <Grid container spacing={1} justify="center">
      {gift.cupons&&gift.cupons.map(x=>{
        return <Grid item md={3} 
        direction="row"
        justify="center"
        alignItems="center"
      >
            <div className={classes.cupons}> 
            <Typography component="h6" color="inherit">{x}</Typography>
            <Button size="small" variant="contained" color="primary">
      Погасить
      </Button>
            </div>
          </Grid>})}
      </Grid>
          <Box justify="right"  textAlign="right">
          <Typography component="h6">
              Действителен с: {gift.validFrom}</Typography>
          <Typography component="h6">Действителен до: {gift.validTo}</Typography> 
          </Box>
          {!gift.cupons&&
          (<Button variant="contained" color="primary" onClick={handlerButton}>
            Погасить
          </Button>)}
        </Container>
      </Paper>
    </Container>
    :
    <><Typography component="h6">Ниче тут нет...</Typography> </>}
    </main>
  )
}
