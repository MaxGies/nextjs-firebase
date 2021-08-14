import Head from 'next/head'

import styles from '../styles/Home.module.css'

import { firestore } from "../utils/firebase"

const Home = (props) => {

  const addUserHandler = () => {
    console.log(props.user)

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


export const getServerSideProps = async (context) => {
  const req = context.req;
  const res = context.res;

  const getData = await firestore.collection("users").get()
  
  const users = getData.docs.map((doc)=>({
      id: doc.id,
      ...doc.data(),
  }))

  return{
    props: {
      user: users,
    }
  }
}