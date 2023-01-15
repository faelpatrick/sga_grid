import React, { useState, useEffect } from 'react';
import ProfessorDataService from '../services/professor.services';

const AddProfessor = ({ id, setProfessorId, closeModal, getProfessors }) => {
	const [professorName, setProfessorName] = useState('');
	const [dtNasc, setDtNasc] = useState('');
	const [salary, setSalary] = useState('');
	const [message, setMessage] = useState({ error: false, msg: '' });

	const handleSubmit = async (e) => {
		e.preventDefault();
		setMessage('');

		if (professorName === '') {
			setMessage({ error: true, msg: 'O campo nome não pode estar vazio!' });
			return;
		}

		if (dtNasc === '') {
			setMessage({ error: true, msg: 'O campo nome não pode estar vazio!' });
			return;
		}

		if (salary === '') {
			setMessage({ error: true, msg: 'O campo nome não pode estar vazio!' });
			return;
		}

		const newProfessor = { professorName, dtNasc, salary };

		try {
			if (id !== undefined && id !== '') {
				await ProfessorDataService.updateProfessor(id, newProfessor);
				setProfessorName('');
				setDtNasc('');
				setSalary('');
				setMessage({ error: false, msg: 'Updated successfully!' });
			} else {
				await ProfessorDataService.addProfessors(newProfessor);
				setMessage({ error: false, msg: 'New Professor added successfully!' });
			}
		} catch (err) {
			setMessage({ error: true, msg: err.message });
		}
		getProfessors();
		closeModal();
		setProfessorName('');
		setDtNasc('');
		setSalary('');
	};

	const editHandler = async () => {
		setMessage('');
		try {
			const docSnap = await ProfessorDataService.getProfessor(id);
			if (docSnap.exists()) {
				setProfessorName(docSnap.data().professorName);
				setDtNasc(docSnap.data().dtNasc);
				setSalary(docSnap.data().salary);
			} else {
				console.log('No such document!');
			}
		} catch (err) {
			setMessage({ error: true, msg: err.message });
			console.log(`Error to setProfessorName`);
		}
	};

	useEffect(() => {
		// console.log('The id here is : ', id);
		if (id !== undefined && id !== '') {
			editHandler();
		} else {
			console.log(`Id tava zero parca`);
			setProfessorName('');
			setDtNasc('');
			setSalary('');
		}
	}, [id]);
	return (
		<>
			<div>
				<form onSubmit={handleSubmit}>
					<label htmlFor="nomecurso" id="formProfessorName">
						Nome do Curso
					</label>
					<input
						type="text"
						placeholder="Professor Name"
						value={professorName}
						onChange={(e) => setProfessorName(e.target.value)}
					/>

					<label htmlFor="dtNasc" id="formProfessorNasc">
						Data de Nascimento
					</label>
					<input
						type="date"
						placeholder="Data de Nascimento"
						value={dtNasc}
						onChange={(e) => setDtNasc(e.target.value)}
					/>
					<label htmlFor="salary" id="formProfessorSalary">
						Valor Salario
					</label>
					<input
						type="number"
						placeholder="Valor Salario"
						value={salary}
						onChange={(e) => setSalary(e.target.value)}
					/>

					<button variant="primary" type="Submit" className="btn__newitem">
						Adicionar
					</button>
				</form>
			</div>
		</>
	);
};

export default AddProfessor;
