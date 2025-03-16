// 방문객 앱 목업 데이터
export const mockVisitorData = {
  user: {
    id: 'user123',
    name: '조영진',
    email: 'minsu.kim@example.com',
    phone: '010-1234-5678',
    ageGroup: '20-30대',
    interests: ['도자기', '고려시대', '불교미술'],
    visitPurpose: '역사적 유물에 관심이 많아 정기적으로 방문하고 있습니다.',
    visitHistory: [
      { date: '2025-02-15', exhibits: ['조선시대 회화', '고려청자 특별전'] },
      { date: '2024-12-10', exhibits: ['불교미술관', '국보전'] }
    ]
  },
  
  exhibits: [
    {
      id: 'exhibit001',
      name: '고려청자',
      period: '고려시대',
      location: '고려관 1층',
      description: '고려시대의 대표적인 청자 작품으로, 섬세한 비취색 유약이 특징입니다.',
      matchedInterests: ['도자기', '고려시대'],
      imageUrl: '/images/exhibits/celadon.jpg'
    },
    {
      id: 'exhibit002',
      name: '청자 상감 운학문 매병',
      period: '고려시대 12세기',
      location: '고려관 1층',
      description: '구름과 학 무늬가 상감된 이 매병은 고려 상감청자의 뛰어난 제작 기술을 보여줍니다.',
      matchedInterests: ['도자기', '고려시대'],
      imageUrl: '/images/exhibits/celadon.jpg'
    },
    {
      id: 'exhibit003',
      name: '금동 미륵보살 반가사유상',
      period: '삼국시대',
      location: '불교미술관 2층',
      description: '삼국시대의 뛰어난 불교 조각상으로, 부드러운 미소와 우아한 자세가 특징입니다.',
      matchedInterests: ['불교미술'],
      imageUrl: '/images/exhibits/buddha.jpg'
    }
  ],
  
  nearbyRecommendations: [
    {
      id: 'exhibit004',
      name: '분청사기',
      period: '조선시대',
      distance: '30m',
      description: '조선시대 초기의 도자기로, 자유로운 표현이 특징입니다.',
      imageUrl: '/images/exhibits/celadon.jpg'
    },
    {
      id: 'exhibit005',
      name: '백자 달항아리',
      period: '조선시대',
      distance: '50m',
      description: '조선 후기의 대표적인 백자로, 보름달 형태의 단아한 아름다움이 특징입니다.',
      imageUrl: '/images/exhibits/celadon.jpg'
    },
    {
      id: 'exhibit006',
      name: '청화백자',
      period: '조선시대',
      distance: '70m',
      description: '푸른색 안료로 그림을 그린 후 유약을 발라 구운 백자입니다.',
      imageUrl: '/images/exhibits/celadon.jpg'
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
  },
  
  // AI 도슨트 페이지에서 사용하는 현재 전시품 정보
  currentExhibit: {
    id: 'exhibit002',
    name: '청자 상감 운학문 매병',
    period: '고려시대 12세기',
    creator: '알 수 없음',
    location: '고려, 개성',
    materials: '청자토, 상감기법',
    significance: '당시 귀족 문화를 반영하는 고려 상감청자의 대표작',
    description: '구름과 학 무늬가 상감된 이 매병은 고려 상감청자의 뛰어난 제작 기술을 보여줍니다. 유려한 곡선과 세밀한 문양이 특징입니다.',
    imageUrl: '/images/exhibits/celadon.jpg'
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
  
  // 히트맵 데이터 수정
  heatmapData: [
    {
      id: '입구',
      data: [
        { x: '09-10', y: 30 },
        { x: '10-11', y: 50 },
        { x: '11-12', y: 80 },
        { x: '12-13', y: 90 },
        { x: '13-14', y: 70 }
      ]
    },
    {
      id: '전시실A',
      data: [
        { x: '09-10', y: 20 },
        { x: '10-11', y: 40 },
        { x: '11-12', y: 90 },
        { x: '12-13', y: 85 },
        { x: '13-14', y: 60 }
      ]
    },
    {
      id: '전시실B',
      data: [
        { x: '09-10', y: 10 },
        { x: '10-11', y: 30 },
        { x: '11-12', y: 60 },
        { x: '12-13', y: 70 },
        { x: '13-14', y: 50 }
      ]
    },
    {
      id: '전시실C',
      data: [
        { x: '09-10', y: 5 },
        { x: '10-11', y: 20 },
        { x: '11-12', y: 40 },
        { x: '12-13', y: 60 },
        { x: '13-14', y: 45 }
      ]
    },
    {
      id: '카페',
      data: [
        { x: '09-10', y: 15 },
        { x: '10-11', y: 25 },
        { x: '11-12', y: 70 },
        { x: '12-13', y: 95 },
        { x: '13-14', y: 65 }
      ]
    }
  ],
  
  visitorSegments: {
    demographics: {
      under18: 150,
      age18to35: 450,
      age36to55: 350,
      over55: 200,
      male: 580,
      female: 520,
      other: 50
    },
    interests: {
      '역사': 420,
      '예술': 380,
      '과학': 250,
      '문화': 300,
      '기술': 150
    },
    visitPatterns: {
      firstTime: 450,
      returning: 350,
      frequent: 200
    },
    exhibitPopularity: {
      '고려청자': 380,
      '조선백자': 320,
      '금관': 290,
      '불교미술': 270,
      '현대미술': 240
    },
    visitTimes: {
      morning: 350,
      afternoon: 450,
      evening: 200
    },
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
  
  // 비콘 관리 페이지 데이터 수정
  beacons: [
    {
      id: 1,
      name: '입구 비콘',
      location: '입구',
      status: 'active',
      battery: 85,
      signalStrength: '강함',
      lastActive: '5분 전',
      connectedExhibit: '안내 데스크'
    },
    {
      id: 2,
      name: '전시실 A-1',
      location: '전시실 A-1',
      status: 'active',
      battery: 92,
      signalStrength: '강함',
      lastActive: '2분 전',
      connectedExhibit: '고려청자'
    },
    {
      id: 3,
      name: '전시실 A-2',
      location: '전시실 A-2',
      status: 'active',
      battery: 78,
      signalStrength: '중간',
      lastActive: '1분 전',
      connectedExhibit: '백자'
    },
    {
      id: 4,
      name: '전시실 B-1',
      location: '전시실 B-1',
      status: 'inactive',
      battery: 15,
      signalStrength: '약함',
      lastActive: '1시간 전',
      connectedExhibit: '금관'
    },
    {
      id: 5,
      name: '전시실 B-2',
      location: '전시실 B-2',
      status: 'active',
      battery: 65,
      signalStrength: '중간',
      lastActive: '10분 전',
      connectedExhibit: '불교미술'
    },
    {
      id: 6,
      name: '전시실 C-1',
      location: '전시실 C-1',
      status: 'active',
      battery: 72,
      signalStrength: '강함',
      lastActive: '3분 전',
      connectedExhibit: '고분벽화'
    },
    {
      id: 7,
      name: '전시실 C-2',
      location: '전시실 C-2',
      status: 'active',
      battery: 88,
      signalStrength: '강함',
      lastActive: '1분 전',
      connectedExhibit: '현대미술'
    },
    {
      id: 8,
      name: '전시실 D-1',
      location: '전시실 D-1',
      status: 'active',
      battery: 95,
      signalStrength: '강함',
      lastActive: '2분 전',
      connectedExhibit: '특별전시'
    },
    {
      id: 9,
      name: '전시실 D-2',
      location: '전시실 D-2',
      status: 'inactive',
      battery: 12,
      signalStrength: '약함',
      lastActive: '2시간 전',
      connectedExhibit: '임시전시'
    }
  ]
};
