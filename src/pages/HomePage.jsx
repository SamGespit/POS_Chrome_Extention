import { useCallback, useEffect, useMemo, useState } from "react";
import NetworksSwitch from "../components/NetworkSelector/NetworkSelector";
import { styled } from "@mui/material/styles";
import QRCarousel from "../components/QRCarousel/QRCarousel";
import TextField from "@mui/material/TextField";

const StyledNumberInput = styled(TextField)(({ theme }) => ({
  backgroundColor: "#fff",
  borderRadius: "12px",
  boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
  "& .MuiOutlinedInput-root": {
    borderRadius: "12px",
    "& fieldset": {
      borderColor: "#e0e0e0",
    },
    "&:hover fieldset": {
      borderColor: "#bdbdbd",
    },
    "&.Mui-focused fieldset": {
      borderColor: theme.palette.primary.main,
      boxShadow: `0 0 0 2px ${theme.palette.primary.main}20`,
    },
  },
  "& .MuiInputBase-input": {
    padding: "12px 16px",
    fontSize: "16px",
    MozAppearance: "textfield", // Hide Firefox spinners
  },
  // Hide up/down arrows in Chrome
  "& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button":
    {
      WebkitAppearance: "none",
      margin: 0,
    },
}));
const QRContainer = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: theme.spacing(2),
}));

const MainContainer = styled("div")(() => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  width: "330px",
  height: "100%",
}));

const HomePage = () => {
  const [selectedNetwork, setSelectedNetwork] = useState();
  const [amount, setAmount] = useState(0);
  const [qrs, setQrs] = useState([
    { type: "image", source: "/assets/images/QR.png" },
  ]);

  const generateAndSetQR = useCallback(() => {
    const availableQRFormats = [
      {
        id: "ethereum",
        name: "Ethereum",
        icon: "okx.png", // or "trust.png" or undefined
        prefix: "ethereum",
        decimals: 18,
      },
      {
        id: "bnb",
        name: "BNB Chain",
        icon: "trust.png",
        prefix: "bnb",
        decimals: 18,
      },
      {
        id: "polygon",
        name: "Polygon",
        icon: undefined,
        prefix: "polygon",
        decimals: 18,
      },
      {
        id: "avalanche",
        name: "Avalanche",
        icon: undefined,
        prefix: "avalanche",
        decimals: 18,
      },
    ];
    const newQrs = availableQRFormats.map((format) => {
      const value = {
        type: "qr",
        value:
          "ethereum:0x1234abcd5678efgh9012ijkl3456mnop7890qrst?amount=10.00",
        mode: "ethereum",
        img: "@/assets/images/networks/ethereum.png",
        name: "Ethereum",
        network: {
          id: "ethereum",
          name: "Ethereum",
          logo: "@/assets/images/networks/ethereum.png",
          branding: { solid: "#627eea" },
        },
      };
      //   const value = generateQRValue(format);

      let iconPath = null;
      if (format.icon) {
        switch (format.icon) {
          case "okx.png":
            iconPath = "@/assets/images/okx.png";
            break;
          case "trust.png":
            iconPath = "@/assets/images/trust.png";
            break;
        }
      }

      return {
        type: "qr",
        value: value,
        mode: format.id,
        img: iconPath,
        name: format.name,
        network: "0x9876fedcba543210fedcba9876543210fedcba98", // Placeholder, replace with actual network data
      };
    });
    setQrs(newQrs);
  }, [amount]);

  const debounce = (func, delay) => {
    let timer;
    const debouncedFunc = (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => func(...args), delay);
    };
    debouncedFunc.cancel = () => clearTimeout(timer);
    return debouncedFunc;
  };

  const debouncedGenerateAndSetQR = useMemo(
    () => debounce(generateAndSetQR, 200),
    [generateAndSetQR]
  );
  useEffect(() => {
    if (parseFloat(amount) > 0) {
      debouncedGenerateAndSetQR();
    } else {
      // Clear QR codes when exiting payment mode
      // Clear QR codes immediately when amount becomes invalid
      setQrs([{ type: "image", source: "/assets/images/QR.png" }]);

      // Also cancel any pending debounced QR generation
      debouncedGenerateAndSetQR.cancel();
    }
  }, [amount, debouncedGenerateAndSetQR]);

  return (
    <MainContainer>
      <QRContainer>
        <QRCarousel qrData={qrs} onSnapToItem={() => {}} />
      </QRContainer>

      <StyledNumberInput
        type="number"
        placeholder="Enter a number"
        fullWidth
        variant="outlined"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <div style={{ width: "100%" }}>
        <NetworksSwitch
          selectedNetwork={selectedNetwork}
          onNetworkChange={setSelectedNetwork}
        />
      </div>
    </MainContainer>
  );
};

export default HomePage;
