import { Meta, StoryObj } from "@storybook/react";
import ArticleAIRecommendDetailItem from "@/components/molecules/ArticleAIRecommendDetailItem";

const meta: Meta<typeof ArticleAIRecommendDetailItem> = {
  title: "molecule component/ArticleAIRecommendDetailItem",
  component: ArticleAIRecommendDetailItem,
  tags: ["autodocs"],
  argTypes: {
    name: { control: "text", description: "제목" },
    description: { control: "text", description: "내용" },
    link: { control: "text", description: "Link" },
    closeBtn: {
      control: "boolean",
      description: "닫기 버튼",
      defaultValue: true, 
    },
  },
  decorators: [
    (Story) => (
      <div style={{ minHeight: "480px", padding: "20px", boxSizing: "border-box" }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ArticleAIRecommendDetailItem>;

export const Default: Story = {
  args: {
    name: "[서울 출발] 울산 2박 3일 여행 패키지",
    description: `귀하의 소비 패턴을 고려하여 울산 현대호텔 숙박을 추천드립니다. 또한, 고객님의 미술관 방문 기록을 바탕으로 울산 박물관 관람을 일정에 포함되어 있습니다. 

장생포고래문화마을은 귀하의 가족 여행 선호도를 반영한 선택입니다.

이 패키지의 가격은 성인 1인 기준 379,000원이며, 호텔급 숙박과 SRT 왕복 열차편이 포함되어 있습니다. 

고객님의 편의를 위해 연계 차량과 주요 관광지 입장료도 모두 포함되어 있습니다.

새해를 맞이하는 특별한 경험과 함께 울산의 주요 명소를 효율적으로 둘러볼 수 있는 이 패키지로 뜻깊은 여행을 즐기시기 바랍니다.`,
    link: "https://www.naver.com/",
  },
};

export const Long: Story = {
  args: {
    name: "긴 글 스크롤 테스트",
    description: `귀하의 소비 패턴을 고려하여 울산 현대호텔 숙박을 추천드립니다. 
    또한, 고객님의 미술관 방문 기록을 바탕으로 울산 박물관 관람을 일정에 포함했습니다.
    장생포고래문화마을은 귀하의 가족 여행  기록을 바탕으로 울산 박물관 관람을 일정에 포함했습니다.
    장생포고래문화마을은 귀하의 가족 여행 선호도를 반영한 선택입니다.
    이 패키지의 가격은 성인 1인 기준 379,000원이며, 호텔급 숙박과 SRT 왕복 열차편이 포함되어 있습니다. 
    귀하의 가족 여행 선호도를 반영한 선택입니다. 이 패키지의 가격은 성인 1인 기준  기록을 바탕으로 울산 박물관 관람을 일정에 포함했습니다.
    장생포고래문화마을은 귀하의 가족 여행 선호도를 반영한 선택입니다.
    이 패키지의 가격은 성인 1인 기준 379,000원이며, 호텔급 숙박과 SRT 왕복 열차편이 포함되어 있습니다. 
    귀하의 가족 여행 선호도를 반영한 선택입니다. 이 패키지의 가격은 성인 1인 기준  기록을 바탕으로 울산 박물관 관람을 일정에 포함했습니다.
    장생포고래문화마을은 귀하의 가족 여행 선호도를 반영한 선택입니다.
    이 패키지의 가격은 성인 1인 기준 379,000원이며, 호텔급 숙박과 SRT 왕복 열차편이 포함되어 있습니다. 
    귀하의 가족 여행 선호도를 반영한 선택입니다. 이 패키지의 가격은 성인 1인 기준  기록을 바탕으로 울산 박물관 관람을 일정에 포함했습니다.
    장생포고래문화마을은 귀하의 가족 여행 선호도를 반영한 선택입니다.
    이 패키지의 가격은 성인 1인 기준 379,000원이며, 호텔급 숙박과 SRT 왕복 열차편이 포함되어 있습니다. 
    귀하의 가족 여행 선호도를 반영한 선택입니다. 이 패키지의 가격은 성인 1인 기준  기록을 바탕으로 울산 박물관 관람을 일정에 포함했습니다.
    장생포고래문화마을은 귀하의 가족 여행 선호도를 반영한 선택입니다.
    이 패키지의 가격은 성인 1인 기준 379,000원이며, 호텔급 숙박과 SRT 왕복 열차편이 포함되어 있습니다. 
    귀하의 가족 여행 선호도를 반영한 선택입니다. 이 패키지의 가격은 성인 1인 기준 선호도를 반영한 선택입니다.
    이 패키지의 가격은 성인 1인 기준 379,000원이며, 호텔급 숙박과 SRT 왕복 열차편이 포함되어 있습니다. 
    귀하의 가족 여행 선호도를 반영한 선택입니다. 이 패키지의 가격은 성인 1인 기준 379,000원이며, 호텔급 숙박과 SRT 왕복 열차편이 포함되어 있습니다.`,
    link: "https://www.naver.com/",
    closeBtn: false,
  },
};
