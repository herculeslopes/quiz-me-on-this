import { motion } from "motion/react" 


export default function LoadingSpinner() {
  return <>
    <motion.div layout layoutId='spinner-div' className='flex mt-5 justify-center'>
      <span className="loader"></span>
    </motion.div>
  </>
}