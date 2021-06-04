import { useReducer } from "react";
import { BrowserRouter as Router, Redirect, Route } from "react-router-dom";
import { Project } from "./pages/Project/Project";
import { ModulesContext, modulesReducer } from "./utils/context";
import { importsObj } from "./utils/tree";

const RedirectToProject = () => {
  return <Redirect to={"/project"} />;
};

function App() {
  const [modules, dispatch] = useReducer(modulesReducer, importsObj);
  return (
    <>
      <ModulesContext.Provider value={{ modules, dispatch }}>
        <Router>
          <Route path={"/project"} component={Project} />
          <Route path={"/"} exact component={RedirectToProject} />
        </Router>
      </ModulesContext.Provider>
    </>
  );
}

export default App;
