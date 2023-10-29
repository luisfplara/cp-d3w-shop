import { Media } from "@models/models"
import { useEffect } from "react"
import SortableList, { SortableItem } from "react-easy-sort"
import { arrayMoveImmutable } from "array-move"
import { Col, Form, Image } from "react-bootstrap"

interface InputTexrProps {
  label: string
  defaultValue?: [Media]
  onChangeImage?(
    callback: (prevState: (Media | undefined)[]) => (Media | undefined)[]
  ): void
  imagesList?: (Media | undefined)[]
  required: boolean
}

const InputImages = ({
  label = "",
  defaultValue,
  onChangeImage = () => [],
  imagesList,
  required
}: InputTexrProps) => {
  useEffect(() => {
    if (defaultValue) {
      defaultValue.map((input) =>
        onChangeImage((prevImages: (Media | undefined)[]) =>
          prevImages
            ? [...prevImages, { url: input.url }]
            : [{ url: input.url }]
        )
      )
    }
  }, [defaultValue, onChangeImage])

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      onChangeImage(() => [])
      Array.from(event.target.files).map((item) =>
        onChangeImage((prevImages: (Media | undefined)[]) =>
          prevImages
            ? [...prevImages, { file: item, url: URL.createObjectURL(item) }]
            : [{ file: item, url: URL.createObjectURL(item) }]
        )
      )
    }
  }

  const onSortEnd = (oldIndex: number, newIndex: number) => {
    onChangeImage((array: (Media | undefined)[]) =>
      arrayMoveImmutable(array, oldIndex, newIndex)
    )
  }
  console.log("imagesList", imagesList)
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
        {imagesList?.length !== 0 ? "Drag and drop to select the order" : ""}
        <SortableList
          onSortEnd={onSortEnd}
          className="list"
          draggedItemClassName="dragged"
          style={{
            userSelect: "none",
            display: "flex",
            justifyContent: "flex-start"
          }}
        >
          {imagesList
            ? imagesList.map((item, index) => (
                // eslint-disable-next-line react/no-array-index-key
                <SortableItem key={String(index)}>
                  <Image
                    alt={item?.url}
                    height="100px"
                    width="100px"
                    src={item?.url}
                    rounded
                    draggable={false}
                    className="mx-10"
                  />
                </SortableItem>
              ))
            : ""}
        </SortableList>
      </Form.Group>
    </Col>
  )
}

export default InputImages
