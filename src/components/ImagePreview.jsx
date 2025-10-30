import {
    Close,
    ImageNotSupported,
    Rotate90DegreesCwOutlined,
    Add,
    Remove,
    Rotate90DegreesCcwOutlined,
    SettingsBackupRestoreOutlined,
  } from "@mui/icons-material";
  import {
    Button,
    CircularProgress,
    Divider,
    IconButton,
    Paper,
    styled,
    TextField,
    Tooltip,
  } from "@mui/material";import React from 'react'
  import "./ImagePreview.scss"

const ImagePreview = ({
    handleRotateLeft,handleRotateRight,handleZoomIn,handleZoomOut,handleReset, imageSrc, article, imageStyles
}) => {
    
  return (
    <Paper
      elevation={3}
      className="kyc-preview"
      style={{width: "30%", height:"450px" } }
    >
      <div className="image-zoom-area">
        <div className="zoom-control">
          <Divider
            orientation="vertical"
            flexItem
            className="zoom-div-divider"
          />
          <Tooltip title="Rotate anticlockwise">
            <IconButton onClick={() => handleRotateLeft()}>
              <Rotate90DegreesCcwOutlined className="theme-text-color" />
            </IconButton>
          </Tooltip>

          <Tooltip title="Rotate clockwise">
            <IconButton onClick={() => handleRotateRight()}>
              <Rotate90DegreesCwOutlined className="theme-text-color" />
            </IconButton>
          </Tooltip>

          <Divider
            orientation="vertical"
            flexItem
            className="zoom-div-divider"
          />
          <Tooltip title="Zoom out">
            <IconButton onClick={() => handleZoomOut()}>
              <Remove className="theme-text-color" />
            </IconButton>
          </Tooltip>

          <Tooltip title="Zoom in">
            <IconButton onClick={() => handleZoomIn()}>
              <Add className="theme-text-color" />
            </IconButton>
          </Tooltip>

          <Divider
            orientation="vertical"
            flexItem
            className="zoom-div-divider"
          />
          <Tooltip title="Reset zoom">
            <IconButton onClick={() => handleReset()}>
              <SettingsBackupRestoreOutlined className="theme-text-color" />
            </IconButton>
          </Tooltip>
        </div>
      </div>
      <Divider />
      <div className="polka-background" >
      <img 
          src={imageSrc} 
          alt={article?.filename || "image"} 
          style={imageStyles}
        />
      </div>
    </Paper>
  )
}

export default ImagePreview