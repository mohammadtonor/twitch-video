import { Actions } from "./actions"
import { Logo } from "./logo"

export const Navbar = () => {
    return (
        <nav className="h-20 w-full px-2 bg-[#252731] fixed top-0 z-[49]
        lg:px-4 flex justify-between items-center shadow-sm">
            <Logo />
            <Actions />
        </nav>
    )
}