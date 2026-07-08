import {
  Carpintero,
  Cerrajero,
  Electricista,
  Jardineria,
  Limpieza,
  Mudanza,
  Pintor,
  Plomero,
} from "@/components/icons";
import Albanil from "../icons/Albañil";
import { RubroConfig } from "./rubrosConfig";

export const rubrosServicios: RubroConfig[] = [
  {
    label: "Electricidad",
    value: "electricidad",
    IconComponent: Electricista,
    color: "#FFF9C4",
    iconColor: "#F9A825",
  },
  {
    label: "Plomería",
    value: "plomeria",
    IconComponent: Plomero,
    color: "#B3E5FC",
    iconColor: "#0288D1",
  },
  {
    label: "Albañilería",
    value: "albanileria",
    IconComponent: Albanil,
    color: "#D7CCC8",
    iconColor: "#5D4037",
  },
  {
    label: "Pintura",
    value: "pintura",
    IconComponent: Pintor,
    color: "#F8BBD0",
    iconColor: "#C2185B",
  },
  {
    label: "Carpintería",
    value: "carpinteria",
    IconComponent: Carpintero,
    color: "#FFE0B2",
    iconColor: "#E65100",
  },
  {
    label: "Cerrajería",
    value: "cerrajeria",
    IconComponent: Cerrajero,
    color: "#E8EAF6",
    iconColor: "#3949AB",
  },
  {
    label: "Jardinería",
    value: "jardineria",
    IconComponent: Jardineria,
    color: "#DCEDC8",
    iconColor: "#558B2F",
  },
  {
    label: "Limpieza del hogar",
    value: "limpieza_hogar",
    IconComponent: Limpieza,
    color: "#B2EBF2",
    iconColor: "#00ACC1",
  },
  {
    label: "Mudanza",
    value: "mudanza",
    IconComponent: Mudanza,
    color: "#EDE7F6",
    iconColor: "#6A1B9A",
  },
];
