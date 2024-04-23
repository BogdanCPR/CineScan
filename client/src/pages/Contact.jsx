import React from 'react';
import { Box, Typography, Grid, useTheme, IconButton,Button, TextField } from '@mui/material';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import uiConfigs from '../configs/ui.configs'; 
import Container from "../components/common/Container"
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import emailjs from 'emailjs-com';
import { useState } from 'react';
import { toast } from "react-toastify";

const mapContainerStyle = {
  width: '100%',
  height: '40vh', 
};

const center = {
  lat: 44.417558054989776,
  lng: 26.06637382164507,
};

const pinCenter = {
  lat: 44.417558054989776,
  lng: 26.08637382164507,
};

const Contact = () => {
  const theme = useTheme();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const serviceID = 'default_service';
  const templateID = 'template_nyo8mqe';


  const sendEmail = (e) => {
    e.preventDefault();

    if (!name || !email || !subject || !message) {
      toast.error("Please fill in all fields");
      return;
    }


    emailjs.send(serviceID,templateID,{
      client_name: name,
      send_to: email
    },"661qPVd7n80BV2Am7")
    .then((result) => {
      console.log(result.text);
      toast.success("Form sent successfully");
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
    }, (error) => {
      console.log(error.text);
      toast.error("Failed to send email");
    });

  };
  
  return (
    <Box sx={{width: '100%', height: "105vh", position: 'relative', marginTop: '70px' }}> 
        <Grid item xs={12} md={6}>
          <LoadScript googleMapsApiKey="AIzaSyBffgqLXke8HbvfTdxYBuST5fouMBHjkx8">
            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              center={center}
              zoom={14}
              options={{
                disableDefaultUI: true
              }}
              >
              <Marker position={pinCenter} />
            </GoogleMap>
            <Box sx={{
              width: "100%",
              height: "100%",
              position: "absolute",
              top: 0,
              left: 0,
              ...uiConfigs.style.horizontalGradientBgImage[theme.palette.mode]
            }}/>
          </LoadScript>
      </Grid>
      <Box sx={{ position: 'absolute', top: '0%', left:'5%' }}>
        <Container header={"We're here"}>
          <Typography variant="body1" sx={{ lineHeight: '0.3' }}>Military Technical Academy</Typography>
          <Typography variant="body1" sx={{ lineHeight: '0.3' }}>39-49 Bulevardul George Cosbuc</Typography>
          <Typography variant="body1" sx={{ lineHeight: '0.3' }}>Bucharest, Romania</Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', maxWidth: 140 }}>
            <IconButton size="small" href="https://www.facebook.com/bogdan.caprita/" target="_blank">
              <FacebookIcon />
            </IconButton>
            <IconButton size="small" href="https://www.instagram.com/bogdancpr/" target="_blank">
              <InstagramIcon />
            </IconButton>
            <IconButton size="small" href="https://www.linkedin.com/in/bogdan-c%C4%83pri%C8%9B%C4%83-953879254/" target="_blank">
              <LinkedInIcon />
            </IconButton>
          </Box>
        </Container>
        <Container header={"let's talk"}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Send us an email</Typography>
          <TextField
            color= "success"
            variant="outlined"
            fullWidth
            label="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            color= "success"
            variant="outlined"
            fullWidth
            label="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            color= "success"
            variant="outlined"
            fullWidth
            label="Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            color= "success"
            variant="outlined"
            fullWidth
            label="Message"
            multiline
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            sx={{ marginBottom: 2 }}
          />
          <Button variant="contained" color="primary" onClick={sendEmail}>Send</Button>
        </Container>
      </Box>
    </Box>
  );
};

export default Contact;