'use client';

import { useEffect, useState } from 'react';

/**
 * Renders the current year on the client only. Kept out of the server render to
 * avoid a hydration mismatch around the `new Date()` value.
 */
export default function Year() {
  const [year, setYear] = useState('');
  useEffect(() => {
    setYear(String(new Date().getFullYear()));
  }, []);
  return <span id="yr">{year}</span>;
}
