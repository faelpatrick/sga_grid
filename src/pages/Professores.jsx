import React, { useState, useEffect } from 'react';
import AdicionaProfessor from '../components/AdicionarProfessor';
import ProfessorDataService from '../services/professor.services';

const Professores = (props) => {
	const showModal = props.showModal;
	const closeModal = props.closeModal;

	const [professors, setProfessors] = useState([]);

	useEffect(() => {
		getProfessors();
	}, []);

	const newProfessor = () => {
		showModal(<AdicionaProfessor id={''} dtNasc={''} closeModal={closeModal} getProfessors={getProfessors} />);
	};

	const getProfessors = async () => {
		const data = await ProfessorDataService.getAllProfessors();
		setProfessors(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
	};

	const deleteHandler = async (id) => {
		await ProfessorDataService.deleteProfessor(id);
		getProfessors();
	};

	const editHandler = async (id) => {
		showModal(<AdicionaProfessor id={id} closeModal={closeModal} getProfessors={getProfessors} />);
	};

	return (
		<div id="alunos">
			<div className="content_options">
				<h1 className="content__title">Lista de Professors</h1>
				<button className="btn__newitem" onClick={newProfessor}>
					+ Novo
				</button>
			</div>
			<div>
				<table id="table__cards" className="table__cards">
					<thead>
						<tr id="card-titles" className="card-titles">
							<td className="table_td_name"> Nome do Professor(a)</td>
							<td className="table_td_birth"> Data Nasc.</td>
							<td className="table_td_registry"> Reg.Acad.</td>
							<td className="table_td_options" colSpan="2">
								Opções
							</td>
						</tr>
					</thead>
					<tbody>
						{professors.map((doc) => {
							return (
								<tr key={doc.id}>
									<td>{doc.professorName}</td>
									<td>{doc.dtNasc}</td>
									<td>{doc.salary}</td>
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
		</div>
	);
};

export default Professores;
