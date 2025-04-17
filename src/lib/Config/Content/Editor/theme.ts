import { IStandaloneThemeData } from "@/types/editor";
import nightOwl from "./theme/night-owl";
import CusNightOwl from "./theme/cus-night-owl";

export const theme: {
    [key: string]: IStandaloneThemeData
} = {
    'night-owl': nightOwl,
    'cus-night-owl': CusNightOwl
}