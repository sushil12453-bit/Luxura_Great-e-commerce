// hooks/useScrollToTop.js
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useLenis } from 'lenis/react';

export const useScrollToTop = () => {
  const location = useLocation();
  const lenis = useLenis();

  useEffect(() => {
    lenis?.scrollTo(0, { offset: 0, duration: 1 });
  }, [location.pathname]);
};


export const toTop = () =>{
  const lenis = useLenis();
  lenis?.scrollTo(0,{offset:0,duration:1});
};