import {z} from "zod";
import { TrainModel, GenerateImage, GenerateImagesFromPack } from "./types";

export type TrainModelInput = z.infer<typeof TrainModel>;
export type GeneraeImageInput = z.infer<typeof GenerateImage>;
export type GenerateImagesFromPackInput = z.infer<typeof GenerateImagesFromPack>;

