export default {
  validation: {
    required: "{field} is required",
    min: "{field} must be at least {count} characters",
    max: "{field} must be at most {count} characters",
    email: "Invalid email address",

    fields: {
    name: "Name",
    email: "Email",
    password: "Password",
  },
  },

  user: {
    created: "User created successfully",
    fetched: "User fetched successfully",
    emailExists: "Email already exists",
    notFound: "User not found",
    banned: "User has been banned",
    unbanned: "User has been unbanned",
  },

  auth: {
    loginSuccess: "Login successful",
    invalidCredentials: "Invalid email or password",
  },

  
} as const;