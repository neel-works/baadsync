"use client";

import { genUploader } from "uploadthing/client";
import type { OurFileRouter } from "@/app/api/uploadthing/core";

export const uploadAudioFiles = genUploader<OurFileRouter>();
