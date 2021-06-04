import {
  AppBar,
  Button,
  createStyles,
  Divider,
  FormControl,
  InputBase,
  InputLabel,
  List,
  ListSubheader,
  makeStyles,
  MenuItem,
  Paper,
  Select,
  TextField,
  Theme,
  Toolbar,
  Typography,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import SaveIcon from "@material-ui/icons/Save";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { ModulesContext } from "../../utils/context";
import { FontKey, ParagraphKey } from "../../utils/enity";
import { Style } from "../../utils/tree";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    divider: {
      marginTop: theme.spacing(4),
      marginBottom: theme.spacing(2),
    },
    button: {
      margin: theme.spacing(1),
    },
    newStyleBtn: {
      position: "fixed",
      bottom: 50,
      right: 50,
    },
    root: {
      padding: "2px 4px",
      display: "flex",
      alignItems: "center",
      width: 200,
      position: "fixed",
      right: 50,
      bottom: 50,
    },
    input: {
      minWidth: 120,
      marginLeft: theme.spacing(1),
      flex: 1,
    },
    iconButton: {
      padding: 10,
    },
  })
);

export const StylePanel = () => {
  const { modules, dispatch } = useContext(ModulesContext);
  const { modulePath, stylePath } =
    useParams<{ modulePath: string; stylePath: string }>();
  const [styles, setStyles] = useState<Style[]>([]);
  const [newStyleId, setNewStyleId] = useState("");
  const classes = useStyles();
  const [styPath, setStyPath] = useState("");

  useEffect(() => {
    setStyPath(stylePath);
  }, []);

  useEffect(() => {
    const module = modules.find((el) => el.path === modulePath);
    if (module) {
      const styles = module.styles.find((sty) => sty.path === styPath);
      if (styles) setStyles(styles.styles);
    }
  }, [modules, modulePath, styPath]);

  const handleChange = (
    e: React.ChangeEvent<{ value: unknown }>,
    type: string,
    styleIdx: number
  ) => {
    const copy = Array.from(styles);
    switch (type) {
      case "path":
        setStyPath(e.target.value as string);
        saveAll();
        break;
      case "id":
        copy[styleIdx].id = e.target.value as string;
        setStyles(copy);
        saveAll();
        break;
      default:
        const names = type.split("-");
        switch (names[0]) {
          case "f":
            const t1 = names[1] as FontKey;
            const fs = copy[styleIdx].fontStyles;
            if (typeof fs === "undefined") {
              Object.defineProperty(copy[styleIdx], "fontStyles", {
                value: {},
                writable: true,
                configurable: true,
                enumerable: true,
              });
            }
            const val1 = ["bold", "italic"].includes(t1)
              ? Boolean(e.target.value)
              : ["size", "spacing"].includes(t1)
              ? Number(e.target.value)
              : e.target.value;
            Object.defineProperty(copy[styleIdx].fontStyles, t1, {
              value: val1,
              writable: true,
              configurable: true,
              enumerable: true,
            });
            setStyles(copy);
            saveAll();
            break;
          case "p":
            const t2 = names[1] as ParagraphKey;
            const ps = copy[styleIdx].paragraphStyles;
            if (typeof ps === "undefined") {
              Object.defineProperty(copy[styleIdx], "paragraphStyles", {
                value: {},
                writable: true,
                configurable: true,
                enumerable: true,
              });
            }
            const val2 = ["alignment"].includes(t2)
              ? e.target.value
              : Number(e.target.value);
            Object.defineProperty(copy[styleIdx].paragraphStyles, t2, {
              value: val2,
              writable: true,
              configurable: true,
              enumerable: true,
            });
            setStyles(copy);
            saveAll();
            break;
        }
        break;
    }
  };

  const deleteStyle = (styleIndex: number) => {
    dispatch({
      type: "del_style",
      modulePath: modulePath,
      stylePath: stylePath,
      styleIndex: styleIndex,
    });
  };

  const newEmptyStyle = () => {
    dispatch({
      type: "new_style",
      modulePath,
      stylePath: stylePath,
      newStyleId: newStyleId,
    });
    setNewStyleId("");
  };

  const saveAll = () => {
    dispatch({
      type: "style",
      modulePath: modulePath,
      newStyle: { path: styPath, styles: styles },
    });
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">{`${modulePath}/${stylePath}`}</Typography>
        </Toolbar>
      </AppBar>

      <TextField
        label="Style file path"
        variant="outlined"
        value={styPath}
        onChange={(e) => handleChange(e, "path", -1)}
        className={classes.formControl}
      />
      <SaveIcon
        onClick={() =>
          dispatch({
            type: "style_path",
            modulePath: modulePath,
            oldPath: stylePath,
            newPath: styPath,
          })
        }
      />
      <Divider className={classes.divider} />
      {styles.map((sty, styIdx) => {
        return (
          <>
            <div key={styIdx}>
              <TextField
                label="Style id"
                variant="outlined"
                value={sty.id}
                onChange={(e) => handleChange(e, "id", styIdx)}
                className={classes.formControl}
              />
              <Button
                variant="contained"
                color="secondary"
                className={classes.button}
                startIcon={<DeleteIcon />}
                onClick={() => deleteStyle(styIdx)}
              >
                Delete
              </Button>
              <List
                component="nav"
                aria-labelledby="nested-list-subheader"
                subheader={
                  <ListSubheader component="div">Font Style</ListSubheader>
                }
              >
                <TextField
                  required
                  label="Font family"
                  defaultValue="Arial"
                  variant="outlined"
                  value={sty.fontStyles?.fontFamily ?? ""}
                  onChange={(e) => handleChange(e, "f-fontFamily", styIdx)}
                  className={classes.formControl}
                />
                <FormControl variant="filled" className={classes.formControl}>
                  <InputLabel>Bold</InputLabel>
                  <Select
                    labelId="demo-simple-select-filled-label"
                    value={sty.fontStyles?.bold ?? false}
                    onChange={(e) => handleChange(e, "f-bold", styIdx)}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={"true"}>true</MenuItem>
                    <MenuItem value={"false"}>false</MenuItem>
                  </Select>
                </FormControl>
                <FormControl variant="filled" className={classes.formControl}>
                  <InputLabel>Italic</InputLabel>
                  <Select
                    labelId="demo-simple-select-filled-label"
                    value={sty.fontStyles?.italic ?? false}
                    onChange={(e) => handleChange(e, "f-italic", styIdx)}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={"true"}>true</MenuItem>
                    <MenuItem value={"false"}>false</MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  label="Font size"
                  type="number"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="outlined"
                  value={sty.fontStyles?.size ?? ""}
                  onChange={(e) => handleChange(e, "f-size", styIdx)}
                  className={classes.formControl}
                />
                <TextField
                  label="Spacing"
                  type="number"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="outlined"
                  value={sty.fontStyles?.spacing ?? ""}
                  onChange={(e) => handleChange(e, "f-spacing", styIdx)}
                  className={classes.formControl}
                />
                <TextField
                  label="Color"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="outlined"
                  value={sty.fontStyles?.textColor ?? ""}
                  onChange={(e) => handleChange(e, "f-textColor", styIdx)}
                  className={classes.formControl}
                />
              </List>
              <List
                component="nav"
                aria-labelledby="nested-list-subheader"
                subheader={
                  <ListSubheader component="div">Paragraph Style</ListSubheader>
                }
              >
                <FormControl variant="filled" className={classes.formControl}>
                  <InputLabel>Alignment</InputLabel>
                  <Select
                    labelId="demo-simple-select-filled-label"
                    value={sty.paragraphStyles?.alignment ?? "justify"}
                    onChange={(e) => handleChange(e, "p-alignment", styIdx)}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {[
                      "justify",
                      "center",
                      "left",
                      "right",
                      "distribute",
                      "thai",
                      "hi",
                      "low",
                      "med",
                    ].map((al) => {
                      return <MenuItem value={al}>{al}</MenuItem>;
                    })}
                  </Select>
                </FormControl>
                <TextField
                  label="Text intent"
                  type="number"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="outlined"
                  value={sty.paragraphStyles?.textIntent}
                  onChange={(e) => handleChange(e, "p-textIntent", styIdx)}
                  className={classes.formControl}
                />
                <TextField
                  label="Line spacing"
                  type="number"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="outlined"
                  value={sty.paragraphStyles?.lineSpacing}
                  onChange={(e) => handleChange(e, "p-lineSpacing", styIdx)}
                  className={classes.formControl}
                />
                <TextField
                  label="Before paragraph"
                  type="number"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="outlined"
                  value={sty.paragraphStyles?.lineUnitBefore}
                  onChange={(e) => handleChange(e, "p-lineUnitBefore", styIdx)}
                  className={classes.formControl}
                />
                <TextField
                  label="After paragraph"
                  type="number"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="outlined"
                  value={sty.paragraphStyles?.lineUnitAfter}
                  onChange={(e) => handleChange(e, "p-lineUnitAfter", styIdx)}
                  className={classes.formControl}
                />
              </List>
              <Divider light variant="middle" className={classes.divider} />
            </div>
          </>
        );
      })}
      <Paper component="form" className={classes.root}>
        <InputBase
          className={classes.input}
          placeholder="New empty style"
          inputProps={{ "aria-label": "new empty style" }}
          onChange={(e) => setNewStyleId(e.target.value)}
          value={newStyleId}
        />
        <Button
          variant="contained"
          color="primary"
          size="small"
          className={classes.button}
          startIcon={<SaveIcon />}
          onClick={newEmptyStyle}
        >
          New
        </Button>
      </Paper>
    </>
  );
};
