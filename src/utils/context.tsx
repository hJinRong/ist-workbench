import React from "react";
import {
  importsObj,
  Module,
  ModuleContents,
  Modules,
  ModuleStyles,
} from "./tree";

type DispatchParam = {
  modulePath: string;
};

type DispatchNewModule = DispatchParam & {
  type: "module";
  newModule: Module;
};

type DispatchRemoveModule = DispatchParam & {
  type: "rm_module";
  moduleIndex: number;
};

type DispatchNewStyle = DispatchParam & {
  type: "style";
  newStyle: ModuleStyles;
};

type DispatchChangeStylePath = DispatchParam & {
  type: "style_path";
  oldPath: string;
  newPath: string;
};

type DispatchNewEmptyStyle = DispatchParam & {
  type: "new_style";
  stylePath: string;
  newStyleId: string;
};

type DispatchDeleteStyle = DispatchParam & {
  type: "del_style";
  stylePath: string;
  styleIndex: number;
};

type DispatchContent = DispatchParam & {
  type: "content";
  oldPath: string;
  newContent: ModuleContents;
};

type DispatchNewContent = DispatchParam & {
  type: "new_content";
  newContent: ModuleContents
};

type DispatchContents = DispatchParam & {
  type: "contents";
  contents: ModuleContents[];
};

type DispatchUnionType =
  | DispatchNewModule
  | DispatchRemoveModule
  | DispatchNewStyle
  | DispatchChangeStylePath
  | DispatchDeleteStyle
  | DispatchNewEmptyStyle
  | DispatchContent
  | DispatchNewContent
  | DispatchContents;

type ReducerType = (state: Modules, action: DispatchUnionType) => Modules;

export const initialModules: Modules = importsObj;

export const modulesReducer: ReducerType = (state, action) => {
  const modules = Array.from(state);
  const moduleIdx = modules.findIndex((el) => el.path === action.modulePath);
  switch (action.type) {
    case "module":
      if (moduleIdx === -1) {
        modules.push(action.newModule);
      } else {
        modules[moduleIdx] = action.newModule;
      }
      return modules;
    case "rm_module":
      modules.splice(action.moduleIndex, 1);
      return modules;
    case "style":
      if (moduleIdx === -1)
        throw new Error("STYLE: An unexpected situation occurs.");
      const styleIdx = modules[moduleIdx].styles.findIndex(
        (el) => el.path === action.newStyle.path
      );
      if (styleIdx !== -1) {
        modules[moduleIdx].styles[styleIdx] = action.newStyle;
      } else {
        modules[moduleIdx].styles.push(action.newStyle)
      }
      return modules;
    case "new_style":
      debugger;
      if (moduleIdx === -1)
        throw new Error("STYLE: An unexpected situation occurs.");
      const styleIdx2 = modules[moduleIdx].styles.findIndex(
        (el) => el.path === action.stylePath
      );
      modules[moduleIdx].styles[styleIdx2].styles.push({
        id: action.newStyleId,
        font: {},
        paragraph: {},
      });
      return modules;
    case "del_style":
      if (moduleIdx === -1)
        throw new Error("STYLE: An unexpected situation occurs.");
      const styleIdx3 = modules[moduleIdx].styles.findIndex(
        (el) => el.path === action.stylePath
      );
      modules[moduleIdx].styles[styleIdx3].styles.splice(action.styleIndex, 1);
      return modules;
    case "style_path":
      debugger;
      if (moduleIdx === -1)
        throw new Error("STYLE: An unexpected situation occurs.");
      const styleIdx4 = modules[moduleIdx].styles.findIndex(
        (el) => el.path === action.oldPath
      );
      modules[moduleIdx].styles[styleIdx4].path = action.newPath;
      return modules;
    case "content":
      if (moduleIdx === -1)
        throw new Error("STYLE: An unexpected situation occurs.");
      const contentIdx = modules[moduleIdx].contents.findIndex(
        (el) => el.path === action.oldPath
      );
      if (contentIdx !== -1) {
        modules[moduleIdx].contents[contentIdx] = action.newContent;
      }
      return modules;
    case "new_content":
      if (moduleIdx === -1)
        throw new Error("STYLE: An unexpected situation occurs.");
      modules[moduleIdx].contents.push(action.newContent);
      return modules;
    case "contents":
      if (moduleIdx === -1)
        throw new Error("STYLE: An unexpected situation occurs.");
      modules[moduleIdx].contents = action.contents;
      return modules;
    default:
      throw new Error();
  }
};

const defaultContext = {
  modules: initialModules,
  dispatch: (param: DispatchUnionType) => {},
};

export const ModulesContext = React.createContext(defaultContext);
