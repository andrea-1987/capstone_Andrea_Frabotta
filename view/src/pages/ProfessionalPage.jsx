import React from "react";
import { MainLayout } from "../layout/MainLayout";
import { ProfessionalContent } from "../components/professional/ProfessionalContent";
import { jwtDecode } from "jwt-decode";

export const ProfessionalPage = () => {
    const session = JSON.parse(localStorage.getItem('auth'))
    const decodedSession = jwtDecode(session)
          return (
        <MainLayout>
            <ProfessionalContent />
        </MainLayout>
    );
};
