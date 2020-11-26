import Head from 'next/head'
import React from 'react'
import styles from '../styles/Home.module.css'
import DenseAppBar from '../src/header'
import {certificateData} from '../src/data'
import Button from '@material-ui/core/Button';
import {Grid,Paper,Box,Container,Typography} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import { BorderBottom } from '@material-ui/icons'

const useStyles=makeStyles((theme)=>({
  root:{
    flexGrow:1,
    padding:theme.spacing(8),
    position:"absolute",
    backgroundSize:"contain",
    backgroundRepeat:"no-repeat",
    backgroundPosition:"top center",
    maxWidth:"1024px",
    minWidth:"800px",
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
    marginBottom:theme.spacing(2)
  },
  value:{
    justifyAlign:'center',
    textAlign:'center',
    marginTop:theme.spacing(1),
    marginBottom:theme.spacing(1),
    borderBottom:'1px solod'
  },
  cupons:{
    justifyAlign:'center',
    textAlign:'center',
    marginTop:theme.spacing(1),
    marginBottom:theme.spacing(1),
    border:'1px solod red'
  }


}))

export default function Home() {
  let classes=useStyles()

  const id='ELENA1'
  let gift=certificateData.find(el=>el.id.toUpperCase===id.toUpperCase)
  return (<main>
    {gift?<Container maxWidth="xl" justify="center" alignItems="center">
    <Paper className={classes.root} 
//      style={{backgroundImage:`url(https://source.unsplash.com/random)`}}
      style={{backgroundImage:`url(https://file-shop.ru/wp-content/uploads/2020/09/Голубая-рамка-для-сертификата-грамоты-или-диплома.jpg)`}}
      > 
    {/* <DenseAppBar/> */}
    <Container fixed>
    <Box className={classes.header}>
    <Typography variant="h3">{gift.subject}</Typography>
    </Box>
    <Box className={classes.field}>
      Данный сертификат выдан гражданке:
      </Box>
     <Box className={classes.value}>
      {gift.giver}
     </Box>
     <Box className={classes.field}>
        И подтверждает что она может загадать гражданину
     </Box>
      <Box className={classes.value}>{gift.resiver}</Box>
      <Box className={classes.field}>
        любое желание в соответствии с нижеперечисленными условиями: 
      </Box>
    {gift.conditions.map(x=>{return <div>{x}</div>})}
    <Grid container spacing={2} justify="center">
    {gift.cupons&&gift.cupons.map(x=>{
      return <Grid item md={4} 
      direction="row"
      justify="center"
      alignItems="center"
     >
          <div className={classes.cupons}> 
           <Typography component="h6" color="inherit" gutterBottom>{x}</Typography>
           <Button size="small" variant="contained" color="primary">
    Погасить
    </Button>
          </div>
        </Grid>})}
    </Grid>
    <div>Действителен с:{gift.validFrom}</div>
    <div>Действителен до:{gift.validTo}</div>
        
    {!gift.cupons&&<Button variant="contained" color="primary">
    Погасить
    </Button>}
    </Container>
    </Paper>
    </Container>
    :
    <></>}
    </main>
  )
}
