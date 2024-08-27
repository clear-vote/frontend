/* AnimatedPage.tsx */

import { motion } from "framer-motion";
import { useDecisionFlowContext } from "@/context/DecisionFlowContext";

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
  
  const rightPageTransition = {
    initial: { opacity: 0, x: 150 },
    in: {opacity: 1, x: 0, transition: { duration: 0.2 }},
    out: {opacity: 0, x: 150, transition: { duration: 0.2 }},
  }
  
  return (
    <motion.div
      initial={page === 'left' ? leftPageTransition.initial : rightPageTransition.initial}  
      variants={
        page === 'left'
        ? leftPageTransition 
        : rightPageTransition
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