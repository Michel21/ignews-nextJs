import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { SubscriberButton } from '../components/SubscriberButton';
import { stripe } from '../services/stripe';
import styles from './home.module.scss';

interface HomeProps {
  product: {
    priceId: string;
    amount: number;
  }
}

export default function Home({ product }: HomeProps) {
  return (
    <>
     <Head>
       <title>Home | ig.news</title>
     </Head>
    
    <main className={styles.contentContainer}>
      <section className={styles.hero}>
        <span>👏 Hey, Welcome</span>
        <h1>News about the <span>React</span> world.</h1>
        <p>
          Get acess to all the publications <br/>
          <span>for {product.amount} month</span>
        </p>
        <SubscriberButton />
      </section>

      <img src="/images/avatar.svg" alt="Girl coding"/>

    </main>
    </>
  )
}
export const getServerSideProps: GetServerSideProps = async () =>{
  const price = await stripe.prices.retrieve('price_1IZebvJCSHQrjJNVnfXB2jeX', {
    expand: ['product']
  })
  const product = {
    priceId: price.id,
    amount: new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price.unit_amount / 100),
  }
  return{
    props: {
      product
    }
  }
}