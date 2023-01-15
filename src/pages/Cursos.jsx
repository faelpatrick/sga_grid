import React, { useState, useEffect } from 'react';
import CourseDataService from '../services/courses.services';
import AdicionaCurso from '../components/AdicionaCurso';

const Curso = (props) => {
	const showModal = props.showModal;
	const closeModal = props.closeModal;

	const [courses, setCourses] = useState([]);

	useEffect(() => {
		getCourses();
	}, []);

	const newCourse = () => {
		showModal(<AdicionaCurso id={''} closeModal={closeModal} getCourses={getCourses} />);
	};

	const getCourses = async () => {
		const data = await CourseDataService.getAllCourses();
		setCourses(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
	};

	const deleteHandler = async (id) => {
		await CourseDataService.deleteCourse(id);
		getCourses();
	};

	const editHandler = async (id) => {
		showModal(<AdicionaCurso id={id} closeModal={closeModal} getCourses={getCourses} />);
	};

	return (
		<div id="cursos">
			<div className="content_options">
				<h1 className="content__title">Lista de Cursos</h1>
				<button className="btn__newitem" onClick={newCourse}>
					+ Novo
				</button>
			</div>

			<table id="table__cards" className="table__cards">
				<thead>
					<tr>
						<th colSpan="3">Nome do Curso</th>
					</tr>
				</thead>
				<tbody>
					{courses.map((doc) => {
						return (
							<tr key={doc.id}>
								<td>{doc.courseName}</td>
								<td>
									<button className="btn__edit" onClick={() => editHandler(doc.id)}></button>
								</td>
								<td>
									<button className="btn__remove" onClick={() => deleteHandler(doc.id)}></button>
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
};

export default Curso;
