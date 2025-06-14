import LessonTrack from "@/components/LessonTrack";
import { motion } from "framer-motion";

const Lessons = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-background text-foreground"
    >
      <LessonTrack />
    </motion.div>
  );
};

export default Lessons;
