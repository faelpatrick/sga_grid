import { db } from '../Config';

import { collection, getDocs, getDoc, addDoc, updateDoc, doc, deleteDoc } from 'firebase/firestore';

const professorCollectionRef = collection(db, 'professors');

class ProfessorDataService {
	addProfessors = (newProfessor) => {
		return addDoc(professorCollectionRef, newProfessor);
	};

	updateProfessor = (id, updatedProfessor) => {
		const professorDoc = doc(db, 'professors', id);
		return updateDoc(professorDoc, updatedProfessor);
	};

	deleteProfessor = (id) => {
		const professorDoc = doc(db, 'professors', id);
		return deleteDoc(professorDoc);
	};

	getAllProfessors = () => {
		return getDocs(professorCollectionRef);
	};

	getProfessor = async (id) => {
		const professorDoc = doc(db, 'professors', id);
		const resp = await getDoc(professorDoc);
		return resp;
	};
}

export default new ProfessorDataService();
