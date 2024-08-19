'use client'

import { Locale } from "@/lib/locales";
import { Tab, Tabs } from "@mui/material";
import { useLocale, useTranslations } from "next-intl";
import { Kanit } from "next/font/google";
import { usePathname, useRouter } from "next/navigation";
import { SyntheticEvent, useEffect, useState } from "react";

const kanit = Kanit({
    subsets: ["latin"],
    weight: ["100", "200", "300", "400", "500"]
});

export default function ActionTab() {
    const locale = useLocale() as Locale
    const router = useRouter()
    const pathname = usePathname()

    const [value, setValue] = useState<string>()

    const t = useTranslations()

    useEffect(() => {
        let pathValue = '/';

        if (pathname.startsWith(`/${locale}/edit`)) {
            pathValue = 'edit';
        } else if (pathname.startsWith(`/${locale}/add`)) {
            pathValue = 'add';
        } else if (pathname === `/${locale}` || pathname === `/${locale}/`) {
            pathValue = '/';
        }

        setValue(pathValue);
    }, [pathname])
    
    const handleOnChange = (e: SyntheticEvent, value: string) => {
        setValue(value)
        router.push(`/${locale}/${value}`)
    }

    return (
        <Tabs
            value={value}
            sx={{
                '& .css-1h9z7r5-MuiButtonBase-root-MuiTab-root': {
                    fontFamily: kanit.style.fontFamily,
                    color: '#8c8c8c'
                },
               '& .MuiTabs-indicator': {
                    backgroundColor: '#ed6c02',
                    height: 3
                },
                '& .css-1h9z7r5-MuiButtonBase-root-MuiTab-root.Mui-selected': {
                    color: '#ed6c02',
                }, 
            }}
            onChange={handleOnChange}>
            <Tab value="/" label={t('list_tab')} />
            <Tab value="add" label={t('add_tab')} />
            <Tab value="edit" label={t('edit_tab')} />
        </Tabs>
    )
}