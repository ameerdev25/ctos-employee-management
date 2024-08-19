import LanguageSwitcher from "./LanguageSwitcher";

export default function Header() {
    return(
        <div className="bg-white shadow-md fixed top-0 w-full">
            <div className="container mx-auto px-3 h-20 flex items-center justify-between">
                <div className="font-bold text-xl">EMS</div>
                <LanguageSwitcher />
            </div>            
        </div>
    )
}