'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Box, Typography, Grid, Card, CardContent, Table, TableBody,
  TableCell, TableContainer, TableHead, TableRow, Paper,
  Button, IconButton, Dialog, DialogTitle, DialogContent,
  DialogActions, TextField, FormControl, InputLabel, Select,
  MenuItem, Chip, TablePagination, InputAdornment, Stack,
  Tabs, Tab, Timeline, TimelineItem, TimelineSeparator,
  TimelineConnector, TimelineContent, TimelineDot
} from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import GroupIcon from '@mui/icons-material/Group';
import CampaignIcon from '@mui/icons-material/Campaign';
import PeopleIcon from '@mui/icons-material/People';
import TimelineIcon from '@mui/icons-material/Timeline';
import SendIcon from '@mui/icons-material/Send';
import ScheduleIcon from '@mui/icons-material/Schedule';
import DraftsIcon from '@mui/icons-material/Drafts';
import MuseumIcon from '@mui/icons-material/Museum';
import NotificationsIcon from '@mui/icons-material/Notifications';

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
});

// 목업 데이터
const mockCustomer = {
  id: 1,
  name: '김민수',
  age: 35,
  gender: '남성',
  interests: ['도자기', '불교미술', '고려시대'],
  visitCount: 12,
  lastVisit: '2024-03-15',
  preferredTime: '주말 오후',
  notificationEnabled: true,
  email: 'kim@example.com',
  phone: '010-1234-5678',
  visits: [
    {
      id: 1,
      date: '2024-03-15',
      time: '14:30',
      duration: '2시간',
      exhibits: ['도자기 전시', '불교미술 전시']
    },
    {
      id: 2,
      date: '2024-03-10',
      time: '15:00',
      duration: '1시간 30분',
      exhibits: ['도자기 전시']
    },
    {
      id: 3,
      date: '2024-03-01',
      time: '11:00',
      duration: '2시간 30분',
      exhibits: ['불교미술 전시', '고려시대 전시']
    }
  ],
  notifications: [
    {
      id: 1,
      title: '도자기 전시 안내',
      content: '새로운 도자기 전시가 시작되었습니다.',
      date: '2024-03-16',
      status: 'read'
    },
    {
      id: 2,
      title: '불교미술 특별전',
      content: '불교미술 특별전이 곧 시작됩니다.',
      date: '2024-03-14',
      status: 'read'
    },
    {
      id: 3,
      title: '주말 방문객 혜택',
      content: '주말 방문객을 위한 특별 혜택이 준비되어 있습니다.',
      date: '2024-03-13',
      status: 'unread'
    }
  ]
};

export default function CustomerProfile({ params }) {
  const [customer, setCustomer] = useState(mockCustomer);
  const [openDialog, setOpenDialog] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  // 고객 정보 수정 다이얼로그 열기
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  // 고객 정보 수정 다이얼로그 닫기
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  // 고객 정보 저장
  const handleSaveCustomer = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const customerData = {
      ...customer,
      name: formData.get('name'),
      age: parseInt(formData.get('age')),
      gender: formData.get('gender'),
      interests: formData.get('interests').split(',').map(i => i.trim()),
      visitCount: parseInt(formData.get('visitCount')),
      lastVisit: formData.get('lastVisit'),
      preferredTime: formData.get('preferredTime'),
      notificationEnabled: formData.get('notificationEnabled') === 'true',
      email: formData.get('email'),
      phone: formData.get('phone')
    };

    setCustomer(customerData);
    handleCloseDialog();
  };

  // 탭 변경 핸들러
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          고객 프로필
        </Typography>

        {/* 네비게이션 탭 */}
        <Paper sx={{ mb: 3 }}>
          <Tabs 
            value={activeTab} 
            onChange={handleTabChange}
            variant="fullWidth"
            indicatorColor="primary"
            textColor="primary"
          >
            <Tab 
              icon={<PeopleIcon />} 
              label="고객 목록"
              component={Link}
              href="/admin/customers"
            />
            <Tab 
              icon={<GroupIcon />} 
              label="세그먼트 관리"
              component={Link}
              href="/admin/customers/segments"
            />
            <Tab 
              icon={<CampaignIcon />} 
              label="알림 관리"
              component={Link}
              href="/admin/customers/notifications"
            />
          </Tabs>
        </Paper>

        {/* 고객 기본 정보 */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} md={8}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h6">기본 정보</Typography>
                  <IconButton onClick={handleOpenDialog}>
                    <EditIcon />
                  </IconButton>
                </Box>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Typography color="textSecondary">이름</Typography>
                    <Typography variant="body1">{customer.name}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography color="textSecondary">연락처</Typography>
                    <Typography variant="body1">{customer.phone}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography color="textSecondary">이메일</Typography>
                    <Typography variant="body1">{customer.email}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography color="textSecondary">성별</Typography>
                    <Typography variant="body1">{customer.gender}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography color="textSecondary">나이</Typography>
                    <Typography variant="body1">{customer.age}세</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography color="textSecondary">알림 설정</Typography>
                    <Chip
                      label={customer.notificationEnabled ? '활성' : '비활성'}
                      color={customer.notificationEnabled ? 'success' : 'default'}
                      size="small"
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>방문 통계</Typography>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Typography color="textSecondary">총 방문 횟수</Typography>
                    <Typography variant="h4">{customer.visitCount}회</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography color="textSecondary">마지막 방문</Typography>
                    <Typography variant="h4">{customer.lastVisit}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography color="textSecondary">선호 방문 시간</Typography>
                    <Typography variant="h4">{customer.preferredTime}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography color="textSecondary">관심사</Typography>
                    <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                      {customer.interests.map((interest, index) => (
                        <Chip key={index} label={interest} size="small" />
                      ))}
                    </Stack>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* 방문 기록 타임라인 */}
        <Card sx={{ mb: 4 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>방문 기록</Typography>
            <Timeline>
              {customer.visits.map((visit, index) => (
                <TimelineItem key={visit.id}>
                  <TimelineSeparator>
                    <TimelineDot color="primary">
                      <MuseumIcon />
                    </TimelineDot>
                    {index < customer.visits.length - 1 && <TimelineConnector />}
                  </TimelineSeparator>
                  <TimelineContent>
                    <Typography variant="subtitle1">{visit.date} {visit.time}</Typography>
                    <Typography color="textSecondary">방문 시간: {visit.duration}</Typography>
                    <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                      {visit.exhibits.map((exhibit, idx) => (
                        <Chip key={idx} label={exhibit} size="small" />
                      ))}
                    </Stack>
                  </TimelineContent>
                </TimelineItem>
              ))}
            </Timeline>
          </CardContent>
        </Card>

        {/* 알림 수신 기록 */}
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>알림 수신 기록</Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>날짜</TableCell>
                    <TableCell>제목</TableCell>
                    <TableCell>내용</TableCell>
                    <TableCell>상태</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {customer.notifications.map((notification) => (
                    <TableRow key={notification.id}>
                      <TableCell>{notification.date}</TableCell>
                      <TableCell>{notification.title}</TableCell>
                      <TableCell>{notification.content}</TableCell>
                      <TableCell>
                        <Chip
                          label={notification.status === 'read' ? '읽음' : '안읽음'}
                          color={notification.status === 'read' ? 'default' : 'primary'}
                          size="small"
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>

        {/* 고객 정보 수정 다이얼로그 */}
        <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
          <form onSubmit={handleSaveCustomer}>
            <DialogTitle>고객 정보 수정</DialogTitle>
            <DialogContent>
              <Box sx={{ pt: 2 }}>
                <TextField
                  fullWidth
                  label="이름"
                  name="name"
                  defaultValue={customer.name}
                  sx={{ mb: 2 }}
                  required
                />
                <TextField
                  fullWidth
                  label="나이"
                  name="age"
                  type="number"
                  defaultValue={customer.age}
                  sx={{ mb: 2 }}
                  required
                />
                <FormControl fullWidth sx={{ mb: 2 }}>
                  <InputLabel>성별</InputLabel>
                  <Select
                    name="gender"
                    defaultValue={customer.gender}
                    label="성별"
                    required
                  >
                    <MenuItem value="남성">남성</MenuItem>
                    <MenuItem value="여성">여성</MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  fullWidth
                  label="관심사 (쉼표로 구분)"
                  name="interests"
                  defaultValue={customer.interests.join(', ')}
                  sx={{ mb: 2 }}
                  required
                />
                <TextField
                  fullWidth
                  label="방문 횟수"
                  name="visitCount"
                  type="number"
                  defaultValue={customer.visitCount}
                  sx={{ mb: 2 }}
                  required
                />
                <TextField
                  fullWidth
                  label="마지막 방문일"
                  name="lastVisit"
                  type="date"
                  defaultValue={customer.lastVisit}
                  sx={{ mb: 2 }}
                  required
                  InputLabelProps={{ shrink: true }}
                />
                <FormControl fullWidth sx={{ mb: 2 }}>
                  <InputLabel>선호 방문 시간</InputLabel>
                  <Select
                    name="preferredTime"
                    defaultValue={customer.preferredTime}
                    label="선호 방문 시간"
                    required
                  >
                    <MenuItem value="평일 오전">평일 오전</MenuItem>
                    <MenuItem value="평일 오후">평일 오후</MenuItem>
                    <MenuItem value="주말 오전">주말 오전</MenuItem>
                    <MenuItem value="주말 오후">주말 오후</MenuItem>
                  </Select>
                </FormControl>
                <FormControl fullWidth sx={{ mb: 2 }}>
                  <InputLabel>알림 설정</InputLabel>
                  <Select
                    name="notificationEnabled"
                    defaultValue={customer.notificationEnabled ? 'true' : 'false'}
                    label="알림 설정"
                    required
                  >
                    <MenuItem value="true">활성</MenuItem>
                    <MenuItem value="false">비활성</MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  fullWidth
                  label="이메일"
                  name="email"
                  type="email"
                  defaultValue={customer.email}
                  sx={{ mb: 2 }}
                  required
                />
                <TextField
                  fullWidth
                  label="전화번호"
                  name="phone"
                  defaultValue={customer.phone}
                  required
                />
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog}>취소</Button>
              <Button type="submit" variant="contained">
                저장
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      </Box>
    </ThemeProvider>
  );
} 