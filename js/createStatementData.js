
function createStatementData(invoice){
    let statementData = {}
    statementData.customer = invoice.customer
    statementData.performances = invoice.performances.map(setPerformance)
    statementData.totalAmount = totalAmount(statementData)
    statementData.totalVolumeCredits = totalVolumeCredits(statementData)
    return statementData
}

function setPerformance(aPerformance){
    let result = Object.assign({}, aPerformance)
    result.play = playFor(result)
    result.amount = amountFor(result)
    result.volumeCredits = volumeCreditsFor(result)
    return result
}

function playFor(aPerformance){
    return plays[aPerformance.playID]
}

function amountFor(aPerformance){
    let result = 0;
    //1.如果表演类型为悲剧，起价40000，如果观看人数大于30人，每多出一人收1000块
    //2.如果表演类型为喜剧，起价30000，每个座位都收取300的座位费，如果观看人数大于20人，则多收10000的费用以及每个超出的座位收500块
    switch(aPerformance.play.type){
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
            throw new Error(`unknown type:${aPerformance.play.type}`)
    }

    return result
}   

//积分
function volumeCreditsFor(aPerformance) {
    let result = 0;
    result += Math.max(aPerformance.audience - 30, 0)
    if("comedy" === aPerformance.play.type){
        result += Math.floor(aPerformance.audience/5)
    }
    return result
}

//总积分信息
function totalVolumeCredits(data){
    return data.performances.reduce((total, p)=> total + p.volumeCredits, 0)
}

//总金额
function totalAmount(data){
    return data.performances.reduce((total, p)=> total + p.amount, 0)
}

