import { removeEmployeeInMem } from "@/memoryData"
import { Avatar, IconButton, Menu, MenuItem } from "@mui/material"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { useTranslations } from "next-intl";

interface Props {
    id: number,
    firstName: string,
    lastName: string,
    avatar: string,
    age: number,
    salary: number,
    email: string
}

export default function EmployeeCardDisplay({id, firstName, lastName, avatar, age, salary, email}: Props) {
    const [truncatedName, setTruncatedName] = useState<string>()

    const t = useTranslations()
    const router = useRouter()

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

    const handleRemove = () => {
        if (confirm("Confirm deletion?")) {
            removeEmployeeInMem(id)
            router.refresh()
        }
    }

    return (
        <div className="flex flex-row items-center justify-between gap-5 px-5 py-1 bg-white shadow-md rounded outline outline-neutral-200 outline-[0.5px] hover:cursor-pointer hover:bg-orange-200 transition-all">
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
            <div className="flex flex-row gap-10 items-center">
                <h1>RM {salary ? salary : 0}</h1>
                <IconButton color="error" onClick={handleRemove} >
                    <DeleteOutlineOutlinedIcon />    
                </IconButton>
                    
            </div>                              
        </div>        
    )
}