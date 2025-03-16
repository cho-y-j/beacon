'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';

// Material UI 컴포넌트
import {
  Box,
  Container,
  Typography,
  Paper,
  Tabs,
  Tab,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Chip,
  Card,
  CardContent,
  CardMedia,
  AppBar,
  Toolbar,
  IconButton,
  Button,
  BottomNavigation,
  BottomNavigationAction,
  Stack,
  Badge,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  TextField,
  InputAdornment
} from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { styled } from '@mui/material/styles';

// Material UI 아이콘
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import HomeIcon from '@mui/icons-material/Home';
import MapIcon from '@mui/icons-material/Map';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import HistoryIcon from '@mui/icons-material/History';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import FilterListIcon from '@mui/icons-material/FilterList';
import SearchIcon from '@mui/icons-material/Search';

// 목업 데이터 - 실제 앱에서는 API 호출로 대체
const mockVisitHistory = [
  {
    date: '2024-03-15',
    exhibits: [
      { id: 1, name: '모나리자', time: '14:30', duration: 15, image: '/images/exhibits/mona-lisa.jpg' },
      { id: 2, name: '별이 빛나는 밤', time: '15:10', duration: 12, image: '/images/exhibits/starry-night.jpg' },
      { id: 3, name: '진주 귀걸이를 한 소녀', time: '15:45', duration: 8, image: '/images/exhibits/girl-with-pearl.jpg' },
    ]
  },
  {
    date: '2024-03-10',
    exhibits: [
      { id: 4, name: '그리스 조각상 컬렉션', time: '11:20', duration: 25, image: '/images/exhibits/greek-sculptures.jpg' },
      { id: 5, name: '이집트 미라', time: '12:15', duration: 18, image: '/images/exhibits/egyptian-mummy.jpg' },
    ]
  },
  {
    date: '2024-03-05',
    exhibits: [
      { id: 6, name: '공룡 화석', time: '13:40', duration: 30, image: '/images/exhibits/dinosaur.jpg' },
      { id: 7, name: '우주 탐사 전시', time: '14:30', duration: 22, image: '/images/exhibits/space.jpg' },
      { id: 8, name: '해양 생물 전시', time: '15:15', duration: 17, image: '/images/exhibits/marine.jpg' },
    ]
  }
];

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
    fontFamily: '"Pretendard", "Roboto", "Helvetica", "Arial", sans-serif',
  },
});

// 스타일링된 컴포넌트
const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: 'ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}));

export default function VisitHistory() {
  const router = useRouter();
  const [value, setValue] = useState(0);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [visitHistory, setVisitHistory] = useState(mockVisitHistory);

  // 필터링된 방문 기록
  const filteredHistory = visitHistory.filter(day => {
    if (filter === 'all') return true;
    if (filter === 'today') return day.date === format(new Date(), 'yyyy-MM-dd');
    if (filter === 'week') {
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
      return new Date(day.date) >= oneWeekAgo;
    }
    if (filter === 'month') {
      const oneMonthAgo = new Date();
      oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
      return new Date(day.date) >= oneMonthAgo;
    }
    return true;
  });

  // 검색어로 필터링
  const searchFilteredHistory = filteredHistory.map(day => {
    const filteredExhibits = day.exhibits.filter(exhibit => 
      exhibit.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return {
      ...day,
      exhibits: filteredExhibits
    };
  }).filter(day => day.exhibits.length > 0);

  // 하단 네비게이션 변경 핸들러
  const handleChange = (event, newValue) => {
    setValue(newValue);
    
    // 네비게이션에 따라 페이지 이동
    if (newValue === 0) router.push('/visitor');
    if (newValue === 1) router.push('/visitor/route');
    if (newValue === 2) router.push('/visitor/ai-docent');
    // 현재 페이지가 history이므로 newValue === 3일 때는 이동하지 않음
  };

  // 필터 변경 핸들러
  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  // 검색어 변경 핸들러
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // 날짜 포맷 함수
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, 'yyyy년 MM월 dd일 (eee)', { locale: ko });
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ pb: 7, bgcolor: 'background.default', minHeight: '100vh' }}>
        {/* 앱바 */}
        <AppBar position="static" color="primary" elevation={0}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="back"
              onClick={() => router.push('/visitor')}
            >
              <ArrowBackIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              나의 관람 내역
            </Typography>
          </Toolbar>
        </AppBar>

        <Container maxWidth="sm" sx={{ pt: 2 }}>
          {/* 필터 및 검색 */}
          <Paper elevation={1} sx={{ p: 2, mb: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth size="small">
                  <InputLabel>기간 필터</InputLabel>
                  <Select
                    value={filter}
                    label="기간 필터"
                    onChange={handleFilterChange}
                    startAdornment={
                      <InputAdornment position="start">
                        <FilterListIcon fontSize="small" />
                      </InputAdornment>
                    }
                  >
                    <MenuItem value="all">전체 기간</MenuItem>
                    <MenuItem value="today">오늘</MenuItem>
                    <MenuItem value="week">최근 1주일</MenuItem>
                    <MenuItem value="month">최근 1개월</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="전시품 검색"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon fontSize="small" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
            </Grid>
          </Paper>

          {/* 방문 내역 */}
          {searchFilteredHistory.length > 0 ? (
            searchFilteredHistory.map((day, index) => (
              <Paper key={index} elevation={1} sx={{ mb: 2, overflow: 'hidden' }}>
                <Box sx={{ p: 2, bgcolor: 'primary.main', color: 'white' }}>
                  <Typography variant="subtitle1" sx={{ display: 'flex', alignItems: 'center' }}>
                    <CalendarTodayIcon fontSize="small" sx={{ mr: 1 }} />
                    {formatDate(day.date)}
                  </Typography>
                </Box>
                <Divider />
                <List disablePadding>
                  {day.exhibits.map((exhibit, i) => (
                    <ListItem 
                      key={i} 
                      divider={i < day.exhibits.length - 1}
                      sx={{ 
                        '&:hover': { 
                          bgcolor: 'rgba(0, 0, 0, 0.04)' 
                        } 
                      }}
                    >
                      <ListItemAvatar>
                        <Avatar 
                          variant="rounded" 
                          src={exhibit.image}
                          sx={{ width: 60, height: 60, mr: 1 }}
                        >
                          {exhibit.name.charAt(0)}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={exhibit.name}
                        secondary={
                          <Stack direction="row" spacing={2} alignItems="center">
                            <Typography variant="body2" component="span" sx={{ display: 'flex', alignItems: 'center' }}>
                              <AccessTimeIcon fontSize="small" sx={{ mr: 0.5 }} />
                              {exhibit.time}
                            </Typography>
                            <Chip 
                              size="small" 
                              label={`${exhibit.duration}분`} 
                              color="primary" 
                              variant="outlined"
                            />
                          </Stack>
                        }
                      />
                    </ListItem>
                  ))}
                </List>
              </Paper>
            ))
          ) : (
            <Paper elevation={1} sx={{ p: 3, textAlign: 'center' }}>
              <Typography variant="body1" color="text.secondary">
                {searchTerm ? '검색 결과가 없습니다.' : '관람 내역이 없습니다.'}
              </Typography>
              {searchTerm && (
                <Button 
                  variant="outlined" 
                  sx={{ mt: 2 }}
                  onClick={() => setSearchTerm('')}
                >
                  검색 초기화
                </Button>
              )}
            </Paper>
          )}

          {/* 통계 요약 */}
          <Paper elevation={1} sx={{ p: 2, mb: 2 }}>
            <Typography variant="h6" gutterBottom>관람 통계</Typography>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Card variant="outlined">
                  <CardContent sx={{ textAlign: 'center', p: 1, '&:last-child': { pb: 1 } }}>
                    <Typography variant="h4" color="primary">
                      {visitHistory.reduce((acc, day) => acc + day.exhibits.length, 0)}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      총 관람
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={4}>
                <Card variant="outlined">
                  <CardContent sx={{ textAlign: 'center', p: 1, '&:last-child': { pb: 1 } }}>
                    <Typography variant="h4" color="primary">
                      {visitHistory.length}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      방문일
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={4}>
                <Card variant="outlined">
                  <CardContent sx={{ textAlign: 'center', p: 1, '&:last-child': { pb: 1 } }}>
                    <Typography variant="h4" color="primary">
                      {Math.round(
                        visitHistory.reduce((acc, day) => 
                          acc + day.exhibits.reduce((sum, ex) => sum + ex.duration, 0), 0
                        ) / 60
                      )}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      총 시간(시)
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Paper>
        </Container>

        {/* 하단 네비게이션 */}
        <Paper 
          sx={{ 
            position: 'fixed', 
            bottom: 0, 
            left: 0, 
            right: 0,
            zIndex: 1000
          }} 
          elevation={3}
        >
          <BottomNavigation
            value={value}
            onChange={handleChange}
            showLabels
          >
            <BottomNavigationAction label="홈" icon={<HomeIcon />} />
            <BottomNavigationAction label="전시 지도" icon={<MapIcon />} />
            <BottomNavigationAction label="AI 도슨트" icon={<SmartToyIcon />} />
            <BottomNavigationAction label="관람 내역" icon={<HistoryIcon />} />
          </BottomNavigation>
        </Paper>
      </Box>
    </ThemeProvider>
  );
} 