import {
  Card,
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";


export function LoginForm() {
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_BASE_URL}/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        const data = await response.json();
        if (data.token) {
          localStorage.setItem('auth', data.token);
          try {
            const decodedToken = jwtDecode(data.token);
            const role = decodedToken.role;

       
            if (role === 'user') {
              navigate('/users');
            } else if (role === 'professional') {
              navigate('/professionals');
            } else {
          
              alert('Unknown role');
            }
          } catch (error) {
            throw new Error('Failed to parse token');
          }
        } else {
          throw new Error('Token not found in response data');
        }
      } else {
        throw new Error('HTTP request failed with status ' + response.status);
      }
    } catch (error) {
      alert('Failed to login: ' + error.message);
    }
  };

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  return (
    <Card color="transparent" shadow={false}>
      <Typography variant="h4" color="blue-gray">
        Sign in
      </Typography>
      <Typography color="gray" className="mt-1 font-normal">
      Wellcome back.Enter your detail to log in.
      </Typography>
      <form onSubmit={onSubmit} className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
        <div className="mb-1 flex flex-col gap-6">
                    <Typography variant="h6" color="blue-gray" className="-mb-3">
            Your Email
          </Typography>
          <Input
          onChange={onChangeInput}
          name="email"
            size="lg"
            placeholder="name@mail.com"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Password
          </Typography>
          <Input
          onChange={onChangeInput}
          name="password"
            type="password"
            size="lg"
            placeholder="********"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
        </div>
                <Button type="submit" className="mt-6" fullWidth>
          sign in
        </Button>
      </form>
    </Card>
  );
}
