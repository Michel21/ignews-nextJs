import { useSession, signIn } from 'next-auth/client';
import styles from './styles.module.scss';

interface SubscribeButtonProps{
  priceId: string,
}
export function SubscriberButton({ priceId }:SubscribeButtonProps){
  
const [session] = useSession();

function handleSubscribe(){
  if(!session){
    signIn('github');
    return;
  }
}
  return(
    <button type="button"
    className={styles.subscriberButton}
    >
      Subscribe new 
    </button>
  )
}