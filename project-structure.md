# 박물관 AI 비콘 시스템 프로젝트 구조

## 프로젝트 개요
이 프로젝트는 비콘 기술과 AI를 활용한 박물관 관리 시스템의 프론트엔드 프로토타입입니다. Next.js를 기반으로 개발되었으며, 방문객 앱과 관리자 대시보드로 구성되어 있습니다.

## 디렉토리 구조

```
museum-beacon-app/
├── migrations/                # 데이터베이스 마이그레이션 파일
│   └── 0001_initial.sql      # 초기 데이터베이스 스키마
├── node_modules/             # 의존성 패키지
├── public/                   # 정적 파일 (이미지, 아이콘 등)
├── src/                      # 소스 코드
│   ├── app/                  # Next.js 앱 디렉토리
│   │   ├── admin/            # 관리자 대시보드 관련 페이지
│   │   │   ├── beacons/      # 비콘 관리 페이지
│   │   │   ├── segments/     # 방문객 세그먼트 분석 페이지
│   │   │   └── page.js       # 관리자 대시보드 메인 페이지
│   │   ├── visitor/          # 방문객 앱 관련 페이지
│   │   │   ├── ai-docent/    # AI 도슨트 대화 인터페이스
│   │   │   ├── route/        # 맞춤형 관람 경로 제안
│   │   │   └── page.js       # 방문객 앱 메인 페이지
│   │   ├── globals.css       # 전역 CSS 스타일
│   │   ├── responsive.css    # 반응형 디자인 CSS
│   │   ├── layout.js         # 루트 레이아웃
│   │   └── page.js           # 메인 페이지
│   ├── components/           # 재사용 가능한 컴포넌트
│   │   ├── admin/            # 관리자 대시보드 컴포넌트
│   │   ├── visitor/          # 방문객 앱 컴포넌트
│   │   └── ui/               # UI 컴포넌트
│   ├── hooks/                # 커스텀 React 훅
│   └── lib/                  # 유틸리티 및 라이브러리
│       ├── data/             # 목업 데이터
│       │   └── mockData.js   # 목업 데이터 정의
│       └── utils.ts          # 유틸리티 함수
├── README.md                 # 프로젝트 설명
├── package.json              # 프로젝트 의존성 및 스크립트
├── components.json           # UI 컴포넌트 설정
├── next.config.ts            # Next.js 설정
├── tailwind.config.ts        # Tailwind CSS 설정
└── tsconfig.json             # TypeScript 설정
```

## 주요 파일 및 역할

### 설정 파일
- **package.json**: 프로젝트 의존성 및 스크립트 정의
- **next.config.ts**: Next.js 프레임워크 설정
- **tailwind.config.ts**: Tailwind CSS 스타일링 설정
- **tsconfig.json**: TypeScript 컴파일러 설정
- **components.json**: UI 컴포넌트 설정

### 핵심 파일
- **src/app/page.js**: 메인 페이지 - 방문객 앱과 관리자 대시보드로 이동할 수 있는 링크 제공
- **src/app/layout.js**: 루트 레이아웃 - 모든 페이지의 기본 구조 정의
- **src/app/admin/page.js**: 관리자 대시보드 메인 페이지
- **src/app/visitor/page.js**: 방문객 앱 메인 페이지
- **src/lib/data/mockData.js**: 프로토타입용 목업 데이터 정의

## 주요 기능

### 방문객 앱 (/visitor)
- 개인화된 전시 추천
- AI 도슨트 대화 인터페이스 (/visitor/ai-docent)
- 맞춤형 관람 경로 제안 (/visitor/route)
- 실시간 위치 기반 정보 제공

### 관리자 대시보드 (/admin)
- 실시간 방문객 모니터링
- 방문객 세그먼트 분석 (/admin/segments)
- 비콘 배치 및 상태 관리 (/admin/beacons)
- AI 기반 예측 분석

## 기술 스택
- **프레임워크**: Next.js 14.1.0
- **UI 라이브러리**: React 18.2.0
- **스타일링**: Tailwind CSS
- **UI 컴포넌트**: Radix UI
- **폼 관리**: React Hook Form, Zod
- **차트 및 시각화**: Recharts

## 로컬에서 실행하는 방법

1. 의존성 설치:
```bash
npm install
# 또는
pnpm install
```

2. 개발 서버 실행:
```bash
npm run dev
# 또는
pnpm dev
```

3. 브라우저에서 `http://localhost:3000` 접속

## Vercel 배포 전 확인사항

1. 모든 페이지가 로컬에서 정상적으로 작동하는지 확인
2. 반응형 디자인이 다양한 화면 크기에서 제대로 작동하는지 확인
3. 목업 데이터가 올바르게 로드되는지 확인
4. 모든 링크와 라우팅이 정상적으로 작동하는지 확인
5. 빌드 명령어로 프로덕션 빌드가 성공적으로 완료되는지 확인:
```bash
npm run build
# 또는
pnpm build
```

## 의존성 관리 참고사항
- React 및 React DOM 버전은 18.2.0을 사용 (Vercel 호환성 문제로 React 19 사용 불가)
- Next.js 버전은 14.1.0을 사용
- ESLint 버전은 8.56.0을 사용

이 프로젝트는 Next.js 기반의 프론트엔드 프로토타입으로, 방문객 앱과 관리자 대시보드를 통해 박물관 관람 경험을 개선하는 것을 목표로 합니다. 

메인 페이지: http://localhost:3000
방문객 앱: http://localhost:3000/visitor
관리자 대시보드: http://localhost:3000/admin
AI 도슨트: http://localhost:3000/visitor/ai-docent
맞춤형 관람 경로: http://localhost:3000/visitor/route
비콘 관리: http://localhost:3000/admin/beacons
방문객 세그먼트 분석: http://localhost:3000/admin/segments