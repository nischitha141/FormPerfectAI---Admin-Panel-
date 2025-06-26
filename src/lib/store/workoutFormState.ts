import { create } from 'zustand';

type WorkoutFormType = {
  workoutName: string;
  description: string;
  muscleGroup: string[];// excercise type: string[],
  focusArea:string,
  Workouttype: string;
  equipment: string;
  calories: string;
  duration: string;
  image: File;
};


type ExerciseFormType = {
  Name: string;
  rounds: string;
  duration: string;
  videoFile: File | null ;
  difficulty: string;
  image: File | null;
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
  Workouttype: '',
  focusArea:'',
  equipment: '',
  calories: '',
  duration: '',
  image: new File([], 'Gym_Mobility.png', { type: 'image/png' }),
};

const defaultExerciseForm: ExerciseFormType = {
  Name: '',
  rounds: '',
  duration: '',
  videoFile:null, // Placeholder for video file
  difficulty: '',
  image: null 

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
