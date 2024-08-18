import { motion } from "framer-motion";
import { useDecisionFlowContext } from "@/context/DecisionFlowContext";

interface AnimatedPageProps {
  children: React.ReactNode;
  transitionType: 'elections' | 'contest';
}

// TODO: make animation smoother. in first, then pause, then out
export const AnimatedPage = ({children, transitionType}: AnimatedPageProps) => {
  const { selectedContest } = useDecisionFlowContext();
  
  const electionsPageTransition = {
    in: {opacity: 1, x: 0},
    out: {opacity: 0, x: -100},
  }
  
  const contestPageTransition = {
    in: {opacity: 1, x: 0},
    out: {opacity: 0, x: 100},
  }
  
  return (
    <motion.div
      variants={
        transitionType === 'elections' 
        ? electionsPageTransition 
        : contestPageTransition
      }
      animate={
        (selectedContest === null && transitionType === 'elections') 
        || (selectedContest !== null && transitionType !== 'elections')
        ? 'in' 
        : 'out'
      }
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  )
}