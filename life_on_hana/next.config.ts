import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
};

// columnPage에서 하나원큐에서 사진을 불러오기 위한 연결용 - 목데이터 삭제시 삭제할것
module.exports = {
  images: {
    domains: ['www.hana1qm.com', 'hana1qm.com'],
  },
};
//

export default nextConfig;
