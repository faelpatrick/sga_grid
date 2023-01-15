import React, { useState, useEffect } from 'react';
import AdicionaDisciplina from '../components/AdicionaDisciplina';
import DisciplinaDataService from '../services/disciplina.services';

const Disciplinas = (props) => {
	const showModal = props.showModal;
	const closeModal = props.closeModal;

	const [disciplinas, setDisciplinas] = useState([]);

	useEffect(() => {
		getDisciplinas();
	}, []);

	const newDisciplina = () => {
		showModal(<AdicionaDisciplina id={''} closeModal={closeModal} getDisciplinas={getDisciplinas} />);
	};

	const getDisciplinas = async () => {
		const data = await DisciplinaDataService.getAllDisciplinas();
		setDisciplinas(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
	};

	const deleteHandler = async (id) => {
		await DisciplinaDataService.deleteDisciplina(id);
		getDisciplinas();
	};

	const editHandler = async (id) => {
		showModal(<AdicionaDisciplina id={id} closeModal={closeModal} getDisciplinas={getDisciplinas} />);
	};

	return (
		<div id="disciplinas">
			<div className="content_options">
				<h1 className="content__title">Lista de Disciplinas</h1>
				<button className="btn__newitem" onClick={newDisciplina}>
					+ Novo
				</button>
			</div>
			<div>
				<table id="table__cards" className="table__cards">
					<thead>
						<tr id="card-titles" className="card-titles">
							<td> Nome da Disciplina</td>
							<td> Semestre</td>
							<td> Curso</td>
							<td colSpan="2">Opções</td>
						</tr>
					</thead>
					<tbody>
						{disciplinas.map((doc) => {
							return (
								<tr key={doc.id}>
									<td>{doc.disciplinaName}</td>
									<td>{doc.semestre}</td>
									<td>{doc.curso}</td>
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

export default Disciplinas;
