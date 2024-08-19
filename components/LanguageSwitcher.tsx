'use client';

import { Locale } from "@/lib/locales";
import { Stack, Switch } from "@mui/material";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";

export default function LanguageSwitcher() {
    const locale = useLocale() as Locale
    const router = useRouter();

    const [checked, setChecked] = useState(locale === "en")

    const changeLanguage = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked) {
            setChecked(true)
            router.push('/en')            
        } else {
            setChecked(false)  
            router.push('/ms')           
        }
    }

    return (
        <>
            <Stack direction="row" spacing={1} alignItems="center">
                <h1>Bahasa</h1>
                <Switch 
                    color="warning"
                    checked={checked}
                    onChange={changeLanguage} />
                <h1>English</h1>
            </Stack>
        </>
    )
}