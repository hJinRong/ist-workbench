import { Font, Paragraph } from "./enity";

export type Modules = Module[];

export interface Module {
  path: string;
  id: string;
  styles: ModuleStyles[];
  contents: ModuleContents[];
}

export interface ModuleStyles {
  path: string;
  styles: Style[];
}

export interface Style {
  id: string;
  fontStyles?: Font;
  paragraphStyles?: Paragraph;
}

export interface ModuleContents {
  path: string;
  id: string;
  files: ContentFile[];
  styles: string[];
}

export interface ContentFile {
  path: string;
  content: string;
}

export const importsObj: Modules = [
  {
    path: "adir",
    id: "module-a", //useless
    styles: [
      {
        path: "style1.yaml",
        styles: [
          {
            id: "style1-1",
            fontStyles: {
              fontFamily: "Arial",
              bold: true,
            },
            paragraphStyles: {
              alignment: "justify",
              textIntent: 21,
            },
          },
          {
            id: "style1-2",
            fontStyles: {
              italic: true,
              size: 13,
            },
          },
        ],
      },
    ],
    contents: [
      {
        path: "content.yaml",
        id: "content-a", //useless
        files: [{ path: "bar.md", content: "??" }],
        styles: ["style1-1", "style1-2"],
      },
    ],
  },
];
