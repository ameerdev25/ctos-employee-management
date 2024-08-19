import { useEmployeeStore } from "@/app/[lang]/store/employeeStore"
import { Locale } from "@/lib/locales"
import { EmployeeDataMem } from "@/memoryData"
import { Avatar } from "@mui/material"
import { useLocale, useTranslations } from "next-intl"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

interface Props {
    id: number,
    firstName: string,
    lastName: string,
    avatar: string,
    age: number,
    salary: number,
    email: string
}

export default function EmployeeCardDisplayEdit({id, firstName, lastName, avatar, age, salary, email}: Props) {
    const [truncatedName, setTruncatedName] = useState<string>()

    const t = useTranslations()

    const router = useRouter()
    const locale = useLocale() as Locale

    const setEmployeeToEditState = useEmployeeStore.getState().setEmployeeToEdit

    useEffect(() => {
        truncateName(firstName, lastName)
    }, [])

    const truncateName = (firstName: string, lastName: string) => {
        let name = firstName + " " + lastName
        if (name.length > 25) {
            let truncName = name.slice(0, 25) + '...'
            setTruncatedName(truncName)
        } else {
            setTruncatedName(name)
        }
    }

    const handleOnClick = () => {
        let employee: EmployeeDataMem = {
            id: id,
            first_name: firstName,
            last_name: lastName,
            avatar: avatar,
            age: age,
            salary: salary,
            email: email,
        }

        setEmployeeToEditState(employee)

        router.push(`/${locale}/edit/form`)
    }

    return (
        <div onClick={() => handleOnClick()} className="flex flex-row gap-5 items-center justify-between px-5 py-1 bg-white shadow-md rounded outline outline-neutral-200 outline-[0.5px] hover:cursor-pointer hover:bg-orange-200 transition-all">
            <div className="flex flex-row items-center gap-3">
                <Avatar 
                    alt="test" 
                    src={avatar}
                    sx={{ width: 56, height: 56}} />
                <div className="flex flex-col">
                    <h1 className="text-orange-400">{truncatedName}</h1>
                    <h2 className="text-xs text-neutral-500">{age ? age : 0} {t('years_old')}</h2>
                    <h2 className="text-xs text-neutral-500">{email}</h2>
                </div>
            </div>            
            <h1>RM {salary ? salary : 0}</h1>
        </div>
    )
}