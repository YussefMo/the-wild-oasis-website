import { Ring2 } from 'ldrs/react';
import 'ldrs/react/Ring2.css';

// Default values shown

function SpinnerMini() {
  return (
    <Ring2
      size="20"
      stroke="3"
      strokeLength="0.25"
      bgOpacity="0.1"
      speed="0.8"
      color="#b7c7d7"
    />
  );
}

export default SpinnerMini;
