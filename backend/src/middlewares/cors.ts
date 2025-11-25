import cors from 'cors';

const ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS';
const ALLOWED_HEADERS = ['Content-Type', 'Authorization', 'Origin', 'Accept', 'x-api-key'];
const ALLOWED_CORS = [
  'http://localhost:3000',
  'http://localhost:3001',
  'http://localhost:3005',
  'https://nodejs.cohort22.mesto.nomorepartiessbs.ru',
  'http://nodejs.cohort22.mesto.nomorepartiessbs.ru',
];

const corsOptions = {
  // eslint-disable-next-line no-unused-vars,consistent-return
  origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
    // Разрешаем запросы без origin (например, от мобильных приложений, Postman)
    if (!origin || ALLOWED_CORS.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
  methods: ALLOWED_METHODS,
  allowedHeaders: ALLOWED_HEADERS,
};

export default cors(corsOptions);
