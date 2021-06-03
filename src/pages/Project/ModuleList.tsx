import {
  Collapse,
  createStyles,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  makeStyles,
  Theme,
} from "@material-ui/core";
import CategoryIcon from "@material-ui/icons/Category";
import DeleteIcon from "@material-ui/icons/Delete";
import FolderIcon from "@material-ui/icons/Folder";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { ModulesContext } from "../../utils/context";
import "./Project.css";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    nested: {
      paddingLeft: theme.spacing(4),
    },
  })
);

export const ModuleList = (props: {
  modulePath: string;
  moduleIndex: number;
}) => {

  const classes = useStyles()

  const { dispatch } = useContext(ModulesContext);

  const removeModule = (path: string, index: number) => {
    dispatch({
      type: "rm_module",
      modulePath: path,
      moduleIndex: index,
    });
  };
  return (
    <>
      <ListItem button>
        <ListItemIcon>
          <FolderIcon />
        </ListItemIcon>
        <ListItemText primary={props.modulePath} />
        <ListItemSecondaryAction>
          <IconButton
            edge="end"
            aria-label="delete"
            onClick={() => removeModule(props.modulePath, props.moduleIndex)}
          >
            <DeleteIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
      <Collapse in={true} timeout="auto" unmountOnExit>
        <List>
          <Link to={`/project/${props.modulePath}`}>
            <ListItem button className={classes.nested}>
              <ListItemIcon>
                <CategoryIcon />
              </ListItemIcon>
              <ListItemText primary={"module.yaml"} />
            </ListItem>
          </Link>
        </List>
      </Collapse>
    </>
  );
};
