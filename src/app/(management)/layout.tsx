import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import AppBreadCrumb from "@/components/app-breadcrumb";

export default function Layout({ children }: {
    children: React.ReactNode
}) {
    return (
        <>
            <SidebarProvider>
                <AppSidebar />
                <main>
                    <div className=" flex items-center">
                        <SidebarTrigger />
                        <AppBreadCrumb />
                    </div>
                    {children}
                </main>
            </SidebarProvider>
        </>
    )
}