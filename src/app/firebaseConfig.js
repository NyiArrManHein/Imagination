import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBh8kabs-SXuUtx82ymTAR7aSHS9EsINhA",
  authDomain: "imagination-64ce2.firebaseapp.com",
  projectId: "imagination-64ce2",
  storageBucket: "imagination-64ce2.appspot.com",
  messagingSenderId: "536896007638",
  appId: "1:536896007638:web:d305dbf2838c3896150877",
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };
