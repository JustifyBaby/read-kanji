"use client";

import EmailLink from "./EmailLink";
import WithGoogle from "./WithGoogle";

const SignIn = () => {
  return (
    <div>
      <WithGoogle />
      <EmailLink />
    </div>
  );
};

export default SignIn;
