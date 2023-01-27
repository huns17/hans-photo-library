import { useState } from "react";
import ProgressBar from "../ProgressBar";

const UploadForm = () => {
  const [file, setFile] = useState<any>(null);
  const [error, setError] = useState<any>(null);
  const imageChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    let selected = e?.target?.files[0];
    if (selected) {
      setFile(selected);
    }
  };

  return (
    <form>
      <label>
        <input type="file" accept="image/*" onChange={imageChangeHandler} />
        <span>+</span>
      </label>
      <div className="output">
        {error && <div className="error">{error}</div>}
        {file && <div>{file?.name}</div>}
        {file && <ProgressBar file={file} setFile={setFile} />}
      </div>
    </form>
  );
};

export default UploadForm;
