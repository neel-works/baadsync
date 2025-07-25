import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { createBeat } from "@/lib/actions/beat.actions";

const defaultBpm = 120;

const CreateBeatForm: React.FC = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [bpm, setBpm] = useState(defaultBpm);
  const [key, setKey] = useState("");
  const [genre, setGenre] = useState("");
  const [isPublished, setIsPublished] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await createBeat({
        title,
        description,
        bpm,
        key,
        genre,
        isPublished,
      });
      router.push("/beat/my-beats");
    } catch (err) {
      setError("Error creating beat");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Beat Name*
        </label>
        <input
          type="text"
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="Enter beat title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
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
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Published
        </label>
        <input
          type="checkbox"
          checked={isPublished}
          onChange={(e) => setIsPublished(e.target.checked)}
          name="isPublished"
        />
      </div>
      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        disabled={loading}
      >
        {loading ? "Creating..." : "Create Beat"}
      </button>
      {error && <div className="text-red-500">{error}</div>}
    </form>
  );
};

export default CreateBeatForm;
