import { useForm } from "react-hook-form"
import DarkModeToggle from "../Components/DarkMode";
import { IconCode } from "@tabler/icons-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function Signup(){

    const{register, handleSubmit, watch, formState:{errors},} = useForm();

    const navi = useNavigate();

    const afterSubmit = (data)=>{
      axios.post("http://localhost:8080/auth/signup",data)
      .then(()=> navi("/auth/login"))
      .catch(respnse => console.log(respnse))
    }

    return <div className="bg-mine-shaft-100 pt-3 dark:bg-mine-shaft-800 duration-300 min-h-screen h-full relative">
  {/* Logo Section */}
  <div className="flex items-center justify-center gap-2 flex-wrap text-center">
    <IconCode className="h-16 w-16 md:h-20 md:w-20" stroke={2} />
    <div className="text-4xl md:text-5xl dark:text-mine-shaft-300 font-bold text-mine-shaft-500">
      code<span className="text-bright-sun-500">R</span>
    </div>
  </div>

  {/* Dark Mode Toggle */}
  <div className="absolute top-4 right-4">
    <DarkModeToggle />
  </div>

  {/* Form Card */}
  <div className="w-[90%] sm:w-[80%] md:w-[60%] lg:w-[40%] xl:w-[30%] mx-auto dark:bg-mine-shaft-900 px-6 sm:px-10 md:px-16 py-6 bg-mine-shaft-200 rounded-xl mt-6">
    <h1 className="font-semibold text-2xl sm:text-3xl text-mine-shaft-600 text-center p-4 dark:text-mine-shaft-400">
      Signup
    </h1>

    <form className="flex flex-col" onSubmit={handleSubmit((data) => afterSubmit(data))}>
      {/* Username */}
      <label className="text-lg text-mine-shaft-600 dark:text-mine-shaft-200">Username:</label>
      <input
        {...register("userName", {
          required: "Username is required",
          minLength: { value: 3, message: "Username must be at least 3 characters" },
        })}
        className="px-3 py-2 rounded-xl my-2"
        type="text"
        placeholder="Enter username"
      />
      {errors.username && <p className="text-red-500">{errors.username.message}</p>}

      {/* First Name */}
      <label className="text-lg text-mine-shaft-600 dark:text-mine-shaft-200">First Name:</label>
      <input
        {...register("firstName", {
          required: "First Name is required",
          minLength: { value: 3, message: "First Name must be at least 3 characters" },
        })}
        className="px-3 py-2 rounded-xl my-2"
        type="text"
        placeholder="Enter First Name"
      />
      {errors.firstName && <p className="text-red-500">{errors.firstName.message}</p>}

      {/* Last Name */}
      <label className="text-lg text-mine-shaft-600 dark:text-mine-shaft-200">Last Name:</label>
      <input
        {...register("lastName", {
          required: "Last Name is required",
          minLength: { value: 3, message: "Last Name must be at least 3 characters" },
        })}
        className="px-3 py-2 rounded-xl my-2"
        type="text"
        placeholder="Enter Last Name"
      />
      {errors.lastName && <p className="text-red-500">{errors.lastName.message}</p>}

      {/* Email */}
      <label className="text-lg text-mine-shaft-600 dark:text-mine-shaft-200">Email:</label>
      <input
        {...register("email", {
          required: "Email is required",
          pattern: { value: /^\S+@\S+\.\S+$/, message: "Invalid email format" },
        })}
        className="px-3 py-2 rounded-xl my-2"
        type="text"
        placeholder="Enter email"
      />
      {errors.email && <p className="text-red-500">{errors.email.message}</p>}

      {/* Password */}
      <label className="text-lg text-mine-shaft-600 dark:text-mine-shaft-200">Password:</label>
      <input
        {...register("password", {
          required: "Password is required",
          minLength: { value: 8, message: "Password must be at least 8 characters" },
          pattern: {
            value: /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
            message: "Must contain 1 uppercase, 1 number, 1 special character",
          },
        })}
        className="px-3 py-2 rounded-xl my-2"
        type="password"
        placeholder="Enter Password"
      />
      {errors.password && <p className="text-red-500">{errors.password.message}</p>}

      {/* Confirm Password */}
      <label className="text-lg text-mine-shaft-600 dark:text-mine-shaft-200">Confirm Password:</label>
      <input
        {...register("confirmPassword", {
          validate: (value) => value === watch("password") || "Passwords do not match",
        })}
        className="px-3 py-2 rounded-xl my-2"
        type="password"
        placeholder="Confirm Password"
      />
      {errors.confirmPassword && <p className="text-red-500">{errors.confirmPassword.message}</p>}

      {/* GitHub URL */}
      <label className="text-lg text-mine-shaft-600 dark:text-mine-shaft-200">GitHub Profile:</label>
      <input
        {...register("githubURL", {
          pattern: {
            value: /^(https?:\/\/)?(www\.)?github\.com\/[a-zA-Z0-9_-]+$/,
            message: "Invalid GitHub URL",
          },
        })}
        className="px-3 py-2 rounded-xl my-2"
        type="url"
        placeholder="Enter GitHub URL"
      />
      {errors.githubURL && <p className="text-red-500">{errors.githubURL.message}</p>}

      {/* Submit */}
      <input
        className="bg-bright-sun-500 my-4 px-4 py-3 text-lg rounded-lg hover:bg-bright-sun-400 hover:scale-110 duration-150 cursor-pointer w-1/2 sm:w-1/3 mx-auto"
        type="submit"
      />
    </form>
  </div>
</div>

}