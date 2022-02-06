import React, { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import { Container, Text, Button, Box } from "@chakra-ui/react";

const UserPage = () => {
  const cookies = new Cookies();
  const storedJwt = cookies.get("token");

  const [jwt, setJwt] = useState(storedJwt || null);
  const [userDetails, setUserDetails] = useState({
    username: "",
    first_name: "",
    last_name: "",
    mobile_number: "",
    email: "",
  });

  const fetchUserDetails = async (url) => {
    const res = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + jwt,
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    setUserDetails({
      username: data.username,
      first_name: data.first_name,
      last_name: data.last_name,
      mobile_number: data.mobile_number,
      email: data.email,
    });
  };

  useEffect(() => {
    fetchUserDetails("http://localhost:5002/user/");
  }, []);

  const handleEditButton = () => {
    window.location.href = "/user/edit";
  };

  const handleAddressButton = () => {
    window.location.href = "/user/address";
  };

  return (
    <Container>
      <Container>
        <Text>My Account</Text>
        <Text>Logout</Text>
      </Container>
      <Box>
        <Text align="center">Account Details</Text>
        <Box maxW="m" borderRadius="lg">
          <Box align="center">
            <Text as="u">Username: </Text>
            {userDetails.username}
          </Box>
          <Box align="center">
            <Text as="u">First Name: </Text>
            {userDetails.first_name}
          </Box>
          <Box align="center">
            <Text as="u">Last Name: </Text>
            {userDetails.last_name}
          </Box>
          <Box align="center">
            <Text as="u">Mobile Number: </Text>
            {userDetails.mobile_number}
          </Box>
          <Box align="center">
            <Text as="u">Email: </Text>
            {userDetails.email}
          </Box>
          <Box align="center">
            <Button onClick={handleEditButton}>Edit</Button>
            <Button onClick={handleAddressButton}>View Addresses</Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default UserPage;
