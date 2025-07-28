import AddIcon from "@mui/icons-material/Add";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import DeleteIcon from "@mui/icons-material/Delete";
import HistoryIcon from "@mui/icons-material/History";
import {
  Box,
  Button,
  IconButton,
  Modal,
  Paper,
  Slide,
  Stack,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import { addAddress, deleteAddress } from "../utils/AdressHandler";

const CARD_WIDTH = 400;
const CARD_HEIGHT = CARD_WIDTH / 1.586;

const StyledCard = styled(Paper)(({ theme }) => ({
  width: CARD_WIDTH,
  height: CARD_HEIGHT,
  marginBottom: theme.spacing(2),
  padding: theme.spacing(2),
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
}));

const ActionCircle = styled(Box)(({ theme, bgcolor }) => ({
  width: 56,
  height: 56,
  borderRadius: "50%",
  backgroundColor: bgcolor,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  boxShadow: theme.shadows[2],
}));

const MinimalistCard = styled(Paper)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: theme.spacing(2),
  marginBottom: theme.spacing(1),
}));

const WalletCards = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedNetworkIndex, setSelectedNetworkIndex] = useState(null);
  const config = JSON.parse(localStorage.getItem("configData"));

  const networks = config?.networks || [];
  console.log("WalletCards networks", networks);

  const handlePasteAddress = async () => {
    const text = navigator.clipboard && (await navigator.clipboard.readText());
    if (
      text?.startsWith("0x") &&
      text.length === 42 &&
      selectedNetworkIndex !== null
    ) {
      const selected = networks[selectedNetworkIndex];
      addAddress(text, selected.chainId, 2);
      setModalVisible(false);
      setSelectedNetworkIndex(null);
    } else {
      alert("Invalid Ethereum address");
    }
  };

  const handleDeleteAddress = (chainId) => {
    if (window.confirm("Are you sure you want to remove this address?")) {
      deleteAddress(chainId);
    }
  };

  const renderCard = (network, index) => {
    const address = localStorage.getItem(`address-${network.chainId}`);
    const isMinimalist = config?.features?.cardDesign === "minimalist";

    if (isMinimalist) {
      return (
        <MinimalistCard key={network.chainId}>
          <Typography variant="body1">{network.name}</Typography>
          {address ? (
            <Stack direction="row" spacing={1}>
              <IconButton
                onClick={() => navigator.clipboard.writeText(address.address)}
              >
                <ContentCopyIcon />
              </IconButton>
              <IconButton onClick={() => handleDeleteAddress(network?.chainId)}>
                <DeleteIcon />
              </IconButton>
            </Stack>
          ) : (
            <IconButton
              onClick={() => {
                setSelectedNetworkIndex(index);
                setModalVisible(true);
              }}
            >
              <AddIcon />
            </IconButton>
          )}
        </MinimalistCard>
      );
    }

    return (
      <Slide in direction="up" key={network?.chainId}>
        <StyledCard>
          <Typography variant="h6">{network?.name}</Typography>
          {address ? (
            <Stack direction="row" spacing={2} justifyContent="center">
              <ActionCircle
                bgcolor="red"
                onClick={() => handleDeleteAddress(network?.chainId)}
              >
                <DeleteIcon style={{ color: "white" }} />
              </ActionCircle>
              <ActionCircle
                bgcolor="blue"
                onClick={() => navigator.clipboard.writeText(address.address)}
              >
                <ContentCopyIcon style={{ color: "white" }} />
              </ActionCircle>
              <ActionCircle bgcolor="grey">
                <HistoryIcon style={{ color: "white" }} />
              </ActionCircle>
            </Stack>
          ) : (
            <Button
              variant="outlined"
              startIcon={<AddIcon />}
              onClick={() => {
                setSelectedNetworkIndex(index);
                setModalVisible(true);
              }}
            >
              Add Wallet Address
            </Button>
          )}
        </StyledCard>
      </Slide>
    );
  };

  return (
    <Box p={2} bgcolor="#000" color="#fff" minHeight="100vh">
      <Typography variant="h4" gutterBottom>
        Wallet Cards
      </Typography>
      <Box display="flex" flexDirection="column" alignItems="center">
        {networks.map((network, index) => renderCard(network, index))}
      </Box>

      <Modal
        open={modalVisible}
        onClose={() => {
          setModalVisible(false);
          setSelectedNetworkIndex(null);
        }}
      >
        <Box
          sx={{
            backgroundColor: "#fff",
            borderRadius: 2,
            p: 3,
            maxWidth: 400,
            mx: "auto",
            mt: 10,
          }}
        >
          {selectedNetworkIndex !== null && (
            <Box mb={2}>
              <Typography variant="h6">Add Wallet Address</Typography>
              <Typography variant="body2" color="textSecondary">
                {networks[selectedNetworkIndex].name} Network
              </Typography>
            </Box>
          )}

          <Stack spacing={2}>
            <Button
              startIcon={<ContentPasteIcon />}
              variant="outlined"
              fullWidth
              onClick={handlePasteAddress}
            >
              Paste Address
            </Button>
          </Stack>

          <Button
            fullWidth
            sx={{ mt: 2 }}
            onClick={() => setModalVisible(false)}
          >
            Cancel
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default WalletCards;
