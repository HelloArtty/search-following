import { Card, CardActionArea, CardContent, Grid, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [following, setFollowing] = useState([]);

  useEffect(() => {
    // ดึงข้อมูล JSON จาก URL
    fetch('https://raw.githubusercontent.com/HelloArtty/search-following/main/src/user_data_tiktok.json')
      .then((response) => response.json())
      .then((data) => {
        setFollowing(data["Profile"]["Following List"]["Following"]);
      })
      .catch((error) => console.error('Error fetching JSON:', error));
  }, []);

  // กรองรายชื่อที่ตรงกับคำค้นหา
  const filteredUsers = following.filter((user) =>
    user.UserName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // ฟังก์ชันจัดรูปแบบวันที่
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: 'auto' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Search Following</h1>

      {/* ช่องค้นหา */}
      <TextField
        label="Search Username"
        variant="outlined"
        fullWidth
        onChange={(e) => setSearchTerm(e.target.value)}
        value={searchTerm}
        style={{ marginBottom: '20px' }}
      />

      {/* แสดงการ์ดในรูปแบบ Grid */}
      <Grid container spacing={3}>
        {filteredUsers.map((user, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card style={{ height: '100%' }}>
              {/* ลิงก์ไปที่ TikTok ของผู้ใช้ */}
              <CardActionArea
                component="a"
                href={`https://www.tiktok.com/@${user.UserName}`}
                target="_blank"
              >
                <CardContent>
                  <Typography variant="h6" component="div">
                    {user.UserName}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Date followed: {formatDate(user.Date)}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default App;
