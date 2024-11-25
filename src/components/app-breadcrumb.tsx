'use client'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { SourceTextModule } from "vm";

export default function AppBreadCrumb() {
    const pathname = usePathname();
    let [paths,setPaths] = useState<string[]>([]);
    useEffect(() => {
        let p = pathname.substring(1).split("/");
        setPaths(p);
    },[pathname])
    return (
        <>
            <Breadcrumb>
                <BreadcrumbList>
                   {
                    paths.map((path,index) => {
                        return (
                            <BreadcrumbItem key={index}>
                            <BreadcrumbLink href="/components">{path}</BreadcrumbLink>
                          </BreadcrumbItem>
                        )
                    })
                   }
                </BreadcrumbList>
            </Breadcrumb>

        </>
    );
}