// app/workout_metrics/addnewworkout/step_1/page.tsx
import { Suspense } from 'react';
import AddNewWorkoutStep1Page from './ClientPage';

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AddNewWorkoutStep1Page />
    </Suspense>
  );
}
