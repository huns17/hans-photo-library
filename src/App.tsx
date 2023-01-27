import ImageGrid from "./components/ImageGrid";
import Title from "./components/Title";
import UploadForm from "./components/UploadForm";
import Snowfall from "react-snowfall";
import Modal from "./components/Modal";
import { useState } from "react";

function App() {
  const [selectedImg, setSelectedImg] = useState<string | null>(null);
  return (
    <div className="App">
      <Snowfall
        color="#E8E3E3"
        snowflakeCount={200}
        radius={[0.5, 3.0]}
        speed={[1.0, 3.0]}
        wind={[-0.5, 2.0]}
      />
      <Title />
      <UploadForm />
      <ImageGrid setSelectedImg={setSelectedImg} />
      {selectedImg && (
        <Modal selectedImg={selectedImg} setSelectedImg={setSelectedImg} />
      )}
    </div>
  );
}

export default App;
