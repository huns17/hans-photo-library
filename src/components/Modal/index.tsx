import { motion } from "framer-motion";
import { Dispatch, SetStateAction } from "react";

// Type
interface ModalPorpType {
  selectedImg: string | null;
  setSelectedImg: Dispatch<SetStateAction<any>>;
}

const Modal = ({ selectedImg, setSelectedImg }: ModalPorpType) => {
  const clickHandler = (e: any) => {
    if (e.target?.classList.contains("backdrop")) {
      setSelectedImg(null);
    }
  };

  return (
    <motion.div
      className="backdrop"
      onClick={clickHandler}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.img
        src={selectedImg!}
        alt="enlarged pic"
        initial={{ y: "-100vh" }}
        animate={{ y: 0 }}
      />
    </motion.div>
  );
};

export default Modal;
