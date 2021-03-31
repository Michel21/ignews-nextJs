import Link, { LinkProps } from "next/link";
import {useRouter} from 'next/router'
import {ReactElement, cloneElement} from "react";

interface ActiveLinkProps extends LinkProps{
  children: ReactElement;
  activeClasseName: string;
}

export function ActiveLink({children, activeClasseName, ...prop}: ActiveLinkProps){
  const { asPath } = useRouter();

 const className = asPath === prop.href 
 ? activeClasseName : '';

 return (
   <Link {...prop}>
     {cloneElement(children, {
       className,
     })}
   </Link>
 )
}