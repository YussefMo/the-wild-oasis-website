import { Ring2 } from 'ldrs/react';
import 'ldrs/react/Ring2.css';

// Default values shown

function Spinner({ from }) {
  return (
    <div className="spinner">
      <Ring2
        size="40"
        stroke="5"
        strokeLength="0.25"
        bgOpacity="0.1"
        speed="0.8"
        color="#b7c7d7"
      />
      {from && <p className="mt-3">Loading {from} Data</p>}
    </div>
  );
}

export default Spinner;
