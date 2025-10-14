// Auto-translate market questions and outcomes
const marketTranslations: Record<string, { question: string; outcomes: string[] }> = {
  "Will Bitcoin close above $80k this month?": {
    question: "比特币本月收盘价会超过8万美元吗？",
    outcomes: ["是", "否"]
  },
  "Will ETH reach $5,000 before year end?": {
    question: "以太坊会在年底前达到5000美元吗？",
    outcomes: ["是", "否"]
  },
  "Will BNB hit a new all-time high this year?": {
    question: "BNB今年会创历史新高吗？",
    outcomes: ["是", "否"]
  },
  "Will there be a government shutdown by October 15?": {
    question: "10月15日前会发生政府关门吗？",
    outcomes: ["是", "否"]
  },
  "Will Trump meet with Xi Jinping by October 31?": {
    question: "特朗普会在10月31日前与习近平会面吗？",
    outcomes: ["是", "否"]
  },
  "Will the Lakers win their next game?": {
    question: "湖人队下场比赛会赢吗？",
    outcomes: ["是", "否"]
  },
  "Will Manchester City win their next Premier League match?": {
    question: "曼城会赢下场英超比赛吗？",
    outcomes: ["是", "否"]
  },
  "Will the Yankees make the World Series?": {
    question: "洋基队会进入世界大赛吗？",
    outcomes: ["是", "否"]
  },
  "Will Apple beat earnings expectations this quarter?": {
    question: "苹果公司本季度会超过盈利预期吗？",
    outcomes: ["是", "否"]
  },
  "Will Tesla (TSLA) beat quarterly earnings?": {
    question: "特斯拉会超过季度盈利预期吗？",
    outcomes: ["是", "否"]
  },
  "Will Amazon announce major layoffs this quarter?": {
    question: "亚马逊本季度会宣布大规模裁员吗？",
    outcomes: ["是", "否"]
  },
  "Will the Fed cut interest rates at the next meeting?": {
    question: "美联储下次会议会降息吗？",
    outcomes: ["是", "否"]
  },
  "Will US inflation come in below 3% this month?": {
    question: "美国本月通胀率会低于3%吗？",
    outcomes: ["是", "否"]
  },
  "Will unemployment rate fall this month?": {
    question: "本月失业率会下降吗？",
    outcomes: ["是", "否"]
  },
  "Will Congress pass a funding bill by month end?": {
    question: "国会会在月底前通过拨款法案吗？",
    outcomes: ["是", "否"]
  },
  "Will NYC elect a new mayor in the next election?": {
    question: "纽约市下次选举会选出新市长吗？",
    outcomes: ["是", "否"]
  },
  "Will the Golden State Warriors make the playoffs?": {
    question: "金州勇士队会进入季后赛吗？",
    outcomes: ["是", "否"]
  },
  "Will Novak Djokovic win the next Grand Slam?": {
    question: "德约科维奇会赢得下一个大满贯吗？",
    outcomes: ["是", "否"]
  },
  "Will Solana flip BNB by market cap this year?": {
    question: "Solana今年会在市值上超过BNB吗？",
    outcomes: ["是", "否"]
  },
  "Will a Bitcoin ETF be approved in the EU this quarter?": {
    question: "欧盟本季度会批准比特币ETF吗？",
    outcomes: ["是", "否"]
  },
  "Will OpenAI release GPT-5 this year?": {
    question: "OpenAI今年会发布GPT-5吗？",
    outcomes: ["是", "否"]
  },
  "Will Netflix add 10M+ subscribers this quarter?": {
    question: "Netflix本季度会新增1000万以上订阅用户吗？",
    outcomes: ["是", "否"]
  },
  "Will oil prices exceed $100/barrel this quarter?": {
    question: "本季度油价会超过每桶100美元吗？",
    outcomes: ["是", "否"]
  },
  "Will gold hit $2,500/oz this month?": {
    question: "黄金本月会达到每盎司2500美元吗？",
    outcomes: ["是", "否"]
  },
  "Will China impose 100% tariff on US goods by November?": {
    question: "中国会在11月前对美国商品征收100%关税吗？",
    outcomes: ["是", "否"]
  },
  "Will Nvidia stock hit $150 this quarter?": {
    question: "英伟达股价本季度会达到150美元吗？",
    outcomes: ["是", "否"]
  },
  "Will there be a major crypto exchange hack this quarter?": {
    question: "本季度会发生重大加密货币交易所黑客攻击吗？",
    outcomes: ["是", "否"]
  },
  "Will BNB Smart Chain TVL exceed $10B this quarter?": {
    question: "BNB智能链TVL本季度会超过100亿美元吗？",
    outcomes: ["是", "否"]
  },
  "Will the S&P 500 reach 6,000 by year end?": {
    question: "标普500指数年底会达到6000点吗？",
    outcomes: ["是", "否"]
  },
  "Will Real Madrid win the Champions League this year?": {
    question: "皇家马德里今年会赢得欧冠吗？",
    outcomes: ["是", "否"]
  },
  "Will GTA 6 release in 2025?": {
    question: "GTA 6会在2025年发布吗？",
    outcomes: ["是", "否"]
  },
  "Will there be a leap year in 2028?": {
    question: "2028年会是闰年吗？",
    outcomes: ["是", "否"]
  }
}

export function translateMarket<T extends { question: string; outcomes: string[] }>(
  market: T,
  language: 'en' | 'zh'
): T {
  if (language === 'en') return market

  const translation = marketTranslations[market.question]
  if (!translation) return market

  return {
    ...market,
    question: translation.question,
    outcomes: translation.outcomes
  } as T
}

