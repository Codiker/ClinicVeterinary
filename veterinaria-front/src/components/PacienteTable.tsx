import React, { useEffect, useState } from 'react';
import { getPacientes } from '../api/pacienteApi';

interface Paciente {
    id: number;
    nombre: string;
    especie: string;
    raza: string;
    fechaNacimiento: string;
    clienteId: number;
}

const PacienteTable = () => {
    const [pacientes, setPacientes] = useState<Paciente[]>([]);

    useEffect(() => {
        const fetchPacientes = async () => {
            const data = await getPacientes();
            setPacientes(data);
        };
        fetchPacientes();
    }, []);

    return (
        <table style={{ width: "100%", borderCollapse: "collapse", marginTop: 16 }}>
            <thead>
                <tr style={{ background: "#1976d2", color: "#fff" }}>
                    <th>Nombre</th>
                    <th>Especie</th>
                    <th>Raza</th>
                    <th>Fecha Nacimiento</th>
                    <th>ID Cliente</th>
                </tr>
            </thead>
            <tbody>
                {pacientes.map(paciente => (
                    <tr key={paciente.id}>
                        <td>{paciente.nombre}</td>
                        <td>{paciente.especie}</td>
                        <td>{paciente.raza}</td>
                        <td>{paciente.fechaNacimiento ? 
                            paciente.fechaNacimiento.substring(0, 10) : 
                            ""}
                        </td>
                        <td>{paciente.clienteId}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default PacienteTable;
