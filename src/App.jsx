import React, { useState, useEffect } from "react";
import { getSigner } from "./ethersProvider";
import contractABI from "./contractABI.json";

const CONTRACT_ADDRESS = "YOUR_DEPLOYED_CONTRACT_ADDRESS";

function App() {
  const [encrypted, setEncrypted] = useState("");
  const [stored, setStored] = useState("");

  const storeValue = async () => {
    const signer = await getSigner();
    const contract = new ethers.Contract(CONTRACT_ADDRESS, contractABI, signer);
    const tx = await contract.storeEncrypted(encrypted);
    await tx.wait();
    alert("Stored!");
  };

  const getValue = async () => {
    const signer = await getSigner();
    const contract = new ethers.Contract(CONTRACT_ADDRESS, contractABI, signer);
    const value = await contract.getEncrypted(await signer.getAddress());
    setStored(value.toString());
  };

  return (
    <div>
      <h1>FHE dApp</h1>
      <input value={encrypted} onChange={(e) => setEncrypted(e.target.value)} placeholder="Encrypted value"/>
      <button onClick={storeValue}>Store</button>
      <button onClick={getValue}>Get Stored Value</button>
      <p>Stored: {stored}</p>
    </div>
  );
}

export default App;
