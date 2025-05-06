## Chat GPT 만들기 프로젝트

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

## 주요 학습

- Next.js 15버전
- Server Action
- Neon, drizzle을 이용한 db 구성 및 사용
- jose를 이용한 토큰 생성
- zustand를 이용한 ui 구성
- ai-sdk/openai 사용

## 필수 환경 변수

- `DATABASE_URL`: Neon에서 제공하는 PostgreSQL 연결 문자열.
  - 예: `DATABASE_URL=postgresql://username:password@host:port/database`
- `JWT_SECRET`: JWT 토큰 서명을 위한 비밀 키.
  - 예: `JWT_SECRET=your-secret-key`
- `OPENAI_API_KEY`: OpenAI API를 호출하기 위한 API 키.
  - 예: `OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxx`
