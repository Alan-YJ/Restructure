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

function usd(aNumber){
    return new Intl.NumberFormat("en-US", {
        style: "currency",  //带货币符号
        currency: "USD",    //币种
        minimumFractionDigits: 2    //小数点位数
    }).format(aNumber/100)
}

function statement(invoice){
    return renderPlainText(createStatementData(invoice))
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

function htmlStatement(invoice){
    return renderHtml(createStatementData(invoice))
}

function renderHtml(data){
    let result = `<h1>Statement for ${data.customer}</h1>`

    result += "<table>\n"
    result += "<tr><th>play</th><th>seats</th><th>cost</th></tr>"

    for(let perf of data.performances){
        result += `<tr><td>${perf.play.name}</td><td>${perf.audience}</td><td>${usd(perf.amount)}</td></tr>`
    }

    result += "</table>\n"
    result += `<p>Amount owed is <em>${usd(data.totalAmount)}</em></p>\n`
    result += `<p>You earned <em>${usd(data.totalVolumeCredits)}</em> credits</p>\n`
    return result
}

console.info(statement(invoices[0],plays))

document.write(htmlStatement(invoices[0]))