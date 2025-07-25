"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { uploadAudioFiles } from "@/utlis/uploadthing";
import { createTrack } from "@/lib/actions/track.action";
import React, { useState } from "react";

interface AddTrackModalProps {
  beatId: string;
  // onTrackAdded: () => void;
}

export default function AddTrackModal({
  // onTrackAdded,
  beatId,
}: AddTrackModalProps) {
  const [type, setType] = useState("");
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!type || !audioFile) {
      return alert("Both audiofile and track type are required");
    }

    setLoading(true);
    try {
      const uploaded = await uploadAudioFiles.uploadFiles("audioUploader", {
        files: [audioFile],
      });
      if (!uploaded[0]?.url) {
        throw new Error("Audio upload failed.");
      }
      const audioUrl = uploaded[0]?.url;
      const payload = {
        type,
        beatId,
        audioUrl,
        order: 0,
        pan: 0.0,
        mute: false,
        solo: true,
        volume: 100,
      };
      const track = await createTrack(payload);
      setOpen(false);
      setType("");
      setAudioFile(null);
      return track;
    } catch (error) {
      console.error("Error creating track", error);
      throw new Error("Error creating track");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <form>
        <DialogTrigger asChild>
          <Button variant="outline">Add Track</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add new track</DialogTitle>
            <DialogDescription>Upload a track for your beat</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="type">Track type</Label>
              <Input
                id="type"
                name="type"
                value={type}
                onChange={(e) => setType(e.target.value)}
                required
                disabled={loading}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="audio">Audio File</Label>
              <Input
                id="audio"
                name="audio"
                accept="audio/*"
                type="file"
                onChange={(e) => setAudioFile(e.target.files?.[0] || null)}
                required
                disabled={loading}
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" disabled={loading}>
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" onClick={handleSubmit} disabled={loading}>
              {loading ? "Uploading..." : "Save changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
