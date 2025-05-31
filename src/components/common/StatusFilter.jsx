import React, { useState } from 'react';
import '../../styles/StatusFilter.scss';

const FILTER_OPTIONS = {
  SEMUA: 'SEMUA',
  AKTIF: 'AKTIF',
  NON_AKTIF: 'NON-AKTIF',
};

const StatusFilter = ({ defaultStatus = FILTER_OPTIONS.AKTIF, onFilterChange }) => {
  const [activeFilter, setActiveFilter] = useState(defaultStatus);

  const handleFilterClick = (filter) => {
    setActiveFilter(filter);
    if (onFilterChange) {
      onFilterChange(filter);
    }
  };

  return (
    <div className="status-filter-container">
      <div className="status-filter-group">
        <button
          type="button"
          className={`filter-button ${activeFilter === FILTER_OPTIONS.SEMUA ? 'active' : ''}`}
          onClick={() => handleFilterClick(FILTER_OPTIONS.SEMUA)}
        >
          {FILTER_OPTIONS.SEMUA}
        </button>
        <button
          type="button"
          className={`filter-button ${activeFilter === FILTER_OPTIONS.AKTIF ? 'active' : ''}`}
          onClick={() => handleFilterClick(FILTER_OPTIONS.AKTIF)}
        >
          {FILTER_OPTIONS.AKTIF}
        </button>
        <button
          type="button"
          className={`filter-button ${activeFilter === FILTER_OPTIONS.NON_AKTIF ? 'active' : ''}`}
          onClick={() => handleFilterClick(FILTER_OPTIONS.NON_AKTIF)}
        >
          {FILTER_OPTIONS.NON_AKTIF}
        </button>
      </div>
    </div>
  );
};

export default StatusFilter;