import { Media, ProductImage } from "@models/models";
import { useEffect, useState } from "react";

import SortableList, { SortableItem } from 'react-easy-sort'
import { arrayMoveImmutable } from 'array-move'


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
  defaultValue?: [{ image: Media; order: number }];
}

export const InputImages = ({ label = "", defaultValue }: inputTexrProps) => {
  //const [imagesFiles, setImagesFiles] = useState<FileList>();
  const [images, setImages] = useState<(ProductImage | undefined)[]>();

  useEffect(() => {
    if (defaultValue) {
      defaultValue.map((input) => {
        setImages((prevImages) =>
          prevImages
            ? [...prevImages, { image: input.image, order: input.order }]
            : [{ image: input.image, order: input.order }]
        );
      });
    }
  }, [defaultValue]);
  //, {url:URL.createObjectURL(item), order:index}
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      Array.from(event.target.files).map((item, index) => {
        const media: Media = {
          _id: "local",
          url: URL.createObjectURL(item),
          local: true,
        };

        setImages((prevImages) =>
          prevImages
            ? [...prevImages, { image: media, order: index }]
            : [{ image: media, order: index }]
        );
      });

      // setImages(listFiles);
    }
  };
  //          name={`${label}Input`}

  const [items, setItems] = useState(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'])

  const onSortEnd = (oldIndex: number, newIndex: number) => {
    setItems((array) => arrayMoveImmutable(array, oldIndex, newIndex))
  }


  return (

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
  )
};



/*


    <SortableList onSortEnd={onSortEnd} className="list" style={{userSelect:"none", display:"flex", justifyContent:"flex-start"}} draggedItemClassName="dragged">
      {items.map((item) => (
        <SortableItem key={item}>

          <div className="item">{item}</div>
          
        </SortableItem>
      ))}
    </SortableList>
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