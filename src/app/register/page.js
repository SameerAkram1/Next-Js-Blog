"use client";
import { useState } from "react";
import { useRegisterUserMutation } from "../../../redux/userSlice";


export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [registerUser, { isLoading, error, data }] = useRegisterUserMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await registerUser({ name, email, password });
    setName(""); setEmail(""); setPassword("");
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Register</h1>
      <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border px-2 py-1 rounded"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border px-2 py-1 rounded"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border px-2 py-1 rounded"
          required
        />
        <button
          type="submit"
          disabled={isLoading}
          className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
        >
          {isLoading ? "Registering..." : "Register"}
        </button>
        {error && <p className="text-red-500">Error: {error?.data || "Failed"}</p>}
        {data && <p className="text-green-500">{data.message}</p>}
      </form>
    </div>
  );
}
