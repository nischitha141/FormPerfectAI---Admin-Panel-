import { create } from 'zustand';

type WorkoutFormType = {
  workoutName: string;
  description: string;
  muscleGroup: string[];
  difficulty: string;
  type: string;
  equipment: string;
  calories: string;
  tags: string;
  rounds: string;
  duration: string;
  image:File ;
};

type ExerciseFormType = {
  workoutName: string;
  rounds: string;
  duration: string;
  videoFile: File | null;
};

type WorkoutStore = {
  form: WorkoutFormType;
  setForm: (data: Partial<WorkoutFormType>) => void;
  resetForm: () => void;

  exerciseForm: ExerciseFormType;
  setExerciseForm: (data: Partial<ExerciseFormType>) => void;
  resetExerciseForm: () => void;
};

const defaultWorkoutForm: WorkoutFormType = {
  workoutName: '',
  description: '',
  muscleGroup: [],
  difficulty: '',
  type: '',
  equipment: '',
  calories: '',
  tags: '',
  rounds: '',
  duration: '',
  image: new File([], 'Gym_Mobility.png', { type: 'image/png' }) ,
};

const defaultExerciseForm: ExerciseFormType = {
  workoutName: '',
  rounds: '',
  duration: '',
  videoFile: null,
};

export const useWorkoutStore = create<WorkoutStore>((set) => ({
  form: defaultWorkoutForm,
  setForm: (data) =>
    set((state) => ({ form: { ...state.form, ...data } })),
  resetForm: () => set({ form: defaultWorkoutForm }),

  exerciseForm: defaultExerciseForm,
  setExerciseForm: (data) =>
    set((state) => ({ exerciseForm: { ...state.exerciseForm, ...data } })),
  resetExerciseForm: () => set({ exerciseForm: defaultExerciseForm }),
}));
