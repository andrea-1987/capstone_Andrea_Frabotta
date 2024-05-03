import React from "react";
import { MainLayout } from "../layout/MainLayout";
import { UserContent } from "../components/user/UserContent";
import { jwtDecode } from "jwt-decode";

export const UserPage = () => {
  const session = localStorage.getItem('auth')
  const decodedSession = jwtDecode(session)
  return (
    <MainLayout>
      <UserContent />
    </MainLayout>
  );
};
