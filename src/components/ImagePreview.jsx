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

  const zoomIn = () => {
    var image = document.getElementById("docImage");
    var currWidth = image.clientWidth;
    image.style.width = currWidth + 50 + "px";
  };
   const zoomOut = () => {
    var image = document.getElementById("docImage");
    var currWidth = image.clientWidth;
    image.style.width = currWidth - 50 + "px";
  };



  return (
    // <Paper
    //   elevation={3}
    //   className="kyc-preview"
    //   style={{width: "30%", height:"450px" } }
    // >
    //   <div className="image-zoom-area">
    //     <div className="zoom-control">
    //       <Divider
    //         orientation="vertical"
    //         flexItem
    //         className="zoom-div-divider"
    //       />
    //       <Tooltip title="Rotate anticlockwise">
    //         <IconButton onClick={() => handleRotateLeft()}>
    //           <Rotate90DegreesCcwOutlined className="theme-text-color" />
    //         </IconButton>
    //       </Tooltip>

    //       <Tooltip title="Rotate clockwise">
    //         <IconButton onClick={() => handleRotateRight()}>
    //           <Rotate90DegreesCwOutlined className="theme-text-color" />
    //         </IconButton>
    //       </Tooltip>

    //       <Divider
    //         orientation="vertical"
    //         flexItem
    //         className="zoom-div-divider"
    //       />
    //       <Tooltip title="Zoom out">
    //         <IconButton onClick={() => handleZoomOut()}>
    //           <Remove className="theme-text-color" />
    //         </IconButton>
    //       </Tooltip>

    //       <Tooltip title="Zoom in">
    //         <IconButton onClick={() => handleZoomIn()}>
    //           <Add className="theme-text-color" />
    //         </IconButton>
    //       </Tooltip>

    //       <Divider
    //         orientation="vertical"
    //         flexItem
    //         className="zoom-div-divider"
    //       />
    //       <Tooltip title="Reset zoom">
    //         <IconButton onClick={() => handleReset()}>
    //           <SettingsBackupRestoreOutlined className="theme-text-color" />
    //         </IconButton>
    //       </Tooltip>
    //     </div>
    //   </div>
    //   <Divider />
    //   <div className="polka-background" >
    //   <img 
    //       src={imageSrc} 
    //       alt={article?.filename || "image"} 
    //       style={imageStyles}
    //     />
    //   </div>
    // </Paper>

<Paper elevation={3} className="rightPlaneWidth" style={{width:"37%"}}>

  <div className="imageZoomFunDiv" style={{display:"flex",justifyContent:"end", backgroundColor:"black", alignItems:"center", height:"50px", borderRadius:"5px 5px 0px 0px", background:"#ababab"}}>
    <IconButton  onClick={zoomOut}  fontSize="medium" sx={{height:"30px", width:"30px"}}>
      <Remove style={{color:"white"}} />
    </IconButton>
    <p style={{padding:"3px 5px" , backgroundColor:"#ababab", color:"white"}}>Zoom</p>
    <IconButton onClick={zoomIn} sx={{height:"30px", width:"30px"}} >
      <Add style={{color:"white"}}  fontSize="medium" />
    </IconButton>
  </div>
<div className={ "img-div-New"} style={{width:"100%", height:"405px", overflow:"auto"}}>
  <div style={{ height: '100%'  }}>

          <img id='docImage' src={imageSrc}  alt='doc_image' draggable='false'
            style={{ width: '100%' }}/>
  </div>
</div>

</Paper>
  )
}

export default ImagePreview
 