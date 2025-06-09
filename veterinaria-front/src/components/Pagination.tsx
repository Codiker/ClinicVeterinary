import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (items: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <div className="pagination">
      <button 
        className="btn btn-secondary btn-sm"
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
      >
        ⬅️ Anterior
      </button>
      
      <span className="pagination-info">
        Página {currentPage} de {totalPages} ({totalItems} registros)
      </span>
      
      <button
        className="btn btn-secondary btn-sm"
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
      >
        Siguiente ➡️
      </button>
      
      <select 
        className="form-select"
        value={itemsPerPage}
        onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
      >
        <option value="5">5 por página</option>
        <option value="10">10 por página</option>
        <option value="20">20 por página</option>
        <option value="50">50 por página</option>
      </select>
    </div>
  );
};

export default Pagination;