import { StyleItem } from "./enity";

export interface OrderConf {
  imports: string[];
}

export interface ContentConf {
  id: string;
  styles: string[];
  files: string[];
}

export interface ModuleConf {
  id: string;
  styles: string;
  contents: string;
}

export interface StyleConf {
  styles: StyleItem[];
}
