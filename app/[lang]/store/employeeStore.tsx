import { EmployeeDataMem } from "@/memoryData"
import { create } from "zustand"

interface EmployeeState {
    employeeToEdit: EmployeeDataMem | undefined,
    setEmployeeToEdit: (employee:EmployeeDataMem) => void
}

export const useEmployeeStore = create<EmployeeState>((set) => ({
    employeeToEdit: undefined,
    setEmployeeToEdit: (employee: EmployeeDataMem) => set({employeeToEdit: employee})
}))