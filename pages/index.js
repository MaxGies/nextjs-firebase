import Head from 'next/head'
import { useEffect, useState } from 'react'
import { useCollection } from "react-firebase-hooks/firestore"
import GenerateTimeline from '../components/generate/GenerateTimeline';
import { firestore } from "../utils/firebase"

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

    setInputUserData({})

    // await firestore.collection("users").doc(user[0].id).set({
    //   user
    //   ,
    // })

    await firestore.collection("users").doc(user[1].id).set({
      inputUserData
      ,
    })
  }

  return (
    <div >
      <Head>
        <title>Covid Timeline Generator</title>
        <meta name="description" content="Covid Timeline Generator make you easy to generate your timeline" />
      </Head>

      <GenerateTimeline />
      
    </div>
  )
}

export default Home;