import {
  AppBar,
  Button,
  createStyles,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  makeStyles,
  Theme,
  Toolbar,
  Typography,
} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import ArchiveIcon from "@material-ui/icons/Archive";
import StyleIcon from "@material-ui/icons/Style";
import TextFieldsIcon from "@material-ui/icons/TextFields";
import { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { ModulesContext } from "../../utils/context";
import { generateZip } from "../../utils/generate-zip";
import "./ModulePanel.css";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    genButton: {
      position: "fixed",
      bottom: 50,
      right: 50,
    },
  })
);

export const ModulePanel = () => {
  const classes = useStyles();
  const textfieldRef = useRef(null);
  const [disable, setDisable] = useState(true);
  const [input, setInput] = useState<string>("");
  const [styles, setStyles] = useState<string[]>([]);
  const [contents, setContents] = useState<string[]>([]);
  const { modules, dispatch } = useContext(ModulesContext);

  const { modulePath } = useParams<{ modulePath: string }>();

  useEffect(() => {
    const module = modules.find((module) => module.path === modulePath);
    if (module) {
      setStyles(module.styles.map((m) => m.path));
      setContents(module.contents.map((c) => c.path));
    }
  }, [modules, modulePath]);

  useEffect(() => {
    setDisable(input.length <= 0);
  }, [input]);

  const setStyleOrContent = (type: string) => {
    const filename = input.endsWith(".yaml") ? input : `${input}.yaml`;
    if (type === "style") {
      setStyles([...styles, filename]);
      dispatch({
        type: "style",
        modulePath: modulePath,
        newStyle: {
          path: filename,
          styles: [],
        },
      });
    } else {
      setContents([...contents, filename]);
      dispatch({
        type: "new_content",
        modulePath: modulePath,
        newContent: {
          path: filename,
          id: input,
          files: [],
          styles: [],
        },
      });
    }
    setInput("");
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">{`${modulePath}/module.yaml`}</Typography>
        </Toolbar>
      </AppBar>

      <Grid container direction="column" className="content-part">
        <Grid container direction="row" justify="center" alignItems="center">
          <TextField
            ref={textfieldRef}
            id="outlined-multiline-flexible"
            error={disable}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            label="New"
            variant="outlined"
            helperText="New style config or content config"
          />
          <IconButton
            type="submit"
            disabled={disable}
            onClick={() => setStyleOrContent("style")}
          >
            <StyleIcon />
          </IconButton>
          <Divider orientation="vertical" flexItem />
          <IconButton
            type="submit"
            disabled={disable}
            onClick={() => setStyleOrContent("content")}
          >
            <TextFieldsIcon />
          </IconButton>
        </Grid>

        <div className="list-part">
          <Grid
            direction="row"
            justify="center"
            alignItems="flex-start"
            container
            spacing={3}
          >
            <Grid item xs={3}>
              <List
                subheader={
                  <ListSubheader component="div" id="nested-list-subheader">
                    Styles
                  </ListSubheader>
                }
              >
                {styles.map((val, idx) => {
                  return (
                    <Link to={`/project/${modulePath}/style/${val}`} key={idx}>
                      <ListItem button>
                        <ListItemText primary={val} />
                      </ListItem>
                    </Link>
                  );
                })}
              </List>
            </Grid>
            <Divider orientation="vertical" flexItem />
            <Grid item xs={3}>
              <List
                subheader={
                  <ListSubheader component="div" id="nested-list-subheader">
                    Contents
                  </ListSubheader>
                }
              >
                {contents.map((val, idx) => {
                  return (
                    <Link
                      to={`/project/${modulePath}/content/${val}`}
                      key={idx}
                    >
                      <ListItem button>
                        <ListItemText primary={val} />
                      </ListItem>
                    </Link>
                  );
                })}
              </List>
            </Grid>
          </Grid>
        </div>
      </Grid>
      <Button
        variant="contained"
        color="primary"
        size="small"
        className={classes.genButton}
        startIcon={<ArchiveIcon />}
        onClick={() => {
          generateZip(modules);
        }}
      >
        Archive
      </Button>
    </>
  );
};
