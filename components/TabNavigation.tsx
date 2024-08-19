'use client'

import ActionTab from "./ActionTab";
import { useTranslations } from "next-intl";

export default function TabNavigation() {
    const t = useTranslations()

    return (
        <div className="container mx-auto px-3 mt-28 h-16 flex flex-row items-center justify-between bg-white rounded shadow">
            <h1>{t('employee_management_title')}</h1>
            <ActionTab />
        </div>
    )
}