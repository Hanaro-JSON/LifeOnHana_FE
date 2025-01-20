import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

// columnPage에서 하나원큐에서 사진을 불러오기 위한 연결용 - 목데이터 삭제시 삭제할것
module.exports = {
  images: {
<<<<<<< HEAD
<<<<<<< HEAD
    domains: ['www.hana1qm.com', 'hana1qm.com'],
    
=======
    domains: ['www.hana1qm.com'],
>>>>>>> 4018117 ([fix] 🐣 columnDetail 페이지 수정)
=======
    domains: ['www.hana1qm.com', 'hana1qm.com'],
    
>>>>>>> d257b51 ([fix] 🐣 column관련 목록과 자세히 보기 동적으로 수정)
  },
};
//

export default nextConfig;
