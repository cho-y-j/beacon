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
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import PeopleIcon from '@mui/icons-material/People';
import NotificationsIcon from '@mui/icons-material/Notifications';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PersonIcon from '@mui/icons-material/Person';
import GroupIcon from '@mui/icons-material/Group';
import CampaignIcon from '@mui/icons-material/Campaign';
import TimelineIcon from '@mui/icons-material/Timeline';

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
const mockCustomers = [
  {
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
    phone: '010-1234-5678'
  },
  {
    id: 2,
    name: '이지은',
    age: 28,
    gender: '여성',
    interests: ['고려시대', '불교미술'],
    visitCount: 8,
    lastVisit: '2024-03-10',
    preferredTime: '평일 오후',
    notificationEnabled: true,
    email: 'lee@example.com',
    phone: '010-2345-6789'
  },
  {
    id: 3,
    name: '박준호',
    age: 42,
    gender: '남성',
    interests: ['도자기', '고려시대'],
    visitCount: 15,
    lastVisit: '2024-03-01',
    preferredTime: '주말 오전',
    notificationEnabled: false,
    email: 'park@example.com',
    phone: '010-3456-7890'
  }
];

export default function CustomerManagement() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [customers, setCustomers] = useState(mockCustomers);
  const [activeTab, setActiveTab] = useState(0);

  // 고객 추가/수정 다이얼로그 열기
  const handleOpenDialog = (customer = null) => {
    setSelectedCustomer(customer);
    setOpenDialog(true);
  };

  // 고객 추가/수정 다이얼로그 닫기
  const handleCloseDialog = () => {
    setSelectedCustomer(null);
    setOpenDialog(false);
  };

  // 고객 삭제
  const handleDeleteCustomer = (id) => {
    if (window.confirm('정말로 이 고객을 삭제하시겠습니까?')) {
      setCustomers(customers.filter(customer => customer.id !== id));
    }
  };

  // 고객 저장
  const handleSaveCustomer = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const customerData = {
      id: selectedCustomer?.id || customers.length + 1,
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

    if (selectedCustomer) {
      setCustomers(customers.map(c => 
        c.id === selectedCustomer.id ? customerData : c
      ));
    } else {
      setCustomers([...customers, customerData]);
    }

    handleCloseDialog();
  };

  // 페이지 변경
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // 페이지당 행 수 변경
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // 검색어로 고객 필터링
  const filteredCustomers = customers.filter(customer => 
    customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.phone.includes(searchQuery)
  );

  // 탭 변경 핸들러
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          고객 관리
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
                  <PeopleIcon sx={{ mr: 1, color: 'primary.main' }} />
                  <Typography color="textSecondary">
                    전체 고객
                  </Typography>
                </Box>
                <Typography variant="h4">
                  {customers.length}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <NotificationsIcon sx={{ mr: 1, color: 'secondary.main' }} />
                  <Typography color="textSecondary">
                    활성 알림 고객
                  </Typography>
                </Box>
                <Typography variant="h4">
                  {customers.filter(c => c.notificationEnabled).length}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <CalendarTodayIcon sx={{ mr: 1, color: 'warning.main' }} />
                  <Typography color="textSecondary">
                    이번 달 방문객
                  </Typography>
                </Box>
                <Typography variant="h4">
                  {customers.filter(c => new Date(c.lastVisit).getMonth() === new Date().getMonth()).length}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <PersonIcon sx={{ mr: 1, color: 'info.main' }} />
                  <Typography color="textSecondary">
                    평균 방문 횟수
                  </Typography>
                </Box>
                <Typography variant="h4">
                  {(customers.reduce((acc, curr) => acc + curr.visitCount, 0) / customers.length).toFixed(1)}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* 검색 및 추가 버튼 */}
        <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <TextField
            placeholder="고객 검색..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => handleOpenDialog()}
          >
            고객 추가
          </Button>
        </Box>

        {/* 고객 목록 테이블 */}
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>이름</TableCell>
                <TableCell>연락처</TableCell>
                <TableCell>관심사</TableCell>
                <TableCell>방문 횟수</TableCell>
                <TableCell>마지막 방문</TableCell>
                <TableCell>알림 설정</TableCell>
                <TableCell>관리</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredCustomers
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((customer) => (
                  <TableRow key={customer.id}>
                    <TableCell>{customer.name}</TableCell>
                    <TableCell>{customer.phone}</TableCell>
                    <TableCell>
                      <Stack direction="row" spacing={1}>
                        {customer.interests.map((interest, index) => (
                          <Chip key={index} label={interest} size="small" />
                        ))}
                      </Stack>
                    </TableCell>
                    <TableCell>{customer.visitCount}회</TableCell>
                    <TableCell>{customer.lastVisit}</TableCell>
                    <TableCell>
                      <Chip
                        label={customer.notificationEnabled ? '활성' : '비활성'}
                        color={customer.notificationEnabled ? 'success' : 'default'}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleOpenDialog(customer)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => handleDeleteCustomer(customer.id)}>
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
          count={filteredCustomers.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="페이지당 행 수"
          rowsPerPageOptions={[5, 10, 25]}
        />

        {/* 고객 추가/수정 다이얼로그 */}
        <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
          <form onSubmit={handleSaveCustomer}>
            <DialogTitle>
              {selectedCustomer ? '고객 정보 수정' : '새 고객 추가'}
            </DialogTitle>
            <DialogContent>
              <Box sx={{ pt: 2 }}>
                <TextField
                  fullWidth
                  label="이름"
                  name="name"
                  defaultValue={selectedCustomer?.name}
                  sx={{ mb: 2 }}
                  required
                />
                <TextField
                  fullWidth
                  label="나이"
                  name="age"
                  type="number"
                  defaultValue={selectedCustomer?.age}
                  sx={{ mb: 2 }}
                  required
                />
                <FormControl fullWidth sx={{ mb: 2 }}>
                  <InputLabel>성별</InputLabel>
                  <Select
                    name="gender"
                    defaultValue={selectedCustomer?.gender}
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
                  defaultValue={selectedCustomer?.interests.join(', ')}
                  sx={{ mb: 2 }}
                  required
                />
                <TextField
                  fullWidth
                  label="방문 횟수"
                  name="visitCount"
                  type="number"
                  defaultValue={selectedCustomer?.visitCount}
                  sx={{ mb: 2 }}
                  required
                />
                <TextField
                  fullWidth
                  label="마지막 방문일"
                  name="lastVisit"
                  type="date"
                  defaultValue={selectedCustomer?.lastVisit}
                  sx={{ mb: 2 }}
                  required
                  InputLabelProps={{ shrink: true }}
                />
                <FormControl fullWidth sx={{ mb: 2 }}>
                  <InputLabel>선호 방문 시간</InputLabel>
                  <Select
                    name="preferredTime"
                    defaultValue={selectedCustomer?.preferredTime}
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
                    defaultValue={selectedCustomer?.notificationEnabled ? 'true' : 'false'}
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
                  defaultValue={selectedCustomer?.email}
                  sx={{ mb: 2 }}
                  required
                />
                <TextField
                  fullWidth
                  label="전화번호"
                  name="phone"
                  defaultValue={selectedCustomer?.phone}
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