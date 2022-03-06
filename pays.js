const AlipaySdk = require('alipay-sdk').default
const AlipayFormData = require('alipay-sdk/lib/form').default

// 初始化插件
const alipaySdk = new AlipaySdk({
    appId: '2016100100639372',
    gateway: 'https://openapi.alipaydev.com/gateway.do',
    signType: 'RSA', // 注意这里默认是RSA2, 但是我自己只能用RSA, 所以是RSA, 正常不要配置
    alipayPublicKey: 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAljVfHixlR8U1sRJ99XTc1723hXmNLqGW7Esk/UhVcrktlnVwUmCSCI9Rmg9yrEOACHViG80Lhu7Zs9nc9MRzG2xhxF++rA6d0ilUoYq3c5KwcFzdU/nLTmtyfuDq5aOdkvGAcBuZyeLqfwUWdkCfBhFYP2H/J0RG9HbR/9IxOgd47cCC3yffco24v/W8/Y3RPwdbKpMzcCKnAciQJahvOBGJlBDL1fhQWxktsdLPwB2SJ0N6uYfXZ68MmyodCJwP+jg/EjSFi6JO0VPP9wj1s3W6WOVkbWgD2LB9YdRg4U3kpGlQNQYHi63FGtBw63uJp2TiGspxe9lQ1Y1inI49aQIDAQAB', // 支付宝公钥，需要对结果验签时候必填
    privateKey: 'MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCPcUJrYFMeBxTmDSLvR2u1CkOJoGjp8xylciA5c5MRiR4+IyN788nThFD0wma6XDNetNVrwg0V0ESlLPCXKrmgfy0G3znH6izqRmp6EYC40fcrkIXBHL64+1EmzU1IG9Mv5TnN5m3WrnMM8QtCAbs0FAL3ZKwqSIZKUDxditmornl+cA9ye+8AwXgONgKwKePT2pLMVxroEIKaQURm86aZKOir9qVXQa+f8BOlQcXn0NzBN8Z+NkRMpKRlE+uMymwGLMpR2hs8fmyfssyicRTAalk41TBoCbSmBST6L3hq3ALBWovCGVwAl3ngL3RpFkUgnO5TC8Igf7JiL2ad3bwvAgMBAAECggEBAINxD6IBVGjRqG7eXsLQuXvd+eFlYn3uzrM0jx7WL1AES/g4js2IqcrvFpgSg7wFvPTt1Bu4Z/EzNZP+SEDdX9gYcZQ4fWQZzCqpd+x/mWrCzDHZbxd0VbiAYu6hdk27YZwj+wIYQ1JT7Q1Q3DYSDA8+vzEfyTu91YDHYWl+UNFmG5gLN+7Y9r2B5Sm78/ryZ07F98E80+1RPytnskqZbZVMYqC+4lRJdFa5es8D8oDO3+q/sy6qdbEQhwxzPodyit2e+9Pth3u4yegqIdOw4+hdeMeBWTmF+YXjqnbdMpe+xXWlJgZmOfF19vLWoH9MMRq0jZUnu3gjVNLmEkjhV/ECgYEA4ypivaF1BtckBDj+eSM31DRtBoEp/QgxGIXxR/LhNkCF3CY+cDoGtOWdL6nFCO5z3KskocSsyWoqJdUoDMFLIr2LsZTuQKZKehSwE4edbaRXqxBZDP6WL2Mgu2GEymbv3PrgCc1rC6F3GYwtdYFrhMX0m4E2OD2et3G2CHDTw7MCgYEAoaZWltcIo6yGGzoue/lQRupJS28O6fGvs+RIoTpCvpVHsmAu43wJYgp/97v1l2pSiUhi5rutsgw4HPTN49BGicM4a8HInqvs1iPVOuz/j8cxs0ckhFp9/FBvN53eam/Z+5asLfaBHARPwGrd7S4wNdnYQxdQCon8pFOBHNb5V5UCgYBm3fG6p1tkDpZLpzdsyYrleBwKvwCxiT0aOsUo7I4ZUByNtW++yDfzQKruQ3Vq9vfWbFV5P6NyzbVqTl0FcZ5BjA2vC57b/bFqGOYm4dljJfFhEFUS8lI2ATB4Sc+lC/oAWkaLic64hJR3KCgJtuJmTHHY3SkdTKILtd1VcyohywKBgA0RV1qmU4p3vfehgnR/OSAifH5eogQDh8KxJ7Xw8chaZQtkfyXgtxl349RxG298JuP2OBiS/32vQzIEEEjkY29rmroLVl6NY34EM46p7hb/cWMe0zLn5dtp3TPPzVUpaaPPEGg+zz0mlBPoD7zGyRrxW2xBDDVt5kCah4t/TXTpAoGACYIUDUfBUDIBKDbYsLaf33SwpCC7Rhfez0vQ4u2HVtkb/l4BwhmMlqz86Vzs3eMitmLySH0Ody16XZedQxYqrtvINB/OmrvhrmNsBHyRA4LjNXHfjK8ENtm8CxpKx5mKm/8zIXAeQkWEbTdv4Uwsdn14Re3Ak6xlAGU4mUn7Jg4=', // 应用私钥字符串
})

async function pay() {
    const formData = new AlipayFormData()
        // 调用 setMethod 并传入 get，会返回可以跳转到支付页面的 url
    formData.setMethod('get')
        // 配置回调接口
    formData.addField('notifyUrl', 'http://www.zzes1314.cn')
        // 设置参数
    formData.addField('bizContent', {
        outTradeNo: '1582976759798',
        productCode: 'FAST_INSTANT_TRADE_PAY',
        totalAmount: '0.01',
        subject: '商品',
        body: '商品详情',
    });
    // 请求接口
    const result = await alipaySdk.exec(
        'alipay.trade.page.pay', {}, { formData: formData },
    );

    // result 为可以跳转到支付链接的 url
    console.log(result);
}

pay()