import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { CopyToClipboard } from "react-copy-to-clipboard";

const codeContainerStyle = {
  position: "relative",
};

const codeBlockHeaderStyle = {
  display: "flex",
  alignItems: "center",
  background: "#555555",
  color: "#fff",
  padding: "0.5rem 1rem",
  borderTopLeftRadius: "0.25rem",
  borderTopRightRadius: "0.25rem",
  fontSize: "0.8rem",
};

const codeBlockLanguageStyle = {
  flex: "1",
  textTransform: "capitalize",
};

const codeBlockCopyButtonStyle = {
  border: "none",
  background: "#333333",
  color: "white",
  padding: "0.25rem 0.5rem",
  fontSize: "0.8rem",
  borderRadius: "0.25rem",
  cursor: "pointer",
  marginLeft: "0.5rem",
};

export default function RenderCodeBlock({ language, value }) {
  const [copied, setCopied] = useState(false);

  return (
    <div style={codeContainerStyle}>
      <div style={codeBlockHeaderStyle}>
        <span style={codeBlockLanguageStyle}>{language}</span>
        <CopyToClipboard text={value}>
          <button
            style={codeBlockCopyButtonStyle}
            onClick={() => {
              setCopied(true);
              setTimeout(() => setCopied(false), 2000);
            }}
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        </CopyToClipboard>
      </div>
      <div style={{ marginTop: "-10px" }}>
        <SyntaxHighlighter
          language={language}
          style={materialDark}
          PreTag="div"
        >
          {value}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}
