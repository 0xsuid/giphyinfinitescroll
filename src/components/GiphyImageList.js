/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState, Element } from "react"
import PropTypes from "prop-types"
import ImageList from "@mui/material/ImageList"
import ImageListItem from "@mui/material/ImageListItem"
import GifModal from "./GifModal"

function GiphyImageList(props) {
  const { itemData, innerRef } = props
  const [open, setOpen] = useState(false)
  const [modalImage, setmodalImage] = useState("")
  const handleClose = () => setOpen(false)

  const showModal = (e) => {
    setmodalImage(e.target.getAttribute("data-original"))
    setOpen(true)
  }

  return (
    <div className="GiphyImageList">
      <ImageList variant="woven" cols={3} gap={4} sx={{ overflowY: "hidden" }}>
        {itemData.map((item, idx, list) => (
          <ImageListItem
            key={item.id}
            ref={idx + 1 === list.length ? innerRef : null}
          >
            <img
              src={
                item.images.preview_webp
                  ? item.images.preview_webp.url
                  : item.images.original.url
              }
              data-original={item.images.original.url}
              onClick={showModal}
              alt={item.title}
              loading="lazy"
            />
          </ImageListItem>
        ))}
      </ImageList>

      <GifModal open={open} image={modalImage} handleClose={handleClose} />
    </div>
  )
}

GiphyImageList.propTypes = {
  itemData: PropTypes.instanceOf(Array).isRequired,
  innerRef: PropTypes.PropTypes.oneOfType([
    // Either a function
    PropTypes.func,
    // Or the instance of a DOM native element
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]).isRequired,
}

export default GiphyImageList
