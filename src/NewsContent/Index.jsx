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
import newsItems1 from "../assets/NewsData.json"
import newsItems2 from "../assets/NewsData2.json"
import newsItem3 from "../assets/NewsData3.json"
import newsItem4 from "../assets/NewsData4.json"

import ArticleModal from '../components/ArticleModal';

const Index = () => {
  const [mainSource, setMainSource] = useState(newsItems1); // Default to the first articles
    const [articles, setArticles] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false)
    const [searchQuery, setSearchQuery] = useState("");

    const [selectedVarient, setSelectedVarient] = useState(1);

    const options =[
      { value:1, lable:"Column Crop - OCR(vision) + LLM(4o)" },
      { value:2, lable:"Column Crop - VLM(flash 2.0)" },
      { value:3, lable:"Full Page - VLM(flash 2.0)" },
      { value:4, lable:"Full Page - OCR(vision) + LLM(4o)" }
    ]

    const handleVarientChange = (event) => {
      setSelectedVarient(event.target.value);
    };



  useEffect(() => {
    setLoading(true);
    if(selectedVarient === 1){
      setMainSource(newsItems1)
    }else if(selectedVarient === 2){
      setMainSource(newsItems2)
    }else if(selectedVarient === 3){
      setMainSource(newsItem3)
    }else if(selectedVarient === 4){
      setMainSource(newsItem4)
    }

    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, [selectedVarient]);


  const filteredNews = useMemo(() => {
    if (!searchQuery.trim()) return mainSource;

    const query = searchQuery.toLowerCase();
    return mainSource.filter(
      (article) =>
        article.headline.toLowerCase().includes(query) ||
        article.news.toLowerCase().includes(query)||
        article.category.toLowerCase().includes(query)
    );
  }, [searchQuery, mainSource]);



  return (
    <div className="min-h-screen bg-background" style={{width:"calc(100vw)"}}>
      <Header value={searchQuery} onChange={setSearchQuery} selectedVarient={selectedVarient} varientOptions={options} handleVarientChange={handleVarientChange}/>
    <Container
      component="main"
      // maxWidth="lg"
      maxWidth="100vw"
      sx={{background:"#f9f9f9"}}
      className="main-container"
    >
      {loading ? (

        <Grid container spacing={3}>
          {[...Array(4)].map((_, i) => (
            <Grid item xs={12} md={6} lg={4} key={i}>
              <Card className="custom-card skeleton-card" style={{width:"300px "}}>
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
      (
        // Content Display
        <Grid container spacing={3}>
          {filteredNews.map((article) => (
            <Grid item xs={12} md={6} lg={4} key={article.id} width={"31%"}>
              <NewsCard
                article={article}
                onReadMore={() => {setModalOpen(true);setSelectedArticle(article);console.log(article)}}
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

 