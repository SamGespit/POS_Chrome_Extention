import { styled } from "@mui/material/styles";
import { useEffect, useState } from "react";
import QRCard from "../QRCard/QRCard";

const width = 330;
const height = 330;
const isPhone = width < 768 || height < 1024;

const CARD_WIDTH = width;
const CARD_HEIGHT = width;

const CarouselContainer = styled("div")(() => ({
  display: "flex",
  overflowX: "auto",
}));

const CarouselItem = styled("div")(({ width, height }) => ({
  width,
  height,
  scrollSnapAlign: "center",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));
const QRCarousel = ({ qrData, onSnapToItem }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleScroll = (e) => {
    const newIndex = Math.round(e.target.scrollLeft / e.target.offsetWidth);
    setCurrentIndex(newIndex);
    onSnapToItem?.(newIndex);
  };

  useEffect(() => {
    const container = document.getElementById("qr-carousel");
    if (container) container.scrollLeft = currentIndex * CARD_WIDTH;
  }, []);

  return (
    <CarouselContainer
      id="qr-carousel"
      onScroll={handleScroll}
      height={isPhone ? CARD_HEIGHT : height}
    >
      {qrData.map((item, index) => (
        <CarouselItem key={index} width={CARD_WIDTH}>
          <QRCard item={item} />
        </CarouselItem>
      ))}
    </CarouselContainer>
  );
};

export default QRCarousel;
