//history -> 한글
export function getHistoryToKorean(
  category:
    | "FOOD"
    | "SNACK"
    | "EDUCATION"
    | "HOBBY"
    | "HEALTH"
    | "FIXED_EXPENSE"
    | "TRAVEL"
    | "DEPOSIT"
    | "INTEREST"
    | "ETC"
): string {
  const categoryMap: Record<
    | "FOOD"
    | "SNACK"
    | "EDUCATION"
    | "HOBBY"
    | "HEALTH"
    | "FIXED_EXPENSE"
    | "TRAVEL"
    | "DEPOSIT"
    | "INTEREST"
    | "ETC",
    string
  > = {
    FOOD: "식비",
    SNACK: "커피/간식",
    EDUCATION: "교육",
    HOBBY: "취미/여가",
    HEALTH: "건강",
    FIXED_EXPENSE: "고정지출",
    TRAVEL: "여행",
    DEPOSIT: "입금",
    INTEREST: "이자",
    ETC: "기타",
  };

  return categoryMap[category] || "알 수 없음";
}

export const getCategory = (variant: string) => {
    switch (variant) {
      case "REAL_ESTATE":
        return "부동산";
      case "INVESTMENT":
        return "투자";
      case "INHERITANCE_GIFT":
        return "상속∙증여";
      case "TRAVEL":
        return "여행";
      case "CULTURE":
        return "문화";
      case "HOBBY":
        return "취미";
      default:
        return "";
    }
  };