import React from "react";
import { MainLayout } from "../layout/MainLayout";
import { jwtDecode } from "jwt-decode";
import { UserContent } from "../components/userPage/UserContent";

export const UserPage = () => {
  const session = JSON.parse(localStorage.getItem("auth"));
  const decodedSession = jwtDecode(session);

  return (
    <MainLayout>
      <UserContent />
    </MainLayout>
  );
};
