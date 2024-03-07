import { create } from "zustand";

export type Employee = {
  id: number;
  avatar: string;
  first_name: string;
  last_name: string;
  full_name: string;
  email: string;
  salary: number;
  age: number;
};

const updateEmployee = (
  employees: Employee[],
  id: number,
  data: Employee
): Employee[] =>
  employees.map((employee) => ({
    ...employee,
    first_name: employee.id === id ? data.first_name : employee.first_name,
    last_name: employee.id === id ? data.last_name : employee.last_name,
    email: employee.id === id ? data.email : employee.email,
    salary: employee.id === id ? data.salary : employee.salary,
    age: employee.id === id ? data.age : employee.age,
    avatar: employee.id === id ? data.avatar : employee.avatar,
  }));

const removeEmployee = (employees: Employee[], id: number): Employee[] =>
  employees.filter((employee) => employee.id !== id);

const addEmployee = (
  employees: Employee[],
  newEmployee: Employee
): Employee[] => [
  ...employees,
  {
    id: Math.max(0, Math.max(...employees.map(({ id }) => id))) + 1,
    avatar: newEmployee.avatar,
    first_name: newEmployee.first_name,
    last_name: newEmployee.last_name,
    full_name: newEmployee.full_name,
    email: newEmployee.email,
    salary: newEmployee.salary,
    age: newEmployee.age,
  },
];

type Store = {
  employees: Employee[];
  newEmployee: Employee;
  setEmployees: (employees: Employee[]) => void;
  addEmployee: () => void;
  updateEmployee: (id: number, data: Employee) => void;
  removeEmployee: (id: number) => void;
  setNewEmployee: (newEmployee: Employee) => void;
};

const useStore = create<Store>(
  (set): Store => ({
    employees: [],
    newEmployee: {
      id: 0,
      avatar: "",
      first_name: "",
      last_name: "",
      full_name: "",
      email: "",
      salary: 0,
      age: 0,
    },
    setEmployees: (employees: Employee[]) => {
      console.log("storing employees", employees);
      set((state) => ({
        ...state,
        employees,
      }));
    },
    removeEmployee: (id: number) =>
      set((state) => ({
        ...state,
        employees: removeEmployee(state.employees, id),
      })),
    updateEmployee: (id: number, data: Employee) =>
      set((state) => ({
        ...state,
        employees: updateEmployee(state.employees, id, data),
      })),
    setNewEmployee: (newEmployee: Employee) =>
      set((state) => ({
        ...state,
        newEmployee,
      })),
    addEmployee: () =>
      set((state) => ({
        ...state,
        employees: addEmployee(state.employees, state.newEmployee),
        newEmployee: {
          id: 0,
          avatar: "",
          first_name: "",
          last_name: "",
          full_name: "",
          email: "",
          salary: 0,
          age: 0,
        },
      })),
  })
);

export default useStore;
