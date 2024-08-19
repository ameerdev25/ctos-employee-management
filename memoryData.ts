
export interface EmployeeDataMem {
    id: number
    email: string
    first_name: string
    last_name: string
    avatar: string
    age: number
    salary: number
}

const saveDataToSessionStorage = () => {
    if (typeof window !== 'undefined') { // Check if running on the client side
        sessionStorage.setItem('employeeData', JSON.stringify(memoryData));
    }
}

const loadDataFromSessionStorage = (): EmployeeDataMem[] => {
    if (typeof window !== 'undefined') { // Check if running on the client side
        const data = sessionStorage.getItem('employeeData');
        return data ? JSON.parse(data) : [];
    }
    return [];
}

export let memoryData: EmployeeDataMem[] = loadDataFromSessionStorage()

export const addEmployeesToMem = (employees: EmployeeDataMem[]) => {
    memoryData = employees

    saveDataToSessionStorage()
}

export const addOneEmployeeToMem = (employee: Omit<EmployeeDataMem, 'id'>) => {
    const newEmployee: EmployeeDataMem = {
        id: getNextId(),
        ...employee
    }
    memoryData.push(newEmployee)

    saveDataToSessionStorage()
}

export const getDataFromMem = (): EmployeeDataMem[] => {
    return memoryData
}

export const updateEmployeeInMem = (employee: EmployeeDataMem) => {
    const index = memoryData.findIndex((i) => i.id === employee.id);
    if (index !== -1) {
      memoryData[index] = employee;
      saveDataToSessionStorage()
    }
  };

export const removeEmployeeInMem = (id: number) => {
    const index = memoryData.findIndex((i) => i.id === id);
    if (index !== -1) {
        memoryData.splice(index, 1)
        saveDataToSessionStorage()
    }
};

const getNextId = (): number => {
    const ids = memoryData.map(employee => employee.id)
    return ids.length > 0 ? Math.max(...ids) + 1 : 1;
}

