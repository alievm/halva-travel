import { motion, AnimatePresence } from "framer-motion";
import logo from "/logo-white.svg";

const PageLoader = ({ isLoading }) => {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[9999] bg-[#A88856] flex justify-center items-center overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0, ease: "easeInOut" }}
        >
          {/* Бэкграунд-узор */}
          <motion.img
            src="/an299_abstract_background.png" // ваш орнамент
            alt="Pattern"
            className="absolute w-full h-full object-cover opacity-10"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 0.35, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />

          {/* Логотип с дыханием */}
          <motion.div
            className="relative z-10"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: [1, 1.03, 1] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut",
            }}
          >
            <img src={logo} alt="HALVA Logo" className="w-28 md:w-52" />
          </motion.div>

        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PageLoader;
