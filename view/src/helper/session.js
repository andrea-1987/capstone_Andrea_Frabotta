import { jwtDecode } from "jwt-decode";

let sessionData = {};

const session = localStorage.getItem("auth");

if (session) {
  const decodedSession = jwtDecode(session);

  sessionData = {
    email: decodedSession.email,
    firstName: decodedSession.firstName,
    lastName: decodedSession.lastName,
    role: decodedSession.role,
    _id: decodedSession._id,
  };
}

export default sessionData;
