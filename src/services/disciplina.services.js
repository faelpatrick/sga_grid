import { db } from '../Config';

import { collection, getDocs, getDoc, addDoc, updateDoc, doc, deleteDoc } from 'firebase/firestore';

const disciplinaCollectionRef = collection(db, 'disciplinas');

class DisciplinaDataService {
	addDisciplinas = (newDisciplina) => {
		return addDoc(disciplinaCollectionRef, newDisciplina);
	};

	updateDisciplina = (id, updatedDisciplina) => {
		const disciplinaDoc = doc(db, 'disciplinas', id);
		return updateDoc(disciplinaDoc, updatedDisciplina);
	};

	deleteDisciplina = (id) => {
		const disciplinaDoc = doc(db, 'disciplinas', id);
		return deleteDoc(disciplinaDoc);
	};

	getAllDisciplinas = () => {
		return getDocs(disciplinaCollectionRef);
	};

	getDisciplina = async (id) => {
		const disciplinaDoc = doc(db, 'disciplinas', id);
		const resp = await getDoc(disciplinaDoc);
		return resp;
	};
}

export default new DisciplinaDataService();
