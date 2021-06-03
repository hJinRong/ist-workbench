import { List } from "@material-ui/core";
import React, { useContext } from "react";
import { Route, Switch } from "react-router-dom";
import { ModulesContext } from "../../utils/context";
import { ContentPanel } from "../ContentPanel/ContentPanel";
import { StylePanel } from "../StylePanel/StylePanel";
import { ModuleList } from "./ModuleList";
import { ModulePanel } from "./ModulePanel";
import "./Project.css";

export const Project = () => {
  const { modules } = useContext(ModulesContext);
  return (
    <>
      <List className={"list-wrapper"}>
        {modules.map((module, index) => {
          return (
            <ModuleList
              key={index}
              modulePath={module.path}
              moduleIndex={index}
            />
          );
        })}
      </List>
      <div className="panel-wrapper">
        <Switch>
          <Route
            path={"/project/:modulePath/style/:stylePath"}
            component={StylePanel}
          />
          <Route
            path={"/project/:modulePath/content/:contentPath"}
            component={ContentPanel}
          />
          <Route path="/project/:modulePath" component={ModulePanel} />
        </Switch>
      </div>
    </>
  );
};
