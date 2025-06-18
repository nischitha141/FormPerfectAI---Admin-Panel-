import { atom } from 'recoil';

export const workoutFormState = atom({
  key: 'workoutFormState',
  default: {
    workoutName: '',
    description: '',
    muscleGroup: '',
    difficulty: '',
    type: '',
    equipment: '',
    calories: '',
    tags: '',
    rounds: '',
    duration: '',
    videoFile: null as File | null,
  },
});

export const exerciseFormState = atom({
  key: 'exerciseFormState',
  default: {
    workoutName: '',
    rounds: '',
    duration: '',
    videoFile: null as File | null,
  },
});
