// home/like
export const fetchLikedProducts = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_WEBSOCKET_URL}/api/users/liked/products`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`, // Bearer Token 사용
      },
    }
  );

  if (!response.ok) {
    throw new Error('Failed to fetch liked products');
  }

  return await response.json();
};

// home/like
export const fetchLoanProductDetails = async (productId: number) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_WEBSOCKET_URL}/api/products/loans/${productId}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch loan product details for ID ${productId}`);
  }

  return await response.json();
};

// home/like
export const fetchAccountProductDetails = async (productId: number) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_WEBSOCKET_URL}/api/products/savings/${productId}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error(
      `Failed to fetch savings product details for ID ${productId}`
    );
  }

  return await response.json();
};

// home/like
export const fetchLifeProductDetails = async (productId: number) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_WEBSOCKET_URL}/api/products/life/${productId}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch life product details for ID ${productId}`);
  }

  return await response.json();
};
