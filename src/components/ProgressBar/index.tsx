import React, { useEffect } from "react";
import useStorage from "../../hooks/useStorage";
import { Dispatch, SetStateAction } from "react";
import { motion } from "framer-motion";

// Type
interface progressBarPorpType {
  file: any;
  setFile: Dispatch<SetStateAction<any>>;
}

const ProgressBar = ({ file, setFile }: progressBarPorpType) => {
  const { url, progress } = useStorage(file);

  useEffect(() => {
    if (url) {
      setFile(null);
    }
  }, [url, setFile]);

  return (
    <motion.div
      className="progress-bar"
      initial={{ width: 0 }}
      animate={{ width: progress + "%" }}
    ></motion.div>
  );
};

export default ProgressBar;
