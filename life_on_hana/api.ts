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

// column
export const fetchArticles = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_WEBSOCKET_URL}/api/articles`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error('Failed to fetch articles');
  }

  const data = await response.json();
  return data.data.articles;
};

// ArticleItem 좋아요
export const likeArticle = async (articleId: number, isLiked: boolean) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_WEBSOCKET_URL}/api/articles/${articleId}/like`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
      },
      body: JSON.stringify({ isLiked }),
    }
  );

  if (!response.ok) {
    throw new Error('Failed to update like status');
  }

  const data = await response.json();
  return data.data;
};
