import { Resault } from "./resaultClass";

export interface categoryclass {
  categorymodels: categorymodel[];
  ResaultClass: Resault;
}

export interface categorymodel {
  RowID: number;
  RowName: string;
  FatherID: number;
  Image: Uint8Array; // معادل byte[] در C# 
  SubCategory: categorymodel;
}
