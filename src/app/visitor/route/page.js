'use client';

import { useState } from 'react';
import Link from 'next/link';
import { mockVisitorData } from '@/lib/data/mockData';

// Material UI 컴포넌트 import
import { 
  Box, Container, Typography, Paper, Card, CardContent, CardMedia,
  AppBar, Toolbar, IconButton, BottomNavigation, BottomNavigationAction,
  Chip, Divider, List, ListItem, ListItemText, Avatar, Grid, Button,
  Tabs, Tab, Fade, Grow, Zoom
} from '@mui/material';
import { ThemeProvider, createTheme, styled } from '@mui/material/styles';

// Material UI 아이콘 import
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import HomeIcon from '@mui/icons-material/Home';
import ChatIcon from '@mui/icons-material/Chat';
import MapIcon from '@mui/icons-material/Map';
import HistoryIcon from '@mui/icons-material/History';
import BarChartIcon from '@mui/icons-material/BarChart';
import RefreshIcon from '@mui/icons-material/Refresh';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import GroupsIcon from '@mui/icons-material/Groups';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

// Material UI 테마 생성
const theme = createTheme({
  palette: {
    primary: {
      main: '#3B82F6',
      lighter: '#EFF6FF',
      light: '#93C5FD',
    },
    secondary: {
      main: '#10B981',
    },
    error: {
      main: '#EF4444',
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

// 스타일링된 컴포넌트
const FloorTab = styled(Tab)(({ theme }) => ({
  minWidth: 0,
  flex: 1,
  fontSize: '0.875rem',
  fontWeight: 500,
}));

export default function VisitorRoute() {
  const [routeData] = useState(mockVisitorData.recommendedRoute);
  const [currentFloor, setCurrentFloor] = useState('1F');
  const [value, setValue] = useState(2); // 하단 네비게이션 선택 값

  const handleFloorChange = (event, newValue) => {
    setCurrentFloor(newValue);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ 
        maxWidth: '500px', 
        mx: 'auto', 
        bgcolor: 'background.default', 
        minHeight: '100vh',
        pb: 10 // 하단 네비게이션 공간 확보
      }}>
        {/* 상단 네비게이션 */}
        <AppBar position="sticky" color="default" elevation={1}>
          <Toolbar>
            <IconButton 
              edge="start" 
              component={Link} 
              href="/visitor"
              sx={{ mr: 2 }}
            >
              <ArrowBackIcon />
            </IconButton>
            <Typography variant="h6" fontWeight="bold" align="center" sx={{ flexGrow: 1 }}>
              맞춤 관람 경로
            </Typography>
          </Toolbar>
        </AppBar>

        {/* 관람 경로 정보 */}
        <Box sx={{ p: 2 }}>
          <Fade in timeout={500}>
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                당신을 위한 최적 관람 경로
              </Typography>
              <Typography variant="body2" color="text.secondary">
                (예상 소요시간: {routeData.totalTime})
              </Typography>
            </Box>
          </Fade>

          {/* 박물관 도면 지도 */}
          <Zoom in timeout={500}>
            <Paper elevation={2} sx={{ mb: 4, overflow: 'hidden', borderRadius: 2 }}>
              {/* 층 선택 탭 */}
              <Tabs
                value={currentFloor}
                onChange={handleFloorChange}
                variant="fullWidth"
                indicatorColor="primary"
                textColor="primary"
              >
                <FloorTab value="1F" label="1F" />
                <FloorTab value="2F" label="2F" />
                <FloorTab value="3F" label="3F" />
              </Tabs>
              
              {/* 지도 영역 */}
              <Box sx={{ p: 2 }}>
                <Box sx={{ 
                  height: 260, 
                  border: '2px solid', 
                  borderColor: 'grey.200', 
                  borderRadius: 1, 
                  bgcolor: 'grey.50', 
                  position: 'relative' 
                }}>
                  {/* 전시실 레이아웃 */}
                  <Box sx={{ 
                    position: 'absolute', 
                    inset: '16px', 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(3, 1fr)', 
                    gridTemplateRows: 'repeat(3, 1fr)', 
                    gap: 1 
                  }}>
                    {/* 전시실 A */}
                    <Box sx={{ 
                      gridColumn: '1 / 2', 
                      gridRow: '1 / 3', 
                      border: '1px solid', 
                      borderColor: 'grey.300', 
                      borderRadius: 1, 
                      bgcolor: 'background.paper', 
                      p: 1, 
                      display: 'flex', 
                      flexDirection: 'column', 
                      justifyContent: 'center', 
                      alignItems: 'center' 
                    }}>
                      <Typography variant="caption" fontWeight="medium" sx={{ mb: 1 }}>
                        전시실 A
                      </Typography>
                      <FiberManualRecordIcon sx={{ fontSize: 12, color: 'primary.main' }} />
                    </Box>
                    
                    {/* 전시실 B */}
                    <Box sx={{ 
                      gridColumn: '2 / 4', 
                      gridRow: '1 / 2', 
                      border: '1px solid', 
                      borderColor: 'grey.300', 
                      borderRadius: 1, 
                      bgcolor: 'background.paper', 
                      p: 1, 
                      display: 'flex', 
                      justifyContent: 'center', 
                      alignItems: 'center' 
                    }}>
                      <Typography variant="caption" fontWeight="medium" sx={{ mr: 1 }}>
                        전시실 B
                      </Typography>
                      <FiberManualRecordIcon sx={{ fontSize: 12, color: 'success.main' }} />
                    </Box>
                    
                    {/* 전시실 C */}
                    <Box sx={{ 
                      gridColumn: '2 / 3', 
                      gridRow: '2 / 3', 
                      border: '1px solid', 
                      borderColor: 'grey.300', 
                      borderRadius: 1, 
                      bgcolor: 'background.paper', 
                      p: 1, 
                      display: 'flex', 
                      justifyContent: 'center', 
                      alignItems: 'center' 
                    }}>
                      <Typography variant="caption" fontWeight="medium" sx={{ mr: 1 }}>
                        전시실 C
                      </Typography>
                    </Box>
                    
                    {/* 전시실 D */}
                    <Box sx={{ 
                      gridColumn: '3 / 4', 
                      gridRow: '2 / 3', 
                      border: '1px solid', 
                      borderColor: 'grey.300', 
                      borderRadius: 1, 
                      bgcolor: 'background.paper', 
                      p: 1, 
                      display: 'flex', 
                      justifyContent: 'center', 
                      alignItems: 'center' 
                    }}>
                      <Typography variant="caption" fontWeight="medium" sx={{ mr: 1 }}>
                        전시실 D
                      </Typography>
                      <FiberManualRecordIcon sx={{ fontSize: 12, color: 'error.main' }} />
                    </Box>
                    
                    {/* 로비 */}
                    <Box sx={{ 
                      gridColumn: '1 / 4', 
                      gridRow: '3 / 4', 
                      border: '1px solid', 
                      borderColor: 'grey.300', 
                      borderRadius: 1, 
                      bgcolor: 'background.paper', 
                      p: 1, 
                      display: 'flex', 
                      justifyContent: 'center', 
                      alignItems: 'center' 
                    }}>
                      <Typography variant="caption" fontWeight="medium">
                        로비
                      </Typography>
                    </Box>
                    
                    {/* 경로 표시 */}
                    <Box sx={{ 
                      position: 'absolute', 
                      top: '25%', 
                      left: '25%', 
                      width: '50%', 
                      height: '50%', 
                      pointerEvents: 'none' 
                    }}>
                      <svg width="100%" height="100%" viewBox="0 0 100 100">
                        <path
                          d="M20,80 L20,40 L80,40 L80,20"
                          stroke="#3B82F6"
                          strokeWidth="3"
                          fill="none"
                          strokeDasharray="5,5"
                        />
                        <circle cx="20" cy="80" r="4" fill="#3B82F6" />
                        <circle cx="80" cy="20" r="4" fill="#3B82F6" />
                      </svg>
                    </Box>
                  </Box>
                  
                  {/* 현재 위치 표시 */}
                  <Chip
                    icon={<FiberManualRecordIcon sx={{ fontSize: 8, color: 'primary.main' }} />}
                    label="현재 위치"
                    size="small"
                    color="primary"
                    variant="outlined"
                    sx={{ 
                      position: 'absolute', 
                      bottom: 8, 
                      right: 8,
                      fontSize: '0.75rem',
                      height: 24,
                      '& .MuiChip-label': {
                        px: 1
                      }
                    }}
                  />
                </Box>
              </Box>
              
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                px: 2, 
                py: 1.5, 
                bgcolor: 'grey.50', 
                borderTop: '1px solid', 
                borderColor: 'divider' 
              }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <FiberManualRecordIcon sx={{ fontSize: 12, color: 'primary.main', mr: 0.5 }} />
                  <Typography variant="caption">현재 위치</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <FiberManualRecordIcon sx={{ fontSize: 12, color: 'success.main', mr: 0.5 }} />
                  <Typography variant="caption">추천 경로</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <FiberManualRecordIcon sx={{ fontSize: 12, color: 'error.main', mr: 0.5 }} />
                  <Typography variant="caption">주요 전시품</Typography>
                </Box>
              </Box>
            </Paper>
          </Zoom>

          {/* 추천 순서 */}
          <Fade in timeout={800}>
            <Box sx={{ mb: 4 }}>
              <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 2, color: 'text.primary' }}>
                추천 순서:
              </Typography>
              <List disablePadding>
                {routeData.route.map((item, index) => (
                  <Grow
                    key={index}
                    in
                    timeout={500 + (index * 100)}
                  >
                    <Paper
                      elevation={1}
                      sx={{ 
                        p: 1.5, 
                        mb: 1.5, 
                        borderRadius: 1,
                        bgcolor: item.status === '현재' ? 'primary.lighter' : 'background.paper',
                        border: '1px solid',
                        borderColor: item.status === '현재' ? 'primary.light' : 'divider',
                        transition: 'transform 0.2s',
                        '&:hover': {
                          transform: 'scale(1.02)',
                        },
                        '&:active': {
                          transform: 'scale(0.98)',
                        },
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar 
                          sx={{ 
                            width: 24, 
                            height: 24, 
                            bgcolor: 'primary.main', 
                            fontSize: '0.875rem',
                            mr: 1.5
                          }}
                        >
                          {index + 1}
                        </Avatar>
                        <Box>
                          <Typography variant="body2" fontWeight="medium">
                            {item.name} <Typography component="span" variant="caption" color="text.secondary">({item.floor})</Typography>
                          </Typography>
                          {item.status === '현재' && (
                            <Typography variant="caption" color="primary" fontWeight="medium">
                              현재 위치
                            </Typography>
                          )}
                        </Box>
                      </Box>
                    </Paper>
                  </Grow>
                ))}
              </List>
            </Box>
          </Fade>

          {/* 기능 버튼 */}
          <Fade in timeout={1000}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Button
                  variant="outlined"
                  fullWidth
                  startIcon={<RefreshIcon />}
                  sx={{ 
                    textTransform: 'none', 
                    py: 1.5,
                    justifyContent: 'flex-start',
                    color: 'text.primary',
                    borderColor: 'divider'
                  }}
                >
                  경로 재설정
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button
                  variant="outlined"
                  fullWidth
                  startIcon={<AccessTimeIcon />}
                  sx={{ 
                    textTransform: 'none', 
                    py: 1.5,
                    justifyContent: 'flex-start',
                    color: 'text.primary',
                    borderColor: 'divider'
                  }}
                >
                  시간 조정
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button
                  variant="outlined"
                  fullWidth
                  startIcon={<GroupsIcon />}
                  sx={{ 
                    textTransform: 'none', 
                    py: 1.5,
                    justifyContent: 'flex-start',
                    color: 'text.primary',
                    borderColor: 'divider'
                  }}
                >
                  단체 모드
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button
                  variant="outlined"
                  fullWidth
                  startIcon={<LocationOnIcon />}
                  sx={{ 
                    textTransform: 'none', 
                    py: 1.5,
                    justifyContent: 'flex-start',
                    color: 'text.primary',
                    borderColor: 'divider'
                  }}
                >
                  편의시설
                </Button>
              </Grid>
            </Grid>
          </Fade>
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
              label="홈" 
              icon={<HomeIcon />} 
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
              icon={<MapIcon color="primary" />} 
            />
            <BottomNavigationAction 
              component={Link}
              href="/visitor/history"
              label="관람 내역" 
              icon={<HistoryIcon />} 
            />
          </BottomNavigation>
        </Paper>
      </Box>
    </ThemeProvider>
  );
}
