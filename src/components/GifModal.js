import PropTypes from "prop-types"
import Box from "@mui/material/Box"
import Modal from "@mui/material/Modal"

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "auto",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
}

function GifModal(props) {
  const { image, open, handleClose } = props

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <img src={image} alt="gif from giphy" />
        </Box>
      </Modal>
    </div>
  )
}

GifModal.propTypes = {
  image: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
}

export default GifModal
