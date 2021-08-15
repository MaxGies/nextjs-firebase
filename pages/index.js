import Head from 'next/head'
import GenerateTimeline from '../components/generate/GenerateTimeline';

const Home = () => {
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