import CircularProgress from "@mui/material/CircularProgress"
import Box from "@mui/material/Box"

function LoadingScreen() {
  return (
    <Box
      sx={{
        bgcolor: "#DBDFFD",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <CircularProgress sx={{ zIndex: "5" }} />
    </Box>
  )
}

export default LoadingScreen
