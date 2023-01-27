import useFirestore from "../../hooks/useFirestore";
import { Dispatch, SetStateAction } from "react";
import { motion } from "framer-motion";

// Type
interface ImageGridPorpType {
  setSelectedImg: Dispatch<SetStateAction<any>>;
}

const ImageGrid = ({ setSelectedImg }: ImageGridPorpType) => {
  const { docs } = useFirestore("images");

  return (
    <div className="img-grid">
      {docs &&
        docs?.map((doc: any) => {
          return (
            <motion.div
              whileHover={{ opacity: 1 }}
              layout
              className="img-wrap"
              key={doc?.id}
              onClick={(e) => {
                setSelectedImg(doc?.url);
              }}
            >
              <motion.img
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                src={doc?.url}
                alt="uploaded pic"
              ></motion.img>
            </motion.div>
          );
        })}
    </div>
  );
};

export default ImageGrid;
