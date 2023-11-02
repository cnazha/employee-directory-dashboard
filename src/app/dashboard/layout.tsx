'use client';
import React from "react";
import ApolloWrapper from "@/config/graphql/apollo.wrapper";
import AuthGuard from "@/hooks/authGuard";
import DashboardLayout from "@/components/layouts/dashboard.layout";

type Props = {
    children: React.ReactNode;
};

export default function Layout({ children }: Props) {
    return (
        <AuthGuard>
            <ApolloWrapper>
                <DashboardLayout>{children}</DashboardLayout>
            </ApolloWrapper>
        </AuthGuard>
    );
}

