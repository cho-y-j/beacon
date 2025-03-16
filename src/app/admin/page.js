'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { mockAdminData } from '@/lib/data/mockData';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { BarChart, Bar, Cell, Legend } from 'recharts';
import { PieChart, Pie } from 'recharts';
import { HeatMapCanvas } from '@nivo/heatmap';

// Material UI 컴포넌트 import
import { 
  Box, Container, Grid, Paper, Typography, Switch, FormControlLabel, 
  Select, MenuItem, Button, FormControl, InputLabel, Divider,
  Card, CardContent, CardHeader, IconButton, Stack
} from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import HomeIcon from '@mui/icons-material/Home';
import BarChartIcon from '@mui/icons-material/BarChart';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SettingsIcon from '@mui/icons-material/Settings';
import RefreshIcon from '@mui/icons-material/Refresh';
import PeopleIcon from '@mui/icons-material/People';

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

export default function AdminDashboard() {
  const [dashboardData, setDashboardData] = useState(mockAdminData.dashboard);
  const [popularExhibits, setPopularExhibits] = useState(mockAdminData.popularExhibits);
  const [aiPredictions, setAiPredictions] = useState(mockAdminData.aiPredictions);
  const [heatmapData, setHeatmapData] = useState(mockAdminData.heatmapData);
  const [updateInterval, setUpdateInterval] = useState(5000); // 기본 업데이트 간격: 5초
  const [isAutoUpdate, setIsAutoUpdate] = useState(true); // 자동 업데이트 활성화 여부
  const intervalRef = useRef(null);
  const [forceRender, setForceRender] = useState(0);
  
  // 실시간 데이터 업데이트 함수
  const updateData = () => {
    // 실제 환경에서는 API 호출 등을 통해 데이터를 가져옴
    // 여기서는 목업 데이터를 약간 변경하여 업데이트 효과를 시뮬레이션
    setDashboardData(prevData => ({
      ...prevData,
      realTimeVisitors: {
        ...prevData.realTimeVisitors,
        current: Math.floor(prevData.realTimeVisitors.current * (0.95 + Math.random() * 0.1))
      }
    }));
  };

  // 자동 업데이트 설정/해제
  useEffect(() => {
    if (isAutoUpdate) {
      intervalRef.current = setInterval(updateData, updateInterval);
    }
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isAutoUpdate, updateInterval]);
  
  // 컴포넌트 마운트 후 차트 렌더링을 위한 useEffect
  useEffect(() => {
    // 컴포넌트 마운트 후 약간의 지연을 두고 강제 리렌더링
    const timer = setTimeout(() => {
      setForceRender(prev => prev + 1);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);
  
  // 실시간 방문객 데이터 (예시)
  const visitorData = [
    { time: '09:00', visitors: 45 },
    { time: '10:00', visitors: 78 },
    { time: '11:00', visitors: 123 },
    { time: '12:00', visitors: 156 },
    { time: '13:00', visitors: 142 },
    { time: '14:00', visitors: dashboardData.realTimeVisitors.current },
  ];
  
  // 인기 전시품 차트 데이터
  const exhibitChartData = popularExhibits.map(exhibit => ({
    name: exhibit.name,
    viewTime: parseInt(exhibit.viewTime)
  }));

  // 업데이트 간격 변경 핸들러
  const handleIntervalChange = (event) => {
    setUpdateInterval(Number(event.target.value));
  };

  // 차트 컨테이너 스타일
  const chartContainerStyle = {
    width: '100%', 
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  };

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="xl" sx={{ bgcolor: '#F9FAFB', minHeight: '100vh', py: 3 }}>
        {/* 상단 헤더 */}
        <Paper elevation={1} sx={{ p: 2, mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h5" fontWeight="bold">AI 비콘 관리 시스템 - 대시보드</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography variant="body2" color="text.secondary">{dashboardData.date}</Typography>
            <Typography variant="body2" color="text.secondary">{dashboardData.adminName}</Typography>
          </Box>
        </Paper>

        {/* 데이터 업데이트 설정 */}
        <Paper elevation={1} sx={{ p: 2, mb: 3 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={6}>
              <FormControlLabel
                control={
                  <Switch
                    checked={isAutoUpdate}
                    onChange={() => setIsAutoUpdate(!isAutoUpdate)}
                    color="primary"
                  />
                }
                label="자동 업데이트"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Stack direction="row" spacing={2} alignItems="center" justifyContent="flex-end">
                <FormControl size="small" sx={{ minWidth: 120 }}>
                  <InputLabel>업데이트 간격</InputLabel>
                  <Select
                    value={updateInterval}
                    onChange={handleIntervalChange}
                    disabled={!isAutoUpdate}
                    label="업데이트 간격"
                  >
                    <MenuItem value={1000}>1초</MenuItem>
                    <MenuItem value={2000}>2초</MenuItem>
                    <MenuItem value={5000}>5초</MenuItem>
                    <MenuItem value={10000}>10초</MenuItem>
                    <MenuItem value={30000}>30초</MenuItem>
                  </Select>
                </FormControl>
                <Button 
                  variant="contained" 
                  startIcon={<RefreshIcon />}
                  onClick={updateData}
                >
                  지금 업데이트
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </Paper>

        {/* 상단 위젯 */}
        <Grid container spacing={3} sx={{ mb: 3 }}>
          {/* 실시간 방문객 현황 */}
          <Grid item xs={12} md={4}>
            <Paper elevation={1} sx={{ p: 2, height: '100%' }}>
              <Typography variant="h6" fontWeight="bold" gutterBottom>실시간 방문객 현황</Typography>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography>현재:</Typography>
                <Typography fontWeight="bold">{dashboardData.realTimeVisitors.current}명</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography>최대 수용:</Typography>
                <Typography>{dashboardData.realTimeVisitors.capacity}명</Typography>
              </Box>
              <Box sx={{ height: 180, width: '100%', ...chartContainerStyle }}>
                <ResponsiveContainer key={`visitor-chart-${forceRender}`} width="99%" height="99%">
                  <LineChart
                    data={visitorData}
                    margin={{ top: 5, right: 5, left: 0, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" fontSize={10} />
                    <YAxis fontSize={10} />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="visitors" 
                      stroke="#3B82F6" 
                      strokeWidth={2}
                      dot={{ r: 2 }}
                      activeDot={{ r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Box>
            </Paper>
          </Grid>

          {/* 오늘의 주요 지표 */}
          <Grid item xs={12} md={4}>
            <Paper elevation={1} sx={{ p: 2, height: '100%' }}>
              <Typography variant="h6" fontWeight="bold" gutterBottom>오늘의 주요 지표</Typography>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography>총 방문객:</Typography>
                <Typography fontWeight="bold">{dashboardData.dailyMetrics.totalVisitors}명</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography>평균 체류:</Typography>
                <Typography>{dashboardData.dailyMetrics.averageStay}분</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography>재방문율:</Typography>
                <Typography>{dashboardData.dailyMetrics.returnRate}%</Typography>
              </Box>
              <Box sx={{ height: 140, width: '100%', mt: 2, ...chartContainerStyle }}>
                <ResponsiveContainer key={`metrics-chart-${forceRender}`} width="99%" height="99%">
                  <BarChart
                    data={[
                      { name: '방문객', value: dashboardData.dailyMetrics.totalVisitors },
                      { name: '체류', value: dashboardData.dailyMetrics.averageStay * 10 },
                      { name: '재방문', value: dashboardData.dailyMetrics.returnRate * 5 }
                    ]}
                    margin={{ top: 5, right: 5, left: 0, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" fontSize={10} />
                    <YAxis fontSize={10} />
                    <Tooltip />
                    <Bar dataKey="value" fill="#10B981" />
                  </BarChart>
                </ResponsiveContainer>
              </Box>
            </Paper>
          </Grid>

          {/* 알림 센터 */}
          <Grid item xs={12} md={4}>
            <Paper elevation={1} sx={{ p: 2, height: '100%' }}>
              <Typography variant="h6" fontWeight="bold" gutterBottom>알림 센터</Typography>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography>혼잡구역:</Typography>
                <Typography color="error" fontWeight="bold">{dashboardData.alerts.crowdedAreas}곳</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography>배터리 부족:</Typography>
                <Typography color="warning.main" fontWeight="bold">{dashboardData.alerts.lowBattery}</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography>시스템 알림:</Typography>
                <Typography color="primary" fontWeight="bold">{dashboardData.alerts.systemAlerts}</Typography>
              </Box>
              <Box sx={{ height: 140, width: '100%', mt: 2, ...chartContainerStyle }}>
                <ResponsiveContainer key={`pie-chart-${forceRender}`} width="99%" height="99%">
                  <PieChart>
                    <Pie
                      data={[
                        { name: '혼잡구역', value: dashboardData.alerts.crowdedAreas, fill: '#EF4444' },
                        { name: '배터리 부족', value: dashboardData.alerts.lowBattery, fill: '#F59E0B' },
                        { name: '시스템 알림', value: dashboardData.alerts.systemAlerts, fill: '#3B82F6' }
                      ]}
                      cx="50%"
                      cy="50%"
                      innerRadius={30}
                      outerRadius={60}
                      paddingAngle={5}
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      labelLine={false}
                    />
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </Box>
            </Paper>
          </Grid>
        </Grid>

        {/* 방문객 밀도 히트맵 */}
        <Paper elevation={1} sx={{ p: 2, mb: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6" fontWeight="bold">방문객 밀도 히트맵</Typography>
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <Select
                defaultValue="realtime"
                size="small"
              >
                <MenuItem value="realtime">실시간</MenuItem>
                <MenuItem value="today">오늘</MenuItem>
                <MenuItem value="week">이번 주</MenuItem>
                <MenuItem value="month">이번 달</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box sx={{ height: 300, width: '100%', mb: 2, ...chartContainerStyle }}>
            <ResponsiveContainer key={`heatmap-${forceRender}`} width="99%" height="99%">
              <HeatMapCanvas
                data={heatmapData}
                margin={{ top: 20, right: 40, bottom: 30, left: 40 }}
                valueFormat=">-.2s"
                axisTop={{
                  tickSize: 5,
                  tickPadding: 5,
                  tickRotation: -45,
                  legend: '',
                  legendOffset: 36
                }}
                axisRight={null}
                axisLeft={{
                  tickSize: 5,
                  tickPadding: 5,
                  tickRotation: 0,
                  legend: '',
                  legendPosition: 'middle',
                  legendOffset: -40
                }}
                colors={{
                  type: 'sequential',
                  scheme: 'blues'
                }}
                emptyColor="#f5f5f5"
                legends={[
                  {
                    anchor: 'bottom',
                    translateX: 0,
                    translateY: 30,
                    length: 300,
                    thickness: 8,
                    direction: 'row',
                    tickPosition: 'after',
                    tickSize: 3,
                    tickSpacing: 4,
                    tickOverlap: false,
                    tickFormat: '>-.2s',
                    title: '방문객 밀집도',
                    titleAlign: 'start',
                    titleOffset: 4
                  }
                ]}
              />
            </ResponsiveContainer>
          </Box>
          <Stack direction="row" spacing={3}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box sx={{ width: 12, height: 12, bgcolor: '#EF4444', borderRadius: '50%', mr: 1 }} />
              <Typography variant="caption">혼잡 구역</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box sx={{ width: 12, height: 12, bgcolor: '#F59E0B', borderRadius: '50%', mr: 1 }} />
              <Typography variant="caption">보통 구역</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box sx={{ width: 12, height: 12, bgcolor: '#10B981', borderRadius: '50%', mr: 1 }} />
              <Typography variant="caption">여유 구역</Typography>
            </Box>
          </Stack>
        </Paper>

        {/* 하단 위젯 */}
        <Grid container spacing={3}>
          {/* 인기 전시품 TOP 5 */}
          <Grid item xs={12} md={6}>
            <Paper elevation={1} sx={{ p: 2 }}>
              <Typography variant="h6" fontWeight="bold" gutterBottom>인기 전시품 TOP 5</Typography>
              <Box sx={{ height: 300, width: '100%', mb: 1, ...chartContainerStyle }}>
                <ResponsiveContainer key={`exhibit-chart-${forceRender}`} width="99%" height="99%">
                  <BarChart
                    data={exhibitChartData}
                    layout="vertical"
                    margin={{ top: 5, right: 20, left: 60, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis 
                      dataKey="name" 
                      type="category" 
                      width={100}
                      tick={{ fontSize: 12 }}
                    />
                    <Tooltip formatter={(value) => `${value}분`} />
                    <Bar dataKey="viewTime" fill="#3B82F6" />
                  </BarChart>
                </ResponsiveContainer>
              </Box>
              <Typography variant="caption" color="text.secondary" align="right" display="block">
                평균 관람 시간 (분)
              </Typography>
            </Paper>
          </Grid>

          {/* AI 예측 분석 */}
          <Grid item xs={12} md={6}>
            <Paper elevation={1} sx={{ p: 2 }}>
              <Typography variant="h6" fontWeight="bold" gutterBottom>AI 예측 분석</Typography>
              <Stack spacing={1} sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography color="text.secondary" sx={{ mr: 1 }}>- 내일 예상 방문객:</Typography>
                  <Typography fontWeight="medium" sx={{ mr: 1 }}>{aiPredictions.tomorrowVisitors.count}명</Typography>
                  <Typography color="success.main">(↑{aiPredictions.tomorrowVisitors.change}%)</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography color="text.secondary" sx={{ mr: 1 }}>- 주말 혼잡 예상 시간:</Typography>
                  <Typography fontWeight="medium">{aiPredictions.peakHours}</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography color="text.secondary" sx={{ mr: 1 }}>- 추천 직원 배치:</Typography>
                  <Box>
                    {aiPredictions.staffingRecommendations.map((rec, index) => (
                      <Typography key={index} component="span" fontWeight="medium" sx={{ mr: 1 }}>
                        {rec.floor} {rec.change > 0 ? `+${rec.change}명` : `${rec.change}명`}
                      </Typography>
                    ))}
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography color="text.secondary" sx={{ mr: 1 }}>- 인기 상승 전시:</Typography>
                  <Typography fontWeight="medium">{aiPredictions.trendingExhibit}</Typography>
                </Box>
              </Stack>
              <Box sx={{ height: 200, width: '100%', ...chartContainerStyle }}>
                <ResponsiveContainer key={`prediction-chart-${forceRender}`} width="99%" height="99%">
                  <LineChart
                    data={[
                      { day: '월', visitors: 450 },
                      { day: '화', visitors: 480 },
                      { day: '수', visitors: 520 },
                      { day: '목', visitors: 550 },
                      { day: '금', visitors: 600 },
                      { day: '토', visitors: 750 },
                      { day: '일', visitors: 800 }
                    ]}
                    margin={{ top: 5, right: 5, left: 0, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="visitors" 
                      stroke="#8884d8" 
                      activeDot={{ r: 8 }} 
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Box>
            </Paper>
          </Grid>
        </Grid>

        {/* 네비게이션 */}
        <Paper 
          elevation={3} 
          sx={{ 
            position: 'fixed', 
            bottom: 0, 
            left: 0, 
            right: 0, 
            py: 1,
            borderTop: 1,
            borderColor: 'divider',
            zIndex: 1000,
            bgcolor: 'background.paper'
          }}
        >
          <Container maxWidth="xl">
            <Grid container justifyContent="space-around">
              <Grid item>
                <Link href="/admin" style={{ textDecoration: 'none' }}>
                  <Stack alignItems="center" sx={{ color: 'primary.main' }}>
                    <HomeIcon />
                    <Typography variant="caption">대시보드</Typography>
                  </Stack>
                </Link>
              </Grid>
              <Grid item>
                <Link href="/admin/customers" style={{ textDecoration: 'none' }}>
                  <Stack alignItems="center" sx={{ color: 'text.secondary' }}>
                    <PeopleIcon />
                    <Typography variant="caption">고객관리</Typography>
                  </Stack>
                </Link>
              </Grid>
              <Grid item>
                <Link href="/admin/segments" style={{ textDecoration: 'none' }}>
                  <Stack alignItems="center" sx={{ color: 'text.secondary' }}>
                    <BarChartIcon />
                    <Typography variant="caption">세그먼트</Typography>
                  </Stack>
                </Link>
              </Grid>
              <Grid item>
                <Link href="/admin/beacons" style={{ textDecoration: 'none' }}>
                  <Stack alignItems="center" sx={{ color: 'text.secondary' }}>
                    <LocationOnIcon />
                    <Typography variant="caption">비콘</Typography>
                  </Stack>
                </Link>
              </Grid>
              <Grid item>
                <Link href="/" style={{ textDecoration: 'none' }}>
                  <Stack alignItems="center" sx={{ color: 'text.secondary' }}>
                    <SettingsIcon />
                    <Typography variant="caption">설정</Typography>
                  </Stack>
                </Link>
              </Grid>
            </Grid>
          </Container>
        </Paper>
      </Container>
    </ThemeProvider>
  );
}
