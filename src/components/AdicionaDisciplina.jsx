import React, { useState, useEffect } from 'react';
import DisciplinaDataService from '../services/disciplina.services';

const AddDisciplina = ({ id, setDisciplinaId, closeModal, getDisciplinas }) => {
	const [disciplinaName, setDisciplinaName] = useState('');
	const [semestre, setSemestre] = useState('');
	const [curso, setCurso] = useState('');
	const [message, setMessage] = useState({ error: false, msg: '' });

	const handleSubmit = async (e) => {
		e.preventDefault();
		setMessage('');

		if (disciplinaName === '') {
			setMessage({ error: true, msg: 'O campo nome não pode estar vazio!' });
			return;
		}

		if (semestre === '') {
			setMessage({ error: true, msg: 'O campo nome não pode estar vazio!' });
			return;
		}

		if (curso === '') {
			setMessage({ error: true, msg: 'O campo nome não pode estar vazio!' });
			return;
		}

		const newDisciplina = { disciplinaName, semestre, curso };

		try {
			if (id !== undefined && id !== '') {
				await DisciplinaDataService.updateDisciplina(id, newDisciplina);
				setDisciplinaName('');
				setSemestre('');
				setCurso('');
				setMessage({ error: false, msg: 'Updated successfully!' });
			} else {
				await DisciplinaDataService.addDisciplinas(newDisciplina);
				setMessage({ error: false, msg: 'New Disciplina added successfully!' });
			}
		} catch (err) {
			setMessage({ error: true, msg: err.message });
		}
		getDisciplinas();
		closeModal();
		setDisciplinaName('');
		setSemestre('');
		setCurso('');
	};

	const editHandler = async () => {
		setMessage('');
		try {
			const docSnap = await DisciplinaDataService.getDisciplina(id);
			if (docSnap.exists()) {
				setDisciplinaName(docSnap.data().disciplinaName);
				setSemestre(docSnap.data().semestre);
				setCurso(docSnap.data().curso);
			} else {
				console.log('No such document!');
			}
		} catch (err) {
			setMessage({ error: true, msg: err.message });
			console.log(`Error to setDisciplinaName`);
		}
	};

	useEffect(() => {
		// console.log('The id here is : ', id);
		if (id !== undefined && id !== '') {
			editHandler();
		} else {
			setDisciplinaName('');
			setSemestre('');
			setCurso('');
		}
	}, [id]);
	return (
		<>
			<div>
				<form onSubmit={handleSubmit}>
					<label htmlFor="nomecurso" id="formDisciplinaName">
						Nome da Disciplina
					</label>
					<input
						type="text"
						placeholder="Nome da Disciplina"
						value={disciplinaName}
						onChange={(e) => setDisciplinaName(e.target.value)}
					/>

					<label htmlFor="semestre" id="formDisciplinaNasc">
						Semestre
					</label>
					<input
						type="num"
						placeholder="Semestre"
						value={semestre}
						onChange={(e) => setSemestre(e.target.value)}
					/>
					<label htmlFor="curso" id="formDisciplinaCurso">
						Nome do Curso
					</label>
					<input
						type="text"
						placeholder="Nome do Curso"
						value={curso}
						onChange={(e) => setCurso(e.target.value)}
					/>

					<button variant="primary" type="Submit" className="btn__newitem">
						Adicionar
					</button>
				</form>
			</div>
		</>
	);
};

export default AddDisciplina;
