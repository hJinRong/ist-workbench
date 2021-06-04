import {
  Button,
  createStyles,
  Divider,
  List,
  ListItem,
  ListSubheader,
  makeStyles,
  Paper,
  TextField,
  Theme,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import SaveIcon from "@material-ui/icons/Save";
import AddIcon from "@material-ui/icons/Add";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { ModulesContext } from "../../utils/context";
import { ContentFile, ModuleContents } from "../../utils/tree";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    input: {
      margin: theme.spacing(1),
    },
    textarea: {
      width: 400,
      height: 100,
    },
    root: {
      padding: "2px 4px",
      display: "flex",
      alignItems: "center",
      position: "fixed",
      right: 50,
      bottom: 50,
    },
  })
);

export const ContentPanel = () => {
  const classes = useStyles();
  const { modulePath, contentPath } =
    useParams<{ modulePath: string; contentPath: string }>();

  const { modules, dispatch } = useContext(ModulesContext);

  const [path, setPath] = useState("");
  const [tmpPath, setTmpPath] = useState("");
  const [files, setFiles] = useState<ContentFile[]>([]);
  const [styles, setStyles] = useState<string[]>([]);

  const [tmpFilePath, setTmpFilePath] = useState("");
  const [tmpFileContent, setTmpFileContent] = useState("");

  useEffect(() => {
    setPath(contentPath);
    setTmpPath(contentPath);
  }, []);

  useEffect(() => {
    const module = modules.find((el) => el.path === modulePath);
    if (module) {
      const cont = module.contents.find((el) => el.path === contentPath);
      if (cont) {
        setFiles(cont.files);
        setStyles(cont.styles);
      }
    }
  }, [modules]);

  const [newStyleId, setNewStyleId] = useState("");

  const saveAll = () => {
    dispatch({
      type: "content",
      modulePath: modulePath,
      oldPath: path,
      newContent: {
        path: tmpPath,
        id: "",
        files: files,
        styles: styles,
      },
    });
    setPath(tmpPath);
    setTmpPath("");
  };

  return (
    <>
      <TextField
        label="Content file path"
        variant="outlined"
        value={tmpPath.length > 0 ? tmpPath : path}
        onChange={(e) => setTmpPath(e.target.value)}
        className={classes.input}
      />
      {files.map((file, fileIdx) => {
        return (
          <>
            <ListItem key={fileIdx}>
              <TextField
                value={file.path}
                className={classes.input}
                onChange={(e) => {
                  const copy = Array.from(files);
                  copy[fileIdx].path = e.target.value;
                  setFiles(copy);
                }}
              />
              <textarea
                value={file.content}
                onChange={(e) => {
                  const copy = Array.from(files);
                  copy[fileIdx].content = e.target.value;
                  setFiles(copy);
                }}
                className={[classes.input, classes.textarea].join(" ")}
              ></textarea>
              <Button
                variant="contained"
                color="secondary"
                size="small"
                onClick={() => {
                  const copy = Array.from(files);
                  copy.splice(fileIdx, 1);
                  setFiles(copy);
                }}
                startIcon={<DeleteIcon />}
              >
                DELETE
              </Button>
            </ListItem>
          </>
        );
      })}
      <ListItem key={files.length}>
        <TextField
          value={tmpFilePath}
          className={classes.input}
          onChange={(e) => {
            setTmpFilePath(e.target.value);
          }}
        />
        <textarea
          value={tmpFileContent}
          onChange={(e) => {
            setTmpFileContent(e.target.value);
          }}
          className={[classes.input, classes.textarea].join(" ")}
        ></textarea>
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={() => {
            setFiles([
              ...files,
              { path: tmpFilePath, content: tmpFileContent },
            ]);
            setTmpFilePath("");
            setTmpFileContent("");
          }}
          startIcon={<AddIcon />}
        >
          Add
        </Button>
      </ListItem>
      <Divider />
      <List
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={<ListSubheader component="div">Styles</ListSubheader>}
      >
        {styles.map((style, styIdx) => {
          return (
            <>
              <ListItem key={styIdx}>
                <TextField
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={style}
                  onChange={(e) => {
                    const copy = Array.from(styles);
                    copy[styIdx] = e.target.value;
                    setStyles(copy);
                  }}
                />
                <Button
                  variant="contained"
                  color="secondary"
                  size="small"
                  onClick={() => {
                    const copy = Array.from(styles);
                    copy.splice(styIdx, 1);
                    setStyles(copy);
                  }}
                  startIcon={<DeleteIcon />}
                >
                  DELETE
                </Button>
              </ListItem>
            </>
          );
        })}
        <ListItem key={styles.length}>
          <TextField
            value={newStyleId}
            onChange={(e) => setNewStyleId(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={() => {
              setStyles([...styles, newStyleId]);
              setNewStyleId("");
            }}
            startIcon={<SaveIcon />}
          >
            NEW
          </Button>
        </ListItem>
      </List>
      <Paper component="form" className={classes.root}>
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={saveAll}
          startIcon={<SaveIcon />}
        >
          Save
        </Button>
      </Paper>
    </>
  );
};
