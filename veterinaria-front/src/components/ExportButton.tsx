import React from 'react';
import * as XLSX from 'xlsx';

interface ExportButtonProps {
  data: any[];
  fileName: string;
  disabled?: boolean;
}

const ExportButton: React.FC<ExportButtonProps> = ({ data, fileName, disabled }) => {
  const exportToExcel = () => {
    const workbook = XLSX.utils.book_new();
    
    const formattedData = data.map(p => ({
      'ID': p.id,
      'Nombre': p.nombre,
      'Especie': p.especie,
      'Raza': p.raza,
      'Fecha Nacimiento': new Date(p.fechaNacimiento).toLocaleDateString(),
      'ID Cliente': p.clienteId
    }));
    
    const worksheet = XLSX.utils.json_to_sheet(formattedData);
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Pacientes');
    
    XLSX.writeFile(workbook, `${fileName}_${new Date().toISOString().split('T')[0]}.xlsx`);
  };

  return (
    <button 
      className="btn btn-success btn-sm"
      onClick={exportToExcel}
      disabled={disabled}
    >
      <span>📊</span>
      Exportar a Excel
    </button>
  );
};

export default ExportButton;