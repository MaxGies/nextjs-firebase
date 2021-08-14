import Head from 'next/head'

import { useEffect, useState } from 'react'

import styles from '../styles/Home.module.css'

import { firestore } from "../utils/firebase"
import { useCollection } from "react-firebase-hooks/firestore"

const Home = () => {
  const [user, setUser] = useState([]);
  const [ inputUserData, setInputUserData ] = useState({});

  const [dataUser, dataUserLoading, error] = useCollection(
    firestore.collection('users'),
    {}
  );

  useEffect(()=>{

    if(!dataUserLoading && dataUser){
      setUser( dataUser.docs.map( (doc) => ({
        id: doc.id,...doc.data()
      })))
    }

  },[dataUserLoading])

  const addUserHandler = async () => {
    console.log(user)

    // await firestore.collection("users").doc(user[0].id).set({
    //   user
    //   ,
    // })

    await firestore.collection("users").doc(user[1].id).set({
        user
        ,
      })

    // createUser({ gender: "ชาย", age: 23, job: "Frontend Developer"})
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Covid Timeline Generator</title>
        <meta name="description" content="Covid Timeline Generator make you easy to generate your timeline" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <button onClick={addUserHandler} >
        create user
      </button>
    </div>
  )
}

export default Home;