import { Button, List, ListItem, TextField } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { useContext, useState } from "react";
import { Route, Switch } from "react-router-dom";
import { ModulesContext } from "../../utils/context";
import { ContentPanel } from "../ContentPanel/ContentPanel";
import { StylePanel } from "../StylePanel/StylePanel";
import { ModuleList } from "./ModuleList";
import { ModulePanel } from "./ModulePanel";
import "./Project.css";

export const Project = () => {
  const { modules, dispatch } = useContext(ModulesContext);

  const [tmpModulePath, setTmpModulePath] = useState("");

  const newModule = () => {
    dispatch({
      type: "new_module",
      modulePath: tmpModulePath,
      newModulePath: tmpModulePath
    });
    setTmpModulePath("");
  };

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
        <ListItem button>
          <TextField
            label="Module name"
            variant="outlined"
            value={tmpModulePath}
            onChange={(e) => {
              setTmpModulePath(e.target.value);
            }}
          />
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={newModule}
          >
            New
          </Button>
        </ListItem>
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
