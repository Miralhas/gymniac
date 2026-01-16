'use client'

import AuthenticatedButton from "@/components/ui/authenticated-button";
import { useState } from "react";

const ExercisesPage = () => {
  const [st, setSt] = useState("Not");

  return (
    <>
      <h1>{st}</h1>
      <AuthenticatedButton variant="cool" className="w-full max-w-xl" onClick={() => setSt("asdasdasd")}>
        Submit
      </AuthenticatedButton>
    </>
  )
}

export default ExercisesPage;
