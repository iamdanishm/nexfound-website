import type { Metadata } from "next";
import Header from "../../_components/header";
import AuditChat from "../../_components/audit-chat";

export const metadata: Metadata = {
    title: "Free AI Audit",
    description:
        "Get a free AI automation audit for your business. Discover 3 actionable ways to automate your operations and scale faster with Nexfound.",
    openGraph: {
        title: "Free AI Audit | Nexfound",
        description:
            "Get a free AI automation audit for your business. Discover 3 actionable ways to automate your operations and scale faster.",
    },
};

export default function AuditPage() {
    return (
        <>
            <Header />
            <main>
                <AuditChat />
            </main>
        </>
    );
}
