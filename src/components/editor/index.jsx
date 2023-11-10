import {
  BlockNoteView,
  useBlockNote,
  lightDefaultTheme,
} from "@blocknote/react";
import "@blocknote/core/style.css";

const theme = {
  ...lightDefaultTheme,
  componentStyles: () => ({
    Editor: {
      "._bnRoot_12je0_19": {
        paddingInline: "0px",
      },
    },
  }),
};

export function Editor({ config, onChange }) {
  const saveBlock = (editor) => {
    const e = {
      target: {
        value: JSON.stringify(editor.topLevelBlocks),
      },
    };

    if (onChange) onChange(e);
  };

  const editor = useBlockNote({
    onEditorContentChange: saveBlock,
    ...config,
  });

  return <BlockNoteView editor={editor} theme={theme} />;
}
