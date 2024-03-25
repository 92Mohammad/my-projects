import "../css/editor.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function Editor({content, handleChange}) {

  return (
    <>
      <div className="editor-container">
        <ReactQuill
          className="editor"        
          value={content}
          onChange={(value) => handleChange(value)}
          modules={{
            toolbar: [
              [{ header: [1, 2, false] }],
              ["bold", "italic", "underline", "strike", "blockquote"],
              [{ list: "ordered" }, { list: "bullet" }],
              ["link", "image"],
              ["clean"],
            ],
          }}
          formats={[
            "header",
            "bold",
            "italic",
            "underline",
            "strike",
            "blockquote",
            "list",
            "bullet",
            "link",
            "image",
          ]}
        />
      </div>
    </>
  );
}
