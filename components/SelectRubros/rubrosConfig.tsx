import {
  CanastaAlmacen,
  Carne,
  Libro,
  Limpieza,
  Rotiseria,
  Verduleria,
} from "@/components/icons";
import React from "react";

export interface RubroConfig {
  label: string;
  value: string;
  IconComponent: React.ComponentType<{
    width: number;
    height: number;
    color?: string;
    fill?: string;
  }>;
  color: string; // fondo del círculo
  iconColor: string; // color del ícono
}

// Rubros predeterminados (acá deberían agregarse más en el futuro - por ahora cada nuevo rubro tendrá un icono de tiendaIcon)
export const rubrosVendedor: RubroConfig[] = [
  {
    label: "Almacén",
    value: "almacen",
    IconComponent: CanastaAlmacen,
    color: "#FFE0B2",
    iconColor: "#FB8C00",
  },
  {
    label: "Limpieza",
    value: "limpieza",
    IconComponent: Limpieza,
    color: "#B2EBF2",
    iconColor: "#00ACC1",
  },
  {
    label: "Rotisería",
    value: "rotiseria",
    IconComponent: Rotiseria,
    color: "#E1BEE7",
    iconColor: "#8E24AA",
  },
  {
    label: "Verdulería",
    value: "verduleria",
    IconComponent: Verduleria,
    color: "#C8E6C9",
    iconColor: "#43A047",
  },
  {
    label: "Carnicería",
    value: "carniceria",
    IconComponent: Carne,
    color: "#FFCDD2",
    iconColor: "#D32F2F",
  },
  {
    label: "Librería",
    value: "libreria",
    IconComponent: Libro,
    color: "#FFF9C4",
    iconColor: "#F9A825",
  },
  {
    label: "Plomería",
    value: "plomeria",
    IconComponent: Carne,
    color: "#FFCDD2",
    iconColor: "#D32F2F",
  },
  {
    label: "Electricista",
    value: "electricista",
    IconComponent: Libro,
    color: "#FFF9C4",
    iconColor: "#F9A825",
  },
];
