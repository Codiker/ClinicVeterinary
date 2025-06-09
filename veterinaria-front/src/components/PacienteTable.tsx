import React, { useEffect, useState } from 'react';
import { getPacientes } from '../api/pacienteApi';

const PacienteTable = () => {
    const [pacientes, setPacientes] = useState([]);

    useEffect(() => {
        const fetchPacientes = async () => {
            const data = await getPacientes();
            setPacientes(data);
        };
        fetchPacientes();
    }, []);

    return (
        <table>
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Especie</th>
                    <th>Raza</th>
                </tr>
            </thead>
            <tbody>
                {pacientes.map(paciente => (
                    <tr key={paciente.id}>
                        <td>{paciente.nombre}</td>
                        <td>{paciente.especie}</td>
                        <td>{paciente.raza}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default PacienteTable;
