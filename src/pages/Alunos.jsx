import React, { useState, useEffect } from 'react';
import AdicionaAluno from '../components/AdicionaAluno';
import StudantDataService from '../services/studant.services';

const Alunos = (props) => {
	const showModal = props.showModal;
	const closeModal = props.closeModal;

	const [studants, setStudants] = useState([]);

	useEffect(() => {
		getStudants();
	}, []);

	const newStudant = () => {
		showModal(<AdicionaAluno id={''} closeModal={closeModal} getStudants={getStudants} />);
	};

	const getStudants = async () => {
		const data = await StudantDataService.getAllStudants();
		setStudants(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
	};

	const deleteHandler = async (id) => {
		await StudantDataService.deleteStudant(id);
		getStudants();
	};

	const editHandler = async (id) => {
		showModal(<AdicionaAluno id={id} closeModal={closeModal} getStudants={getStudants} />);
	};

	return (
		<div id="alunos">
			<div className="content_options">
				<h1 className="content__title">Lista de Alunos</h1>
				<button className="btn__newitem" onClick={newStudant}>
					+ Novo
				</button>
			</div>
			<div>
				<table id="table__cards" className="table__cards">
					<thead>
						<tr id="card-titles" className="card-titles">
							<td className="table_td_name"> Nome do Aluno(a)</td>
							<td className="table_td_birth"> Data Nasc.</td>
							<td className="table_td_registry"> Reg.Acad.</td>
							<td className="table_td_options" colSpan="2">
								Opções
							</td>
						</tr>
					</thead>
					<tbody>
						{studants.map((doc) => {
							return (
								<tr key={doc.id}>
									<td>{doc.studantName}</td>
									<td>{doc.dtNasc}</td>
									<td>{doc.matricula}</td>
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

export default Alunos;
