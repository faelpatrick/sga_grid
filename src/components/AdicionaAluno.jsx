import React, { useState, useEffect } from 'react';
import StudantDataService from '../services/studant.services';

const AddStudant = ({ id, setStudantId, closeModal, getStudants }) => {
	const [studantName, setStudantName] = useState('');
	const [dtNasc, setDtNasc] = useState('');
	const [matricula, setMatricula] = useState('');
	const [message, setMessage] = useState({ error: false, msg: '' });

	const handleSubmit = async (e) => {
		e.preventDefault();
		setMessage('');

		if (studantName === '') {
			setMessage({ error: true, msg: 'O campo nome não pode estar vazio!' });
			return;
		}

		if (dtNasc === '') {
			setMessage({ error: true, msg: 'O campo nome não pode estar vazio!' });
			return;
		}

		if (matricula === '') {
			setMessage({ error: true, msg: 'O campo nome não pode estar vazio!' });
			return;
		}

		const newStudant = { studantName, dtNasc, matricula };

		try {
			if (id !== undefined && id !== '') {
				await StudantDataService.updateStudant(id, newStudant);
				setStudantName('');
				setDtNasc('');
				setMatricula('');
				setMessage({ error: false, msg: 'Updated successfully!' });
			} else {
				await StudantDataService.addStudants(newStudant);
				setMessage({ error: false, msg: 'New Studant added successfully!' });
			}
		} catch (err) {
			setMessage({ error: true, msg: err.message });
		}
		getStudants();
		closeModal();
		setStudantName('');
	};

	const editHandler = async () => {
		setMessage('');
		try {
			const docSnap = await StudantDataService.getStudant(id);
			if (docSnap.exists()) {
				setStudantName(docSnap.data().studantName);
				setDtNasc(docSnap.data().dtNasc);
				setMatricula(docSnap.data().matricula);
			} else {
				console.log('No such document!');
			}
		} catch (err) {
			setMessage({ error: true, msg: err.message });
			console.log(`Error to setStudantName`);
		}
	};

	useEffect(() => {
		// console.log('The id here is : ', id);
		if (id !== undefined && id !== '') {
			editHandler();
		} else {
			setStudantName('');
			setDtNasc('');
			setMatricula('');
		}
	}, [id]);
	return (
		<>
			<div>
				<form onSubmit={handleSubmit}>
					<label htmlFor="nomecurso" id="formStudantName">
						Nome do Curso
					</label>
					<input
						type="text"
						placeholder="Studant Name"
						value={studantName}
						onChange={(e) => setStudantName(e.target.value)}
					/>

					<label htmlFor="dtNasc" id="formStudantNasc">
						Data de Nascimento
					</label>
					<input
						type="date"
						placeholder="Data de Nascimento"
						value={dtNasc}
						onChange={(e) => setDtNasc(e.target.value)}
					/>
					<label htmlFor="matricula" id="formStudantMatricula">
						Número de Matricula
					</label>
					<input
						type="number"
						placeholder="Número de Matricula"
						value={matricula}
						onChange={(e) => setMatricula(e.target.value)}
					/>

					<button variant="primary" type="Submit" className="btn__newitem">
						Adicionar
					</button>
				</form>
			</div>
		</>
	);
};

export default AddStudant;
