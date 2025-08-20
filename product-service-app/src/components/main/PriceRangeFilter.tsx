import React, { useState } from 'react';

const PriceRangeFilter = ({ onPriceRangeChange }: { onPriceRangeChange: (min: number, max: number) => void }) => {
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(Number(e.target.value), maxPrice - 10);
    setMinPrice(value);
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(Number(e.target.value), minPrice + 10);
    setMaxPrice(value);
  };

  const applyFilter = () => {
    onPriceRangeChange(minPrice, maxPrice);
  };

  return (
    <div className="p-3 mb-4 border rounded pricing-range-widget widget-item bg-light">
      <h3 className="mb-3 widget-title h5">Price Range</h3>
      <div className="price-range-container">
        <div className="mb-3 current-range d-flex justify-content-between">
          <span className="min-price fw-bold">${minPrice}</span>
          <span className="max-price fw-bold">${maxPrice}</span>
        </div>

        <div className="mb-3 range-slider position-relative" style={{ height: '5px' }}>
          <div className="slider-track bg-secondary position-absolute w-100" style={{ height: '5px', borderRadius: '5px', top: '0' }}></div>
          <div 
            className="slider-progress bg-primary position-absolute" 
            style={{ 
              height: '5px', 
              left: `${(minPrice / 1000) * 100}%`, 
              right: `${100 - (maxPrice / 1000) * 100}%`,
              borderRadius: '5px'
            }}
          ></div>
          <input 
            type="range" 
            className="min-range position-absolute w-100" 
            min="0" 
            max="1000" 
            value={minPrice} 
            step="10"
            onChange={handleMinChange}
            style={{ height: '5px', top: '0', appearance: 'none', background: 'transparent', pointerEvents: 'none' }}
          />
          <input 
            type="range" 
            className="max-range position-absolute w-100" 
            min="0" 
            max="1000" 
            value={maxPrice} 
            step="10"
            onChange={handleMaxChange}
            style={{ height: '5px', top: '0', appearance: 'none', background: 'transparent', pointerEvents: 'none' }}
          />
        </div>

        <div className="mt-3 price-inputs">
          <div className="row g-2">
            <div className="col-6">
              <div className="input-group input-group-sm">
                <span className="input-group-text">$</span>
                <input 
                  type="number" 
                  className="form-control min-price-input" 
                  placeholder="Min" 
                  min="0" 
                  max="1000" 
                  value={minPrice} 
                  step="10"
                  onChange={handleMinChange}
                />
              </div>
            </div>
            <div className="col-6">
              <div className="input-group input-group-sm">
                <span className="input-group-text">$</span>
                <input 
                  type="number" 
                  className="form-control max-price-input" 
                  placeholder="Max" 
                  min="0" 
                  max="1000" 
                  value={maxPrice} 
                  step="10"
                  onChange={handleMaxChange}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-3 filter-actions">
          <button type="button" className="btn btn-sm btn-primary w-100" onClick={applyFilter}>
            Apply Filter
          </button>
        </div>
      </div>
      </div>
  );
};
export default PriceRangeFilter;