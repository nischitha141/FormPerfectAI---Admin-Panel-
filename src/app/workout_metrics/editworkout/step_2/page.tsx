// app/workout_metrics/addnewworkout/step_1/page.tsx
import { Suspense } from 'react';
import AddNewWorkoutStep2Page from './ClientPage';

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AddNewWorkoutStep2Page />
    </Suspense>
  );
}
