"use client";

import axios from "axios";
import React, { useState } from "react";

function CreateBeat() {

  const [name, setName] = useState("")
  const [description, setDescription] = useState("");
  const [bpm, setBpm] = useState(120);
  const [key, setKey] = useState("");
  const [genre, setGenre] = useState("");
  const [isPublished, setIsPublished] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    const beatData = {
      name,
      description,
      bpm,
      key,
      genre,
      isPublished
    };

    try {
      // const response = await axios.post("/api/beat", beatData)
      // const data = await response.data;
      console.log("Beat created successfully:", beatData);
    } catch (error) {
      console.error("Error creating beat:", error);
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Create Beat</h1>
      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Beat Name*
          </label>
          <input
            type="text"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="Enter beat name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            name="beatName"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="Enter beat description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            name="description"
          ></textarea>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            BPM (Beats Per Minute)*
          </label>
          <input
            type="number"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="Enter BPM (default:- 120)"
            value={bpm}
            onChange={(e) => setBpm(Number(e.target.value))}
            name="bpm"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Key (C Major, A Minor, etc.)
          </label>
          <input
            type="text"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="Enter key"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            name="key"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Genre (e.g., Hip-Hop, EDM, etc.)
          </label>
          <input
            type="text"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="Enter the genre of the beat"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            name="genre"
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          onClick={handleSubmit}
        >
          Create Beat
        </button>
      </form>
    </div>
  )
}

export default CreateBeat;
