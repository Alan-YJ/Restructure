
class PerformanceCalculator{
    constructor(aPerformance, play){
        this.performance = aPerformance
        this.play = play
    }
    get amount(){
        throw new Error('调用子类方法')
    }
    get volumeCredits(){
        return Math.max(this.performance.audience - 30, 0)
    }
}

class TragedyCalculator extends PerformanceCalculator{
    //悲剧类型，起价40000，如果观看人数大于30人，每多出一人收1000块
    get amount(){
        result = 40000;
        if(this.performance.audience > 30){
            result += 1000 * (this.performance.audience - 30)
        }
    }
}

class ComedyCalculator extends PerformanceCalculator{
    //喜剧类型，起价30000，每个座位都收取300的座位费，如果观看人数大于20人，则多收10000的费用以及每个超出的座位收500块
    get amount(){
        result = 30000
        if(this.performance.audience > 20){
            result += 10000 + 500*(this.performance.audience -20) 
        }
        result += 300*this.performance.audience
    }
    get volumeCredits(){
        return super.volumeCredits + Math.floor(this.performance.audience /5)
    }
}

function createPerformanceCalculator(aPerformance, play){
    switch(play.type){
        case "tragedy":
            return new TragedyCalculator(aPerformance, play)
        case "comedy":
            return new ComedyCalculator(aPerformance, play)
        default:
            throw new Error(`unknow type: ${play.type}`)
    }
}

function amountFor(aPerformance){
    return new PerformanceCalculator(aPerformance, playFor(aPerformance)).amount
}

function createStatementData(invoice){
    let statementData = {}
    statementData.customer = invoice.customer
    statementData.performances = invoice.performances.map(enrichPerformance)
    statementData.totalAmount = totalAmount(statementData)
    statementData.totalVolumeCredits = totalVolumeCredits(statementData)
    return statementData
}

function enrichPerformance(aPerformance){
    const calculator = createPerformanceCalculator(aPerformance, playFor(aPerformance))
    let result = Object.assign({}, aPerformance)
    result.play = calculator.play
    result.amount = calculator.amount
    result.volumeCredits = calculator.volumeCredits
    return result
}

function playFor(aPerformance){
    return plays[aPerformance.playID]
}

//积分
function volumeCreditsFor(aPerformance) {
    return new PerformanceCalculator(aPerformance, playFor(aPerformance)).volumeCredits
}

//总积分信息
function totalVolumeCredits(data){
    return data.performances.reduce((total, p)=> total + p.volumeCredits, 0)
}

//总金额
function totalAmount(data){
    return data.performances.reduce((total, p)=> total + p.amount, 0)
}

