import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  IconButton,
  Box,
  Divider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ImagePreview from "./ImagePreview";


const images = import.meta.glob('../assets/Images/*.(png|jpg|jpeg|svg|gif)', { eager: true });

// Convert to simpler object with just filenames as keys
const imageMap = {};
for (const path in images) {
  // Extract filename from path (e.g., "../assets/images/logo.png" -> "logo.png")
  const filename = path.split('/').pop();
  imageMap[filename] = images[path].default || images[path];
}
console.log(imageMap)

const getImage = (filename) => {
  return imageMap[filename] || null;
};
// const getImage = (filename) => `public\Images/images/${filename}`

// Or as an array
// const imageArray = importAll(require.context('./images', false, /\.(png|jpe?g|svg)$/));
export default function ArticleModal({open, article, onClose }) {

  const imageSrc = getImage(article?.filename);

  const [scale, setScale] = useState(1); // Zoom level
  const [rotation, setRotation] = useState(0); // Rotation angle in degrees

  // Zoom in
  const handleZoomIn = () => {
    setScale(prev => Math.min(prev + 0.1, 3)); // Cap at 3x
  };
  // Zoom out
  const handleZoomOut = () => {
    setScale(prev => Math.max(prev - 0.1, 0.5)); // Min at 0.5x
  };
  // Rotate clockwise
  const handleRotateRight = () => {
    setRotation(prev => (prev + 90) % 360);
  };
  // Rotate counter-clockwise
  const handleRotateLeft = () => {
    setRotation(prev => (prev - 90 + 360) % 360); // Ensures positive degrees
  };

  // Reset
  const handleReset = () => {
    setScale(1);
    setRotation(0);
  };

  const imageStyles = {
    transform: `scale(${scale}) rotate(${rotation}deg)`,
    transition: 'transform 0.3s ease',
    maxWidth: '100%',
    maxHeight: '100%',
    display: 'block',
    margin: '0 auto',
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="lg"
      sx={{
        "& .MuiDialog-paper": {
          borderRadius: "12px",
          maxHeight: "90vh",
          backgroundColor: (theme) =>
            theme.palette.mode === "dark" ? "#1E1E1E" : "#fff",
        },
      }}
    >
      {/* Header */}
      <Box
        sx={{
          position: "sticky",
          top: 0,
          zIndex: 10,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding:"10px 24px",
          borderBottom: "1px solid",
          borderColor: (theme) =>
            theme.palette.mode === "dark"
              ? "rgba(255,255,255,0.1)"
              : "#E5E5E5",
          bgcolor: (theme) =>
            theme.palette.mode === "dark" ? "#1E1E1E" : "#fff",
        }}
      >
        <DialogTitle
          sx={{
            flexGrow: 1,
            m: 0,
            fontWeight: "bold",
            fontSize: "22px",
            padding:"0px",
            color: (theme) => theme.palette.text.primary,
          }}
        >
          Article
        </DialogTitle>
        <IconButton
          onClick={onClose}
          aria-label="Close"
          // sx={{
          //   color: (theme) => theme.palette.text.primary,
          //   "&:hover": {
          //     bgcolor: (theme) =>
          //       theme.palette.mode === "dark"
          //         ? "rgba(255,255,255,0.1)"
          //         : "rgba(0,0,0,0.05)",
          //   },
          // }}
        >
          <CloseIcon />
        </IconButton>
      </Box>

      {/* Article Content */}
      <DialogContent
        sx={{
          px: 3,
          py: 2,
          overflowY: "auto",
          color: (theme) =>
            theme.palette.mode === "dark"
              ? "rgba(255,255,255,0.85)"
              : "rgba(0,0,0,0.8)",
        }}
      >
                <div style={{ display: "flex"}}>
        {/* Title */}

        <div style={{width:imageSrc?"63%" : "100%", height:"450px" , overflow:"auto"}}> 
        {/* Metadata */}
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mb: 1 }}>
          {article?.category && (
            <Typography
              variant="caption"
              sx={{
                fontWeight: 600,
                textTransform: "uppercase",
                color: (theme) =>
                  theme.palette.mode === "dark"
                    ? "rgba(255,255,255,0.6)"
                    : "rgba(0,0,0,0.6)",
              }}
            >
              {article?.category}
            </Typography>
          )}
          {article?.date && (
            <Typography
              variant="caption"
              sx={{
                color: (theme) =>
                  theme.palette.mode === "dark"
                    ? "rgba(255,255,255,0.5)"
                    : "rgba(0,0,0,0.5)",
              }}
            >
              {article.date}
            </Typography>
          )}
          {article?.author && (
            <Typography
              variant="caption"
              sx={{
                color: (theme) =>
                  theme.palette.mode === "dark"
                    ? "rgba(255,255,255,0.5)"
                    : "rgba(0,0,0,0.5)",
              }}
            >
              By {article?.author}
            </Typography>
          )}
        </Box>

        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            mb: 2,
            lineHeight: 1.2,
            color: (theme) => theme.palette.text.primary,
          }}
        >
          {article?.headline}
        </Typography>

        {/* Content */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {typeof article?.news === "string"
            ? article?.news
                .split("\n")
                .filter((p) => p.trim())
                .map((p, i) => (
                  <Typography key={i} variant="body1" paragraph>
                    {p}
                  </Typography>
                ))
            : Array.isArray(article?.news)
            ? article?.news.map((p, i) => (
                <Typography key={i} variant="body1" paragraph>
                  {p}
                </Typography>
              ))
            : (
              <Typography variant="body1">{article?.news}</Typography>
            )}
        </Box>

        {/* Footer */}
        {article?.source && (
          <>
            <Divider sx={{ mt: 4, mb: 2 }} />
            <Typography
              variant="caption"
              sx={{
                color: (theme) =>
                  theme.palette.mode === "dark"
                    ? "rgba(255,255,255,0.5)"
                    : "rgba(0,0,0,0.5)",
              }}
            >
              Source: {article?.source}
            </Typography>
          </>
        )}
        </div>

{imageSrc &&      <ImagePreview handleRotateLeft={handleRotateLeft} handleRotateRight={handleRotateRight} handleZoomIn={handleZoomIn} handleZoomOut={handleZoomOut} handleReset={handleReset} article={article} imageSrc={imageSrc} imageStyles={imageStyles}/>
}


      </div>
      </DialogContent>
    </Dialog>
  );
}

 