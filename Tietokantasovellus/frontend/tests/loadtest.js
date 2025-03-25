import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 10,
  duration: '10s',
};

export default function () {
  const res = http.get('http://localhost:5000/items');
  check(res, { 'status is 200': (r) => r.status === 200 });
  sleep(1);
}