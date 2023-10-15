import {
  BlockNoteView,
  useBlockNote,
  lightDefaultTheme,
} from "@blocknote/react";
import "@blocknote/core/style.css";
import { initialContent } from "@/constants/editor-content";

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

export default function Editor({ config, onChange }) {
  const saveBlock = (editor) => {
    const e = {
      target: {
        value: JSON.stringify(editor.topLevelBlocks),
      },
    };
    onChange(e);
  };

  const editor = useBlockNote({
    onEditorContentChange: saveBlock,
    initialContent: initialContent,
    ...config,
  });

  return <BlockNoteView editor={editor} theme={theme} />;
}
