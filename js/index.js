
//表演者
let plays = {
    "hamlet": {
        name: "Hamlet",
        type: "tragedy" //悲剧
    },
    "as-like": {
        name: "As You Like It",
        type: "comedy"  //喜剧
    },
    "othello": {
        name: "Othello",
        type: "tragedy"
    },
}

//账单
let invoices = [
    {
        customer:"BigCo",
        performances: [
            {
                playID: "hamlet",
                audience: 55        //观众数量
            },
            {
                playID: "as-like",
                audience: 35
            },
            {
                playID: "othello",
                audience: 40
            },
        ]
    }
]

//打印账单详情
function statement(invoice, plays){
    //总金额
    let totalAmount = 0;
    //积分
    let volumeCredits = 0;
    //打印信息
    let result = `Statement for ${invoice.customer}\n`;
    let formatConfig = {
        style: "currency",  //带货币符号
        currency: "USD",    //币种
        minimumFractionDigits: 2    //小数点位数
    }
    //Intl.NumberFormat根据配置转换成指定货币类型字符串,使用方式format(value)
    const format = new Intl.NumberFormat("en-US", formatConfig).format

    //循环读取客户的每一条账单
    for(let perf of invoice.performances){
        //找到表演者信息
        const play = plays[perf.playID];
        let thisAmount = 0;

        //1.如果表演类型为悲剧，起价40000，如果观看人数大于30人，每多出一人收1000块
        //2.如果表演类型为喜剧，起价30000，每个座位都收取300的座位费，如果观看人数大于20人，则多收10000的费用以及每个超出的座位收500块
        switch(play.type){
            case "tragedy":
                this.Amount = 40000;
                if(perf.audience > 30){
                    this.Amount += 1000 * (perf.audience - 30)
                }
                break;
            case "comedy":
                this.Amount = 30000
                if(perf.audience > 20){
                    this.Amount += 10000 + 500*(perf.audience -20) 
                }
                this.Amount += 300*perf.audience
                break;
            default:
                throw new Error(`unknown type:${play.type}`)
        }

        //计算积分信息
        volumeCredits += Math.max(perf.audience - 30, 0)
        if("comedy" === play.type){
            volumeCredits += Math.floor(perf.audience/5)
        }

        result += `${play.name}: ${format(thisAmount/100)} (${perf.audience} seats)\n`
        totalAmount += thisAmount
    }

    result += `Amount owed is ${format(totalAmount/100)}\n`
    result += `You earned ${volumeCredits} credits\n`

    return result
}


console.info(statement(invoices[0],plays))