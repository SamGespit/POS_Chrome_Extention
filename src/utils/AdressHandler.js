export function addAddress(text, chainId, slot) {
  // Example: You might want to store or process the address here
  const addressEntry = {
    address: text,
    chainId: chainId,
    slot: slot,
    addedAt: new Date().toISOString(),
  };
  // You can add logic to save this entry to storage if needed
  localStorage.setItem(`address-${chainId}`, JSON.stringify(addressEntry));
}

export function deleteAddress(chainId) {
  localStorage.removeItem(`address-${chainId}`);
}
