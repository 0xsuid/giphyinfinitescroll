import PropTypes from "prop-types"
import Paper from "@mui/material/Paper"
import InputBase from "@mui/material/InputBase"
import Divider from "@mui/material/Divider"
import IconButton from "@mui/material/IconButton"
import SearchIcon from "@mui/icons-material/Search"

function SearchBar(props) {
  const { value, onChange } = props

  return (
    <Paper
      sx={{
        p: "2px 4px",
        display: "flex",
        alignItems: "center",
        width: "100%",
        marginTop: "20px",
      }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        value={value}
        onChange={onChange}
        placeholder="Search Giphy"
        inputProps={{ "aria-label": "search on Giphy" }}
      />
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <IconButton
        type="button"
        sx={{ p: "10px" }}
        aria-label="search"
        onChange={onChange}
      >
        <SearchIcon />
      </IconButton>
    </Paper>
  )
}

SearchBar.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default SearchBar
