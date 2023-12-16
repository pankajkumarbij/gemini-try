import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import RenderCodeBlock from "./renderCodeBlock";

const inlineCodeStyle = {
  background: "#eee",
  padding: "0.1rem 0.2rem",
  borderRadius: "0.25rem",
  fontSize: "0.9em",
};

export default function MarkdownViewer({ markdown }) {
  return (
    <div className="unreset">
      <ReactMarkdown
        rehypePlugins={[rehypeRaw]}
        remarkPlugins={[remarkGfm]}
        components={{
          blockquote: ({ children }) => (
            <blockquote
              style={{
                borderLeft: "7px solid #ccc",
                paddingLeft: "1rem",
                paddingRight: "1rem",
                paddingTop: "0.1rem",
                paddingBottom: "0.1rem",
                fontStyle: "italic",
                backgroundColor: "#eee",
                width: "100%",
                marginLeft: "0px",
              }}
            >
              {children}
            </blockquote>
          ),
          a: ({ href, children }) => (
            <a href={href} style={{ color: "blue" }}>
              {children}
            </a>
          ),
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || "");
            return !inline && match ? (
              RenderCodeBlock({ language: match[1], value: children })
            ) : (
              <code {...props} style={inlineCodeStyle} className={className}>
                {children}
              </code>
            );
          },
          table: ({ children }) => (
            <table style={{ borderCollapse: "collapse", width: "100%" }}>
              {children}
            </table>
          ),
          th: ({ children }) => (
            <th
              style={{
                border: "1px solid gray",
                backgroundColor: "#eee",
                padding: "0.5rem",
                textAlign: "left",
              }}
            >
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td
              style={{
                border: "1px solid gray",
                padding: "0.5rem",
                verticalAlign: "top",
              }}
            >
              {children}
            </td>
          ),
        }}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  );
}
