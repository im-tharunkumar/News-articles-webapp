// import Header from "@/components/Header";
// import NewsCard from "@/components/NewsCard";
import {
  Container,
  Grid,
  Box,
  Typography,
  Alert,
  Skeleton,
  Card,
  CardContent,
} from '@mui/material';
import NewsCard from "../components/NewsCard";
import { useEffect, useMemo, useState } from "react";
import "./Styles.css"
import Header from '../components/Header';
import newsItems from "../assets/NewsData.json"
import ArticleModal from '../components/ArticleModal';

const Index = () => {
    const [articles, setArticles] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false)
    const [searchQuery, setSearchQuery] = useState("");


  // useEffect(() => {
  //   const fetchArticles = async () => {
  //     try {
  //       // setLoading(true);
  //       const response = await fetch("/api/articles");
  //       if (!response.ok) {
  //         throw new Error("Failed to fetch articles");
  //       }
  //       const data = await response.json();
  //       setNewsItems(data);
  //     } catch (err) {
  //       console.error("Error fetching articles:", err);
  //       setError("Failed to load articles. Please try again later.");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchArticles();
  // }, []);

  const filteredNews = useMemo(() => {
    if (!searchQuery.trim()) return newsItems;
    
    const query = searchQuery.toLowerCase();
    return newsItems.filter(
      (article) =>
        article.headline.toLowerCase().includes(query) ||
        article.news.toLowerCase().includes(query)||
        article.category.toLowerCase().includes(query)
    );
  }, [searchQuery]);



  return (
    <div className="min-h-screen bg-background" style={{width:"calc(100vw)"}}>
      <Header value={searchQuery} onChange={setSearchQuery}/>
    <Container
      component="main"
      // maxWidth="lg"
      maxWidth="100vw"
      sx={{background:"#f9f9f9"}}
      className="main-container"
    >
      {/* Error State */}
      {/* {error && (
        // <Alert> is the semantic equivalent for an error message box.
        <Alert severity="error" sx={{ mb: 4 }}>
          {error}
        </Alert>
      )} */}

      {/* Loading State */}
      {loading ? (
        // <Grid container> replaces `grid`. `spacing` replaces `gap`.
        // gap-6 (1.5rem / 24px) -> spacing={3} (3 * 8px = 24px)
        <Grid container spacing={3}>
          {[...Array(6)].map((_, i) => (
            // Grid items define column spans for different breakpoints.
            // xs=12 (1 col), md=6 (2 cols), lg=4 (3 cols)
            <Grid item xs={12} md={6} lg={4} key={i}>
              <Card className="custom-card skeleton-card">
                {/* <Skeleton> components replace the animated pulse divs */}
                <Skeleton variant="rectangular" width="100%" height={192} />
                <CardContent>
                  <Skeleton variant="text" sx={{ fontSize: '1.25rem' }} width="75%" />
                  <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                  <Skeleton variant="text" sx={{ fontSize: '1rem' }} width="66%" />
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : 
      // articles.length === 0 ? (
      //   // Empty State
      //   <Box sx={{ textAlign: 'center', py: 8 }}>
      //     <Typography className="empty-state-text" color="text.secondary">
      //       No articles found. Check back soon!
      //     </Typography>
      //   </Box>
      // ) : 
      (
        // Content Display
        <Grid container spacing={3}>
          {filteredNews.map((article) => (
            <Grid item xs={12} md={6} lg={4} key={article.id} width={"31%"}>
              <NewsCard
                article={article}
                onReadMore={() => {setModalOpen(true);setSelectedArticle(article)}}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
          <ArticleModal
        article={selectedArticle}
        open={modalOpen}
        onClose={() => {setModalOpen(false);setSelectedArticle(null);}}
      />
    </div>
  );
};

export default Index;

 