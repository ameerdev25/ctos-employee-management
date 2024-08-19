'use client'

import { Locale } from "@/lib/locales";
import { Button, TextField } from "@mui/material";
import { useLocale, useTranslations } from "next-intl";
import { Kanit } from "next/font/google";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import { useEmployeeStore } from "../../store/employeeStore";
import { EmployeeDataMem, updateEmployeeInMem } from "@/memoryData";

const kanit = Kanit({
    subsets: ["latin"],
    weight: ["100", "200", "300", "400", "500"]
});

export default function editForm () { 
    const t = useTranslations()
    
    const router = useRouter()
    const locale = useLocale() as Locale

    const employeeToEditState = useEmployeeStore.getState().employeeToEdit

    const [firstName, setFirstName] = useState<string>()
    const [lastName, setLastName] = useState<string>()
    const [email, setEmail] = useState<string>()
    const [age, setAge] = useState<number>()
    const [salary, setSalary] = useState<number>()
    const [profileImg, setProfileImg] = useState<string>()

    useEffect(() => {
        setFirstName(employeeToEditState?.first_name)
        setLastName(employeeToEditState?.last_name)
        setEmail(employeeToEditState?.email)
        setAge(employeeToEditState?.age)
        setSalary(employeeToEditState?.salary)
        setProfileImg(employeeToEditState?.avatar)
    }, [employeeToEditState])

    const handleFirstName = (e: ChangeEvent<HTMLInputElement>) => {
        setFirstName(e.target.value)
    }

    const handleLastName = (e: ChangeEvent<HTMLInputElement>) => {
        setLastName(e.target.value)
    }

    const handleEmail = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
    }

    const handleAge = (e: ChangeEvent<HTMLInputElement>) => {
        setAge(e.target.valueAsNumber)
    }

    const handleSalary = (e: ChangeEvent<HTMLInputElement>) => {
        setSalary(e.target.valueAsNumber)
    }

    const handleProfileImg = (e: ChangeEvent<HTMLInputElement>) => {
        setProfileImg(e.target.value)
    }

    const handleSubmit = () => {
        if(firstName) {
            if (lastName) {
                if (email) {
                    if(age) {
                        if (age > 0) {
                            if(salary) {
                                if (salary > 0) {
                                    if (profileImg) {
                                        if (employeeToEditState) {
                                            let employee: EmployeeDataMem = {
                                                id: employeeToEditState?.id,
                                                email: email,
                                                first_name: firstName,
                                                last_name: lastName,
                                                avatar: profileImg,
                                                age: age,
                                                salary: salary,
                                            }

                                            updateEmployeeInMem(employee)
                                            router.push(`/${locale}/edit`)    
                                        } else {
                                            alert("Error saving update")
                                        }                                        
                                    } else {
                                        alert("Profile Image URL cannot be empty")
                                    }
                                } else {
                                    alert("Only positive numbers are allowed.")
                                }
                            } else {
                                alert("Salary cannot be empty")
                            }
                        } else {
                            alert("Only positive numbers are allowed.")
                        }
                    } else {
                        alert("Age cannot be empty")
                    }
                } else {
                    alert("Email cannot be empty")
                }
            } else {
                alert("Last Name cannot be empty")
            }
        } else {
            alert("First Name cannot be empty")
        }        
    }

    return (
        <div className="container mx-auto px-3 mt-10">
            <div className="container mx-auto px-3 flex flex-col items-center gap-6 py-4 bg-white rounded shadow">
                <h1>{t("edit_employee")}</h1>
                <div className="flex flex-row gap-5">
                    <TextField value={firstName} onChange={handleFirstName} label="First Name" variant="outlined" color="warning" focused />
                    <TextField value={lastName} onChange={handleLastName} label="Last Name" variant="outlined" color="warning" focused />
                </div>
                <div className="flex flex-row gap-5">
                    <TextField value={email} onChange={handleEmail} label="Email" variant="outlined" color="warning" focused />
                    <TextField value={age} onChange={handleAge} label="Age" type="number" variant="outlined" color="warning" focused />
                </div>
                <div className="flex flex-row gap-5">
                    <TextField value={salary} onChange={handleSalary} label="Salary" type="number" variant="outlined" color="warning" focused />
                    <TextField value={profileImg} onChange={handleProfileImg} label="Profile Image URL" variant="outlined" color="warning" focused />
                </div>
                <div className="flex flex-row gap-5">
                    <Button onClick={() => handleSubmit()} className="bg-orange-400 hover:bg-white hover:text-orange-400" variant="contained">{t('save')}</Button>
                </div>
            </div>            
        </div> 
    )
}