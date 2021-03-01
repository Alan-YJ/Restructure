
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

function statement(invoice){
    return renderPlainText(createStatementData(invoice))
}

function usd(aNumber){
    return new Intl.NumberFormat("en-US", {
        style: "currency",  //带货币符号
        currency: "USD",    //币种
        minimumFractionDigits: 2    //小数点位数
    }).format(aNumber/100)
}

//打印账单详情
function renderPlainText(data){
    //打印信息
    let result = `Statement for ${data.customer}\n`;

    for(let perf of data.performances){
        result += `${perf.play.name}: ${usd(perf.amount)} (${perf.audience} seats)\n`
    }

    result += `Amount owed is ${usd(data.totalAmount)}\n`
    result += `You earned ${data.totalVolumeCredits} credits\n`

    return result
}

console.info(statement(invoices[0],plays))