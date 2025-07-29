import AddIcon from "@mui/icons-material/Add";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Box,
  Button,
  IconButton,
  Modal,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  addAddress,
  deleteAddress,
  truncateEthAddressFancy,
} from "../utils/AdressHandler";

const MinimalistCard = styled(Paper)(({ theme }) => ({
  width: "100%",
  display: "flex",
  borderRadius: "20px",
  alignItems: "center",
  justifyContent: "space-between",
  padding: theme.spacing(2),
  marginBottom: theme.spacing(1),
}));

const WalletCards = () => {
  const navigate = useNavigate();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedNetworkIndex, setSelectedNetworkIndex] = useState(null);
  const config = JSON.parse(localStorage.getItem("configData"));

  const networks = config?.networks || [];

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
      window.location.reload();
    }
  };

  const renderCard = (network, index) => {
    const address = JSON.parse(
      localStorage.getItem(`address-${network.chainId}`)
    );

    return (
      <MinimalistCard
        key={network.chainId}
        sx={{ backgroundColor: network.branding?.solid || "#f0f0f0" }}
      >
        <img
          src={network.branding.logo}
          alt={network.name}
          width={40}
          height={40}
        />
        <Box>
          <Typography variant="body1" color="white">
            {network.name}
          </Typography>
          {address?.address && (
            <Typography variant="body2" color="white">
              {truncateEthAddressFancy(address?.address) ?? "Not Configured"}
            </Typography>
          )}
        </Box>

        {address ? (
          <Stack direction="row" spacing={1}>
            <IconButton
              onClick={() => navigator.clipboard.writeText(address.address)}
            >
              <ContentCopyIcon sx={{ color: "white" }} />
            </IconButton>
            <IconButton onClick={() => handleDeleteAddress(network?.chainId)}>
              <DeleteIcon sx={{ color: "white" }} />
            </IconButton>
          </Stack>
        ) : (
          <IconButton
            onClick={() => {
              setSelectedNetworkIndex(index);
              setModalVisible(true);
            }}
          >
            <AddIcon sx={{ color: "white" }} />
          </IconButton>
        )}
      </MinimalistCard>
    );
  };

  return (
    <Box color="#fff" position="relative">
      <IconButton
        onClick={() => navigate("/")}
        sx={{
          position: "absolute",
          top: 0,
          left: -16,
          color: "white",
          zIndex: 2,
        }}
        aria-label="Back to Home"
      >
        <ArrowBackIcon />
      </IconButton>
      <Typography variant="h4" gutterBottom>
        Wallet Cards
      </Typography>
      <Box display="flex" flexDirection="column" alignItems="center" gap={1}>
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
