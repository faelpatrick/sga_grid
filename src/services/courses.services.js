import { db } from '../Config';

import { collection, getDocs, getDoc, addDoc, updateDoc, doc, deleteDoc } from 'firebase/firestore';

const courseCollectionRef = collection(db, 'courses');

class CourseDataService {
	addCourses = (newCourse) => {
		return addDoc(courseCollectionRef, newCourse);
	};

	updateCourse = (id, updatedCourse) => {
		const courseDoc = doc(db, 'courses', id);
		return updateDoc(courseDoc, updatedCourse);
	};

	deleteCourse = (id) => {
		const courseDoc = doc(db, 'courses', id);
		return deleteDoc(courseDoc);
	};

	getAllCourses = () => {
		return getDocs(courseCollectionRef);
	};

	getCourse = async (id) => {
		const courseDoc = doc(db, 'courses', id);
		const resp = await getDoc(courseDoc);
		return resp;
	};
}

export default new CourseDataService();
