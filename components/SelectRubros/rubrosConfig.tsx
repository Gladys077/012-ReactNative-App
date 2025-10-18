import {
  CanastaAlmacen,
  Carne,
  Libro,
  Limpieza,
  Rotiseria,
  Verduleria
} from "@/components/icons";
import React from "react";

// Rubros predeterminados con sus iconos y colores
export const rubrosVendedor = [
  {
    label: "Almacén",
    value: "almacen",
    icon: <CanastaAlmacen width={18} height={18} fill="#FB8C00" />,
    color: "#FFF3E0",
    iconColor: "#FB8C00",
  },
  {
    label: "Limpieza",
    value: "limpieza",
    icon: <Limpieza width={18} height={18} color="#00ACC1" />,
    color: "#E0F7FA",
    iconColor: "#00ACC1",
  },
  {
    label: "Rotisería",
    value: "rotiseria",
    icon: <Rotiseria width={18} height={18} color="#8E24AA" />,
    color: "#F3E5F5",
    iconColor: "#8E24AA",
  },
  {
    label: "Verdulería",
    value: "verduleria",
    icon: <Verduleria width={18} height={18} color="#43A047" />,
    color: "#E8F5E9",
    iconColor: "#43A047",
  },
  {
    label: "Carnicería",
    value: "carniceria",
    icon: <Carne width={18} height={18} color="#D32F2F" />,
    color: "#FFEBEE",
    iconColor: "#D32F2F",
  },
  {
    label: "Librería",
    value: "libreria",
    icon: <Libro width={18} height={18} color="#F9A825" />,
    color: "#FFFDE7",
    iconColor: "#F9A825",
  },
];

// Ejemplo de uso en el componente:
/*
import { rubrosVendedor } from "./rubrosConfig";

<SelectRubrosVendedor
  label="Rubros"
  selected={selectedRubros}
  rubros={rubrosVendedor}
  onChange={setSelectedRubros}
  placeholder="Selecciona tu/s rubro/s"
/>
*/