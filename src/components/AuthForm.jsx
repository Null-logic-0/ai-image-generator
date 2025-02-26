import { useActionState, useState } from "react";
import Form from "./Form";
import InputContainer from "./InputContainer";
import Label from "./Label";
import Input from "./Input";
import { useAuthContext } from "../store/auth-context";

function AuthForm() {
  const { signup, login } = useAuthContext();
  const [authMode, setAuthMode] = useState("login");
  const [error, setError] = useState();

  function handleSwitchAuthMode() {
    setAuthMode((prevAuthMode) => {
      if (prevAuthMode === "login") {
        return "signup";
      } else {
        return "login";
      }
    });
  }

  async function submitAction(_, formData) {
    setError(null);
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      if (authMode === "signup") {
        const name = formData.get("name");
        signup(name, email, password);
      }

      if (authMode === "login") {
        login(email, password);
      }
    } catch (error) {
      setError(error.message);
    }
  }

  const [, action, isPending] = useActionState(submitAction);

  return (
    <>
      <h1 className="text-center text-2xl text-white mb-6 font-bold uppercase">
        Image Generator AI
      </h1>
      <Form className="max-w-[25rem] mx-auto" action={action}>
        {authMode === "signup" && (
          <InputContainer>
            <Label htmlFor="name">Name</Label>
            <Input type="text" id="name" name="name" required />
          </InputContainer>
        )}
        <InputContainer>
          <Label htmlFor="email">Email</Label>
          <Input type="email" id="email" name="email" required />
        </InputContainer>
        <InputContainer>
          <Label htmlFor="email">Password</Label>
          <Input type="password" id="password" name="password" required />
        </InputContainer>
        {error && <p className="text-red-300 mt-3">{error}</p>}
        <p className="flex flex-col gap-3 mt-4">
          <button
            className="bg-[#CAFF00] text-[#151515] font-semibold py-2 rounded-lg hover:bg-[#acc264] disabled:cursor-not-allowed disabled:bg-[#9ca57e] cursor-pointer"
            disabled={isPending}
          >
            {!isPending && authMode === "login" ? "Login" : "Signup"}
            {isPending && "Submiting..."}
          </button>
          <button
            type="button"
            onClick={handleSwitchAuthMode}
            className="text-white cursor-pointer underline"
            disabled={isPending}
          >
            {authMode === "login"
              ? "Create Account"
              : "I already have an account!"}
          </button>
        </p>
      </Form>
    </>
  );
}

export default AuthForm;
