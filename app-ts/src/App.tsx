import { Signin, Signup } from "./components/";
import { type SignupData } from "./components/signup/types/form";

export const App = () => {
  const handleSignin = (data: { email: string; password: string }) => {
    console.log(data);
  };

  const handleSignup = (data: SignupData) => {
    console.log(data);
  };

  return (
    <div className="container">
      <Signin onSubmit={handleSignin} />
      <Signup onSubmit={handleSignup} />
    </div>
  );
};
