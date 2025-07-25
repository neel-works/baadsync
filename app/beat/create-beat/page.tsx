"use client";
import React from "react";
import CreateBeatForm from "@/components/create-beat-form";

function CreateBeat() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Create Beat</h1>
      <CreateBeatForm />
    </div>
  );
}

export default CreateBeat;
