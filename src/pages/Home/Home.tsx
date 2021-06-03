import { IconButton } from "@material-ui/core";
import AddBoxIcon from "@material-ui/icons/AddBox";
import { Link } from "react-router-dom";
import "./Home.css";

export const Home = () => {

  return (
    <>
      <Link to={"/project"}>
        <IconButton className={"addbox-btn"}>
          <AddBoxIcon />
        </IconButton>
      </Link>
    </>
  );
};
