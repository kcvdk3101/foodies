'use client';

import React from 'react';
import { useFormStatus } from 'react-dom';

export default function MealFormSubmit() {
  const { pending } = useFormStatus();

  return (
    <button type="submit" disabled={pending}>
      {pending ? 'Submitting...' : 'Submit'}
    </button>
  );
}
