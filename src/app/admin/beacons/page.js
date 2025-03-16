'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { mockAdminData } from '@/lib/data/mockData';

// Material UI 컴포넌트 import
import { 
  Box, Container, Grid, Paper, Typography, Button, TextField, 
  List, ListItem, ListItemText, ListItemIcon, Divider, 
  Card, CardContent, CardHeader, CardActions, IconButton,
  Chip, LinearProgress, InputAdornment, Stack
} from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AddIcon from '@mui/icons-material/Add';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import SettingsIcon from '@mui/icons-material/Settings';
import InfoIcon from '@mui/icons-material/Info';

// Material UI 테마 생성
const theme = createTheme({
  palette: {
    primary: {
      main: '#3B82F6',
    },
    secondary: {
      main: '#10B981',
    },
    error: {
      main: '#EF4444',
    },
    warning: {
      main: '#F59E0B',
    },
    info: {
      main: '#3B82F6',
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          overflow: 'visible',
        },
      },
    },
  },
});

export default function BeaconManagement() {
  const [beacons, setBeacons] = useState(mockAdminData.beacons);
  const [selectedBeacon, setSelectedBeacon] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [forceRender, setForceRender] = useState(0);

  // 컴포넌트 마운트 후 지도 렌더링을 위한 useEffect
  useEffect(() => {
    // 컴포넌트 마운트 후 약간의 지연을 두고 강제 리렌더링
    const timer = setTimeout(() => {
      setForceRender(prev => prev + 1);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  // 비콘 상태 변경 처리
  const toggleBeaconStatus = (id) => {
    setBeacons(beacons.map(beacon => 
      beacon.id === id 
        ? { ...beacon, status: beacon.status === 'active' ? 'inactive' : 'active' } 
        : beacon
    ));
  };

  // 비콘 검색 필터링
  const filteredBeacons = beacons.filter(beacon => 
    beacon.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    beacon.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    beacon.id.toString().includes(searchTerm)
  );

  // 배터리 색상 결정 함수
  const getBatteryColor = (level) => {
    if (level > 70) return 'success';
    if (level > 30) return 'warning';
    return 'error';
  };

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="xl" sx={{ bgcolor: '#F9FAFB', minHeight: '100vh', py: 3 }}>
        {/* 헤더 */}
        <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box>
            <Typography variant="h4" fontWeight="bold" color="text.primary">비콘 관리</Typography>
            <Typography variant="body1" color="text.secondary">전시관 내 비콘 장치 관리 및 모니터링</Typography>
          </Box>
          <Button 
            component={Link} 
            href="/admin" 
            variant="outlined" 
            startIcon={<DashboardIcon />}
          >
            대시보드로 돌아가기
          </Button>
        </Box>

        <Grid container spacing={3}>
          {/* 비콘 목록 */}
          <Grid item xs={12} lg={4}>
            <Paper elevation={1} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <Box sx={{ p: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
                <TextField
                  fullWidth
                  placeholder="비콘 검색..."
                  size="small"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
              
              <Box sx={{ 
                overflow: 'auto', 
                flexGrow: 1, 
                maxHeight: 'calc(100vh - 300px)'
              }}>
                {filteredBeacons.length === 0 ? (
                  <Box sx={{ p: 4, textAlign: 'center', color: 'text.secondary' }}>
                    검색 결과가 없습니다
                  </Box>
                ) : (
                  <List disablePadding>
                    {filteredBeacons.map((beacon) => (
                      <ListItem 
                        key={beacon.id}
                        button
                        divider
                        selected={selectedBeacon?.id === beacon.id}
                        onClick={() => setSelectedBeacon(beacon)}
                        sx={{ 
                          px: 2, 
                          py: 1.5,
                          '&.Mui-selected': {
                            bgcolor: 'primary.lighter',
                            '&:hover': {
                              bgcolor: 'primary.lighter',
                            }
                          }
                        }}
                      >
                        <ListItemText
                          primary={
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                              <Typography variant="subtitle1">{beacon.name}</Typography>
                              <Chip 
                                size="small"
                                label={beacon.status === 'active' ? '활성' : '비활성'}
                                color={beacon.status === 'active' ? 'success' : 'error'}
                                sx={{ height: 24 }}
                              />
                            </Box>
                          }
                          secondary={
                            <>
                              <Typography variant="body2" color="text.secondary">{beacon.location}</Typography>
                              <Box sx={{ mt: 1, display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'text.secondary' }}>
                                <span>ID: {beacon.id}</span>
                                <span>배터리: {beacon.battery}%</span>
                                <span>신호: {beacon.signalStrength}</span>
                              </Box>
                            </>
                          }
                        />
                      </ListItem>
                    ))}
                  </List>
                )}
              </Box>
              
              <Box sx={{ p: 2, borderTop: '1px solid', borderColor: 'divider', bgcolor: 'grey.50' }}>
                <Button 
                  variant="contained" 
                  fullWidth
                  startIcon={<AddIcon />}
                >
                  새 비콘 추가
                </Button>
              </Box>
            </Paper>
          </Grid>

          {/* 비콘 상세 정보 및 지도 */}
          <Grid item xs={12} lg={8}>
            <Grid container spacing={3} direction="column" sx={{ height: '100%' }}>
              {/* 지도 */}
              <Grid item xs={12}>
                <Paper elevation={1}>
                  <Box sx={{ p: 2, borderBottom: '1px solid', borderColor: 'divider', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h6" fontWeight="bold">비콘 위치 지도</Typography>
                    <Stack direction="row" spacing={2}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: 'success.main', mr: 0.5 }}></Box>
                        <Typography variant="caption">활성</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: 'error.main', mr: 0.5 }}></Box>
                        <Typography variant="caption">비활성</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: 'warning.main', mr: 0.5 }}></Box>
                        <Typography variant="caption">선택됨</Typography>
                      </Box>
                    </Stack>
                  </Box>
                  <Box sx={{ height: 280, p: 2, position: 'relative' }}>
                    {/* 간단한 박물관 도면 */}
                    <Box sx={{ 
                      width: '100%', 
                      height: '100%', 
                      border: '2px solid', 
                      borderColor: 'grey.300', 
                      borderRadius: 1, 
                      bgcolor: 'grey.50', 
                      display: 'flex', 
                      flexDirection: 'column' 
                    }}>
                      {/* 상단 층 */}
                      <Box sx={{ flex: 1, display: 'flex', borderBottom: '1px solid', borderColor: 'grey.300' }}>
                        <Box sx={{ 
                          width: '50%', 
                          borderRight: '1px solid', 
                          borderColor: 'grey.300', 
                          p: 2, 
                          display: 'flex', 
                          flexDirection: 'column', 
                          justifyContent: 'center', 
                          alignItems: 'center' 
                        }}>
                          <Typography variant="body2" fontWeight="medium" sx={{ mb: 1 }}>전시실 A</Typography>
                          <Box sx={{ display: 'flex', gap: 2 }}>
                            <Box sx={{ 
                              width: 16, 
                              height: 16, 
                              borderRadius: '50%', 
                              bgcolor: selectedBeacon?.location === '전시실 A-1' ? 'warning.main' : 'success.main' 
                            }}></Box>
                            <Box sx={{ 
                              width: 16, 
                              height: 16, 
                              borderRadius: '50%', 
                              bgcolor: selectedBeacon?.location === '전시실 A-2' ? 'warning.main' : 'success.main' 
                            }}></Box>
                          </Box>
                        </Box>
                        <Box sx={{ 
                          width: '50%', 
                          p: 2, 
                          display: 'flex', 
                          flexDirection: 'column', 
                          justifyContent: 'center', 
                          alignItems: 'center' 
                        }}>
                          <Typography variant="body2" fontWeight="medium" sx={{ mb: 1 }}>전시실 B</Typography>
                          <Box sx={{ display: 'flex', gap: 2 }}>
                            <Box sx={{ 
                              width: 16, 
                              height: 16, 
                              borderRadius: '50%', 
                              bgcolor: selectedBeacon?.location === '전시실 B-1' ? 'warning.main' : 'error.main' 
                            }}></Box>
                            <Box sx={{ 
                              width: 16, 
                              height: 16, 
                              borderRadius: '50%', 
                              bgcolor: selectedBeacon?.location === '전시실 B-2' ? 'warning.main' : 'success.main' 
                            }}></Box>
                          </Box>
                        </Box>
                      </Box>
                      
                      {/* 하단 층 */}
                      <Box sx={{ flex: 1, display: 'flex' }}>
                        <Box sx={{ 
                          width: '50%', 
                          borderRight: '1px solid', 
                          borderColor: 'grey.300', 
                          p: 2, 
                          display: 'flex', 
                          flexDirection: 'column', 
                          justifyContent: 'center', 
                          alignItems: 'center' 
                        }}>
                          <Typography variant="body2" fontWeight="medium" sx={{ mb: 1 }}>전시실 C</Typography>
                          <Box sx={{ display: 'flex', gap: 2 }}>
                            <Box sx={{ 
                              width: 16, 
                              height: 16, 
                              borderRadius: '50%', 
                              bgcolor: selectedBeacon?.location === '전시실 C-1' ? 'warning.main' : 'success.main' 
                            }}></Box>
                            <Box sx={{ 
                              width: 16, 
                              height: 16, 
                              borderRadius: '50%', 
                              bgcolor: selectedBeacon?.location === '전시실 C-2' ? 'warning.main' : 'success.main' 
                            }}></Box>
                          </Box>
                        </Box>
                        <Box sx={{ 
                          width: '50%', 
                          p: 2, 
                          display: 'flex', 
                          flexDirection: 'column', 
                          justifyContent: 'center', 
                          alignItems: 'center' 
                        }}>
                          <Typography variant="body2" fontWeight="medium" sx={{ mb: 1 }}>전시실 D</Typography>
                          <Box sx={{ display: 'flex', gap: 2 }}>
                            <Box sx={{ 
                              width: 16, 
                              height: 16, 
                              borderRadius: '50%', 
                              bgcolor: selectedBeacon?.location === '전시실 D-1' ? 'warning.main' : 'success.main' 
                            }}></Box>
                            <Box sx={{ 
                              width: 16, 
                              height: 16, 
                              borderRadius: '50%', 
                              bgcolor: selectedBeacon?.location === '전시실 D-2' ? 'warning.main' : 'error.main' 
                            }}></Box>
                          </Box>
                        </Box>
                      </Box>
                      
                      {/* 입구 */}
                      <Box sx={{ 
                        position: 'absolute', 
                        bottom: 40, 
                        left: '50%', 
                        transform: 'translateX(-50%)',
                        textAlign: 'center'
                      }}>
                        <Typography variant="body2" fontWeight="medium" sx={{ mb: 0.5 }}>입구</Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                          <Box sx={{ 
                            width: 16, 
                            height: 16, 
                            borderRadius: '50%', 
                            bgcolor: selectedBeacon?.location === '입구' ? 'warning.main' : 'success.main' 
                          }}></Box>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </Paper>
              </Grid>

              {/* 비콘 상세 정보 */}
              <Grid item xs={12}>
                <Paper elevation={1}>
                  <Box sx={{ p: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
                    <Typography variant="h6" fontWeight="bold">비콘 상세 정보</Typography>
                  </Box>
                  
                  {selectedBeacon ? (
                    <Box sx={{ p: 3 }}>
                      <Grid container spacing={3} sx={{ mb: 3 }}>
                        <Grid item xs={12} sm={6}>
                          <Typography variant="body2" color="text.secondary" gutterBottom>비콘 ID</Typography>
                          <Typography variant="body1" fontWeight="medium">{selectedBeacon.id}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <Typography variant="body2" color="text.secondary" gutterBottom>상태</Typography>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Box 
                              sx={{ 
                                width: 12, 
                                height: 12, 
                                borderRadius: '50%', 
                                bgcolor: selectedBeacon.status === 'active' ? 'success.main' : 'error.main',
                                mr: 1
                              }}
                            />
                            <Typography>{selectedBeacon.status === 'active' ? '활성' : '비활성'}</Typography>
                          </Box>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <Typography variant="body2" color="text.secondary" gutterBottom>이름</Typography>
                          <Typography variant="body1" fontWeight="medium">{selectedBeacon.name}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <Typography variant="body2" color="text.secondary" gutterBottom>위치</Typography>
                          <Typography variant="body1" fontWeight="medium">{selectedBeacon.location}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <Typography variant="body2" color="text.secondary" gutterBottom>배터리</Typography>
                          <LinearProgress 
                            variant="determinate" 
                            value={selectedBeacon.battery} 
                            color={getBatteryColor(selectedBeacon.battery)}
                            sx={{ height: 8, borderRadius: 1 }}
                          />
                          <Typography variant="caption" sx={{ display: 'block', textAlign: 'right', mt: 0.5 }}>
                            {selectedBeacon.battery}%
                          </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <Typography variant="body2" color="text.secondary" gutterBottom>신호 강도</Typography>
                          <Typography variant="body1" fontWeight="medium">{selectedBeacon.signalStrength}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <Typography variant="body2" color="text.secondary" gutterBottom>마지막 활동</Typography>
                          <Typography variant="body1" fontWeight="medium">{selectedBeacon.lastActive}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <Typography variant="body2" color="text.secondary" gutterBottom>연결된 전시품</Typography>
                          <Typography variant="body1" fontWeight="medium">{selectedBeacon.connectedExhibit}</Typography>
                        </Grid>
                      </Grid>
                      
                      <Stack direction="row" spacing={2}>
                        <Button 
                          variant="contained" 
                          fullWidth
                          startIcon={<PowerSettingsNewIcon />}
                          onClick={() => toggleBeaconStatus(selectedBeacon.id)}
                        >
                          {selectedBeacon.status === 'active' ? '비활성화' : '활성화'}
                        </Button>
                        <Button 
                          variant="outlined" 
                          fullWidth
                          startIcon={<SettingsIcon />}
                        >
                          설정 변경
                        </Button>
                      </Stack>
                    </Box>
                  ) : (
                    <Box sx={{ p: 6, textAlign: 'center', color: 'text.secondary' }}>
                      <InfoIcon sx={{ fontSize: 48, color: 'text.disabled', mb: 2 }} />
                      <Typography>비콘을 선택하여 상세 정보를 확인하세요</Typography>
                    </Box>
                  )}
                </Paper>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
}
