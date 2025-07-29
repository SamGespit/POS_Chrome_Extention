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

export function truncateEthAddressFancy(address) {
  if (!address?.startsWith("0x")) return address;

  const clean = address.slice(2); // remove "0x"
  const len = clean.length;

  const first = clean.slice(0, 4);
  const quarter = clean.slice(Math.floor(len / 4), Math.floor(len / 4) + 4);
  const threeQuarters = clean.slice(
    Math.floor((3 * len) / 4),
    Math.floor((3 * len) / 4) + 4
  );
  const last = clean.slice(-4);

  return `0x ${first} ··· ${quarter} ··· ${threeQuarters} ··· ${last}`;
}
