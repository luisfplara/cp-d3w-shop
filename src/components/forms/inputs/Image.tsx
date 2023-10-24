import { Media } from "@models/models";
import { useEffect, useState } from "react";

import SortableList, { SortableItem } from "react-easy-sort";
import { arrayMoveImmutable } from "array-move";

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
  onChangeImage?(value: any): any;
  imagesList?: (Media | undefined)[];
  required:boolean
}

export const InputImages = ({
  label = "",
  defaultValue,
  onChangeImage = () => {},
  imagesList,
  required
}: inputTexrProps) => {

  useEffect(() => {
   
    if (defaultValue) {

      defaultValue.map((input) => {
        onChangeImage((prevImages: [Media]) =>
          prevImages
            ? [...prevImages, { url: input.url }]
            : [{ url: input.url }]
        );
      });
    }
  }, [defaultValue]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChangeImage([]);
    if (event.target.files) {
      Array.from(event.target.files).map((item, index) => {
        onChangeImage((prevImages: [Media]) =>
          prevImages
            ? [...prevImages, { file: item, url: URL.createObjectURL(item) }]
            : [{ file: item, url: URL.createObjectURL(item) }]
        );
      });

    }
  };

  const onSortEnd = (oldIndex: number, newIndex: number) => {
    onChangeImage((array: any) =>
      arrayMoveImmutable(array, oldIndex, newIndex)
    );
  };
  //name={`${label}Input`}
  return (
    <Col>
      <Form.Group controlId="formFileMultiple" className="mb-3">
        <Form.Label>{label}</Form.Label>
        <Form.Control
          required={required}
          type="file"
          multiple
          onChange={handleImageChange}
        />
        <Form.Control.Feedback type="invalid">
          <span>Add at least one image for your product</span>
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="formFileMultiple" className="mb-3">
        <SortableList
          onSortEnd={onSortEnd}
          className="list"
          draggedItemClassName="dragged"
          style={{
            userSelect: "none",
            display: "flex",
            justifyContent: "flex-start",
          }}
        >
          {imagesList
            ? imagesList.map((item, index) => (
                <SortableItem key={index}>
                  <Image
                    height="100px"
                    width="100px"
                    src={item?.url}
                    rounded
                    draggable={false}
                  />
                </SortableItem>
              ))
            : ""}
        </SortableList>
      </Form.Group>
    </Col>
  );
};

/*


<Col>
      <Form.Group controlId="formFileMultiple" className="mb-3">
        <Form.Label>{label}</Form.Label>
        <Form.Control
          required
          type="file"
          name={`${label}Input`}
          multiple
          onChange={handleImageChange}
        />
        <Form.Control.Feedback type="invalid">
          <span>Add at least one image for your product</span>
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="formFileMultiple" className="mb-3">
        <Row className="align-items-center">
          {images
            ? images.map((productImage, index) => (
                <Col md="auto" key={index}>
                  <Image
                    height="100px"
                    width="100px"
                    src={productImage?.image.url}
                    rounded
                  />
                  <div className="d-flex align-items-center justify-content-center">
                    <DropdownButton
                      className="align-items-center justify-content-center"
                      variant="outline-secondary"
                      title="Order"
                      id="input-group-dropdown-1"
                    >
                      <Dropdown.Item>1</Dropdown.Item>
                      <Dropdown.Item>2</Dropdown.Item>
                    </DropdownButton>
                  </div>
                  
                </Col>
              ))
            : ""}
        </Row>
      </Form.Group>
    </Col>
*/
