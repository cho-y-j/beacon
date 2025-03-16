'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { mockAdminData } from '@/lib/data/mockData';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';
import { HeatMapCanvas } from '@nivo/heatmap';

// Material UI 컴포넌트 import
import { 
  Box, Container, Grid, Paper, Typography, Button, FormControl, 
  InputLabel, Select, MenuItem, Tabs, Tab, Stack, Divider,
  Card, CardContent, CardHeader
} from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import DownloadIcon from '@mui/icons-material/Download';
import DashboardIcon from '@mui/icons-material/Dashboard';

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

export default function SegmentAnalysis() {
  const [segmentData] = useState(mockAdminData.visitorSegments);
  const [activeTab, setActiveTab] = useState(0);
  const [selectedSegment, setSelectedSegment] = useState(null);
  const [forceRender, setForceRender] = useState(0);
  const [period, setPeriod] = useState('7days');
  const [visitorType, setVisitorType] = useState('all');
  const [ageGroup, setAgeGroup] = useState('all');

  // 컴포넌트 마운트 후 차트 렌더링을 위한 useEffect
  useEffect(() => {
    // 컴포넌트 마운트 후 약간의 지연을 두고 강제 리렌더링
    const timer = setTimeout(() => {
      setForceRender(prev => prev + 1);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  // 데이터 준비
  const demographicsData = [
    { name: '10대 이하', value: segmentData.demographics.under18 },
    { name: '20-30대', value: segmentData.demographics.age18to35 },
    { name: '40-50대', value: segmentData.demographics.age36to55 },
    { name: '60대 이상', value: segmentData.demographics.over55 }
  ];

  const genderData = [
    { name: '남성', value: segmentData.demographics.male },
    { name: '여성', value: segmentData.demographics.female },
    { name: '기타/미응답', value: segmentData.demographics.other }
  ];

  const interestsData = Object.entries(segmentData.interests).map(([key, value]) => ({
    name: key,
    value
  })).sort((a, b) => b.value - a.value);

  const visitPatternsData = [
    { name: '첫 방문', value: segmentData.visitPatterns.firstTime },
    { name: '재방문', value: segmentData.visitPatterns.returning },
    { name: '정기 방문', value: segmentData.visitPatterns.frequent }
  ];

  const exhibitPopularityData = Object.entries(segmentData.exhibitPopularity)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 5);

  const visitTimesData = [
    { name: '오전', value: segmentData.visitTimes.morning },
    { name: '오후', value: segmentData.visitTimes.afternoon },
    { name: '저녁', value: segmentData.visitTimes.evening }
  ];

  // 히트맵 데이터
  const heatmapData = [
    {
      id: '10대 이하',
      data: [
        { x: '역사', y: 30 },
        { x: '예술', y: 45 },
        { x: '과학', y: 70 },
        { x: '문화', y: 35 },
        { x: '기술', y: 60 }
      ]
    },
    {
      id: '20-30대',
      data: [
        { x: '역사', y: 50 },
        { x: '예술', y: 65 },
        { x: '과학', y: 55 },
        { x: '문화', y: 60 },
        { x: '기술', y: 75 }
      ]
    },
    {
      id: '40-50대',
      data: [
        { x: '역사', y: 75 },
        { x: '예술', y: 55 },
        { x: '과학', y: 40 },
        { x: '문화', y: 65 },
        { x: '기술', y: 45 }
      ]
    },
    {
      id: '60대 이상',
      data: [
        { x: '역사', y: 85 },
        { x: '예술', y: 60 },
        { x: '과학', y: 30 },
        { x: '문화', y: 70 },
        { x: '기술', y: 25 }
      ]
    }
  ];

  // 파이 차트 색상
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

  // 차트 컨테이너 스타일
  const chartContainerStyle = {
    width: '100%', 
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  };

  // 탭 변경 핸들러
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  // 필터 변경 핸들러
  const handlePeriodChange = (event) => {
    setPeriod(event.target.value);
  };

  const handleVisitorTypeChange = (event) => {
    setVisitorType(event.target.value);
  };

  const handleAgeGroupChange = (event) => {
    setAgeGroup(event.target.value);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="xl" sx={{ bgcolor: '#F9FAFB', minHeight: '100vh', py: 3 }}>
        {/* 헤더 */}
        <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box>
            <Typography variant="h4" fontWeight="bold" color="text.primary">방문객 세그먼트 분석</Typography>
            <Typography variant="body1" color="text.secondary">방문객 데이터를 기반으로 한 세그먼트 분석 및 인사이트</Typography>
          </Box>
          <Stack direction="row" spacing={2}>
            <Button 
              component={Link} 
              href="/admin" 
              variant="outlined" 
              startIcon={<DashboardIcon />}
            >
              대시보드
            </Button>
            <Button 
              variant="contained" 
              startIcon={<DownloadIcon />}
            >
              보고서 내보내기
            </Button>
          </Stack>
        </Box>

        {/* 필터 옵션 */}
        <Paper elevation={1} sx={{ p: 3, mb: 3 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth size="small">
                <InputLabel>기간 선택</InputLabel>
                <Select
                  value={period}
                  onChange={handlePeriodChange}
                  label="기간 선택"
                >
                  <MenuItem value="7days">최근 7일</MenuItem>
                  <MenuItem value="30days">최근 30일</MenuItem>
                  <MenuItem value="90days">최근 90일</MenuItem>
                  <MenuItem value="year">올해</MenuItem>
                  <MenuItem value="all">전체 기간</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth size="small">
                <InputLabel>방문객 유형</InputLabel>
                <Select
                  value={visitorType}
                  onChange={handleVisitorTypeChange}
                  label="방문객 유형"
                >
                  <MenuItem value="all">모든 방문객</MenuItem>
                  <MenuItem value="first">첫 방문</MenuItem>
                  <MenuItem value="returning">재방문</MenuItem>
                  <MenuItem value="frequent">정기 방문</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth size="small">
                <InputLabel>연령대</InputLabel>
                <Select
                  value={ageGroup}
                  onChange={handleAgeGroupChange}
                  label="연령대"
                >
                  <MenuItem value="all">모든 연령대</MenuItem>
                  <MenuItem value="under18">10대 이하</MenuItem>
                  <MenuItem value="18to35">20-30대</MenuItem>
                  <MenuItem value="36to55">40-50대</MenuItem>
                  <MenuItem value="over55">60대 이상</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Paper>

        {/* 탭 네비게이션 */}
        <Box sx={{ mb: 3, borderBottom: 1, borderColor: 'divider' }}>
          <Tabs 
            value={activeTab} 
            onChange={handleTabChange} 
            aria-label="segment analysis tabs"
            indicatorColor="primary"
            textColor="primary"
          >
            <Tab label="인구통계" />
            <Tab label="관심사" />
            <Tab label="행동 패턴" />
            <Tab label="상관관계" />
          </Tabs>
        </Box>

        {/* 데이터 시각화 */}
        <Box>
          {activeTab === 0 && (
            <Grid container spacing={3}>
              {/* 연령대 분포 */}
              <Grid item xs={12} md={6}>
                <Paper elevation={1} sx={{ p: 3, height: '100%' }}>
                  <Typography variant="h6" fontWeight="medium" gutterBottom>연령대 분포</Typography>
                  <Box sx={{ height: 400, width: '100%', ...chartContainerStyle }}>
                    <ResponsiveContainer key={`age-chart-${forceRender}`} width="99%" height="99%">
                      <PieChart>
                        <Pie
                          data={demographicsData}
                          cx="50%"
                          cy="50%"
                          labelLine={true}
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          outerRadius={120}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {demographicsData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => `${value}명`} />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </Box>
                </Paper>
              </Grid>

              {/* 성별 분포 */}
              <Grid item xs={12} md={6}>
                <Paper elevation={1} sx={{ p: 3, height: '100%' }}>
                  <Typography variant="h6" fontWeight="medium" gutterBottom>성별 분포</Typography>
                  <Box sx={{ height: 400, width: '100%', ...chartContainerStyle }}>
                    <ResponsiveContainer key={`gender-chart-${forceRender}`} width="99%" height="99%">
                      <PieChart>
                        <Pie
                          data={genderData}
                          cx="50%"
                          cy="50%"
                          labelLine={true}
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          outerRadius={120}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {genderData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => `${value}명`} />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          )}

          {activeTab === 1 && (
            <Grid container spacing={3}>
              {/* 관심사 분포 */}
              <Grid item xs={12}>
                <Paper elevation={1} sx={{ p: 3 }}>
                  <Typography variant="h6" fontWeight="medium" gutterBottom>관심사 분포</Typography>
                  <Box sx={{ height: 400, width: '100%', ...chartContainerStyle }}>
                    <ResponsiveContainer key={`interests-chart-${forceRender}`} width="99%" height="99%">
                      <BarChart
                        data={interestsData}
                        layout="vertical"
                        margin={{ top: 5, right: 30, left: 80, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" />
                        <YAxis dataKey="name" type="category" />
                        <Tooltip formatter={(value) => `${value}명`} />
                        <Legend />
                        <Bar dataKey="value" fill="#8884d8" name="방문객 수" />
                      </BarChart>
                    </ResponsiveContainer>
                  </Box>
                </Paper>
              </Grid>

              {/* 인기 전시품 */}
              <Grid item xs={12}>
                <Paper elevation={1} sx={{ p: 3 }}>
                  <Typography variant="h6" fontWeight="medium" gutterBottom>인기 전시품 (상위 5개)</Typography>
                  <Box sx={{ height: 400, width: '100%', ...chartContainerStyle }}>
                    <ResponsiveContainer key={`exhibits-chart-${forceRender}`} width="99%" height="99%">
                      <BarChart
                        data={exhibitPopularityData}
                        margin={{ top: 5, right: 30, left: 80, bottom: 5 }}
                        layout="vertical"
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" />
                        <YAxis dataKey="name" type="category" />
                        <Tooltip formatter={(value) => `${value}명`} />
                        <Legend />
                        <Bar dataKey="value" fill="#82ca9d" name="방문객 수" />
                      </BarChart>
                    </ResponsiveContainer>
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          )}

          {activeTab === 2 && (
            <Grid container spacing={3}>
              {/* 방문 패턴 */}
              <Grid item xs={12} md={6}>
                <Paper elevation={1} sx={{ p: 3, height: '100%' }}>
                  <Typography variant="h6" fontWeight="medium" gutterBottom>방문 패턴</Typography>
                  <Box sx={{ height: 400, width: '100%', ...chartContainerStyle }}>
                    <ResponsiveContainer key={`patterns-chart-${forceRender}`} width="99%" height="99%">
                      <PieChart>
                        <Pie
                          data={visitPatternsData}
                          cx="50%"
                          cy="50%"
                          labelLine={true}
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          outerRadius={120}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {visitPatternsData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => `${value}명`} />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </Box>
                </Paper>
              </Grid>

              {/* 방문 시간대 */}
              <Grid item xs={12} md={6}>
                <Paper elevation={1} sx={{ p: 3, height: '100%' }}>
                  <Typography variant="h6" fontWeight="medium" gutterBottom>방문 시간대</Typography>
                  <Box sx={{ height: 400, width: '100%', ...chartContainerStyle }}>
                    <ResponsiveContainer key={`times-chart-${forceRender}`} width="99%" height="99%">
                      <BarChart
                        data={visitTimesData}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip formatter={(value) => `${value}명`} />
                        <Legend />
                        <Bar dataKey="value" fill="#0088FE" name="방문객 수" />
                      </BarChart>
                    </ResponsiveContainer>
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          )}

          {activeTab === 3 && (
            <Grid container spacing={3}>
              {/* 연령대와 관심사 상관관계 */}
              <Grid item xs={12}>
                <Paper elevation={1} sx={{ p: 3 }}>
                  <Typography variant="h6" fontWeight="medium" gutterBottom>연령대와 관심사 상관관계</Typography>
                  <Box sx={{ height: 500, width: '100%', ...chartContainerStyle }}>
                    <ResponsiveContainer key={`heatmap-${forceRender}`} width="99%" height="99%">
                      <HeatMapCanvas
                        data={heatmapData}
                        margin={{ top: 60, right: 80, bottom: 60, left: 80 }}
                        valueFormat=">-.2s"
                        axisTop={{
                          tickSize: 5,
                          tickPadding: 5,
                          tickRotation: -45,
                          legend: '관심사',
                          legendOffset: 46
                        }}
                        axisRight={{
                          tickSize: 5,
                          tickPadding: 5,
                          tickRotation: 0,
                          legend: '연령대',
                          legendPosition: 'middle',
                          legendOffset: 70
                        }}
                        axisLeft={{
                          tickSize: 5,
                          tickPadding: 5,
                          tickRotation: 0,
                          legend: '연령대',
                          legendPosition: 'middle',
                          legendOffset: -72
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
                            length: 400,
                            thickness: 8,
                            direction: 'row',
                            tickPosition: 'after',
                            tickSize: 3,
                            tickSpacing: 4,
                            tickOverlap: false,
                            tickFormat: '>-.2s',
                            title: '관심도 →',
                            titleAlign: 'start',
                            titleOffset: 4
                          }
                        ]}
                      />
                    </ResponsiveContainer>
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          )}
        </Box>
      </Container>
    </ThemeProvider>
  );
}
