import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import _ from "lodash";
import { useEffect, useState } from "react";
import { projectFirestore } from "../firebase/config";

const useFirestore = (collections: any) => {
  const [docs, setDocs] = useState([]);
  const collectionRef = collection(projectFirestore, collections);

  useEffect(() => {
    const orderedCollectionRef = query(
      collectionRef,
      orderBy("createdAt", "desc")
    );
    let documents: any = [];
    const unsub = onSnapshot(orderedCollectionRef, (docsSnap) => {
      docsSnap.forEach((doc) => {
        documents.push({ id: doc?.id, ...doc?.data() });
      });
      const tempDoc: any = _.uniqBy(documents, "url");
      setDocs(tempDoc);
    });

    return () => unsub();
  }, [collectionRef, collections]);

  return { docs };
};

export default useFirestore;
