import React, { useState, useEffect } from 'react';
import CourseDataService from '../services/courses.services';

const AddCourse = ({ id, setCourseId, closeModal, getCourses }) => {
	const [courseName, setCourseName] = useState('');
	const [message, setMessage] = useState({ error: false, msg: '' });

	const handleSubmit = async (e) => {
		e.preventDefault();
		setMessage('');

		if (courseName === '') {
			setMessage({ error: true, msg: 'O campo nome não pode estar vazio!' });
			return;
		}

		const newCourse = { courseName };

		try {
			if (id !== undefined && id !== '') {
				await CourseDataService.updateCourse(id, newCourse);
				setCourseId('');
				setCourseName('');
				setMessage({ error: false, msg: 'Updated successfully!' });
			} else {
				await CourseDataService.addCourses(newCourse);
				setMessage({ error: false, msg: 'New Course added successfully!' });
			}
		} catch (err) {
			setMessage({ error: true, msg: err.message });
		}
		getCourses();
		closeModal();
		setCourseName('');
	};

	const editHandler = async () => {
		setMessage('');
		try {
			const docSnap = await CourseDataService.getCourse(id);
			if (docSnap.exists()) {
				setCourseName(docSnap.data().courseName);
			} else {
				console.log('No such document!');
			}
		} catch (err) {
			setMessage({ error: true, msg: err.message });
			console.log(`Error to setCourseName`);
		}
	};

	useEffect(() => {
		// console.log('The id here is : ', id);
		if (id !== undefined && id !== '') {
			editHandler();
		} else setCourseName('');
	}, [id]);
	return (
		<>
			<div>
				<form onSubmit={handleSubmit}>
					<label htmlFor="nomecurso" id="formCourseName">
						Nome do Curso
					</label>
					<input
						type="text"
						placeholder="Course Name"
						value={courseName}
						onChange={(e) => setCourseName(e.target.value)}
					/>

					<button variant="primary" type="Submit" className="btn__newitem">
						Adicionar
					</button>
				</form>
			</div>
		</>
	);
};

export default AddCourse;
