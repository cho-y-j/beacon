'use client';

import { useState } from 'react';
import Link from 'next/link';
import { mockVisitorData } from '../../lib/data/mockData';

// Material UI 컴포넌트 import
import { 
  Box, Container, Typography, Paper, Card, CardContent, CardMedia,
  AppBar, Toolbar, IconButton, BottomNavigation, BottomNavigationAction,
  Chip, Divider, List, ListItem, ListItemText, Avatar, Grid,
  Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField,
  FormControl, InputLabel, Select, MenuItem, Modal
} from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';

// Material UI 아이콘 import
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import SearchIcon from '@mui/icons-material/Search';
import ChatIcon from '@mui/icons-material/Chat';
import MapIcon from '@mui/icons-material/Map';
import HistoryIcon from '@mui/icons-material/History';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';

// Material UI 테마 생성
const theme = createTheme({
  palette: {
    primary: {
      main: '#3B82F6',
    },
    secondary: {
      main: '#10B981',
    },
    background: {
      default: '#F5F0E8',
      paper: '#FFFFFF',
    },
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
  },
  components: {
    MuiBottomNavigation: {
      styleOverrides: {
        root: {
          height: '70px',
        },
      },
    },
    MuiBottomNavigationAction: {
      styleOverrides: {
        root: {
          padding: '6px 0',
        },
        label: {
          fontSize: '0.7rem',
        },
      },
    },
  },
});

export default function VisitorHome() {
  const [userData, setUserData] = useState(mockVisitorData.user);
  const [exhibits] = useState(mockVisitorData.exhibits);
  const [nearbyRecommendations] = useState(mockVisitorData.nearbyRecommendations);
  const [currentLocation] = useState("조선시대 전시관");
  const [value, setValue] = useState(0);
  
  // 프로필 모달 상태
  const [profileOpen, setProfileOpen] = useState(false);
  const [editedUser, setEditedUser] = useState({...userData});
  
  // 관심사 목록 (실제 앱에서는 API에서 가져올 수 있음)
  const interestOptions = [
    '역사', '예술', '과학', '문화', '기술', '자연', '건축', '문학', '음악', '영화'
  ];

  // 프로필 모달 열기/닫기 핸들러
  const handleProfileOpen = () => {
    setEditedUser({...userData});
    setProfileOpen(true);
  };
  
  const handleProfileClose = () => {
    setProfileOpen(false);
  };
  
  // 프로필 저장 핸들러
  const handleSaveProfile = () => {
    setUserData({...editedUser});
    setProfileOpen(false);
    // 실제 앱에서는 여기서 API 호출을 통해 서버에 저장
  };
  
  // 입력 필드 변경 핸들러
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser({
      ...editedUser,
      [name]: value
    });
  };
  
  // 관심사 변경 핸들러
  const handleInterestsChange = (e) => {
    setEditedUser({
      ...editedUser,
      interests: e.target.value
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ 
        maxWidth: '500px', 
        mx: 'auto', 
        bgcolor: 'background.default', 
        minHeight: '100vh',
        pb: 8 // 하단 네비게이션 공간 확보
      }}>
        {/* 상단 네비게이션 */}
        <AppBar position="static" color="default" elevation={1}>
          <Toolbar sx={{ justifyContent: 'space-between' }}>
            <Typography variant="h6" color="primary" fontWeight="bold">
              박물관 로고
            </Typography>
            <Box>
              <IconButton size="medium" sx={{ mr: 1 }} onClick={handleProfileOpen}>
                <PersonIcon />
              </IconButton>
              <IconButton size="medium">
                <SettingsIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>

        {/* 메인 콘텐츠 */}
        <Box sx={{ p: 2 }}>
          {/* 인사말 및 추천 전시 */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h5" fontWeight="bold" sx={{ mb: 0.5 }}>
              안녕하세요, {userData.name}님!
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
              오늘의 맞춤 추천 전시
            </Typography>
            
            <Card elevation={2} sx={{ mb: 3 }}>
              <CardMedia
                component="img"
                image={exhibits[0].imageUrl}
                alt={exhibits[0].name}
                sx={{ 
                  height: 300,
                  objectFit: 'contain',
                  bgcolor: 'grey.100',
                  p: 2
                }}
              />
              <CardContent>
                <Typography variant="h6" fontWeight="bold">
                  {exhibits[0].name} - {exhibits[0].location}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  당신의 관심사와 일치: {exhibits[0].matchedInterests.join(', ')}
                </Typography>
              </CardContent>
            </Card>
          </Box>

          {/* 현재 위치 및 주변 추천 */}
          <Box sx={{ mb: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <LocationOnIcon color="primary" fontSize="small" sx={{ mr: 0.5 }} />
              <Typography variant="body1" fontWeight="medium">
                현재 위치: {currentLocation}
              </Typography>
            </Box>
            
            <Box 
              sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                color: 'primary.main', 
                fontWeight: 'medium', 
                mb: 2,
                cursor: 'pointer'
              }}
            >
              <Typography variant="body1" color="primary" fontWeight="medium">
                주변 추천 작품 ({nearbyRecommendations.length})
              </Typography>
              <ArrowForwardIosIcon fontSize="small" sx={{ ml: 0.5 }} />
            </Box>
            
            <Box 
              sx={{ 
                display: 'flex', 
                gap: 2, 
                overflowX: 'auto', 
                pb: 1,
                '&::-webkit-scrollbar': {
                  height: '4px',
                },
                '&::-webkit-scrollbar-track': {
                  backgroundColor: 'grey.100',
                },
                '&::-webkit-scrollbar-thumb': {
                  backgroundColor: 'grey.400',
                  borderRadius: '4px',
                },
              }}
            >
              {nearbyRecommendations.map((item) => (
                <Box 
                  key={item.id} 
                  sx={{ 
                    minWidth: 120, 
                    flexShrink: 0 
                  }}
                >
                  <Paper 
                    elevation={1} 
                    sx={{ 
                      height: 150, 
                      mb: 1, 
                      overflow: 'hidden',
                      borderRadius: 1,
                      bgcolor: 'grey.100',
                      p: 1
                    }}
                  >
                    <Box
                      component="img"
                      src={item.imageUrl}
                      alt={item.name}
                      sx={{ 
                        width: '100%', 
                        height: '100%', 
                        objectFit: 'contain'
                      }}
                    />
                  </Paper>
                  <Typography variant="body2" fontWeight="medium" noWrap>
                    {item.name}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {item.distance} 거리
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>

        {/* 하단 네비게이션 */}
        <Paper 
          sx={{ 
            position: 'fixed', 
            bottom: 0, 
            left: 0, 
            right: 0, 
            zIndex: 1100 
          }} 
          elevation={3}
        >
          <BottomNavigation
            showLabels
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
          >
            <BottomNavigationAction 
              component={Link}
              href="/visitor"
              label="작품 검색" 
              icon={<SearchIcon />} 
            />
            <BottomNavigationAction 
              component={Link}
              href="/visitor/ai-docent"
              label="AI 도슨트" 
              icon={<ChatIcon />} 
            />
            <BottomNavigationAction 
              component={Link}
              href="/visitor/route"
              label="전시관 지도" 
              icon={<MapIcon />} 
            />
            <BottomNavigationAction 
              component={Link}
              href="/visitor/history"
              label="관람 내역" 
              icon={<HistoryIcon />} 
            />
          </BottomNavigation>
        </Paper>
        
        {/* 프로필 모달 */}
        <Dialog 
          open={profileOpen} 
          onClose={handleProfileClose}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6">내 프로필 수정</Typography>
            <IconButton onClick={handleProfileClose} size="small">
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent dividers>
            <Box component="form" sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                fullWidth
                label="이름"
                name="name"
                value={editedUser.name}
                onChange={handleInputChange}
                variant="outlined"
                size="small"
              />
              
              <TextField
                margin="normal"
                fullWidth
                label="이메일"
                name="email"
                type="email"
                value={editedUser.email || ''}
                onChange={handleInputChange}
                variant="outlined"
                size="small"
              />
              
              <TextField
                margin="normal"
                fullWidth
                label="전화번호"
                name="phone"
                value={editedUser.phone || ''}
                onChange={handleInputChange}
                variant="outlined"
                size="small"
              />
              
              <FormControl fullWidth margin="normal" size="small">
                <InputLabel>연령대</InputLabel>
                <Select
                  name="ageGroup"
                  value={editedUser.ageGroup || ''}
                  label="연령대"
                  onChange={handleInputChange}
                >
                  <MenuItem value="10대 이하">10대 이하</MenuItem>
                  <MenuItem value="20-30대">20-30대</MenuItem>
                  <MenuItem value="40-50대">40-50대</MenuItem>
                  <MenuItem value="60대 이상">60대 이상</MenuItem>
                </Select>
              </FormControl>
              
              <FormControl fullWidth margin="normal" size="small">
                <InputLabel>관심사</InputLabel>
                <Select
                  multiple
                  name="interests"
                  value={editedUser.interests || []}
                  label="관심사"
                  onChange={handleInterestsChange}
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value} label={value} size="small" />
                      ))}
                    </Box>
                  )}
                >
                  {interestOptions.map((interest) => (
                    <MenuItem key={interest} value={interest}>
                      {interest}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              
              <TextField
                margin="normal"
                fullWidth
                label="방문 목적"
                name="visitPurpose"
                value={editedUser.visitPurpose || ''}
                onChange={handleInputChange}
                variant="outlined"
                size="small"
                multiline
                rows={2}
              />
            </Box>
          </DialogContent>
          <DialogActions sx={{ px: 3, py: 2 }}>
            <Button 
              onClick={handleProfileClose} 
              variant="outlined"
              color="inherit"
            >
              취소
            </Button>
            <Button 
              onClick={handleSaveProfile} 
              variant="contained"
              color="primary"
              startIcon={<SaveIcon />}
            >
              저장하기
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </ThemeProvider>
  );
}
