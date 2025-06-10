
export interface Question {
  id: string;
  type: 'multiple-choice' | 'true-false' | 'fill-blank' | 'matching';
  question: string;
  options?: string[];
  correctAnswer: string | string[];
  explanation: string;
  points: number;
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  content: string;
  icon: string;
  estimatedTime: number; // in minutes
  xpReward: number;
  questions: Question[];
  isCompleted: boolean;
  isUnlocked: boolean;
}

export interface Unit {
  id: string;
  title: string;
  description: string;
  color: string;
  lessons: Lesson[];
  totalXP: number;
}

export const financialCourse: Unit[] = [
  {
    id: 'unit-1',
    title: 'Financial Basics',
    description: 'Master the fundamentals of personal finance',
    color: 'bg-blue-500',
    totalXP: 500,
    lessons: [
      {
        id: 'lesson-1',
        title: 'What is Money?',
        description: 'Understanding the concept and functions of money',
        content: `
Money is a medium of exchange that facilitates trade and commerce. It serves three primary functions:

**1. Medium of Exchange**
Money allows us to trade goods and services without the need for bartering. Instead of trading chickens for shoes, we use money as an intermediary.

**2. Store of Value**
Money can be saved and used later. It maintains its value over time (though inflation can affect this).

**3. Unit of Account**
Money provides a standard way to measure and compare the value of different goods and services.

**Types of Money:**
- **Commodity Money**: Gold, silver, or other valuable materials
- **Fiat Money**: Government-issued currency not backed by physical commodities
- **Digital Money**: Electronic forms of money, including cryptocurrencies

Understanding money is crucial for making informed financial decisions and building wealth over time.
        `,
        icon: '💰',
        estimatedTime: 10,
        xpReward: 50,
        isCompleted: false,
        isUnlocked: true,
        questions: [
          {
            id: 'q1',
            type: 'multiple-choice',
            question: 'What are the three primary functions of money?',
            options: [
              'Medium of exchange, store of value, unit of account',
              'Buying, selling, saving',
              'Earning, spending, investing',
              'Cash, credit, debit'
            ],
            correctAnswer: 'Medium of exchange, store of value, unit of account',
            explanation: 'Money serves as a medium of exchange (facilitates trade), store of value (can be saved), and unit of account (measures value).',
            points: 10
          },
          {
            id: 'q2',
            type: 'true-false',
            question: 'Fiat money is backed by physical commodities like gold.',
            options: ['True', 'False'],
            correctAnswer: 'False',
            explanation: 'Fiat money is government-issued currency that is not backed by physical commodities. Its value comes from government decree and public trust.',
            points: 10
          },
          {
            id: 'q3',
            type: 'fill-blank',
            question: 'Money allows us to trade goods and services without the need for _______.',
            correctAnswer: 'bartering',
            explanation: 'Bartering is the direct exchange of goods and services without using money as an intermediary.',
            points: 15
          }
        ]
      },
      {
        id: 'lesson-2',
        title: 'Creating a Budget',
        description: 'Learn how to track income and expenses effectively',
        content: `
A budget is a plan for how you'll spend your money. It helps you control your finances and achieve your goals.

**Steps to Create a Budget:**

**1. Calculate Your Income**
- Include all sources: salary, side gigs, investments
- Use your net income (after taxes)

**2. Track Your Expenses**
- Fixed expenses: rent, insurance, loan payments
- Variable expenses: groceries, entertainment, utilities
- Track for at least one month to get accurate data

**3. Categorize Your Spending**
- Housing (25-30% of income)
- Transportation (10-15%)
- Food (10-15%)
- Savings (20%)
- Entertainment (5-10%)
- Other expenses

**4. Use the 50/30/20 Rule**
- 50% for needs (housing, utilities, groceries)
- 30% for wants (entertainment, dining out)
- 20% for savings and debt repayment

**5. Monitor and Adjust**
- Review monthly
- Adjust categories as needed
- Stay flexible but disciplined

Remember: A budget isn't about restricting yourself—it's about giving yourself permission to spend on what matters most to you.
        `,
        icon: '📊',
        estimatedTime: 15,
        xpReward: 75,
        isCompleted: false,
        isUnlocked: false,
        questions: [
          {
            id: 'q4',
            type: 'multiple-choice',
            question: 'According to the 50/30/20 rule, what percentage should go to savings?',
            options: ['50%', '30%', '20%', '10%'],
            correctAnswer: '20%',
            explanation: 'The 50/30/20 rule allocates 20% of income to savings and debt repayment.',
            points: 10
          },
          {
            id: 'q5',
            type: 'multiple-choice',
            question: 'What percentage of income should typically go to housing?',
            options: ['10-15%', '25-30%', '40-45%', '50-55%'],
            correctAnswer: '25-30%',
            explanation: 'Housing should typically consume 25-30% of your income to maintain a healthy budget.',
            points: 10
          }
        ]
      },
      {
        id: 'lesson-3',
        title: 'Emergency Funds',
        description: 'Building your financial safety net',
        content: `
An emergency fund is money set aside for unexpected expenses or financial emergencies.

**Why You Need an Emergency Fund:**
- Job loss or reduced income
- Medical emergencies
- Major car or home repairs
- Unexpected travel expenses
- Peace of mind

**How Much to Save:**
- **Starter Emergency Fund**: $1,000 (minimum)
- **Full Emergency Fund**: 3-6 months of living expenses
- **Extended Fund**: 6-12 months for irregular income

**Where to Keep Your Emergency Fund:**
- High-yield savings account
- Money market account
- Certificate of deposit (CD)
- NOT in stocks or risky investments

**Building Your Emergency Fund:**
1. Start small - even $25/month helps
2. Automate your savings
3. Use windfalls (tax refunds, bonuses)
4. Cut unnecessary expenses temporarily
5. Sell items you don't need

**When to Use Your Emergency Fund:**
✅ True emergencies (unexpected and necessary)
✅ Job loss
✅ Medical bills
❌ Vacations
❌ Christmas gifts
❌ New clothes

Remember: Your emergency fund should be boring but accessible!
        `,
        icon: '🚨',
        estimatedTime: 12,
        xpReward: 60,
        isCompleted: false,
        isUnlocked: false,
        questions: [
          {
            id: 'q6',
            type: 'multiple-choice',
            question: 'How much should a full emergency fund typically contain?',
            options: ['1-2 months of expenses', '3-6 months of expenses', '1 year of expenses', '2 years of expenses'],
            correctAnswer: '3-6 months of expenses',
            explanation: 'A full emergency fund should cover 3-6 months of living expenses to provide adequate financial security.',
            points: 10
          },
          {
            id: 'q7',
            type: 'true-false',
            question: 'Emergency funds should be invested in stocks for higher returns.',
            options: ['True', 'False'],
            correctAnswer: 'False',
            explanation: 'Emergency funds should be kept in safe, easily accessible accounts like high-yield savings, not risky investments.',
            points: 10
          }
        ]
      }
    ]
  },
  {
    id: 'unit-2',
    title: 'Saving & Investing',
    description: 'Grow your wealth through smart saving and investing strategies',
    color: 'bg-green-500',
    totalXP: 750,
    lessons: [
      {
        id: 'lesson-4',
        title: 'Compound Interest',
        description: 'The eighth wonder of the world',
        content: `
Compound interest is earning interest on both your original money and previously earned interest.

**How Compound Interest Works:**
- You invest $1,000 at 10% annual interest
- Year 1: $1,000 + $100 interest = $1,100
- Year 2: $1,100 + $110 interest = $1,210
- Year 3: $1,210 + $121 interest = $1,331

**The Power of Time:**
Starting at age 25 vs 35 with $200/month at 7% returns:
- Start at 25: $525,000 at retirement
- Start at 35: $245,000 at retirement
- 10 years = $280,000 difference!

**The Rule of 72:**
Divide 72 by your interest rate to find how long it takes to double your money.
- 7% return: 72 ÷ 7 = ~10 years to double
- 10% return: 72 ÷ 10 = ~7 years to double

**Maximizing Compound Interest:**
1. Start early (time is your biggest advantage)
2. Invest regularly and consistently
3. Don't withdraw early
4. Reinvest dividends and interest
5. Choose investments with good long-term returns

Einstein allegedly called compound interest "the eighth wonder of the world." Those who understand it, earn it. Those who don't, pay it.
        `,
        icon: '📈',
        estimatedTime: 18,
        xpReward: 100,
        isCompleted: false,
        isUnlocked: false,
        questions: [
          {
            id: 'q8',
            type: 'multiple-choice',
            question: 'Using the Rule of 72, how long does it take to double your money at 8% interest?',
            options: ['7 years', '8 years', '9 years', '10 years'],
            correctAnswer: '9 years',
            explanation: 'Rule of 72: 72 ÷ 8 = 9 years to double your money at 8% interest.',
            points: 15
          },
          {
            id: 'q9',
            type: 'true-false',
            question: 'Starting to invest 10 years earlier can make a difference of hundreds of thousands of dollars.',
            options: ['True', 'False'],
            correctAnswer: 'True',
            explanation: 'Due to compound interest, starting early can result in dramatically larger returns over time.',
            points: 10
          }
        ]
      }
    ]
  },
  {
    id: 'unit-3',
    title: 'Credit & Debt',
    description: 'Master credit management and debt elimination strategies',
    color: 'bg-red-500',
    totalXP: 600,
    lessons: [
      {
        id: 'lesson-5',
        title: 'Understanding Credit Scores',
        description: 'Your financial reputation in numbers',
        content: `
Your credit score is a three-digit number that represents your creditworthiness to lenders.

**Credit Score Ranges:**
- 800-850: Excellent
- 740-799: Very Good
- 670-739: Good
- 580-669: Fair
- 300-579: Poor

**What Affects Your Credit Score:**

**1. Payment History (35%)**
- Pay all bills on time
- Even one late payment can hurt your score

**2. Credit Utilization (30%)**
- Keep credit card balances low
- Use less than 30% of available credit
- Aim for under 10% for excellent scores

**3. Length of Credit History (15%)**
- Keep old accounts open
- Don't close your first credit card

**4. Credit Mix (10%)**
- Having different types of credit helps
- Credit cards, auto loans, mortgage

**5. New Credit (10%)**
- Don't apply for too much credit at once
- Hard inquiries can temporarily lower your score

**Improving Your Credit Score:**
- Pay bills on time, every time
- Pay down credit card debt
- Don't close old accounts
- Check your credit report for errors
- Consider becoming an authorized user
- Be patient - improvements take time

Good credit saves you money through lower interest rates on loans and credit cards!
        `,
        icon: '💳',
        estimatedTime: 20,
        xpReward: 90,
        isCompleted: false,
        isUnlocked: false,
        questions: [
          {
            id: 'q10',
            type: 'multiple-choice',
            question: 'What is the most important factor affecting your credit score?',
            options: ['Credit utilization', 'Payment history', 'Length of credit history', 'Credit mix'],
            correctAnswer: 'Payment history',
            explanation: 'Payment history accounts for 35% of your credit score and is the most important factor.',
            points: 15
          },
          {
            id: 'q11',
            type: 'multiple-choice',
            question: 'What credit utilization ratio should you aim for?',
            options: ['Under 10%', '30-40%', '50-60%', '70-80%'],
            correctAnswer: 'Under 10%',
            explanation: 'While under 30% is acceptable, aiming for under 10% utilization can help achieve excellent credit scores.',
            points: 10
          }
        ]
      }
    ]
  }
];

export const getUserProgress = () => {
  const savedProgress = localStorage.getItem('financeAppProgress');
  if (savedProgress) {
    return JSON.parse(savedProgress);
  }
  return {
    completedLessons: [],
    totalXP: 0,
    currentStreak: 0,
    longestStreak: 0,
    lastStudyDate: null
  };
};

export const saveUserProgress = (progress: any) => {
  localStorage.setItem('financeAppProgress', JSON.stringify(progress));
};
