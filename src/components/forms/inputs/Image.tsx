import { useState } from "react";
import { Col, Form, Image, Row } from "react-bootstrap";

interface inputTexrProps {
  label: string;
  setFileList(value: any): any;
}

export const InputImages = ({
  label = "",
  setFileList = () => {},
}: inputTexrProps) => {
  //const [imagesFiles, setImagesFiles] = useState<FileList>();
  const [imagetURL, setImagetURL] = useState(Array<string>());

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFileList(event.target.files);

      let listFiles = Array<string>();

      Array.from(event.target.files).map((item) => {
        listFiles.push(URL.createObjectURL(item));
      });

      setImagetURL(listFiles);
    }
  };

  return (
    <Col>
      <Form.Group  controlId="formFileMultiple"  className="mb-3">
    
          <Form.Label>{label}</Form.Label>
          <Form.Control
            required
            type="file"
            multiple
            name={`${label}Input`}
            onChange={handleImageChange}
          />
          <Form.Control.Feedback type="invalid">
            <span>Add at least one image for your product</span>
          </Form.Control.Feedback>
     
      </Form.Group>
      <Form.Group controlId="formFileMultiple"  className="mb-3">
        <Row className="align-items-center mx-20">
          {imagetURL.length > 0
            ? imagetURL.map((image, index) => (
                <Col md="auto" key={index}  className="mx-20">
                  <Image height="100px" width="100px" src={image} rounded />
                </Col>
              ))
            : ""}
        </Row>
      </Form.Group>
    </Col>
  );
};
