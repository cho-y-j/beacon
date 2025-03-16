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
const mockSegments = [
  {
    id: 1,
    name: '도자기 애호가',
    description: '도자기 전시에 관심이 많은 고객',
    criteria: {
      interests: ['도자기', '고려시대'],
      visitCount: { min: 5 },
      lastVisit: { within: '30days' }
    },
    customerCount: 45,
    lastUpdated: '2024-03-15'
  },
  {
    id: 2,
    name: '젊은 불교미술 팬',
    description: '20-30대 불교미술 전시 관람객',
    criteria: {
      interests: ['불교미술'],
      age: { min: 20, max: 39 },
      visitCount: { min: 3 }
    },
    customerCount: 32,
    lastUpdated: '2024-03-14'
  },
  {
    id: 3,
    name: '주말 가족 방문객',
    description: '주말에 가족과 함께 방문하는 고객',
    criteria: {
      preferredTime: ['주말 오전', '주말 오후'],
      visitCount: { min: 2 }
    },
    customerCount: 28,
    lastUpdated: '2024-03-13'
  },
  {
    id: 4,
    name: 'VIP 고객',
    description: '빈번한 방문과 높은 관심도를 보이는 고객',
    criteria: {
      visitCount: { min: 10 },
      interests: { min: 3 }
    },
    customerCount: 15,
    lastUpdated: '2024-03-12'
  },
  {
    id: 5,
    name: '신규 방문객',
    description: '최근 3개월 내 첫 방문 고객',
    criteria: {
      visitCount: { min: 1, max: 1 },
      lastVisit: { within: '90days' }
    },
    customerCount: 20,
    lastUpdated: '2024-03-11'
  }
];

export default function SegmentManagement() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedSegment, setSelectedSegment] = useState(null);
  const [segments, setSegments] = useState(mockSegments);
  const [activeTab, setActiveTab] = useState(1);

  // 세그먼트 추가/수정 다이얼로그 열기
  const handleOpenDialog = (segment = null) => {
    setSelectedSegment(segment);
    setOpenDialog(true);
  };

  // 세그먼트 추가/수정 다이얼로그 닫기
  const handleCloseDialog = () => {
    setSelectedSegment(null);
    setOpenDialog(false);
  };

  // 세그먼트 삭제
  const handleDeleteSegment = (id) => {
    if (window.confirm('정말로 이 세그먼트를 삭제하시겠습니까?')) {
      setSegments(segments.filter(segment => segment.id !== id));
    }
  };

  // 세그먼트 저장
  const handleSaveSegment = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const criteria = {
      interests: formData.get('interests')?.split(',').map(i => i.trim()) || [],
      age: {
        min: formData.get('ageMin') ? parseInt(formData.get('ageMin')) : undefined,
        max: formData.get('ageMax') ? parseInt(formData.get('ageMax')) : undefined
      },
      visitCount: {
        min: formData.get('visitCountMin') ? parseInt(formData.get('visitCountMin')) : undefined,
        max: formData.get('visitCountMax') ? parseInt(formData.get('visitCountMax')) : undefined
      },
      lastVisit: formData.get('lastVisitWithin') ? {
        within: formData.get('lastVisitWithin')
      } : undefined,
      preferredTime: formData.get('preferredTime')?.split(',').map(t => t.trim()) || [],
      gender: formData.get('gender') || undefined
    };

    const segmentData = {
      id: selectedSegment?.id || segments.length + 1,
      name: formData.get('name'),
      description: formData.get('description'),
      criteria,
      customerCount: parseInt(formData.get('customerCount')),
      lastUpdated: new Date().toISOString().split('T')[0]
    };

    if (selectedSegment) {
      setSegments(segments.map(s => 
        s.id === selectedSegment.id ? segmentData : s
      ));
    } else {
      setSegments([...segments, segmentData]);
    }

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
          세그먼트 관리
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
                  <GroupIcon sx={{ mr: 1, color: 'primary.main' }} />
                  <Typography color="textSecondary">
                    전체 세그먼트
                  </Typography>
                </Box>
                <Typography variant="h4">
                  {segments.length}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <PeopleIcon sx={{ mr: 1, color: 'secondary.main' }} />
                  <Typography color="textSecondary">
                    전체 고객 수
                  </Typography>
                </Box>
                <Typography variant="h4">
                  {segments.reduce((acc, curr) => acc + curr.customerCount, 0)}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <TimelineIcon sx={{ mr: 1, color: 'warning.main' }} />
                  <Typography color="textSecondary">
                    평균 고객 수
                  </Typography>
                </Box>
                <Typography variant="h4">
                  {(segments.reduce((acc, curr) => acc + curr.customerCount, 0) / segments.length).toFixed(1)}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <CampaignIcon sx={{ mr: 1, color: 'info.main' }} />
                  <Typography color="textSecondary">
                    활성 세그먼트
                  </Typography>
                </Box>
                <Typography variant="h4">
                  {segments.filter(s => s.customerCount > 0).length}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* 세그먼트 목록 */}
        <Box sx={{ mb: 3, display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => handleOpenDialog()}
          >
            세그먼트 추가
          </Button>
        </Box>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>세그먼트명</TableCell>
                <TableCell>설명</TableCell>
                <TableCell>기준</TableCell>
                <TableCell>고객 수</TableCell>
                <TableCell>마지막 업데이트</TableCell>
                <TableCell>관리</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {segments
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((segment) => (
                  <TableRow key={segment.id}>
                    <TableCell>{segment.name}</TableCell>
                    <TableCell>{segment.description}</TableCell>
                    <TableCell>
                      <Stack direction="row" spacing={1}>
                        {Array.isArray(segment?.criteria?.interests) && segment.criteria.interests.map((criterion, index) => (
                          <Chip key={index} label={criterion} size="small" />
                        ))}
                      </Stack>
                    </TableCell>
                    <TableCell>{segment.customerCount}명</TableCell>
                    <TableCell>{segment.lastUpdated}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleOpenDialog(segment)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => handleDeleteSegment(segment.id)}>
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
          count={segments.length}
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

        {/* 세그먼트 추가/수정 다이얼로그 */}
        <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
          <form onSubmit={handleSaveSegment}>
            <DialogTitle>
              {selectedSegment ? '세그먼트 수정' : '새 세그먼트 추가'}
            </DialogTitle>
            <DialogContent>
              <Box sx={{ pt: 2 }}>
                <TextField
                  fullWidth
                  label="세그먼트명"
                  name="name"
                  defaultValue={selectedSegment?.name}
                  sx={{ mb: 2 }}
                  required
                />
                <TextField
                  fullWidth
                  label="설명"
                  name="description"
                  defaultValue={selectedSegment?.description}
                  sx={{ mb: 2 }}
                  required
                />
                
                <Typography variant="subtitle1" sx={{ mt: 2, mb: 1 }}>세그먼트 기준</Typography>
                
                <TextField
                  fullWidth
                  label="관심사 (쉼표로 구분)"
                  name="interests"
                  defaultValue={selectedSegment?.criteria.interests?.join(', ')}
                  sx={{ mb: 2 }}
                />
                
                <Grid container spacing={2} sx={{ mb: 2 }}>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="최소 나이"
                      name="ageMin"
                      type="number"
                      defaultValue={selectedSegment?.criteria.age?.min}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="최대 나이"
                      name="ageMax"
                      type="number"
                      defaultValue={selectedSegment?.criteria.age?.max}
                    />
                  </Grid>
                </Grid>

                <FormControl fullWidth sx={{ mb: 2 }}>
                  <InputLabel>성별</InputLabel>
                  <Select
                    name="gender"
                    defaultValue={selectedSegment?.criteria.gender}
                    label="성별"
                  >
                    <MenuItem value="">전체</MenuItem>
                    <MenuItem value="남성">남성</MenuItem>
                    <MenuItem value="여성">여성</MenuItem>
                  </Select>
                </FormControl>

                <Grid container spacing={2} sx={{ mb: 2 }}>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="최소 방문 횟수"
                      name="visitCountMin"
                      type="number"
                      defaultValue={selectedSegment?.criteria.visitCount?.min}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="최대 방문 횟수"
                      name="visitCountMax"
                      type="number"
                      defaultValue={selectedSegment?.criteria.visitCount?.max}
                    />
                  </Grid>
                </Grid>

                <FormControl fullWidth sx={{ mb: 2 }}>
                  <InputLabel>마지막 방문 기간</InputLabel>
                  <Select
                    name="lastVisitWithin"
                    defaultValue={selectedSegment?.criteria.lastVisit?.within}
                    label="마지막 방문 기간"
                  >
                    <MenuItem value="">전체</MenuItem>
                    <MenuItem value="7days">최근 7일</MenuItem>
                    <MenuItem value="30days">최근 30일</MenuItem>
                    <MenuItem value="90days">최근 90일</MenuItem>
                    <MenuItem value="180days">최근 180일</MenuItem>
                  </Select>
                </FormControl>

                <TextField
                  fullWidth
                  label="선호 방문 시간 (쉼표로 구분)"
                  name="preferredTime"
                  defaultValue={selectedSegment?.criteria.preferredTime?.join(', ')}
                  sx={{ mb: 2 }}
                />

                <TextField
                  fullWidth
                  label="예상 고객 수"
                  name="customerCount"
                  type="number"
                  defaultValue={selectedSegment?.customerCount}
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