import { Button, TextField } from "@material-ui/core";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { ModulesContext } from "../../utils/context";
import { ModuleContents } from "../../utils/tree";

export const ContentPanel = () => {
  const { modulePath } =
    useParams<{ modulePath: string }>();

  const { modules, dispatch } = useContext(ModulesContext);

  const [contents, setContents] = useState<ModuleContents[]>([]);

  useEffect(() => {
    const module = modules.find((el) => el.path === modulePath);
    if (module) setContents(module.contents);
  }, [modules]);

  const handleDocPathChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    contentIndex: number,
    fileIdx: number
  ) => {
    const copy = Array.from(contents);
    copy[contentIndex].files[fileIdx].path = e.target.value;
    setContents(copy);
  };

  const handleContentChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    contentIndex: number,
    fileIdx: number
  ) => {
    const copy = Array.from(contents);
    copy[contentIndex].files[fileIdx].content = e.target.value;
    setContents(copy);
  };

  const handleStyleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    contentIndex: number,
    styleIndex: number
  ) => {
    const copy = Array.from(contents);
    copy[contentIndex].styles[styleIndex] = e.target.value;
    setContents(copy);
  };

  const save = () => {
    dispatch({
      type: "contents",
      modulePath: modulePath,
      contents: contents,
    });
  };

  return (
    <>
      {contents?.map((con, contIdx) => {
        return (
          <div>
            <div>{con.path}</div>
            <div>{con.id}</div>
            <div>
              {con.files.map((file, fileIdx) => {
                return (
                  <div>
                    <TextField
                      label="Doc path"
                      variant="outlined"
                      onChange={(e) => handleDocPathChange(e, contIdx, fileIdx)}
                      value={file.path}
                    />
                    <TextField
                      label="Content"
                      variant="outlined"
                      onChange={(e) => handleContentChange(e, contIdx, fileIdx)}
                      value={file.content}
                    />
                  </div>
                );
              })}
            </div>
            <div>
              {con.styles.map((el, styleIdx) => {
                return (
                  <TextField
                    label={"Style" + styleIdx}
                    variant="outlined"
                    onChange={(e) => handleStyleChange(e, contIdx, styleIdx)}
                    value={el}
                  />
                );
              })}
            </div>
          </div>
        );
      })}
      <Button variant="contained" color="primary" onClick={save}>
        Save
      </Button>
    </>
  );
};
