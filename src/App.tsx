import { useReducer } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { ContentPanel } from "./pages/ContentPanel/ContentPanel";
import { Project } from "./pages/Project/Project";
import { StylePanel } from "./pages/StylePanel/StylePanel";
import { ModulesContext, modulesReducer } from "./utils/context";
import { importsObj } from "./utils/tree";

function App() {
  const [modules, dispatch] = useReducer(modulesReducer, importsObj);
  return (
    <>
      <ModulesContext.Provider value={{ modules, dispatch }}>
        <Router>
          <Route path={"/project"} component={Project} />
        </Router>
      </ModulesContext.Provider>
    </>
  );
}

export default App;
