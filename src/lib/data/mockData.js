// 방문객 앱 목업 데이터
export const mockVisitorData = {
  user: {
    id: 'user123',
    name: '김민수',
    interests: ['도자기', '고려시대', '불교미술'],
    visitHistory: [
      { date: '2025-02-15', exhibits: ['조선시대 회화', '고려청자 특별전'] },
      { date: '2024-12-10', exhibits: ['불교미술관', '국보전'] }
    ]
  },
  
  exhibits: [
    {
      id: 'exhibit001',
      name: '고려청자',
      location: '인왕산 전시실',
      description: '고려시대 최고 수준의 청자 작품들을 전시합니다.',
      matchedInterests: ['도자기', '고려시대'],
      popularity: 92
    },
    {
      id: 'exhibit002',
      name: '청자 상감 운학문 매병',
      location: '고려시대관 2층',
      description: '고려 12세기 작품으로, 상감기법으로 학과 구름 문양을 새긴 매병입니다.',
      matchedInterests: ['도자기', '고려시대'],
      popularity: 88
    },
    {
      id: 'exhibit003',
      name: '금동 미륵보살 반가사유상',
      location: '불교미술관 1층',
      description: '국보 제83호로 지정된 삼국시대의 대표적인 불교 조각품입니다.',
      matchedInterests: ['불교미술'],
      popularity: 95
    }
  ],
  
  nearbyRecommendations: [
    {
      id: 'nearby001',
      name: '백자 달항아리',
      distance: '10m',
      matchScore: 85
    },
    {
      id: 'nearby002',
      name: '분청사기 철화포도문 항아리',
      distance: '15m',
      matchScore: 82
    },
    {
      id: 'nearby003',
      name: '청화백자 산수문 병',
      distance: '20m',
      matchScore: 78
    }
  ],
  
  aiConversation: [
    {
      role: 'user',
      content: '이 작품에 대해 더 알려주세요'
    },
    {
      role: 'assistant',
      content: '이 청자는 고려시대(12세기) 작품으로, 당신이 이전에 관심 보인 상감기법이 사용되었습니다. 학과 구름 문양은 당시 귀족 문화를 반영하고 있습니다.'
    }
  ],
  
  recommendedRoute: {
    totalTime: '1시간 20분',
    route: [
      {
        name: '고려청자 특별전',
        floor: '현재',
        status: '현재',
        estimatedTime: '25분'
      },
      {
        name: '조선시대 도자기',
        floor: '2층',
        status: '예정',
        estimatedTime: '30분'
      },
      {
        name: '현대 도예 작품',
        floor: '3층',
        status: '예정',
        estimatedTime: '25분'
      }
    ]
  }
};

// 관리자 대시보드 목업 데이터
export const mockAdminData = {
  dashboard: {
    date: '2025년 3월 15일',
    adminName: '박관리자',
    realTimeVisitors: {
      current: 342,
      capacity: 500,
      hourlyData: [280, 295, 310, 342, 350, 330]
    },
    dailyMetrics: {
      totalVisitors: 1247,
      averageStay: 67,
      returnRate: 23
    },
    alerts: {
      crowdedAreas: 2,
      lowBattery: 3,
      systemAlerts: 1
    }
  },
  
  popularExhibits: [
    { name: '국보 청자', viewTime: 32 },
    { name: '금관', viewTime: 28 },
    { name: '백자', viewTime: 25 },
    { name: '불상', viewTime: 22 },
    { name: '고분벽화', viewTime: 18 }
  ],
  
  aiPredictions: {
    tomorrowVisitors: { count: 1350, change: 8 },
    peakHours: '14:00-16:00',
    staffingRecommendations: [
      { floor: '1층', change: 2 },
      { floor: '3층', change: -1 }
    ],
    trendingExhibit: '현대미술 특별전'
  },
  
  heatmapData: [
    { area: '입구', status: '보통' },
    { area: '전시실 A', status: '여유' },
    { area: '전시실 B', status: '혼잡' },
    { area: '전시실 C', status: '여유' },
    { area: '전시실 D', status: '혼잡' },
    { area: '카페', status: '보통' },
    { area: '기념품점', status: '여유' },
    { area: '휴게실', status: '보통' },
    { area: '화장실', status: '여유' }
  ],
  
  visitorSegments: {
    distribution: [
      { type: '몰입형 관람객', percentage: 32 },
      { type: '빠른 관람객', percentage: 28 },
      { type: '교육 중심', percentage: 22 },
      { type: '사회적 관람객', percentage: 18 }
    ],
    stayDuration: [
      { type: '몰입형', minutes: 95 },
      { type: '빠른 관람', minutes: 35 },
      { type: '교육 중심', minutes: 85 },
      { type: '사회적 관람', minutes: 65 }
    ],
    interestCategories: [
      {
        type: '몰입형',
        interests: [
          { category: '고대 예술', level: 3 },
          { category: '현대미술', level: 2 },
          { category: '서양화', level: 2 }
        ]
      },
      {
        type: '빠른 관람',
        interests: [
          { category: '국보급 전시', level: 3 },
          { category: '특별전', level: 2 },
          { category: '조각', level: 1 }
        ]
      },
      {
        type: '교육 중심',
        interests: [
          { category: '역사 유물', level: 3 },
          { category: '고문서', level: 3 },
          { category: '공예', level: 2 }
        ]
      },
      {
        type: '사회적 관람',
        interests: [
          { category: '인터랙티브 전시', level: 3 },
          { category: '현대미술', level: 2 },
          { category: '사진', level: 2 }
        ]
      }
    ],
    returnRate: [
      { type: '몰입형', rate: 42, change: 5 },
      { type: '교육 중심', rate: 38, change: 3 },
      { type: '사회적 관람', rate: 25, change: 2 },
      { type: '빠른 관람', rate: 15, change: -1 }
    ],
    recommendations: [
      { type: '몰입형', strategy: '심층 콘텐츠 강화' },
      { type: '빠른 관람', strategy: '하이라이트 투어' },
      { type: '교육 중심', strategy: '전문가 강연 시리즈' },
      { type: '사회적 관람', strategy: '그룹 이벤트' }
    ]
  },
  
  beacons: {
    floor: '1층',
    total: 15,
    status: {
      normal: 13,
      lowBattery: 2,
      offline: 0
    },
    lowBatteryLocations: ['입구 홀', '전시실 C']
  }
};
