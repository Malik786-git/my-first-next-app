import { ILayoutPage } from "../types/layout";
import Header from "../components/header/header";

export default function ServiceLayout({ children }: ILayoutPage) {
    return <main>
        <nav><Header></Header></nav>
        <div>{children}</div>
    </main>
}