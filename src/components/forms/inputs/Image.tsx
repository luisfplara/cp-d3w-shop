import { Media } from "@models/models";
import { useEffect, useState } from "react";
import {
  Col,
  Dropdown,
  DropdownButton,
  Form,
  Image,
  Row,
} from "react-bootstrap";

interface inputTexrProps {
  label: string;
  defaultValue?: [Media];
}

export const InputImages = ({ label = "", defaultValue }: inputTexrProps) => {
  //const [imagesFiles, setImagesFiles] = useState<FileList>();
  const [imagetURL, setImagetURL] = useState(Array<string>());

  useEffect(() => {
    if (defaultValue) {
      let listFiles = Array<string>();
      defaultValue.map((image) => {
        if (image.url) listFiles.push(image.url);
      });
      setImagetURL(listFiles);
    }
  },[defaultValue]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      let listFiles = Array<string>();

      Array.from(event.target.files).map((item) => {
        listFiles.push(URL.createObjectURL(item));
      });

      setImagetURL(listFiles);
    }
  };

  return (
    <Col>
      <Form.Group controlId="formFileMultiple" className="mb-3">
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
      <Form.Group controlId="formFileMultiple" className="mb-3">
        <Row className="align-items-center">
          {imagetURL.length > 0
            ? imagetURL.map((image, index) => (
                <Col md="auto" key={index}>
                  <Image height="100px" width="100px" src={image} rounded />
                  <DropdownButton
                   className="align-items-center justify-content-center"
                    variant="outline-secondary"
                    title="Order"
                    id="input-group-dropdown-1"
                  >
                    <Dropdown.Item>1</Dropdown.Item>
                    <Dropdown.Item>2</Dropdown.Item>
                  </DropdownButton>
                </Col>
              ))
            : ""}
        </Row>
      </Form.Group>
    </Col>
  );
};
