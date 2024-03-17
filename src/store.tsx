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
  editEmployee: (data: Employee) => void;
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
    editEmployee: (employee: Employee) =>
      set((state) => ({
        employees: state.employees.map((item) => {
          if (item.id === employee.id) {
            return {
              ...item,
              avatar: employee.avatar,
              first_name: employee.first_name,
              last_name: employee.last_name,
              full_name: `${employee.first_name} ${employee.last_name}`,
              email: employee.email,
              salary: employee.salary,
              age: employee.age,
            };
          } else {
            return item;
          }
        }),
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
