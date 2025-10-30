import React from 'react';
import { Card, CardContent, Typography, Box, Button } from '@mui/material';

// Import the custom CSS for hover effects and line clamping
import './NewCard.css';

// A helper function to truncate text, same as you likely have
const truncateText = (text, maxLength) => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.substr(0, text.lastIndexOf(' ', maxLength)) + '…';
};

const NewsCard = ({ article, onReadMore }) => {
  const handleReadMoreClick = (e) => {
    // Prevent the card's onClick from firing when the button is clicked
    e.stopPropagation();
    onReadMore();
  };

  return (
    <Card
      className="news-card card-hover card-shadow" // Custom classes for hover/shadow
      // onClick={onReadMore}
      sx={{
        // Replicates: bg-white dark:bg-[#1E1E1E] border border-[#E5E5E5] dark:border-white/10
        // The theme provider will handle the color switch automatically for `backgroundColor` and `borderColor`.
        // We are explicit here to match your exact colors.
        backgroundColor: { xs: 'white', dark: '#1E1E1E' },
        border: '1px solid',
        borderColor: { xs: '#E5E5E5', dark: 'rgba(255, 255, 255, 0.1)' },
        // Replicates: rounded-[10px] overflow-hidden h-full flex flex-col cursor-pointer
        borderRadius: '10px',
        overflow: 'hidden',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer',
        boxShadow: 'none', // Override MUI's default shadow
      }}
    >
      <CardContent
        sx={{
          // Replicates: p-6 flex flex-col flex-grow
          padding: '24px !important', // `!important` to override default CardContent padding
          display: 'flex',
          flexDirection: 'column',
          flexGrow: 1,
        }}
      >
        {/* Category Badge */}
        {article?.category && (
          <Box sx={{ mb: 1.5 }}> {/* mb-3 -> 12px -> 1.5 * 8px */}
            <Typography
              component="span"
              sx={{
                // Replicates: font-urbanist text-[11px] font-semibold text-black/60 dark:text-white/60 uppercase tracking-wide
                fontFamily: 'Urbanist, sans-serif',
                fontSize: '11px',
                fontWeight: 600,
                color: { xs: 'rgba(0,0,0,0.6)', dark: 'rgba(255,255,255,0.6)' },
                textTransform: 'uppercase',
                letterSpacing: '0.05em', // A good equivalent for `tracking-wide`
              }}
            >
              {article?.category}
            </Typography>
          </Box>
        )}

        {/* Title */}
        <Typography
          variant="h2"
          className="line-clamp-3" // Using CSS class for line-clamping
          sx={{
            // Replicates: font-rethink font-bold text-[18px] leading-tight text-black dark:text-white mb-3
            fontFamily: 'Rethink, sans-serif',
            fontWeight: 'bold',
            fontSize: '18px',
            textAlign:"start",
            lineHeight: 1.3, // `leading-tight` is often 1.25-1.3
            color: { xs: 'black', dark: 'white' },
            mb: 1.5,
          }}
        >
          {article?.headline}
        </Typography>

        {/* Excerpt */}
        <Typography
          variant="body1"
          className="line-clamp-2" // Using CSS class for line-clamping
          sx={{
            // Replicates: font-urbanist text-[14px] text-black/70 dark:text-white/70 mb-4 flex-grow
            fontFamily: 'Urbanist, sans-serif',
            fontSize: '14px',
            textAlign:"start",
            color: { xs: 'rgba(0,0,0,0.7)', dark: 'rgba(255,255,255,0.7)' },
            mb: 2, // mb-4 -> 16px -> 2 * 8px
            flexGrow: 1, // This is key to pushing the footer down
          }}
        >
          {truncateText(article?.excerpt || article?.news, 100)}
        </Typography>

        {/* Metadata Footer */}
        <Box
          sx={{
            // Replicates: flex items-center justify-between pt-3 border-t border-[#E5E5E5] dark:border-white/10
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            pt: 1.5,
            borderTop: '1px solid',
            borderTopColor: { xs: '#E5E5E5', dark: 'rgba(255, 255, 255, 0.1)' },
          }}
        >
          <Typography
            component="span"
            sx={{
              // Replicates: font-urbanist text-[12px] text-black/50 dark:text-white/50
              fontFamily: 'Urbanist, sans-serif',
              fontSize: '12px',
              color: { xs: 'rgba(0,0,0,0.5)', dark: 'rgba(255,255,255,0.5)' },
            }}
          >
            {article?.date}
          </Typography>

          <Button
            className="cta-button"
            onClick={handleReadMoreClick}
            variant="text" // Makes it look like a link/text
            disableRipple
            sx={{
              // Replicates: font-urbanist font-semibold text-[12px] text-black dark:text-white
              p: 0, // Remove default button padding
              minWidth: 'auto', // Remove default min-width
              fontFamily: 'Urbanist, sans-serif',
              fontWeight: 600,
              fontSize: '12px',
              textTransform: 'none', // Remove uppercase default
              color: { xs: 'black', dark: 'white' },
              // Replicates: hover:text-black/80 dark:hover:text-white/80
              '&:hover': {
                color: { xs: 'blue', dark: 'rgba(255,255,255,0.8)' },
                backgroundColor: 'transparent', // Prevent default hover background
                boxShadow:"none !important",
                transform:"scale(1.2) !important"
              },
                 // 🧼 Removes all borders and focus outlines
    "&:focus": {
      outline: "none",
      boxShadow: "none",
      border: "none",
    },
    "&:focus-visible": {
      outline: "none",
      boxShadow: "none",
      border: "none",
    },
    "&:active": {
      outline: "none",
      boxShadow: "none",
      border: "none",
      backgroundColor: "transparent",
    },
            }}
          >
            Read More →
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default NewsCard;