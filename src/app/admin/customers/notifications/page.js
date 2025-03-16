'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Box, Typography, Grid, Card, CardContent, Table, TableBody,
  TableCell, TableContainer, TableHead, TableRow, Paper,
  Button, IconButton, Dialog, DialogTitle, DialogContent,
  DialogActions, TextField, FormControl, InputLabel, Select,
  MenuItem, Chip, TablePagination, InputAdornment, Stack,
  Tabs, Tab
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
const mockNotifications = [
  {
    id: 1,
    title: '도자기 전시 안내',
    content: '새로운 도자기 전시가 시작되었습니다. 많은 관심 부탁드립니다.',
    targetSegment: '도자기 애호가',
    scheduledDate: '2024-03-20',
    status: 'scheduled',
    type: 'exhibition',
    channel: 'email'
  },
  {
    id: 2,
    title: '불교미술 특별전',
    content: '불교미술 특별전이 곧 시작됩니다. 사전 예약을 진행해주세요.',
    targetSegment: '불교미술 팬',
    scheduledDate: '2024-03-25',
    status: 'draft',
    type: 'event',
    channel: 'sms'
  },
  {
    id: 3,
    title: '주말 방문객 혜택',
    content: '주말 방문객을 위한 특별 혜택이 준비되어 있습니다.',
    targetSegment: '주말 방문객',
    scheduledDate: '2024-03-18',
    status: 'sent',
    type: 'promotion',
    channel: 'push'
  }
];

export default function NotificationManagement() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [notifications, setNotifications] = useState(mockNotifications);
  const [activeTab, setActiveTab] = useState(2);

  // 알림 추가/수정 다이얼로그 열기
  const handleOpenDialog = (notification = null) => {
    setSelectedNotification(notification);
    setOpenDialog(true);
  };

  // 알림 추가/수정 다이얼로그 닫기
  const handleCloseDialog = () => {
    setSelectedNotification(null);
    setOpenDialog(false);
  };

  // 알림 삭제
  const handleDeleteNotification = (id) => {
    if (window.confirm('정말로 이 알림을 삭제하시겠습니까?')) {
      setNotifications(notifications.filter(notification => notification.id !== id));
    }
  };

  // 알림 전송
  const handleSendNotification = (id) => {
    if (window.confirm('이 알림을 지금 전송하시겠습니까?')) {
      setNotifications(notifications.map(notification =>
        notification.id === id
          ? { ...notification, status: 'sent', scheduledDate: new Date().toISOString().split('T')[0] }
          : notification
      ));
    }
  };

  // 알림 저장
  const handleSaveNotification = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const notificationData = {
      id: selectedNotification?.id || notifications.length + 1,
      title: formData.get('title'),
      content: formData.get('content'),
      targetSegment: formData.get('targetSegment'),
      scheduledDate: formData.get('scheduledDate'),
      status: formData.get('status'),
      type: formData.get('type'),
      channel: formData.get('channel')
    };

    if (selectedNotification) {
      setNotifications(notifications.map(n =>
        n.id === selectedNotification.id ? notificationData : n
      ));
    } else {
      setNotifications([...notifications, notificationData]);
    }

    handleCloseDialog();
  };

  // 상태에 따른 색상 반환
  const getStatusColor = (status) => {
    switch (status) {
      case 'sent':
        return 'success';
      case 'scheduled':
        return 'warning';
      case 'draft':
        return 'default';
      default:
        return 'default';
    }
  };

  // 상태에 따른 텍스트 반환
  const getStatusText = (status) => {
    switch (status) {
      case 'sent':
        return '전송완료';
      case 'scheduled':
        return '예약됨';
      case 'draft':
        return '임시저장';
      default:
        return status;
    }
  };

  // 탭 변경 핸들러
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          알림 관리
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

        {/* 통계 카드 */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <CampaignIcon sx={{ mr: 1, color: 'primary.main' }} />
                  <Typography color="textSecondary">
                    전체 알림
                  </Typography>
                </Box>
                <Typography variant="h4">
                  {notifications.length}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <SendIcon sx={{ mr: 1, color: 'success.main' }} />
                  <Typography color="textSecondary">
                    전송완료
                  </Typography>
                </Box>
                <Typography variant="h4">
                  {notifications.filter(n => n.status === 'sent').length}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <ScheduleIcon sx={{ mr: 1, color: 'warning.main' }} />
                  <Typography color="textSecondary">
                    예약됨
                  </Typography>
                </Box>
                <Typography variant="h4">
                  {notifications.filter(n => n.status === 'scheduled').length}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <DraftsIcon sx={{ mr: 1, color: 'info.main' }} />
                  <Typography color="textSecondary">
                    임시저장
                  </Typography>
                </Box>
                <Typography variant="h4">
                  {notifications.filter(n => n.status === 'draft').length}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* 알림 목록 */}
        <Box sx={{ mb: 3, display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => handleOpenDialog()}
          >
            알림 추가
          </Button>
        </Box>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>제목</TableCell>
                <TableCell>내용</TableCell>
                <TableCell>대상 세그먼트</TableCell>
                <TableCell>예약일</TableCell>
                <TableCell>상태</TableCell>
                <TableCell>채널</TableCell>
                <TableCell>관리</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {notifications
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((notification) => (
                  <TableRow key={notification.id}>
                    <TableCell>{notification.title}</TableCell>
                    <TableCell>{notification.content}</TableCell>
                    <TableCell>{notification.targetSegment}</TableCell>
                    <TableCell>{notification.scheduledDate}</TableCell>
                    <TableCell>
                      <Chip
                        label={getStatusText(notification.status)}
                        color={getStatusColor(notification.status)}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={notification.channel}
                        size="small"
                        variant="outlined"
                      />
                    </TableCell>
                    <TableCell>
                      {notification.status !== 'sent' && (
                        <IconButton 
                          onClick={() => handleSendNotification(notification.id)}
                          color="success"
                        >
                          <SendIcon />
                        </IconButton>
                      )}
                      <IconButton onClick={() => handleOpenDialog(notification)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => handleDeleteNotification(notification.id)}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* 페이지네이션 */}
        <TablePagination
          component="div"
          count={notifications.length}
          page={page}
          onPageChange={(event, newPage) => setPage(newPage)}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={(event) => {
            setRowsPerPage(parseInt(event.target.value, 10));
            setPage(0);
          }}
          labelRowsPerPage="페이지당 행 수"
          rowsPerPageOptions={[5, 10, 25]}
        />

        {/* 알림 추가/수정 다이얼로그 */}
        <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
          <form onSubmit={handleSaveNotification}>
            <DialogTitle>
              {selectedNotification ? '알림 수정' : '새 알림 추가'}
            </DialogTitle>
            <DialogContent>
              <Box sx={{ pt: 2 }}>
                <TextField
                  fullWidth
                  label="제목"
                  name="title"
                  defaultValue={selectedNotification?.title}
                  sx={{ mb: 2 }}
                  required
                />
                <TextField
                  fullWidth
                  label="내용"
                  name="content"
                  multiline
                  rows={4}
                  defaultValue={selectedNotification?.content}
                  sx={{ mb: 2 }}
                  required
                />
                <FormControl fullWidth sx={{ mb: 2 }}>
                  <InputLabel>대상 세그먼트</InputLabel>
                  <Select
                    name="targetSegment"
                    defaultValue={selectedNotification?.targetSegment}
                    label="대상 세그먼트"
                    required
                  >
                    <MenuItem value="도자기 애호가">도자기 애호가</MenuItem>
                    <MenuItem value="불교미술 팬">불교미술 팬</MenuItem>
                    <MenuItem value="주말 방문객">주말 방문객</MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  fullWidth
                  label="예약일"
                  name="scheduledDate"
                  type="date"
                  defaultValue={selectedNotification?.scheduledDate}
                  sx={{ mb: 2 }}
                  required
                  InputLabelProps={{ shrink: true }}
                />
                <FormControl fullWidth sx={{ mb: 2 }}>
                  <InputLabel>상태</InputLabel>
                  <Select
                    name="status"
                    defaultValue={selectedNotification?.status || 'draft'}
                    label="상태"
                    required
                  >
                    <MenuItem value="draft">임시저장</MenuItem>
                    <MenuItem value="scheduled">예약됨</MenuItem>
                    <MenuItem value="sent">전송완료</MenuItem>
                  </Select>
                </FormControl>
                <FormControl fullWidth sx={{ mb: 2 }}>
                  <InputLabel>알림 유형</InputLabel>
                  <Select
                    name="type"
                    defaultValue={selectedNotification?.type}
                    label="알림 유형"
                    required
                  >
                    <MenuItem value="exhibition">전시</MenuItem>
                    <MenuItem value="event">이벤트</MenuItem>
                    <MenuItem value="promotion">프로모션</MenuItem>
                  </Select>
                </FormControl>
                <FormControl fullWidth>
                  <InputLabel>전송 채널</InputLabel>
                  <Select
                    name="channel"
                    defaultValue={selectedNotification?.channel}
                    label="전송 채널"
                    required
                  >
                    <MenuItem value="email">이메일</MenuItem>
                    <MenuItem value="sms">SMS</MenuItem>
                    <MenuItem value="push">푸시 알림</MenuItem>
                  </Select>
                </FormControl>
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