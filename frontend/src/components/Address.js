import React, { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import { Container, Text, Button, Box } from "@chakra-ui/react";
import AddressCard from "./AddressCard";

const Address = () => {
  const cookies = new Cookies();
  const storedJwt = cookies.get("token");

  const [jwt, setJwt] = useState(storedJwt || null);
  const [addressData, setAddressData] = useState([]);

  const fetchUserDetails = async (url) => {
    const res = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + jwt,
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    setAddressData(data);
  };

  useEffect(() => {
    fetchUserDetails("http://localhost:5002/user/address");
  }, []);

  const handleAddressButton = () => {
    window.location.href = "/user/address/add";
  };

  const displayAddress = addressData.map((data) => {
    return (
      <AddressCard
        name={data.name}
        address1={data.address_line1}
        address2={data.address_line2}
        postal_code={data.postal_code}
        country={data.country}
        address_type={data.address_type}
      />
    );
  });

  return (
    <Container>
      <Container>
        <Text>My Account</Text>
        <Text>Logout</Text>
      </Container>
      <Button onClick={handleAddressButton}>ADD NEW ADDRESS</Button>

      <Box>
        <Text>Addresses</Text>
        {displayAddress}
      </Box>
    </Container>
  );
};

export default Address;