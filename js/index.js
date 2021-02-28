
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

    function amountFor(aPerformance){
        let result = 0;
    
        //1.如果表演类型为悲剧，起价40000，如果观看人数大于30人，每多出一人收1000块
        //2.如果表演类型为喜剧，起价30000，每个座位都收取300的座位费，如果观看人数大于20人，则多收10000的费用以及每个超出的座位收500块
        switch(playFor(aPerformance).type){
            case "tragedy":
                result = 40000;
                if(aPerformance.audience > 30){
                    result += 1000 * (aPerformance.audience - 30)
                }
                break;
            case "comedy":
                result = 30000
                if(aPerformance.audience > 20){
                    result += 10000 + 500*(aPerformance.audience -20) 
                }
                result += 300*aPerformance.audience
                break;
            default:
                throw new Error(`unknown type:${playFor(aPerformance).type}`)
        }
    
        return result
    }    

    function playFor(aPerformance){
        return plays[aPerformance.playID]
    }

    //积分
    function volumeCreditsFor(aPerformance) {
        let result = 0;
        result += Math.max(aPerformance.audience - 30, 0)
        if("comedy" === playFor(aPerformance).type){
            result += Math.floor(aPerformance.audience/5)
        }
        return result
    }

    function usd(aNumber){
        return new Intl.NumberFormat("en-US", {
            style: "currency",  //带货币符号
            currency: "USD",    //币种
            minimumFractionDigits: 2    //小数点位数
        }).format(aNumber/100)
    }

    //总积分信息
    function totalVolumeCredits(){
        let result = 0;
        for(let perf of invoice.performances){
            result += volumeCreditsFor(perf)
        }
        return result
    }

    //总金额
    function appleSauce(){
        let result = 0;
        for(let perf of invoice.performances){
            result += amountFor(perf)
        }
        return result
    }

    //打印信息
    let result = `Statement for ${invoice.customer}\n`;

    for(let perf of invoice.performances){
        result += `${playFor(perf).name}: ${usd(amountFor(perf))} (${perf.audience} seats)\n`
    }

    result += `Amount owed is ${usd(appleSauce())}\n`
    result += `You earned ${totalVolumeCredits()} credits\n`

    return result
}

console.info(statement(invoices[0],plays))