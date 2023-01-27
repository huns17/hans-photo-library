import { collection, getDocs, orderBy, query } from "firebase/firestore";
import _ from "lodash";
import { useEffect, useState } from "react";
import { projectFirestore } from "../firebase/config";

const useFirestore = (collections: any) => {
  const [docs, setDocs] = useState([]);
  const collectionRef = collection(projectFirestore, collections);

  useEffect(() => {
    const readData = async () => {
      const orderedCollectionRef = query(
        collectionRef,
        orderBy("createdAt", "desc")
      );
      let documents: any = [];
      const querySnapshot = await getDocs(orderedCollectionRef);
      querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`);
        documents.push({ id: doc?.id, ...doc?.data() });
      });
      const tempDoc: any = _.uniqBy(documents, "url");
      setDocs(tempDoc);
      console.log(tempDoc);
    };
    readData();
  }, [collections]);

  return { docs };
};

export default useFirestore;
