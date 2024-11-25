import AppBreadCrumb from "@/components/app-breadcrumb"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@radix-ui/react-separator"

export default function Layout({ children }: {
    children: React.ReactNode
}) {
    return (
        <>
            <SidebarProvider>
                <AppSidebar/>
                <div className="flex-1 flex flex-col">
                <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
                    <div className="flex items-center gap-2 px-4">
                        <SidebarTrigger className="-ml-1" />
                        <Separator orientation="vertical" className="mr-2 h-4 bg-black" />
                        <AppBreadCrumb />
                    </div>
                </header>
                <main className=" flex-1">
                    {children}
                </main>
                </div>
               
            </SidebarProvider>
        </>
    )
}