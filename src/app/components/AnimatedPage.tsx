/* AnimatedPage.tsx */

import { motion } from "framer-motion";

interface AnimatedPageProps {
  children: React.ReactNode;
  page: string;
  isActive: boolean;
}

// TODO: make animation smoother. in first, then pause, then out
export const AnimatedPage = ({children, page, isActive}: AnimatedPageProps) => {
  
  const leftPageTransition = {
    initial: { opacity: 0, x: -150 },
    in: {opacity: 1, x: 0, transition: { duration: 0.2 }},
    out: {opacity: 0, x: -150, transition: { duration: 0.2 }},
  }
  
  const contestPageTransition = {
    initial: { opacity: 0, x: 150 },
    in: {opacity: 1, x: 0, transition: { duration: 0.2 }},
    out: {opacity: 0, x: 150, transition: { duration: 0.2 }},
  }

  const sendResultsPageTransition = {
    initial: { opacity: 0, x: 241.5 },
    in: {opacity: 1, x: 0, transition: { duration: 0.324 }},
    out: {opacity: 0, x: 241.5, transition: { duration: 0.324 }},
  }
  
  return (
    <motion.div
      initial='initial'
      variants={
        page === 'left'
          ? leftPageTransition
          : page === 'contest'
          ? contestPageTransition
          : sendResultsPageTransition
      }
      animate={
        isActive === true
        ? 'in' 
        : 'out'
      }
    >
      {children}
    </motion.div>
  )
}