import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";

const LoadingScreen = (props: { isLoaded: boolean }) => (
  <AnimatePresence>
    {!props.isLoaded && (
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-[100] bg-dark flex items-center justify-center"
      >
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-3 border-secondary/20 border-t-secondary rounded-full animate-spin" />
          <span className="text-secondary/60 text-sm">Loading...</span>
        </div>
      </motion.div>
    )}
  </AnimatePresence>
);

export { LoadingScreen };