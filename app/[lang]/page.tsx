"use client"

import EmployeeCardDisplay from "@/components/EmployeeCardDisplay";
import { useEffect, useState } from "react";
import api from '@/lib/axios'
import { addEmployeesToMem, EmployeeDataMem, getDataFromMem } from "@/memoryData";

interface ApiData {
  data: Employee[],  
}

interface Employee {
  avatar: string,
  email: string,
  first_name: string,
  id: number,
  last_name: string,
  age: number,
  salary: number
}

export default function Home() { 
  const [employees, setEmployees] = useState<Employee[]>([])

  useEffect(() => {
    async function fetchAPI() {
      try {
        const response = await api.get<ApiData>('/users')
        
        if (getDataFromMem().length < 1) { // Only if there are no data in memory
          // Store in memory
          let employeesToMem: EmployeeDataMem[] = response.data.data
          addEmployeesToMem(employeesToMem)          
        }
        setEmployees(getDataFromMem)
      } catch (err) {
        console.log(err)
      }  
    }

    fetchAPI()
  }, [])

  return (  
    <div className="container mx-auto px-3 py-4 grid grid-cols-3 gap-4 bg-white rounded shadow mt-10">
      {employees.map((employee, i) => (
        <EmployeeCardDisplay key={i} avatar={employee.avatar} email={employee.email} firstName={employee.first_name} lastName={employee.last_name} age={employee.age} salary={employee.salary} id={employee.id}  />
      ))}
    </div>   
  );
}
