import { keyframes } from "@mui/material/styles";
import { styled } from "@mui/system";
import { Box, Typography } from "@mui/material";
import ErrorIcon from "@mui/icons-material/Error";
import QRCode from "react-qr-code";

const cardSize = 320; // Adjust for web

const shimmer = keyframes`
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
`;

const Card = styled(Box)(() => ({
  width: cardSize,
  height: cardSize,
  borderRadius: 32,
  backgroundColor: "white",
  boxShadow: "0 8px 16px rgba(99, 102, 241, 0.25)",
  border: "2px solid #f3f4f6",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  position: "relative",
}));

const QRContainer = styled(Box)({
  padding: 16,
  borderRadius: 32,
  backgroundColor: "white",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  position: "relative",
});

const Skeleton = styled(Box)({
  width: cardSize - 32,
  height: cardSize - 32,
  backgroundColor: "#f3f4f6",
  borderRadius: 20,
  overflow: "hidden",
  position: "relative",
});

const ShimmerOverlay = styled(Box)({
  position: "absolute",
  top: 0,
  left: 0,
  height: "100%",
  width: "50%",
  background: "rgba(255,255,255,0.3)",
  animation: `${shimmer} 1.5s infinite`,
});

const LoadingIcon = styled(Box)({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
});

const LogoOverlay = styled(Box)({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: "white",
  padding: 8,
  borderRadius: 12,
  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
});

const ErrorContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
});

const QRCard = ({ item }) => {
  return (
    <Card>
      {item.type === "qr" ? (
        <QRContainer>
          {item.value ? (
            <>
              <QRCode value={item.value} size={cardSize - 64} />
              {item.img && (
                <LogoOverlay>
                  <img
                    src={item.img}
                    alt="Logo"
                    style={{ width: 32, height: 32, objectFit: "contain" }}
                  />
                </LogoOverlay>
              )}
            </>
          ) : item.value && item.value.trim() !== "" ? (
            <>
              <QRCode
                value={item.value}
                size={cardSize - 64}
                fgColor="#000000"
                bgColor="#ffffff"
                includeMargin={true}
              />
              {item.img && (
                <LogoOverlay>
                  <img
                    src={item.img}
                    alt="Logo"
                    style={{ width: 32, height: 32, objectFit: "contain" }}
                  />
                </LogoOverlay>
              )}
            </>
          ) : (
            <ErrorContainer>
              <ErrorIcon sx={{ fontSize: 48, color: "#ef4444" }} />
              <Typography color="error" mt={1}>
                Invalid QR Data
              </Typography>
            </ErrorContainer>
          )}
        </QRContainer>
      ) : (
        <img
          src={item.source}
          alt="Placeholder"
          style={{ width: "60%", height: "60%", objectFit: "contain" }}
        />
      )}
    </Card>
  );
};

export default QRCard;
