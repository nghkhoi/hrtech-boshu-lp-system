import { createContext, useContext, useReducer } from 'react';

type State = {
  step: number;
  certifications: string[];
  name: { lastName: string; firstName: string };
  birthdate: { year: string; month: string; day: string };
  phoneNumber: string;
  email: string;
  address: { prefecture: string; city: string };
};

type Action =
  | { type: 'SET_STEP'; payload: number }
  | { type: 'SET_CERTIFICATION'; payload: string[] }
  | { type: 'SET_NAME'; payload: { lastName: string; firstName: string } }
  | { type: 'SET_BIRTHDATE'; payload: { year: string; month: string; day: string } }
  | { type: 'SET_PHONE_NUMBER'; payload: string }
  | { type: 'SET_EMAIL'; payload: string }
  | { type: 'SET_ADDRESS'; payload: { prefecture: string; city: string } };

const initialState: State = {
  step: 1,
  certifications: [],
  name: { lastName: '', firstName: '' },
  birthdate: { year: '', month: '', day: '' },
  phoneNumber: '',
  email: '',
  address: { prefecture: '', city: '' },
};

function formReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_STEP':
      return { ...state, step: action.payload };
    case 'SET_CERTIFICATION':
      return { ...state, certifications: action.payload };
    case 'SET_NAME':
      return { ...state, name: action.payload };
    case 'SET_BIRTHDATE':
      return { ...state, birthdate: action.payload };
    case 'SET_PHONE_NUMBER':
      return { ...state, phoneNumber: action.payload };
    case 'SET_EMAIL':
      return { ...state, email: action.payload };
    case 'SET_ADDRESS':
      return { ...state, address: action.payload };
    default:
      return state;
  }
}

const FormContext = createContext<{
  state: State;
  dispatch: React.Dispatch<Action>;
}>({
  state: initialState,
  dispatch: () => null,
});

export function FormProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(formReducer, initialState);

  return (
    <FormContext.Provider value={{ state, dispatch }}>
      {children}
    </FormContext.Provider>
  );
}

export function useForm() {
  const context = useContext(FormContext);
  if (context === undefined) {
    throw new Error('useForm must be used within a FormProvider');
  }
  return context;
}
