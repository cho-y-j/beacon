'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { mockVisitorData } from '@/lib/data/mockData';

// Material UI 컴포넌트 import
import { 
  Box, Container, Typography, Paper, Card, CardContent, CardMedia,
  AppBar, Toolbar, IconButton, BottomNavigation, BottomNavigationAction,
  TextField, InputAdornment, Avatar, Fade, Grow, Zoom, Badge,
  Button, Divider, CircularProgress
} from '@mui/material';
import { ThemeProvider, createTheme, styled, keyframes } from '@mui/material/styles';

// Material UI 아이콘 import
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import HomeIcon from '@mui/icons-material/Home';
import ChatIcon from '@mui/icons-material/Chat';
import MapIcon from '@mui/icons-material/Map';
import HistoryIcon from '@mui/icons-material/History';
import SendIcon from '@mui/icons-material/Send';
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
    success: {
      main: '#10B981',
    }
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

// 애니메이션 키프레임
const bounce = keyframes`
  0%, 80%, 100% { 
    transform: scale(0);
  } 
  40% { 
    transform: scale(1.0);
  }
`;

// 스타일링된 컴포넌트
const TypingDot = styled('span')(({ theme, delay }) => ({
  display: 'inline-block',
  width: 8,
  height: 8,
  borderRadius: '50%',
  backgroundColor: theme.palette.grey[400],
  margin: '0 2px',
  animation: `${bounce} 1.4s infinite ease-in-out both`,
  animationDelay: delay,
}));

const UserMessage = styled(Paper)(({ theme }) => ({
  maxWidth: '80%',
  padding: theme.spacing(1.5),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
  borderTopRightRadius: 0,
}));

const AssistantMessage = styled(Paper)(({ theme }) => ({
  maxWidth: '80%',
  padding: theme.spacing(1.5),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
  borderTopLeftRadius: 0,
  border: `1px solid ${theme.palette.divider}`,
}));

export default function AiDocent() {
  const [currentExhibit, setCurrentExhibit] = useState(mockVisitorData.currentExhibit);
  const [chatHistory, setChatHistory] = useState([
    { role: 'assistant', content: '안녕하세요! 저는 박물관 AI 도슨트입니다. 전시품에 대해 궁금한 점이 있으시면 무엇이든 물어보세요.' }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [value, setValue] = useState(1); // 하단 네비게이션 선택 값
  const chatContainerRef = useRef(null);

  // 메시지 전송 처리
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    // 사용자 메시지 추가
    const userMessage = { role: 'user', content: inputMessage };
    setChatHistory(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // AI 응답 시뮬레이션 (실제로는 API 호출)
    setTimeout(() => {
      let response;
      const lowerCaseInput = inputMessage.toLowerCase();
      
      if (lowerCaseInput.includes('언제') || lowerCaseInput.includes('시대')) {
        response = `${currentExhibit.name}은(는) ${currentExhibit.period}에 제작되었습니다.`;
      } else if (lowerCaseInput.includes('누구') || lowerCaseInput.includes('작가') || lowerCaseInput.includes('만든')) {
        response = `${currentExhibit.name}은(는) ${currentExhibit.creator || '알려지지 않은 작가'}에 의해 만들어졌습니다.`;
      } else if (lowerCaseInput.includes('어디') || lowerCaseInput.includes('장소') || lowerCaseInput.includes('발견')) {
        response = `이 작품은 ${currentExhibit.location || '정확한 위치는 알려지지 않았지만, 추정되는 지역'}에서 발견되었습니다.`;
      } else if (lowerCaseInput.includes('재료') || lowerCaseInput.includes('무엇으로')) {
        response = `${currentExhibit.name}은(는) 주로 ${currentExhibit.materials || '다양한 재료'}로 만들어졌습니다.`;
      } else if (lowerCaseInput.includes('의미') || lowerCaseInput.includes('상징') || lowerCaseInput.includes('중요')) {
        response = `이 작품은 ${currentExhibit.significance || '해당 시대의 문화와 예술적 가치를 보여주는 중요한 유물'}입니다.`;
      } else {
        response = `${currentExhibit.name}에 대한 흥미로운 질문이네요. ${currentExhibit.description}`;
      }

      setChatHistory(prev => [...prev, { role: 'assistant', content: response }]);
      setIsTyping(false);
    }, 1500);
  };

  // 채팅이 업데이트될 때마다 스크롤 자동 이동
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory]);

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
              AI 도슨트
            </Typography>
          </Toolbar>
        </AppBar>

        {/* 현재 전시품 정보 */}
        <Fade in timeout={500}>
          <Paper elevation={0} sx={{ p: 2, bgcolor: 'background.paper', borderBottom: '1px solid', borderColor: 'divider' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box 
                sx={{ 
                  width: 120, 
                  height: 120, 
                  bgcolor: 'grey.100', 
                  borderRadius: 1, 
                  overflow: 'hidden',
                  mr: 2,
                  flexShrink: 0,
                  boxShadow: 1,
                  p: 1
                }}
              >
                <Box
                  component="img"
                  src={currentExhibit.imageUrl || '/images/exhibits/celadon.jpg'}
                  alt={currentExhibit.name}
                  sx={{ width: '100%', height: '100%', objectFit: 'contain' }}
                />
              </Box>
              <Box>
                <Typography variant="subtitle1" fontWeight="bold" color="text.primary">
                  {currentExhibit.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {currentExhibit.period}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                  <FiberManualRecordIcon sx={{ fontSize: 8, color: 'success.main', mr: 0.5 }} />
                  <Typography variant="caption" color="success.main" fontWeight="medium">
                    현재 감상 중
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Paper>
        </Fade>

        {/* 채팅 영역 */}
        <Box 
          ref={chatContainerRef}
          sx={{ 
            p: 2, 
            overflowY: 'auto', 
            height: 'calc(100vh - 240px)',
            display: 'flex',
            flexDirection: 'column',
            gap: 2
          }}
        >
          {chatHistory.map((message, index) => (
            <Grow
              key={index}
              in
              timeout={300}
              style={{ transformOrigin: message.role === 'user' ? 'right' : 'left' }}
            >
              <Box 
                sx={{ 
                  display: 'flex', 
                  justifyContent: message.role === 'user' ? 'flex-end' : 'flex-start',
                  mb: 1
                }}
              >
                {message.role === 'user' ? (
                  <UserMessage elevation={0}>
                    <Typography variant="body2">{message.content}</Typography>
                  </UserMessage>
                ) : (
                  <AssistantMessage elevation={0}>
                    <Typography variant="body2">{message.content}</Typography>
                  </AssistantMessage>
                )}
              </Box>
            </Grow>
          ))}
          
          {isTyping && (
            <Fade in timeout={300}>
              <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
                <AssistantMessage elevation={0} sx={{ display: 'flex', alignItems: 'center', py: 1.5 }}>
                  <TypingDot delay="-0.32s" />
                  <TypingDot delay="-0.16s" />
                  <TypingDot delay="0s" />
                </AssistantMessage>
              </Box>
            </Fade>
          )}
        </Box>

        {/* 입력 영역 */}
        <Paper 
          elevation={3} 
          sx={{ 
            position: 'fixed', 
            bottom: 70, 
            left: 0, 
            right: 0, 
            p: 2, 
            borderTop: '1px solid', 
            borderColor: 'divider',
            zIndex: 1000
          }}
        >
          <form onSubmit={handleSendMessage}>
            <Box sx={{ display: 'flex' }}>
              <TextField
                fullWidth
                size="small"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="질문을 입력하세요..."
                variant="outlined"
                sx={{ 
                  mr: 1,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '8px 0 0 8px',
                  }
                }}
              />
              <Button 
                type="submit" 
                variant="contained" 
                color="primary"
                disabled={!inputMessage.trim()}
                sx={{ 
                  minWidth: 'auto', 
                  borderRadius: '0 8px 8px 0',
                  px: 2
                }}
              >
                <SendIcon />
              </Button>
            </Box>
          </form>
        </Paper>

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
              icon={<ChatIcon color="primary" />} 
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
      </Box>
    </ThemeProvider>
  );
}
