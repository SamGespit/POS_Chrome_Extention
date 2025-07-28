import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

const ITEM_WIDTH = 300;
const ITEM_HEIGHT = 70;

const CarouselContainer = styled(Box)(() => ({
  display: "flex",
  overflowX: "auto",
  padding: 16,
  scrollSnapType: "x mandatory",
  gap: 16,
}));

const CarouselItemBox = styled(Box)(() => ({
  flex: "0 0 auto",
  width: ITEM_WIDTH,
  height: ITEM_HEIGHT,
  borderRadius: ITEM_HEIGHT / 2,
  border: "2px solid white",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  scrollSnapAlign: "center",
  transition: "transform 0.3s ease, opacity 0.3s ease",
}));

const Logo = styled("img")({
  width: 30,
  height: 30,
  marginRight: 10,
});

const PlusIcon = styled("img")({
  width: 30,
  height: 30,
});

const NetworksSwitch = ({ selectedSlot, setSelectedSlot, onSetNetwork }) => {
  const navigate = useNavigate();
  const networkLogos = {
    ethereum: "/assets/networks/ethereum.png",
    avalanche: "/assets/networks/avalanche.png",
    polygon: "/assets/networks/polygon.png",
    bnb: "/assets/networks/bnb.png",
  };
  const mockNetworkSlots = [
    {
      network: {
        id: "ethereum",
        name: "Ethereum",
        logo: networkLogos.ethereum,
        branding: { solid: "#454A75" },
      },
      address: "0x1234abcd5678efgh9012ijkl3456mnop7890qrst",
    },
    {
      network: {
        id: "bnb",
        name: "BNB Chain",
        logo: networkLogos.bnb,
        branding: { solid: "#F3BA2F" },
      },
      address: "0xabcdefabcdefabcdefabcdefabcdefabcdefabcd",
    },
    {
      network: {
        id: "polygon",
        name: "Polygon",
        logo: networkLogos.polygon,
        branding: { solid: "#8247E5" },
      },
      address: "0x9876fedcba543210fedcba9876543210fedcba98",
    },
    {
      network: {
        id: "avalanche",
        name: "Avalanche",
        logo: networkLogos.avalanche,
        branding: { solid: "#E84142" },
      },
      address: "0x1111222233334444555566667777888899990000",
    },
    {
      network: null,
      address: null,
    },
  ];

  const handleClick = (item) => {
    if (!item.hasAddress) return;
    setSelectedSlot(item.slot);
    onSetNetwork(item.slot);
  };
  const addNetworkHandler = () => {
    navigate("walletCards");
  };

  return (
    <CarouselContainer>
      {mockNetworkSlots.map((item) => {
        let logoSrc = item?.network?.logo;
        const isActive = item.slot === selectedSlot;
        const bgColor = item.network ? item.network.branding.solid : "black";

        return (
          <CarouselItemBox
            key={item.slot}
            onClick={() => handleClick(item)}
            sx={{
              backgroundColor: bgColor,
              transform: isActive ? "scale(1)" : "scale(0.9)",
              opacity: isActive ? 1 : 0.6,
            }}
          >
            {item.network && item.address ? (
              <>
                <Logo src={logoSrc} alt={item.network.name} />
                <Typography color="white" fontWeight={600}>
                  {item.network.name}
                </Typography>
              </>
            ) : (
              <PlusIcon
                src="/assets/images/plus-circle.png"
                onClick={addNetworkHandler}
              />
            )}
          </CarouselItemBox>
        );
      })}
    </CarouselContainer>
  );
};
export default NetworksSwitch;
