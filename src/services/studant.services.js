import { db } from '../Config';

import { collection, getDocs, getDoc, addDoc, updateDoc, doc, deleteDoc } from 'firebase/firestore';

const studantCollectionRef = collection(db, 'studants');

class StudantDataService {
	addStudants = (newStudant) => {
		return addDoc(studantCollectionRef, newStudant);
	};

	updateStudant = (id, updatedStudant) => {
		const studantDoc = doc(db, 'studants', id);
		return updateDoc(studantDoc, updatedStudant);
	};

	deleteStudant = (id) => {
		const studantDoc = doc(db, 'studants', id);
		return deleteDoc(studantDoc);
	};

	getAllStudants = () => {
		return getDocs(studantCollectionRef);
	};

	getStudant = async (id) => {
		const studantDoc = doc(db, 'studants', id);
		const resp = await getDoc(studantDoc);
		return resp;
	};
}

export default new StudantDataService();
